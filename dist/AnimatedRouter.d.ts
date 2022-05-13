import React, { ReactType } from 'react';
import { Location, RouteObject } from 'react-router';
import { TransitionActions } from 'react-transition-group/Transition';
import './animate.scss';
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
declare const AnimatedRouter: React.FC<AnimatedRouterProps & {
    _parentPath?: string;
}>;
export default AnimatedRouter;
