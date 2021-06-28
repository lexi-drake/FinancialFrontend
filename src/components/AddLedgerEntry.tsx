import { useState } from "react";
import { connect } from "react-redux";
import TransactionType from "../models/TransactionType";
import { AppDataState } from "../store/appdata";
import { addLedgerEntry, clearCategories, clearLedgerEntries, getCategories, getLedgerEntries } from "../store/ledger/actions";
import { MAXIMUM_CATEGORY_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from "../utilities/constants";
import { getLedgerEntriesByMonth } from "../utilities/ledger_entries";
import { checkValidAmount } from "../utilities/utilities";
import AutocompleteField from "./custom/AutocompleteField";
import CustomButton from "./custom/CustomButton";
import CustomDatepicker from "./custom/CustomDatepicker";
import CustomDropdown, { DropdownOption } from "./custom/CustomDropdown";
import CustomText from "./custom/CustomText";

interface AddLedgerEntryProps {
    month: number;
    categories: string[];
    transactionTypes: TransactionType[];
    getCategories: typeof getCategories;
    clearCategories: typeof clearCategories;
    addLedgerEntry: typeof addLedgerEntry;
    getLedgerEntries: typeof getLedgerEntries;
}

const AddLedgerEntry = (props: AddLedgerEntryProps) => {
    const [transactionType, setTransactionType] = useState('');
    const [category, _setCategory] = useState('');
    const [description, _setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());


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
            setDate(date);
        }
    }

    // Prevent users from entering a date too far in the past. This prevents 
    // needing to check for negative dates (.getTime() returns negative numbers
    // for dates prior to 1970, for example). This also just simplifies use-cases.
    const getMinDate = (): Date => {
        const date: Date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
    }

    const addTransactionDisabled = (): boolean => {
        const numberAmount: number = parseFloat(amount);
        return !transactionType
            || !category
            // description is optional.
            || isNaN(numberAmount) || numberAmount <= 0
            || !date;
    }

    const onAddTransactionClick = async () => {
        await props.addLedgerEntry({
            category: category,
            description: description,
            amount: parseFloat(amount),
            transactionTypeId: transactionType,
            recurringTransactionId: '',
            transactionDate: date
        });
        _setCategory('');
        _setDescription('');
        setAmount('');
        setDate(new Date());
        getLedgerEntriesByMonth(props.month, props.getLedgerEntries);
    }

    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => ({ key: x.id, text: x.description, value: x.id }));

    return (
        <div className="add-ledger-entry">
            <h1 className="title">Add a transaction</h1>
            <div className="transaction-type">
                <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={(value) => setTransactionType(value)} />
            </div>
            <div className="category">
                <AutocompleteField label="Category" value={category} options={props.categories} onChange={(value) => setCategory(value)} getOptions={(value) => props.getCategories(value)} clearOptions={() => props.clearCategories()} />
            </div>
            <div className="description">
                <CustomText label="Description" value={description} onChange={(value) => setDescription(value)} />
            </div>
            <div className="amount">
                <CustomText label="Amount" error={checkValidAmount(amount)} preToken="$" value={amount} onChange={(value) => setAmount(value)} />
            </div>
            <div className="date">
                <CustomDatepicker label="Transaction date" value={date} onChange={(date) => handleDateChanged(date)} minDate={getMinDate()} maxDate={new Date()} />
            </div>
            <div className="submit">
                <CustomButton disabled={addTransactionDisabled()} onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
            </div>
        </div>
    );
}



const mapStateToProps = (state: AppDataState): Partial<AddLedgerEntryProps> => {
    return {
        month: state.ledger.month,
        categories: state.ledger.categories,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getCategories, clearCategories, addLedgerEntry, getLedgerEntries })(AddLedgerEntry as any);