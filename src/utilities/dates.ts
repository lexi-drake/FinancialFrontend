export const getFirstDayOfMonth = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
}

export const getLastDayOfMonth = (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
}