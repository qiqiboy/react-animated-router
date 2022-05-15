import React from 'react';
import { Location, RouteObject } from 'react-router';
import { TransitionActions } from 'react-transition-group/Transition';
export interface AnimatedRouterProps extends TransitionActions {
    className?: string;
    pathnameBase?: string;
    timeout?: number;
    prefix?: string;
    component?: React.ElementType | null;
    location?: Partial<Location> | string;
}
/**
 * 类似于useRoutes，使用useAnimatedRoutes则可以给该组路由增加切换动画
 *
 * @param routes 路由配置数组
 * @param props 设置项
 */
export declare function useAnimatedRoutes(routes: RouteObject[], props?: AnimatedRouterProps): React.ReactElement | null;
