import Frequency from "../models/Frequency";
import { DAYS, FIXED_BANK_HOLIDAYS, FLOATING_HOLIDAYS, MonthDay, MONTHS } from "./constants";

export const getFirstDayOfMonth = (year: number, month: number): Date => {
    return new Date(year, month, 1);
}

export const getLastDayOfMonth = (year: number, month: number): Date => {
    // This returns the midnight between the last day of the current month and
    // the first day of the next month.
    return new Date(year, month + 1, 1);
}

export const getReadableDate = (date: Date): string => {
    const month: number = date.getMonth();
    const dayOfWeek: number = date.getDay();
    const dayOfMonth: number = date.getDate();
    const year: number = date.getFullYear();

    return `${DAYS[dayOfWeek]} ${MONTHS[month]} ${dayOfMonth}, ${year}`;
}

export const getDateFromFrequency = (frequencyId: string, frequencies: Frequency[]): Date => {
    const getWeeksToLookBack = (): number => {
        if (!frequencyId || frequencies.length === 0) {
            return 1;
        }
        const selected: Frequency[] = frequencies.filter(x => x.id === frequencyId);
        if (selected.length === 0) {
            return 1;
        }
        return 52 / selected[0].approxTimesPerYear;
    }
    const date: Date = new Date();
    const weeksLookback: number = getWeeksToLookBack();
    const daysOffset: number = -weeksLookback * 7;
    date.setDate(date.getDate() + daysOffset);
    return date;
}

const getDaysIntervalFromTimesPerYear = (timesPerYear: number): number => {
    switch (timesPerYear) {
        case 52:
            return 7;
        case 26:
            return 14;
        default:
            // If it's semi-monthly or less often, the calculations that this is 
            // used for are different. It's easier to check for a 0 value 
            // returned from this than to account for those differences here.
            return 0;
    }
}

const getFloatingHolidaysForYear = (year: number): MonthDay[] => {
    return FLOATING_HOLIDAYS.map(x => {
        const date = new Date(year, x.month, x.day);
        return { month: date.getMonth(), day: date.getDate(), description: x.description };
    });
}

const isHoliday = (date: Date): boolean => {
    const fixedHolidays: MonthDay[] = FIXED_BANK_HOLIDAYS.filter(x => x.month === date.getMonth() && x.day === date.getDate());
    if (fixedHolidays.length !== 0) {
        // If the date is a fixed holiday, don't check floating holidays.
        return true;
    }
    const floatingHolidays: MonthDay[] = getFloatingHolidaysForYear(date.getFullYear()).filter(x => x.month === date.getMonth() && x.day === date.getDate());
    return floatingHolidays.length !== 0;
}

const isHolidayOrWeekend = (date: Date): boolean => {
    const dayOfWeek: number = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return true;
    }
    return isHoliday(date);
}

const getDatesInMonthByInteval = (lastTriggered: Date, interval: number): Date[] => {
    const dates: Date[] = [];
    const currentMonth: number = new Date().getMonth();
    const date: Date = new Date(lastTriggered.getFullYear(), lastTriggered.getMonth(), lastTriggered.getDate());
    do {
        date.setDate(date.getDate() + interval);
        if (isHolidayOrWeekend(date)) {
            // Make a new date, as the interval should still be based off
            // of the original date, not changes made for holidays/weekends.
            const tempDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            while (isHolidayOrWeekend(tempDate)) {
                // Step backward one day at a time until the date is no
                // longer a weekend or holiday.
                tempDate.setDate(tempDate.getDate() - 1);
            }
            if (tempDate.getMonth() === currentMonth) {
                dates.push(tempDate);
                continue;
            }
        }
        if (date.getMonth() === currentMonth) {
            dates.push(date);
        }
    } while (date.getMonth() === currentMonth)
    return dates;
}

export const getTimesPerMonthFromLastTriggeredAndFrequency = (lastTriggered: Date, frequencyId: string, frequencies: Frequency[]): number => {
    if (!frequencyId || frequencies.length === 0) {
        return 0;
    }
    const selected: Frequency[] = frequencies.filter(x => x.id === frequencyId);
    if (selected.length === 0) {
        return 0;
    }
    const daysInterval = getDaysIntervalFromTimesPerYear(selected[0].approxTimesPerYear);
    if (!daysInterval) {
        return selected[0].approxTimesPerYear / 12;
    }
    const triggeredPast: Date[] = getDatesInMonthByInteval(lastTriggered, -daysInterval);
    const triggeredFuture: Date[] = getDatesInMonthByInteval(lastTriggered, daysInterval);
    return [...triggeredPast, lastTriggered, ...triggeredFuture].length;
}

const getDatesInYearByInterval = (lastTriggered: Date, interval: number): Date[] => {
    const dates: Date[] = [];
    const currentYear: number = new Date().getFullYear();
    const date: Date = new Date(lastTriggered.getFullYear(), lastTriggered.getMonth(), lastTriggered.getDate());
    do {
        date.setDate(date.getDate() + interval);
        if (isHolidayOrWeekend(date)) {
            // Make a new date, as the interval should still be based off
            // of the original date, not changes made for holidays/weekends.
            const tempDate: Date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            while (isHolidayOrWeekend(tempDate)) {
                // Step backward one day at a time until the date is no
                // longer a weekend or holiday.
                tempDate.setDate(tempDate.getDate() - 1);
            }
            if (tempDate.getFullYear() === currentYear) {
                dates.push(tempDate);
                continue;
            }
        }
        if (date.getFullYear() === currentYear) {
            dates.push(date);
        }
    } while (date.getFullYear() === currentYear)
    return dates;
}

export const getTimesPerYearFromLastTriggeredAndFrequency = (lastTriggered: Date, frequencyId: string, frequencies: Frequency[]): number => {
    if (!frequencyId || frequencies.length === 0) {
        return 0;
    }
    const selected: Frequency[] = frequencies.filter(x => x.id === frequencyId);
    if (selected.length === 0) {
        return 0;
    }

    const daysInterval = getDaysIntervalFromTimesPerYear(selected[0].approxTimesPerYear);
    if (!daysInterval) {
        return selected[0].approxTimesPerYear;
    }
    const triggeredPast: Date[] = getDatesInYearByInterval(lastTriggered, -daysInterval);
    const triggeredFuture: Date[] = getDatesInYearByInterval(lastTriggered, daysInterval);
    return [...triggeredPast, lastTriggered, ...triggeredFuture].length;
}
