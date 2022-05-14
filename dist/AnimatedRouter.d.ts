import React from 'react';
import { AnimatedRouterProps } from './useAnimatedRoutes';
import './animate.scss';
export * from './useAnimatedRoutes';
/**
 * @desc 路由动画组件
 * @author qiqiboy
 *
 *  需要动画样式文件配合，所以如果使用默认的动画效果，则需要一并将项目中的animated.css导入项目
 *  import AnimatedRouter from 'react-animated-router';
 *  import 'react-animated-router/animate.css';
 */
declare const AnimatedRouter: React.FC<AnimatedRouterProps & {
    children: React.ReactNode;
}>;
export default AnimatedRouter;
