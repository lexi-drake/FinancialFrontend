import { useEffect } from "react";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { DateSpanRequest, LedgerEntry } from "../models/LedgerEntry";
import SalaryType from "../models/SalaryType";
import TransactionType from "../models/TransactionType";
import { getFirstDayOfMonth, getLastDayOfMonth } from "./dates";

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

export function UsesIncomeGenerators(incomeGenerators: IncomeGenerator[], getIncomeGenerators: () => void) {
    useEffect(() => {
        if (incomeGenerators.length === 0) {
            getIncomeGenerators();
        }
    }, [incomeGenerators, getIncomeGenerators]);
}

export function UsesLedgerEntries(ledgerEntries: LedgerEntry[], getLedgerEntries: (request: DateSpanRequest) => void) {
    useEffect(() => {
        if (ledgerEntries.length === 0) {
            const date: Date = new Date();
            getLedgerEntries({
                start: getFirstDayOfMonth(date.getFullYear(), date.getMonth()),
                end: getLastDayOfMonth(date.getFullYear(), date.getMonth())
            });
        }
    }, [ledgerEntries, getLedgerEntries]);
}