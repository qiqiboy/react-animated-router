import { createContext } from 'react';
import { Location } from 'react-router';

export const AnimatedRouterContext = createContext<{
    location?: Partial<Location> | string;
}>({});

AnimatedRouterContext.displayName = 'AnimatedRouterContext';
