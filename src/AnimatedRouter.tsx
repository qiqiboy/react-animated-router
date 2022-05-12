import React, { useRef, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Routes, useLocation } from 'react-router';
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
    component?: React.ElementType | null;
    children: React.ReactNode;
}

/**
 * @desc 路由动画组件
 * @author qiqiboy
 *
 *  需要动画样式文件配合，所以如果使用默认的动画效果，则需要一并将项目中的animated.css导入项目
 *  import AnimatedRouter from 'react-animated-router';
 *  import 'react-animated-router/animate.css';
 */
const AnimatedRouter: React.FC<AnimatedRouterProps> = props => {
    const self = useRef<{
        inTransition: boolean;
        rootNode: HTMLElement | null;
        lastTransitionNode: HTMLElement | null;
    }>({ inTransition: false, rootNode: null, lastTransitionNode: null }).current;
    const rootNodeRef = useRef<TransitionGroup>(null);
    const { className, children, timeout, prefix, appear, enter, exit, component, transitionKey } = props;
    const location = useLocation();

    const setInTransition = (isAdd: boolean) => {
        if (self.rootNode) {
            const inName = `${prefix}-in-transition`;

            self.rootNode.className = self.rootNode
                .className!.split(/\s+/)
                .filter(name => name !== inName)
                .concat(isAdd ? inName : [])
                .join(' ');
        }
    };

    const onEnter = node => {
        self.inTransition || setInTransition((self.inTransition = true));
        self.lastTransitionNode = node;
    };

    const onEntering = node => {
        if (node && typeof timeout === 'number') {
            node.style.transitionDuration =
                node.style.WebkitTransitionDuration =
                node.style.MozTransitionDuration =
                    `${timeout}ms`;
        }
    };

    const onEntered = node => {
        if (self.lastTransitionNode === node) {
            self.inTransition && setInTransition((self.inTransition = false));
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
    };

    useEffect(() => {
        self.rootNode = findDOMNode(rootNodeRef.current) as HTMLElement;
    }, [self]);

    if (isSSR) {
        return <Routes>{children}</Routes>;
    }

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

    return (
        <TransitionGroup
            className={cls.filter(Boolean).join(' ')}
            ref={rootNodeRef}
            childFactory={child => {
                const classNames = `${prefix}-${isHistoryPush(location, child.props.in) ? 'forward' : 'backward'}`;

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
                <Routes location={location}>{children}</Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

AnimatedRouter.defaultProps = {
    prefix: 'animated-router'
};

export default AnimatedRouter;
