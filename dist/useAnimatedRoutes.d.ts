import React from 'react';
import { Location, RouteObject } from 'react-router';
import { TransitionActions } from 'react-transition-group/Transition';
export interface AnimatedRouterProps extends TransitionActions {
    className?: string;
    timeout?: number;
    prefix?: string;
    component?: React.ElementType | null;
    location?: Partial<Location> | string;
}
/**
 * 给路由节点增加动画支持
 *
 * @internal 仅内部调用使用
 */
export declare const InternalAnimatedRoutes: React.FC<AnimatedRouterProps & {
    routes: RouteObject[];
    children?: React.ReactElement | null;
}>;
/**
 * 类似于useRoutes，使用useAnimatedRoutes则可以给该组路由增加切换动画
 *
 * @param routes 路由配置数组
 * @param props 设置项
 */
export declare function useAnimatedRoutes(routes: RouteObject[], props?: AnimatedRouterProps): React.ReactElement | null;
