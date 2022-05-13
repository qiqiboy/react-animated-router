import React, { isValidElement, ReactType, useCallback, useEffect, useMemo, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
    Location,
    createPath,
    useLocation,
    createRoutesFromChildren,
    resolvePath,
    matchRoutes,
    useRoutes,
    RouteObject
} from 'react-router';
import { TransitionActions } from 'react-transition-group/Transition';
import './animate.scss';

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

        if (index > -1) {
            histories.splice(index + 1);
        } else {
            histories.push(key);
        }

        sessionStorage.setItem(REACT_HISTORIES_KEY, histories.join(','));

        lastLocation = {
            isPush: index < 0,
            key
        };
    }

    return lastLocation.isPush;
};

interface AnimatedRouterProps extends TransitionActions {
    className?: string;
    transitionKey?: string | number;
    timeout?: number;
    prefix?: string;
    component?: ReactType | null;
    location?: Location;
    children: React.ReactNode | RouteObject[];
}

/**
 * @desc 路由动画组件
 * @author qiqiboy
 *
 *  需要动画样式文件配合，所以如果使用默认的动画效果，则需要一并将项目中的animated.css导入项目
 *  import AnimatedRouter from 'react-animated-router';
 *  import 'react-animated-router/animate.css';
 */
const AnimatedRouter: React.FC<
    AnimatedRouterProps & {
        _parentPath?: string;
    }
> = props => {
    const baseLocation = useLocation();
    const rootRef = useRef<TransitionGroup>(null);

    let {
        className,
        children,
        timeout,
        prefix,
        appear,
        enter,
        exit,
        transitionKey,
        component,
        _parentPath,
        location = baseLocation
    } = props;
    const self = useRef<{
        inTransition: boolean;
        inAppearTransition: boolean;
        rootNode?: Element;
        lastTransitionNode?: Element;
    }>({
        inTransition: false,
        inAppearTransition: !!appear
    }).current;

    const childrenRoutes =
        useMemo(
            () =>
                !Array.isArray(children) || isValidElement(children[0]) ? createRoutesFromChildren(children) : children,
            [children]
        ) || [];

    if (!transitionKey && childrenRoutes.length) {
        const routes = matchRoutes(
            childrenRoutes.map(route => ({
                ...route,
                path: createPath(resolvePath(route.path || '', _parentPath))
            })),
            location
        );

        transitionKey = routes?.[0].pathname;
    }

    const animatedRoute = (routes: RouteObject[]) =>
        routes.map(route => {
            if (route.children?.length) {
                const animatedElement = (
                    <AnimatedRouter
                        {...props}
                        children={route.children}
                        location={location}
                        _parentPath={createPath(resolvePath(route.path || '', _parentPath))}
                    />
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
        });

    const childElement = useRoutes(animatedRoute(childrenRoutes), location);

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

            if (self.inAppearTransition) {
                self.inAppearTransition = false;
            }

            if (node) {
                // remove all transition classNames
                node.className = node.className
                    .split(/\s+/)
                    .filter(name => !/-(?:forward|backward)-(?:enter|exit)(?:-active)?$/.test(name))
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

    if (isSSR || !childElement) {
        return childElement;
    }

    return (
        <TransitionGroup
            ref={rootRef}
            className={cls.filter(Boolean).join(' ')}
            childFactory={child => {
                const classNames = `${prefix}-${
                    isHistoryPush(location, self.inAppearTransition ? false : child.props.in) ? 'forward' : 'backward'
                }`;

                return React.cloneElement(child, {
                    classNames
                });
            }}
            {...groupProps}>
            <CSSTransition
                key={transitionKey || location.pathname}
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
                {childElement}
            </CSSTransition>
        </TransitionGroup>
    );
};

AnimatedRouter.propTypes = {
    className: PropTypes.string,
    transitionKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    timeout: PropTypes.number,
    prefix: PropTypes.string,
    appear: PropTypes.bool,
    enter: PropTypes.bool,
    exit: PropTypes.bool,
    component: PropTypes.any
};

AnimatedRouter.defaultProps = {
    prefix: 'animated-router'
};

export default AnimatedRouter;
