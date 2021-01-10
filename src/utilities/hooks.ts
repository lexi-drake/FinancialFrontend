import { useEffect } from "react";
import Frequency from "../models/Frequency";
import { IncomeGenerator } from "../models/IncomeGenerator";
import { DateSpanRequest, LedgerEntry } from "../models/LedgerEntry";
import SalaryType from "../models/SalaryType";
import TransactionType from "../models/TransactionType";
import { getFirstDayOfMonth, getLastDayOfMonth } from "./dates";

export function usesTransactionTypes(transactionTypes: TransactionType[], getTransactionTypes: () => void) {
    useEffect(() => {
        if (transactionTypes.length === 0) {
            getTransactionTypes();
        }
    }, [transactionTypes, getTransactionTypes]);
}

export function usesFrequencies(frequencies: Frequency[], getFrequencies: () => void) {
    useEffect(() => {
        if (frequencies.length === 0) {
            getFrequencies();
        }
    }, [frequencies, getFrequencies]);
}

export function usesSalaryTypes(salaryTypes: SalaryType[], getSalaryTypes: () => void) {
    useEffect(() => {
        if (salaryTypes.length === 0) {
            getSalaryTypes();
        }
    }, [salaryTypes, getSalaryTypes]);
}

export function usesIncomeGenerators(incomeGenerators: IncomeGenerator[], getIncomeGenerators: () => void) {
    useEffect(() => {
        if (incomeGenerators.length === 0) {
            getIncomeGenerators();
        }
    }, [incomeGenerators, getIncomeGenerators]);
}

export function usesLedgerEntries(ledgerEntries: LedgerEntry[], getLedgerEntries: (request: DateSpanRequest) => void) {
    useEffect(() => {
        if (ledgerEntries.length === 0) {
            getLedgerEntries({
                start: getFirstDayOfMonth(),
                end: getLastDayOfMonth()
            });
        }
    }, [ledgerEntries, getLedgerEntries]);
}