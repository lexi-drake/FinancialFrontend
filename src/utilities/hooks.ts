import { useEffect } from "react";
import Frequency from "../models/Frequency";
import { DateSpanRequest } from "../models/LedgerEntry";
import SalaryType from "../models/SalaryType";
import TransactionType from "../models/TransactionType";
import { getFirstDayOfMonth, getLastDayOfMonth } from "./dates";

export function UsesUserCount(count: number, getUserCount: () => void) {
    useEffect(() => {
        if (count < 0) {
            getUserCount()
        }
    }, [count, getUserCount]);
}

export function UsesTransactionTypes(transactionTypes: TransactionType[], getTransactionTypes: () => void) {
    useEffect(() => {
        if (transactionTypes.length === 0) {
            getTransactionTypes();
        }
    }, [transactionTypes, getTransactionTypes]);
}

export function UsesFrequencies(frequencies: Frequency[], getFrequencies: () => void) {
    useEffect(() => {
        if (frequencies.length === 0) {
            getFrequencies();
        }
    }, [frequencies, getFrequencies]);
}

export function UsesSalaryTypes(salaryTypes: SalaryType[], getSalaryTypes: () => void) {
    useEffect(() => {
        if (salaryTypes.length === 0) {
            getSalaryTypes();
        }
    }, [salaryTypes, getSalaryTypes]);
}

export function UsesIncomeGenerators(getIncomeGenerators: () => void) {
    useEffect(() => {
        getIncomeGenerators();
    }, [getIncomeGenerators]);
}

export function UsesLedgerEntries(getLedgerEntries: (request: DateSpanRequest) => void) {
    useEffect(() => {
        const date: Date = new Date();
        getLedgerEntries({
            start: getFirstDayOfMonth(date.getFullYear(), date.getMonth()),
            end: getLastDayOfMonth(date.getFullYear(), date.getMonth())
        });
    }, [getLedgerEntries]);
}

export function UsesRecurringTransactions(getRecurringTransactions: () => void) {
    useEffect(() => {
        getRecurringTransactions();
    }, [getRecurringTransactions]);
}