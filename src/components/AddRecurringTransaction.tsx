import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../models/Frequency";
import TransactionType from "../models/TransactionType";
import { AppDataState } from "../store/appdata";
import { addRecurringTransaction, clearCategories, getCategories, getRecurringTransactions } from "../store/ledger/actions";
import { MAXIMUM_CATEGORY_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from "../utilities/constants";
import { getDateFromFrequency } from "../utilities/dates";
import { checkValidAmount } from "../utilities/utilities";
import AutocompleteField from "./custom/AutocompleteField";
import CustomButton from "./custom/CustomButton";
import CustomDatepicker from "./custom/CustomDatepicker";
import CustomDropdown, { DropdownOption } from "./custom/CustomDropdown";
import CustomText from "./custom/CustomText";

interface AddRecurringTransactionProps {
    frequencies: Frequency[];
    transactionTypes: TransactionType[];
    categories: string[];
    getCategories: typeof getCategories;
    clearCategories: typeof clearCategories;
    addRecurringTransaction: typeof addRecurringTransaction;
}

const AddRecurringTransaction = (props: AddRecurringTransactionProps) => {
    const [transactionType, setTransactionType] = useState('');
    const [amount, setAmount] = useState('');
    const [category, _setCategory] = useState('');
    const [description, _setDescription] = useState('');
    const [lastTriggered, setLastTriggered] = useState(new Date());
    const [frequency, setFrequency] = useState('');

    // TODO (alexa): use MAX_LENGTH for error, not restriction
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

    const handleDateChanged = (date: Date | [Date, Date] | null) => {
        if (date instanceof Date) {
            setLastTriggered(date);
        }
    }

    const addTransactionDisabled = (): boolean => {
        const numberAmount: number = parseFloat(amount);
        return !transactionType
            || !category
            // description is optional.
            || isNaN(numberAmount) || numberAmount <= 0
            || !lastTriggered
            || !frequency;
    }

    const onAddTransactionClick = async () => {
        await props.addRecurringTransaction({
            category: category,
            description: description,
            amount: parseFloat(amount),
            frequencyId: frequency,
            transactionTypeId: transactionType,
            lastTriggered: lastTriggered
        });
        _setCategory('');
        _setDescription('');
        setAmount('');
        setLastTriggered(new Date());
        setFrequency('');
        getRecurringTransactions();
    }

    const frequencies: DropdownOption[] = props.frequencies.map(x => { return { key: x.id, text: x.description, value: x.id }; });
    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => { return { key: x.id, text: x.description, value: x.id } });

    return (
        <div className="add-recurring-transaction">
            <h1 className="title">Add an Expense</h1>
            <div className="transaction-type">
                <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={setTransactionType} />
            </div>
            <div className="amount">
                <CustomText label="Amount" error={checkValidAmount(amount)} preToken="$" value={amount} onChange={setAmount} />
            </div>
            <div className="category">
                <AutocompleteField label="Category" value={category} options={props.categories} onChange={setCategory} getOptions={(value) => props.getCategories(value)} clearOptions={() => props.clearCategories()} />
            </div>
            <div className="description">
                <CustomText label="Description" value={description} onChange={setDescription} />
            </div>
            <div className="date">
                <CustomDatepicker label="Transaction date" value={lastTriggered} onChange={handleDateChanged} minDate={getDateFromFrequency(frequency, props.frequencies)} maxDate={new Date()} />
            </div>
            <div className="frequency">
                <CustomDropdown label="Frequency" value={frequency} options={frequencies} onSelect={(value) => setFrequency(value)} />
            </div>
            <div className="submit">
                <CustomButton disabled={addTransactionDisabled()} onClick={onAddTransactionClick}>Add transaction</CustomButton>
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AddRecurringTransactionProps> => {
    return {
        frequencies: state.ledger.frequencies,
        transactionTypes: state.ledger.transactionTypes,
        categories: state.ledger.categories
    };
}

export default connect(mapStateToProps, { getCategories, clearCategories, addRecurringTransaction })(AddRecurringTransaction as any);