import { push } from "connected-react-router"
import { useState } from "react"
import { connect } from "react-redux"
import AutocompleteField from "../components/custom/AutocompleteField"
import Content from "../components/custom/Content"
import CustomButton from "../components/custom/CustomButton"
import CustomDatepicker from "../components/custom/CustomDatepicker"
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown"
import CustomLink from "../components/custom/CustomLink"
import CustomText from "../components/custom/CustomText"
import Header from "../components/custom/Header"
import Modal, { ModalContent, ModalHeader } from "../components/custom/Modal"
import Section from "../components/custom/Section"
import Frequency from "../models/Frequency"
import TransactionType from "../models/TransactionType"
import { AppDataState } from "../store/appdata"
import { addRecurringTransaction, clearCategories, getCategories, getTransactionTypes } from "../store/ledger/actions"
import { MAXIMUM_CATEGORY_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from "../utilities/constants"
import { getDateFromFrequency } from "../utilities/dates"
import { UsesTransactionTypes } from "../utilities/hooks"

interface AddRecurringTransactionProps {
    categories: string[];
    frequencies: Frequency[];
    transactionTypes: TransactionType[];
    getCategories: typeof getCategories;
    clearCategories: typeof clearCategories;
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
            setLastTriggered(date);
        }
    }

    // Minimum date is dependent on the selected frequency.
    const getMinDate = (): Date => {
        return getDateFromFrequency(frequency, props.frequencies);
    }

    const addTransactionDisabled = (): boolean => {
        const numberAmount: number = parseFloat(amount);
        return !transactionType
            || !category
            // Description is optional.
            || isNaN(numberAmount) || numberAmount <= 0
            || !frequency
            || !lastTriggered;
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
        <div className="add-recurring-transaction">
            <Header>
                <h1>Add a recurring transaction</h1>
                <CustomLink onClick={() => setShowHelp(true)}>What is this?</CustomLink>
            </Header>
            <Section>
                <Content>
                    <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={(value) => setTransactionType(value)} />
                    <AutocompleteField label="Category" value={category} options={props.categories} onChange={(value) => setCategory(value)} getOptions={(value) => props.getCategories(value)} clearOptions={() => props.clearCategories()} />
                    <CustomText label="Description" value={description} onChange={(value) => setDescription(value)} />
                    <CustomText label="Amount" error={amountError()} preToken="$" value={amount} onChange={(value) => setAmount(value)} />
                    <CustomDropdown label="Frequency" value={frequency} options={frequencies} onSelect={(value) => setFrequency(value)} />
                    <CustomDatepicker label="Last executed" value={lastTriggered} onChange={(date) => handleDateChanged(date)} minDate={getMinDate()} maxDate={new Date()} />
                </Content>
                <Content>
                    <CustomButton disabled={addTransactionDisabled()} onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
                </Content>
            </Section>
            <Modal show={showHelp} close={() => setShowHelp(false)}>
                <ModalHeader>
                    <h1>Help</h1>
                </ModalHeader>
                <ModalContent>
                    <Section>
                        <h1>Overview</h1>
                        <p>
                            On this page, you can add a recurring transaction that
                            is not attached to a source of income. Recurring
                            transactions are automatically triggered, so you don't
                            have to manually add these transactions to your account
                            over time.
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
                            <strong>Category</strong> indicates what group that transactions
                            generated by this recurring transaction will fall into.
                            <strong>Note: categories are shared across users,
                            so DO NOT include personal information in the category
                            field.</strong>
                        </p>
                        <p>
                            <strong>Description</strong> can be anything that helps
                            you identify or remember this recurring transaction. It
                            is not used for any sort of grouping, like category is.
                        </p>
                        <p>
                            <strong>Amount</strong> is the dollar amount of the
                            transaction. Values should always be positive (hehind
                            the scenes, <em>expenditures</em> are handled as
                            negative values.
                        </p>
                        <p>
                            <strong>Frequency</strong> indicates the regularity of
                            the recurring transaction. Many recurring transactions
                            occur <em>monthly</em>, like paying rent/mortgage and
                            most utility bills.
                        </p>
                        <p>
                            <strong>Last executed</strong> is the date on which
                            this transaction last occured. This is used, along
                            with <em>frequency</em> to determine when to trigger
                            this transaction in the future.
                        </p>
                    </Section>
                </ModalContent>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state: AppDataState): Partial<AddRecurringTransactionProps> => {
    return {
        categories: state.ledger.categories,
        frequencies: state.ledger.frequencies,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getCategories, clearCategories, getTransactionTypes, addRecurringTransaction, push })(AddRecurringTransaction as any);