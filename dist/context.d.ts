/// <reference types="react" />
import { RouteMatch, Location } from 'react-router';
export declare const ParentMatchesContext: import("react").Context<{
    parentMatches: RouteMatch[] | null;
    parentBase?: string | undefined;
    location?: string | Partial<Location> | undefined;
}>;
