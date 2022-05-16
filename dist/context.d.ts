/// <reference types="react" />
import { RouteMatch, Location } from 'react-router';
export declare const AnimatedRouterContext: import("react").Context<{
    routeMatches: RouteMatch[];
    location?: string | Partial<Location> | undefined;
}>;
