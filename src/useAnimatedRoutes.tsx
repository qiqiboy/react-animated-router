import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Location, RouteMatch, RouteObject, useLocation, useRoutes, matchRoutes, parsePath } from 'react-router';
import { TransitionActions } from 'react-transition-group/Transition';
import { ParentMatchesContext } from './context';

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
    transitionKey?: string | number;
    timeout?: number;
    prefix?: string;
    component?: React.ElementType | null;
    location?: Partial<Location> | string;
}

const InternalAnimatedRoutes: React.FC<
    AnimatedRouterProps & {
        routes: RouteObject[];
    }
> = ({ routes, ...props }) => {
    // @ts-ignore
    return useAnimatedRoutes(routes, props, true);
};

/**
 * 类似于useRoutes，使用useAnimatedRoutes则可以给该组路由增加切换动画
 *
 * @param routes 路由配置数组
 * @param props 设置项
 */
export function useAnimatedRoutes(routes: RouteObject[], props?: AnimatedRouterProps): React.ReactElement | null {
    const __INTERNAL__ = arguments[2];
    const baseLocation = useLocation();
    const rootRef = useRef<TransitionGroup>(null);
    let { parentMatches, parentBase, location: parentLocation } = useContext(ParentMatchesContext);

    let {
        className,
        timeout,
        prefix = 'animated-router',
        appear,
        enter,
        exit,
        transitionKey,
        component,
        location = parentLocation || baseLocation
    } = props || {};
    const self = useRef<{
        inTransition: boolean;
        rootNode?: Element;
        lastTransitionNode?: Element;
    }>({
        inTransition: false
    }).current;

    if (typeof location === 'string') {
        location = parsePath(location);
    }

    const routeMatches: RouteMatch[] =
        useMemo(() => {
            if (__INTERNAL__) {
                return parentMatches;
            }

            // eslint-disable-next-line
            parentBase = [parentMatches?.[parentMatches.length - 1]?.pathnameBase, parentBase]
                .filter(Boolean)
                .join('/')
                .replace(/\/\/+/g, '/');

            return matchRoutes(routes, location, parentBase);
        }, [location, routes, parentMatches, __INTERNAL__]) || [];

    const routeIndex = routeMatches.findIndex(match => routes.includes(match.route));

    if (!transitionKey && routeIndex > -1) {
        transitionKey = `${routes.indexOf(routeMatches[routeIndex].route)}_${routeMatches[routeIndex].pathnameBase}`;
    }

    const children = (
        <ParentMatchesContext.Provider
            value={{
                parentMatches: routeMatches,
                parentBase,
                location
            }}>
            {useRoutes(
                routes.map(route => {
                    if (route.children?.length) {
                        const animatedElement = (
                            <InternalAnimatedRoutes {...props} routes={route.children} location={location} />
                        );

                        return {
                            ...route,
                            children: [
                                {
                                    element: animatedElement,
                                    children: route.children
                                }
                            ]
                        };
                    }

                    return route;
                }),
                location
            )}
        </ParentMatchesContext.Provider>
    );

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
            self.inTransition || setInTransition((self.inTransition = true));
            self.lastTransitionNode = node;
        },
        [self, setInTransition]
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
    const cls = [`${prefix}-container`, 'react-animated-router', className];

    useEffect(() => {
        self.rootNode = findDOMNode(rootRef.current) as Element;
    }, [self]);

    if (isSSR) {
        return children;
    }

    return (
        <TransitionGroup
            ref={rootRef}
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
                timeout={timeout as any}
                {...cssProps}>
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
}
