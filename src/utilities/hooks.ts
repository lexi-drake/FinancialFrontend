import { useEffect } from "react";
import Frequency from "../models/Frequency";
import { DateSpanRequest } from "../models/LedgerEntry";
import TransactionType from "../models/TransactionType";
import { getFirstDayOfMonth, getLastDayOfMonth } from "./dates";

export const useTransactionTypes = (transactionTypes: TransactionType[], getTransactionTypes: () => void) => {
    useEffect(() => {
        if (transactionTypes.length === 0) {
            getTransactionTypes();
        }
    }, [transactionTypes, getTransactionTypes]);
}

export const useFrequencies = (frequencies: Frequency[], getFrequencies: () => void) => {
    useEffect(() => {
        if (frequencies.length === 0) {
            getFrequencies();
        }
    }, [frequencies, getFrequencies]);
}

export const useIncomeGenerators = (getIncomeGenerators: () => void) => {
    useEffect(() => {
        getIncomeGenerators();
    }, [getIncomeGenerators]);
}

export const useLedgerEntries = (getLedgerEntries: (request: DateSpanRequest) => void) => {
    useEffect(() => {
        const date: Date = new Date();
        getLedgerEntries({
            start: getFirstDayOfMonth(date.getFullYear(), date.getMonth()),
            end: getLastDayOfMonth(date.getFullYear(), date.getMonth())
        });
    }, [getLedgerEntries]);
}

export const useRecurringTransactions = (getRecurringTransactions: () => void) => {
    useEffect(() => {
        getRecurringTransactions();
    }, [getRecurringTransactions]);
}

export const useTickets = (getTickets: () => void) => {
    useEffect(() => {
        getTickets();
    }, [getTickets]);
}