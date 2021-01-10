export const getFirstDayOfMonth = (year: number, month: number): Date => {
    return new Date(year, month, 1);
}

export const getLastDayOfMonth = (year: number, month: number): Date => {
    // This returns the midnight between the last day of the current month and
    // the first day of the next month.
    return new Date(year, month + 1, 1);
}