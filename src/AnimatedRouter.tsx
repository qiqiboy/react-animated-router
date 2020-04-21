import React, { Component, ReactType } from 'react';
import { findDOMNode } from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TransitionActions } from 'react-transition-group/Transition';
import { Switch, withRouter, RouteComponentProps } from 'react-router';
import PropTypes from 'prop-types';
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
}

/**
 * @desc 路由动画组件
 * @author qiqiboy
 *
 *  需要动画样式文件配合，所以如果使用默认的动画效果，则需要一并将项目中的animated.css导入项目
 *  import AnimatedRouter from 'react-animated-router';
 *  import 'react-animated-router/animate.css';
 */
class AnimatedRouter extends Component<AnimatedRouterProps & RouteComponentProps> {
    static propTypes = {
        className: PropTypes.string,
        transitionKey: PropTypes.any,
        timeout: PropTypes.number,
        prefix: PropTypes.string,
        appear: PropTypes.bool,
        enter: PropTypes.bool,
        exit: PropTypes.bool,
        component: PropTypes.any
    };

    static defaultProps = {
        prefix: 'animated-router'
    };

    inTransition = false;
    rootNode: Element;
    lastTransitionNode: Element;

    setInTransition(isAdd) {
        if (this.rootNode) {
            const inName = this.props.prefix + '-in-transition';

            this.rootNode.className = this.rootNode
                .className!.split(/\s+/)
                .filter(name => name !== inName)
                .concat(isAdd ? inName : [])
                .join(' ');
        }
    }

    onEnter = node => {
        this.inTransition || this.setInTransition((this.inTransition = true));
        this.lastTransitionNode = node;
    };

    onEntering = node => {
        const { timeout } = this.props;

        if (node && typeof timeout === 'number') {
            node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration =
                timeout + 'ms';
        }
    };

    onEntered = node => {
        if (this.lastTransitionNode === node) {
            this.inTransition && this.setInTransition((this.inTransition = false));
        }

        if (node) {
            const { timeout } = this.props;

            // remove all transition classNames
            node.className = node.className
                .split(/\s+/)
                .filter(name => !/-(?:forward|backward)-(?:enter|exit)(?:-active)?$/.test(name))
                .join(' ');

            if (typeof timeout === 'number') {
                node.style.transitionDuration = node.style.WebkitTransitionDuration = node.style.MozTransitionDuration =
                    '';
            }
        }
    };

    componentDidMount() {
        this.rootNode = findDOMNode(this) as Element;
    }

    render() {
        if (isSSR) {
            return <Switch>{this.props.children}</Switch>;
        }

        const { className, location, children, timeout, prefix, appear, enter, exit, component } = this.props;
        const groupProps = {
            appear,
            enter,
            exit,
            component
        };
        const cssProps = {
            onExit: this.onEnter,
            onExiting: this.onEntering,
            onExited: this.onEntered,
            onEnter: this.onEnter,
            onEntering: this.onEntering,
            onEntered: this.onEntered
        };
        const cls = [prefix + '-container', 'react-animated-router', className];

        return (
            <TransitionGroup
                className={cls.filter(Boolean).join(' ')}
                childFactory={child => {
                    const classNames =
                        prefix + '-' + (isHistoryPush(location, child.props.in) ? 'forward' : 'backward');

                    return React.cloneElement(child, {
                        classNames
                    });
                }}
                {...groupProps}>
                <CSSTransition
                    key={this.props.transitionKey || location.pathname}
                    addEndListener={(node, done) => {
                        node.addEventListener(
                            'transitionend',
                            function(e) {
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
                    <Switch location={location}>{children}</Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default withRouter(AnimatedRouter);
