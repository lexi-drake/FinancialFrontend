const REDIRECT_PATH = 'RedirectPath';

export const getRedirectPath = (): string => {
    const path = sessionStorage.getItem(REDIRECT_PATH);
    return path ? path : '';
}

export const setRedirectPath = (value: string) => {
    sessionStorage.setItem(REDIRECT_PATH, value);
}

export const clearRedirectPath = () => {
    sessionStorage.removeItem(REDIRECT_PATH);
}