import React from 'react';
import PropTypes from 'prop-types';
import { createRoutesFromChildren } from 'react-router';
import { useAnimatedRoutes, InternalAnimatedRoutes, AnimatedRoutesProps } from './useAnimatedRoutes';
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
export const AnimatedRoutes: React.FC<
    AnimatedRoutesProps & {
        children: React.ReactNode;
    }
> = ({ children, ...props }) => {
    const routes = createRoutesFromChildren(children);

    return useAnimatedRoutes(routes, props);
};

AnimatedRoutes.propTypes = {
    className: PropTypes.string,
    timeout: PropTypes.number,
    prefix: PropTypes.string,
    appear: PropTypes.bool,
    enter: PropTypes.bool,
    exit: PropTypes.bool,
    component: PropTypes.any,
    children: PropTypes.node
};

AnimatedRoutes.defaultProps = InternalAnimatedRoutes.defaultProps;

export default AnimatedRoutes;
