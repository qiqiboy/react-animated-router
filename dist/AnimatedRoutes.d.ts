import React from 'react';
import { useAnimatedRoutes, AnimatedRoutesProps } from './useAnimatedRoutes';
import './animate.scss';
export { useAnimatedRoutes };
/**
 * @desc 路由动画组件
 * @author qiqiboy
 *
 *  需要动画样式文件配合，所以如果使用默认的动画效果，则需要一并将项目中的animated.css导入项目
 *  import AnimatedRouter from 'react-animated-router';
 *  import 'react-animated-router/animate.css';
 */
export declare const AnimatedRoutes: React.FC<AnimatedRoutesProps & {
    children: React.ReactNode;
}>;
export default AnimatedRoutes;
