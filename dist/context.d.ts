/// <reference types="react" />
import { RouteMatch, Location } from 'react-router';
export declare const AnimatedRouterContext: import("react").Context<{
    parentMatches: RouteMatch[] | null;
    parentBase?: string | undefined;
    location?: string | Partial<Location> | undefined;
}>;
