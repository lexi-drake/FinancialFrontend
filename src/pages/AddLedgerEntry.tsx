import { push } from "connected-react-router";
import React, { useState } from "react";
import { connect } from "react-redux";
import AutocompleteField from "../components/custom/AutocompleteField";
import Container from "../components/custom/Container";
import Content from "../components/custom/Content";
import CustomButton from "../components/custom/CustomButton";
import CustomDatepicker from "../components/custom/CustomDatepicker";
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown";
import CustomLink from "../components/custom/CustomLink";
import CustomText from "../components/custom/CustomText";
import Header from "../components/custom/Header";
import Modal, { ModalContent, ModalHeader } from "../components/custom/Modal";
import Section from "../components/custom/Section";
import TransactionType from "../models/TransactionType";
import { AppDataState } from "../store/appdata";
import { addLedgerEntry, getCategories, getTransactionTypes } from "../store/ledger/actions";
import { MAXIMUM_CATEGORY_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from "../utilities/constants";
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
    const [category, _setCategory] = useState('');
    const [description, _setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const [showHelp, setShowHelp] = useState(false);

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
        props.push('/dashboard');
    }

    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => { return { key: x.id, text: x.description, value: x.id } });

    return (
        <Container>
            <Header>
                <h1>Add a transaction</h1>
                <CustomLink onClick={() => setShowHelp(true)}>What is this?</CustomLink>
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
                    <CustomButton disabled={addTransactionDisabled()} onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
                </Content>
            </Section>
            <Modal show={showHelp}>
                <ModalHeader>
                    <h1>Help</h1>
                </ModalHeader>
                <ModalContent>
                    <Section>
                        <h1>Overview</h1>
                        <p>
                            On this page, you can add a single, one-off transaction
                            to your account.
                        </p>
                    </Section>
                    <Section>
                        <h1>Details</h1>
                        <p>
                            <strong>Transaction type</strong> indicates whether
                            the transaction represents positive cash-flow
                            (<em>income</em>) or negative cash-flow (<em>expenditure</em>).
                        </p>
                        <p>
                            <strong>Category</strong> indicates what group this transaction
                            falls into when determining where money is coming-from or
                            going towards. <strong>Note: categories are shared across users,
                            so DO NOT include personal information in the category field.</strong>
                        </p>
                        <p>
                            <strong>Description</strong> can be anything that helps
                            you identify or remember this specific transaction. It
                            is not used for any sort of grouping, like category is.
                        </p>
                        <p>
                            <strong>Amount</strong> is the dollar amount of the
                            transaction. Values should always be positive (hehind
                            the scenes, <em>expenditures</em> are handled as
                            negative values.
                        </p>
                        <p>
                            <strong>Transaction date</strong> is the date on which
                            this transaction occured. Right now, you can't add
                            transactions that occured more than one month ago.
                        </p>
                    </Section>
                    <Section>
                        <CustomButton onClick={() => setShowHelp(false)}>Close</CustomButton>
                    </Section>
                </ModalContent>
            </Modal>
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