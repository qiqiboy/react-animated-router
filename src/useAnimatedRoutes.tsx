import React, { useState, useCallback, useContext, useMemo, useRef, cloneElement } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
    Location,
    RouteObject,
    NavigationType,
    useLocation,
    useRoutes,
    useNavigationType,
    matchRoutes,
    createPath,
    parsePath,
    UNSAFE_RouteContext as RouteContext,
    UNSAFE_LocationContext as LocationContext
} from 'react-router';
import { TransitionActions } from 'react-transition-group/Transition';

const isSSR = typeof window === 'undefined';

const REACT_HISTORIES_KEY = 'REACT_HISTORIES_KEY';
const histories = isSSR ? [] : (sessionStorage.getItem(REACT_HISTORIES_KEY) || '').split(',').filter(Boolean);
let lastLocation = { key: histories[histories.length - 1] || 'default', isPush: true };
const isHistoryPush = (location: Location, navigationType: NavigationType, update: boolean) => {
    if (isSSR) {
        return true;
    }

    const key = location.key || createPath(location);

    if (update && key !== lastLocation.key) {
        const lastIndex = histories.lastIndexOf(lastLocation.key);
        let isPush = true;

        // REPLACE: replace the end key
        if (navigationType === NavigationType.Replace) {
            histories.splice(-1, 1, key);
        } else if (navigationType === NavigationType.Push) {
            // PUSH: remove from the last key pos, add new key to the end
            lastIndex > -1 && histories.splice(lastIndex + 1);

            histories.push(key);
        } else {
            const index = histories.lastIndexOf(key);

            isPush = lastIndex < index;
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
    Omit<AnimatedRouterProps, 'location'> & {
        location: Location;
        routes: RouteObject[];
        children?: React.ReactElement | null;
    }
> = ({ routes, children, className, timeout, prefix, appear, enter, exit, component, location }) => {
    // @TODO replace with useId() hook in react 18
    const [rootNodeId] = useState(() => `${prefix}-root-${Math.random().toString(36).slice(2)}`);
    const { matches: parentMatches, outlet } = useContext(RouteContext);
    const navigationType = useNavigationType();
    const self = useRef<{
        inTransition: boolean;
        rootNode?: Element;
        lastTransitionNode?: Element;
    }>({
        inTransition: false
    }).current;

    const parentMatch = parentMatches[parentMatches.length - 1] || {};
    const routeMatches = matchRoutes(routes, location!, parentMatch.pathnameBase) || [];
    const transitionKey =
        routeMatches.length > 0 && `${routes.indexOf(routeMatches[0].route)}_${routeMatches[0].pathnameBase}`;

    if (typeof children === 'undefined') {
        children = outlet;
    }

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

            if (node) {
                self.lastTransitionNode = node;
            }
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

    if (!children) {
        return children;
    }

    return (
        <TransitionGroup
            className={cls.filter(Boolean).join(' ')}
            childFactory={child => {
                const classNames = `${prefix}-${
                    isHistoryPush(location, navigationType, child.props.in) ? 'forward' : 'backward'
                }`;

                return cloneElement(child, {
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
                <LocationContext.Provider
                    value={{
                        location,
                        navigationType
                    }}>
                    {children}
                </LocationContext.Provider>
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
    const { location: propLocation } = props || {};
    const location: Location = useMemo(
        () =>
            propLocation
                ? {
                      ...baseLocation,
                      ...(typeof propLocation === 'string' ? parsePath(propLocation) : propLocation)
                  }
                : baseLocation,
        [baseLocation, propLocation]
    );

    const wrapInternalAnimatedRoutes = (routes: RouteObject[], children?: React.ReactElement | null) => (
        <InternalAnimatedRoutes {...props} routes={routes} location={location} children={children} />
    );
    const injectAnimation = (routes: RouteObject[]): RouteObject[] =>
        routes.map(route => {
            if (route.children?.length) {
                const animatedChildren = injectAnimation(route.children);
                const animatedElement = wrapInternalAnimatedRoutes(animatedChildren);

                return typeof route.element === 'undefined'
                    ? {
                          ...route,
                          element: cloneElement(animatedElement, {
                              component: null
                          }),
                          children: animatedChildren
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
