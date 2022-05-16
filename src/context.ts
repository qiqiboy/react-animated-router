import { createContext } from 'react';
import { RouteMatch, Location } from 'react-router';

export const AnimatedRouterContext = createContext<{
    parentMatches: RouteMatch[] | null;
    parentBase?: string;
    location?: Partial<Location> | string;
}>({
    parentMatches: null
});

AnimatedRouterContext.displayName = 'AnimatedRouterContext';
