import React, { useState, useCallback, useContext, useMemo, useRef, cloneElement } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
    Location,
    RouteObject,
    useLocation,
    useRoutes,
    matchRoutes,
    parsePath,
    Outlet,
    UNSAFE_RouteContext
} from 'react-router';
import { TransitionActions } from 'react-transition-group/Transition';
import { AnimatedRouterContext } from './context';

const isSSR = typeof window === 'undefined';

let lastLocation = { key: '', isPush: true };
const REACT_HISTORIES_KEY = 'REACT_HISTORIES_KEY';
const histories = isSSR ? [] : (sessionStorage.getItem(REACT_HISTORIES_KEY) || '').split(',').filter(Boolean);
const isHistoryPush = (location, update) => {
    if (isSSR) {
        return true;
    }

    const key = location.key || location.pathname + location.search;

    if (update && key !== lastLocation.key) {
        const index = histories.lastIndexOf(key);
        const isPush = index < 0 || index + 1 === histories.length;

        if (isPush) {
            histories.push(key);
        } else {
            histories.splice(index + 1);
        }

        sessionStorage.setItem(REACT_HISTORIES_KEY, histories.join(','));

        lastLocation = {
            isPush,
            key
        };
    }

    return lastLocation.isPush;
};

export interface AnimatedRouterProps extends TransitionActions {
    className?: string;
    timeout?: number;
    prefix?: string;
    component?: React.ElementType | null;
    location?: Partial<Location> | string;
}

/**
 * 给路由节点增加动画支持
 *
 * @internal 仅内部调用使用
 */
export const InternalAnimatedRoutes: React.FC<
    AnimatedRouterProps & {
        routes: RouteObject[];
        children: React.ReactElement | null;
    }
> = ({ routes, children, className, timeout, prefix, appear, enter, exit, component, location }) => {
    const [rootNodeId] = useState(() => `${prefix}-root-${Math.random().toString(36).slice(2)}`);
    const { matches: parentMatches } = useContext(UNSAFE_RouteContext);
    const self = useRef<{
        inTransition: boolean;
        rootNode?: Element;
        lastTransitionNode?: Element;
    }>({
        inTransition: false
    }).current;

    const routeMatches = useMemo(
        () => matchRoutes(routes, location!, parentMatches[parentMatches.length - 1]?.pathnameBase) || [],
        [location, routes, parentMatches]
    );
    const routeMatch = routeMatches.find(match => routes.includes(match.route));
    const transitionKey = routeMatch && `${routes.indexOf(routeMatch.route)}_${routeMatch.pathnameBase}`;

    const setInTransition = useCallback(
        isAdd => {
            if (self.rootNode) {
                const inName = `${prefix}-in-transition`;

                self.rootNode.className = self.rootNode
                    .className!.split(/\s+/)
                    .filter(name => name !== inName)
                    .concat(isAdd ? inName : [])
                    .join(' ');
            }
        },
        [prefix, self]
    );

    const onEnter = useCallback(
        node => {
            if (!self.rootNode) {
                self.rootNode = component ? (document.querySelector(`.${rootNodeId}`) as Element) : node?.parentNode;
            }

            self.inTransition || setInTransition((self.inTransition = true));
            self.lastTransitionNode = node;
        },
        [self, setInTransition, rootNodeId, component]
    );

    const onEntering = useCallback(
        node => {
            if (node && typeof timeout === 'number') {
                node.style.transitionDuration =
                    node.style.WebkitTransitionDuration =
                    node.style.MozTransitionDuration =
                        `${timeout}ms`;
            }
        },
        [timeout]
    );

    const onEntered = useCallback(
        node => {
            if (self.lastTransitionNode === node) {
                self.inTransition && setInTransition((self.inTransition = false));
            }

            if (node) {
                // remove all transition classNames
                node.className = node.className
                    .split(/\s+/)
                    .filter(name => !/-(?:forward|backward)-(?:enter|exit|appear)(?:-active|-done)?$/.test(name))
                    .join(' ');

                if (typeof timeout === 'number') {
                    node.style.transitionDuration =
                        node.style.WebkitTransitionDuration =
                        node.style.MozTransitionDuration =
                            '';
                }
            }
        },
        [self, setInTransition, timeout]
    );

    const groupProps = {
        appear,
        enter,
        exit,
        component
    };
    const cssProps = {
        onExit: onEnter,
        onExiting: onEntering,
        onExited: onEntered,
        onEnter,
        onEntering,
        onEntered
    };
    const cls = ['react-animated-router', `${prefix}-container`, rootNodeId, className];

    if (isSSR) {
        return children;
    }

    return (
        <TransitionGroup
            className={cls.filter(Boolean).join(' ')}
            childFactory={child => {
                const classNames = `${prefix}-${isHistoryPush(location, child.props.in) ? 'forward' : 'backward'}`;

                return React.cloneElement(child, {
                    classNames
                });
            }}
            {...groupProps}>
            <CSSTransition
                key={transitionKey || (location as Location).pathname}
                addEndListener={(node, done) => {
                    node.addEventListener(
                        'transitionend',
                        function (e) {
                            // 确保动画来自于目标节点
                            if (e.target === node) {
                                done();
                            }
                        },
                        false
                    );
                }}
                unmountOnExit={true}
                timeout={timeout}
                {...cssProps}>
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
};

InternalAnimatedRoutes.defaultProps = {
    prefix: 'animated-router'
};

/**
 * 类似于useRoutes，使用useAnimatedRoutes则可以给该组路由增加切换动画
 *
 * @param routes 路由配置数组
 * @param props 设置项
 */
export function useAnimatedRoutes(routes: RouteObject[], props?: AnimatedRouterProps): React.ReactElement | null {
    const baseLocation = useLocation();
    const { location: contextLocation } = useContext(AnimatedRouterContext);
    let { location = contextLocation || baseLocation } = props || {};

    if (typeof location === 'string') {
        location = parsePath(location);
    }

    const wrapInternalAnimatedRoutes = (routes: RouteObject[], children) => (
        <InternalAnimatedRoutes {...props} routes={routes} location={location}>
            <AnimatedRouterContext.Provider
                value={{
                    location: location as Partial<Location>
                }}>
                {children}
            </AnimatedRouterContext.Provider>
        </InternalAnimatedRoutes>
    );
    const injectAnimation = (routes: RouteObject[]): RouteObject[] =>
        routes.map(route => {
            if (route.children?.length) {
                const animatedChildren = injectAnimation(route.children);
                const animatedElement = wrapInternalAnimatedRoutes(animatedChildren, <Outlet />);

                return typeof route.element === 'undefined'
                    ? {
                          ...route,
                          children: animatedChildren,
                          element: cloneElement(animatedElement, {
                              component: null
                          })
                      }
                    : {
                          ...route,
                          children: [
                              {
                                  element: animatedElement,
                                  children: animatedChildren
                              }
                          ]
                      };
            }

            return route;
        });

    const animatedRoutes = injectAnimation(routes);
    const children = useRoutes(animatedRoutes, location);

    return wrapInternalAnimatedRoutes(animatedRoutes, children);
}
