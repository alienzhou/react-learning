export function matchPathPattern(pathname: string, pattern: string) {
    return pathname === pattern;
}

export function splitSearch(uri: string) {
    const reg = /\?([^#]*)/;
    const matches = reg.exec(uri);
    return matches === null ? '' : matches[0];
}

export function splitHash(uri: string) {
    const reg = /#([^?]*)/;
    const matches = reg.exec(uri);
    return matches === null ? '' : matches[0];
}

export function splitPathname(uri: string) {
    const reg = /^([^?#])*/;
    const matches = reg.exec(uri);
    return matches === null ? '' : matches[0];
}