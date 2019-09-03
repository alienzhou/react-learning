export interface ILocation {
    pathname: string;
    search: string;
    hash: string;
    state: any;
}

export type Handler = (l: ILocation) => any;

export interface IHistory {
    length: number;
    action: string;
    location: ILocation;
    base: string;

    on: (handler: Handler) => Function;
    push: (path: string, state?: any) => void;
    replace: (path: string, state?: any) => void;
    go: (n: number) => void;
    goBack: () => void;
    goForward: () => void;
}

export interface ContextValue {
    history: IHistory;
    location: ILocation;
}