import { push } from "connected-react-router";
import { useState } from "react";
import { connect } from "react-redux";
import AutocompleteField from "../components/custom/AutocompleteField";
import Container from "../components/custom/Container";
import Content from "../components/custom/Content";
import CustomButton from "../components/custom/CustomButton";
import CustomDatepicker from "../components/custom/CustomDatepicker";
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown";
import CustomText from "../components/custom/CustomText";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import TransactionType from "../models/TransactionType";
import { AppDataState } from "../store/appdata";
import { addLedgerEntry, getCategories, getTransactionTypes } from "../store/ledger/actions";
import { UsesTransactionTypes } from "../utilities/hooks";

interface AddLedgerEntryProps {
    categories: string[];
    transactionTypes: TransactionType[];
    getCategories: typeof getCategories;
    getTransactionTypes: typeof getTransactionTypes;
    addLedgerEntry: typeof addLedgerEntry;
    push: typeof push;
}

const AddLedgerEntry = (props: AddLedgerEntryProps) => {
    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());

    UsesTransactionTypes(props.transactionTypes, props.getTransactionTypes);

    const amountError = (): boolean => {
        return !!amount && isNaN(parseFloat(amount));
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
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date;
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
        props.push('/dashboard');
    }

    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => { return { key: x.id, text: x.description, value: x.id } });

    return (
        <Container>
            <Header>
                <h1>Add a transaction</h1>
            </Header>
            <Section>
                <Content>
                    <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={(value) => setTransactionType(value)} />
                    <AutocompleteField label="Category" value={category} options={props.categories} onChange={(value) => setCategory(value)} getOptions={(value) => props.getCategories(value)} />
                    <CustomText label="Description" value={description} onChange={(value) => setDescription(value)} />
                    <CustomText label="Amount" error={amountError()} preToken="$" value={amount} onChange={(value) => setAmount(value)} />
                    <CustomDatepicker label="Transaction date" value={date} onChange={(date) => handleDateChanged(date)} minDate={getMinDate()} maxDate={new Date()} />
                </Content>
                <Content>
                    <CustomButton onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
                </Content>
            </Section>
        </Container>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AddLedgerEntryProps> => {
    return {
        categories: state.ledger.categories,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getCategories, getTransactionTypes, addLedgerEntry, push })(AddLedgerEntry as any);