import { push } from "connected-react-router";
import { useState } from "react"
import { connect } from "react-redux";
import AutocompleteField from "../components/custom/AutocompleteField";
import CustomButton from "../components/custom/CustomButton";
import CustomDatepicker from "../components/custom/CustomDatepicker";
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown";
import CustomLink from "../components/custom/CustomLink";
import CustomText from "../components/custom/CustomText";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import RecurringTransactionRequestSummary from "../components/transactions/RecurringTransactionRequestSummary";
import Frequency from "../models/Frequency";
import { RecurringTransactionRequest } from "../models/RecurringTransaction";
import TransactionType from "../models/TransactionType";
import { AppDataState } from "../store/appdata";
import { addIncomeGenerator, clearCategories, getCategories, getFrequencies, getTransactionTypes } from "../store/ledger/actions";
import { MAXIMUM_CATEGORY_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from "../utilities/constants";
import { getDateFromFrequency } from "../utilities/dates";

interface AddIncomeGeneratorProps {
    categories: string[];
    frequencies: Frequency[];
    transactionTypes: TransactionType[];
    getCategories: typeof getCategories;
    clearCategories: typeof clearCategories;
    getFrequencies: typeof getFrequencies;
    getTransactionTypes: typeof getTransactionTypes;
    addIncomeGenerator: typeof addIncomeGenerator;
    push: typeof push;
}

const AddSourceOfIncome = (props: AddIncomeGeneratorProps) => {
    const [category, _setCategory] = useState('');
    const [frequency, setFrequency] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [description, _setDescription] = useState('');
    const [transactionDescription, setTransactionDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [recurringTransactions, setRecurringTransactions] = useState([] as RecurringTransactionRequest[]);
    const [showRecurringTransactionFields, setShowRecurringTransactionFields] = useState(false);
    const [lastTriggered, setLastTriggered] = useState(new Date());

    const handleDateChanged = (date: Date | [Date, Date] | null) => {
        if (date instanceof Date) {
            setLastTriggered(date);
        }
    }

    // Minimum date is dependent on the selected frequency.
    const getMinDate = (): Date => {
        return getDateFromFrequency(frequency, props.frequencies);
    }

    const setCategory = (value: string) => {
        if (value.length <= MAXIMUM_CATEGORY_LENGTH) {
            _setCategory(value);
        }
    }

    const setDescription = (value: string) => {
        if (value.length <= MAXIMUM_DESCRIPTION_LENGTH) {
            _setDescription(value);
        }
    }

    const onDeleteClick = (value: string) => {
        setRecurringTransactions(recurringTransactions
            .filter(x => x.description !== value));
    }

    const onAddTransactionClick = () => {
        setShowRecurringTransactionFields(true);
    }

    const amountError = (): boolean => {
        return !!amount && isNaN(parseFloat(amount));
    }

    const addDisabled = (): boolean => {
        const numberAmount: number = parseFloat(amount);
        return !category
            // description is optional
            || isNaN(numberAmount) || numberAmount <= 0
            || !transactionType;
    }

    const onAddClick = () => {
        const transaction: RecurringTransactionRequest = {
            category: category,
            description: transactionDescription,
            amount: parseFloat(amount),
            frequencyId: '',    // This will be set when the entire request is generated.
            transactionTypeId: transactionType,
            lastTriggered: new Date()
        };
        setRecurringTransactions([...recurringTransactions, transaction]);
        // Clear our entries.
        setCategory('');
        setTransactionDescription('');
        setAmount('');
        setTransactionType('');
        setShowRecurringTransactionFields(false);
    }

    const addSourceOfIncomeDisabled = (): boolean => {
        return !description
            || !frequency
            || recurringTransactions.length === 0;
    }

    const onAddSourceOfIncomeClick = async () => {
        await props.addIncomeGenerator({
            description: description,
            frequencyId: frequency,
            recurringTransactions: recurringTransactions.map(x => { return { ...x, frequencyId: frequency, lastTriggered: lastTriggered }; })
        });
        props.push('/dashboard');
    }

    const frequencies: DropdownOption[] = props.frequencies.map(x => { return { key: x.id, text: x.description, value: x.id }; });
    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => { return { key: x.id, text: x.description, value: x.id } });

    return (
        <div className="add-income-generator">
            <Header>
                <h1>Add a source of income</h1>
            </Header>
            <Section>
                <h1>Details</h1>
                <CustomText label="Description" value={description} onChange={(value) => setDescription(value)} />
                <CustomDropdown label="Payment frequency" value={frequency} options={frequencies} onSelect={(value) => setFrequency(value)} />
                <CustomDatepicker label="Last executed" value={lastTriggered} onChange={(date) => handleDateChanged(date)} minDate={getMinDate()} maxDate={new Date()} />

            </Section>
            {!showRecurringTransactionFields &&
                <Section>
                    <h1>Associated recurring transactions</h1>
                    {recurringTransactions.length === 0 &&
                        <p>
                            This source of income has no transactions.
                        </p>
                    }
                    {recurringTransactions.length > 0 &&
                        recurringTransactions.map(x =>
                            <RecurringTransactionRequestSummary transaction={x} types={props.transactionTypes} onClick={(value) => onDeleteClick(value)} />
                        )}

                    <CustomButton onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>

                </Section>
            }
            {showRecurringTransactionFields &&
                <Section>
                    <h1>Recurring transaction details</h1>
                    <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={(value) => setTransactionType(value)} />
                    <AutocompleteField label="Category" value={category} options={props.categories} onChange={(value) => setCategory(value)} getOptions={(value) => props.getCategories(value)} clearOptions={() => props.clearCategories()} />
                    <CustomText label="Description" value={transactionDescription} onChange={(value) => setTransactionDescription(value)} />
                    <CustomText error={amountError()} label="Amount" value={amount} preToken="$" onChange={(value) => setAmount(value)} />

                    <CustomButton disabled={addDisabled()} onClick={() => onAddClick()}>Add</CustomButton>

                </Section>
            }
            <Section>
                <CustomButton disabled={addSourceOfIncomeDisabled()} onClick={() => onAddSourceOfIncomeClick()}>Add source of income</CustomButton>
            </Section>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AddIncomeGeneratorProps> => {
    return {
        categories: state.ledger.categories,
        frequencies: state.ledger.frequencies,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getCategories, clearCategories, getFrequencies, getTransactionTypes, addIncomeGenerator, push })(AddSourceOfIncome as any);