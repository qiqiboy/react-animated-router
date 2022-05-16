import { createContext } from 'react';
import { RouteMatch, Location } from 'react-router';

export const AnimatedRouterContext = createContext<{
    routeMatches: RouteMatch[];
    location?: Partial<Location> | string;
}>({
    routeMatches: []
});

AnimatedRouterContext.displayName = 'AnimatedRouterContext';
