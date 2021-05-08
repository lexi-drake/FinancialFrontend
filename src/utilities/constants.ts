import { NullAction } from "../store/actions";

export const MAXIMUM_SELECTOR_WIDTH_PX = 325;
export const MINIMUM_SELECTOR_BUTTON_WIDTH_PX = 103;
export const MAXIMUM_SELECTOR_STRING_LENGTH = 20;

export const MINIMUM_PASSWORD_LENGTH = 8;

export const MAXIMUM_CATEGORY_LENGTH = 24;
export const MAXIMUM_DESCRIPTION_LENGTH = 24;

export const MONTHS: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export const DAYS: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export type MonthDay = {
    month: number,
    day: number,
    description: string
};
export const FIXED_BANK_HOLIDAYS: MonthDay[] = [
    { month: 0, day: 1, description: "New Year's Day" },
    { month: 6, day: 4, description: "Independence Day" },
    { month: 10, day: 11, description: "Veteran's Day" },
    { month: 11, day: 24, description: "Christmas Eve" },
    { month: 11, day: 25, description: "Christmas Day" }
]

export type MonthWeekDay = {
    month: number,
    week: number,
    day: number,
    description: string
};

// https://stackoverflow.com/questions/32342753/calculate-holidays-in-javascript
export const FLOATING_HOLIDAYS: MonthWeekDay[] = [
    { month: 0, week: 2, day: 1, description: "Martin Luther King, Jr. Day" },
    { month: 1, week: 2, day: 1, description: "President's Day" },
    { month: 4, week: -1, day: 1, description: "Memorial Day" },
    { month: 8, week: 0, day: 1, description: "Labor Day" },
    { month: 9, week: 1, day: 1, description: "Indigenous Peoples' Day" },
    { month: 10, week: 3, day: 4, description: "Thanksgiving Day" },
]

export const CHART_COLORS: string[] = [
    '#f5b8b7', '#ba5056', '#e05654', '#8f0e22',     // Reds
    '#f9f7d0', '#e5ad56', '#eea570', '#d27236',     // Golds
    '#a5d6c6', '#7d957b', '#91cac3', '#1d6476',     // Greens
    '#94658f', '#624387', '#662938', '#35343a'      // Purples
];

export const NULL_ACTION = (input: any) => ({ type: NullAction.NULL_ACTION, payload: {} });
