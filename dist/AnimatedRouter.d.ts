import React, { Component, ReactType } from 'react';
import { TransitionActions } from 'react-transition-group/Transition';
import { RouteComponentProps } from 'react-router';
import PropTypes from 'prop-types';
import './animate.scss';
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
declare class AnimatedRouter extends Component<AnimatedRouterProps & RouteComponentProps> {
    static propTypes: {
        className: PropTypes.Requireable<string>;
        transitionKey: PropTypes.Requireable<any>;
        timeout: PropTypes.Requireable<number>;
        prefix: PropTypes.Requireable<string>;
        appear: PropTypes.Requireable<boolean>;
        enter: PropTypes.Requireable<boolean>;
        exit: PropTypes.Requireable<boolean>;
        component: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        prefix: string;
    };
    inTransition: boolean;
    rootNode: Element;
    lastTransitionNode: Element;
    setInTransition(isAdd: any): void;
    onEnter: (node: any) => void;
    onEntering: (node: any) => void;
    onEntered: (node: any) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Pick<AnimatedRouterProps & RouteComponentProps<{}, import("react-router").StaticContext, any>, "enter" | "exit" | "timeout" | "className" | "transitionKey" | "prefix" | "component" | "appear"> & {
    wrappedComponentRef?: ((instance: AnimatedRouter | null) => void) | React.RefObject<AnimatedRouter> | null | undefined;
}, any> & import("react-router").WithRouterStatics<typeof AnimatedRouter>;
export default _default;
