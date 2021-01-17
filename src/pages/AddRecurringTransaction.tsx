import { push } from "connected-react-router"
import { useState } from "react"
import { connect } from "react-redux"
import AutocompleteField from "../components/custom/AutocompleteField"
import Container from "../components/custom/Container"
import Content from "../components/custom/Content"
import CustomButton from "../components/custom/CustomButton"
import CustomDatepicker from "../components/custom/CustomDatepicker"
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown"
import CustomText from "../components/custom/CustomText"
import Header from "../components/custom/Header"
import Section from "../components/custom/Section"
import Frequency from "../models/Frequency"
import TransactionType from "../models/TransactionType"
import { AppDataState } from "../store/appdata"
import { addRecurringTransaction, getCategories, getTransactionTypes } from "../store/ledger/actions"
import { MAXIMUM_CATEGORY_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from "../utilities/constants"
import { getDateFromFrequency } from "../utilities/dates"
import { UsesTransactionTypes } from "../utilities/hooks"

interface AddRecurringTransactionProps {
    categories: string[];
    frequencies: Frequency[];
    transactionTypes: TransactionType[];
    getCategories: typeof getCategories;
    getTransactionTypes: typeof getTransactionTypes;
    addRecurringTransaction: typeof addRecurringTransaction;
    push: typeof push;
}

const AddRecurringTransaction = (props: AddRecurringTransactionProps) => {
    const [frequency, setFrequency] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [category, _setCategory] = useState('');
    const [description, _setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [lastTriggered, setLastTriggered] = useState(new Date());

    UsesTransactionTypes(props.transactionTypes, props.getTransactionTypes);

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

    const amountError = (): boolean => {
        return !!amount && isNaN(parseFloat(amount));
    }

    const handleDateChanged = (date: Date | [Date, Date] | null) => {
        if (date instanceof Date) {
            setLastTriggered(date);
        }
    }

    // Minimum date is dependent on the selected frequency.
    const getMinDate = (): Date => {
        return getDateFromFrequency(frequency, props.frequencies);
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
        props.push('/dashboard');
    }

    const frequencies: DropdownOption[] = props.frequencies.map(x => { return { key: x.id, text: x.description, value: x.id }; });
    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => { return { key: x.id, text: x.description, value: x.id } });

    return (
        <Container>
            <Header>
                <h1>Add a recurring transaction</h1>
            </Header>
            <Section>
                <Content>
                    <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={(value) => setTransactionType(value)} />
                    <AutocompleteField label="Category" value={category} options={props.categories} onChange={(value) => setCategory(value)} getOptions={(value) => props.getCategories(value)} />
                    <CustomText label="Description" value={description} onChange={(value) => setDescription(value)} />
                    <CustomText label="Amount" error={amountError()} preToken="$" value={amount} onChange={(value) => setAmount(value)} />
                    <CustomDropdown label="Payment frequency" value={frequency} options={frequencies} onSelect={(value) => setFrequency(value)} />
                    <CustomDatepicker label="Last executed" value={lastTriggered} onChange={(date) => handleDateChanged(date)} minDate={getMinDate()} maxDate={new Date()} />
                </Content>
                <Content>
                    <CustomButton onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
                </Content>
            </Section>
        </Container>
    )
}

const mapStateToProps = (state: AppDataState): Partial<AddRecurringTransactionProps> => {
    return {
        categories: state.ledger.categories,
        frequencies: state.ledger.frequencies,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getCategories, getTransactionTypes, addRecurringTransaction, push })(AddRecurringTransaction as any);