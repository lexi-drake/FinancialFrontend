import { push } from "connected-react-router";
import { useState } from "react"
import { connect } from "react-redux";
import AutocompleteField from "../components/custom/AutocompleteField";
import Container from "../components/custom/Container";
import Content from "../components/custom/Content";
import CustomButton from "../components/custom/CustomButton";
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown";
import CustomText from "../components/custom/CustomText";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import RecurringTransactionSummary from "../components/transactions/RecurringTransactionSummary";
import Frequency from "../models/Frequency";
import { RecurringTransactionRequest } from "../models/RecurringTransaction";
import SalaryType from "../models/SalaryType";
import TransactionType from "../models/TransactionType";
import { AppDataState } from "../store/appdata";
import { addIncomeGenerator, getCategories, getFrequencies, getSalaryTypes, getTransactionTypes } from "../store/ledger/actions";
import { MAXIMUM_CATEGORY_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from "../utilities/constants";
import { UsesFrequencies, UsesSalaryTypes, UsesTransactionTypes } from "../utilities/hooks";

interface AddIncomeGeneratorProps {
    categories: string[];
    frequencies: Frequency[];
    salaryTypes: SalaryType[];
    transactionTypes: TransactionType[];
    getCategories: typeof getCategories;
    getFrequencies: typeof getFrequencies;
    getSalaryTypes: typeof getSalaryTypes;
    getTransactionTypes: typeof getTransactionTypes;
    addIncomeGenerator: typeof addIncomeGenerator;
    push: typeof push;
}

const AddSourceOfIncome = (props: AddIncomeGeneratorProps) => {
    const [category, _setCategory] = useState('');
    const [frequency, setFrequency] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [description, _setDescription] = useState('');
    const [transactionDescription, setTransactionDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [recurringTransactions, setRecurringTransactions] = useState([] as RecurringTransactionRequest[]);
    const [showRecurringTransactionFields, setShowRecurringTransactionFields] = useState(false);

    UsesFrequencies(props.frequencies, props.getFrequencies);
    UsesSalaryTypes(props.salaryTypes, props.getSalaryTypes);
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

    const onAddTransactionClick = () => {
        setShowRecurringTransactionFields(true);
    }

    const amountError = (): boolean => {
        return !!amount && isNaN(parseFloat(amount));
    }

    const addDisabled = (): boolean => {
        return !category
            // description is optional
            || isNaN(parseFloat(amount))
            || !transactionType;
    }

    const onAddClick = () => {
        const transaction: RecurringTransactionRequest = {
            category: category,
            description: transactionDescription,
            amount: parseFloat(amount),
            frequencyId: '',    // This will be set when the entire request is generated.
            transactionTypeId: transactionType
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
            || !salaryType
            || !frequency
            || recurringTransactions.length === 0;
    }

    const onAddSourceOfIncomeClick = async () => {
        await props.addIncomeGenerator({
            description: description,
            salaryTypeId: salaryType,
            frequencyId: frequency,
            recurringTransactions: recurringTransactions.map(x => { return { ...x, frequencyId: frequency }; })
        });
        props.push('/dashboard');
    }

    const salaryTypes: DropdownOption[] = props.salaryTypes.map(x => { return { key: x.id, text: x.description, value: x.id }; });
    const frequencies: DropdownOption[] = props.frequencies.map(x => { return { key: x.id, text: x.description, value: x.id }; });
    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => { return { key: x.id, text: x.description, value: x.id } });

    return (
        <Container>
            <Header>
                <h1>Add a source of income</h1>
            </Header>
            <Section>
                <h1>Details</h1>
                <Content>
                    <CustomText label="Description" value={description} onChange={(value) => setDescription(value)} />
                    <CustomDropdown label="Salary type" value={salaryType} options={salaryTypes} onSelect={(value) => setSalaryType(value)} />
                    <CustomDropdown label="Payment frequency" value={frequency} options={frequencies} onSelect={(value) => setFrequency(value)} />
                </Content>
            </Section>
            {!showRecurringTransactionFields &&
                <Section>
                    <h1>Associated recurring transactions</h1>
                    <Content>
                        {recurringTransactions.length === 0 &&
                            <p>
                                This source of income has no transactions.
                                </p>
                        }
                        {recurringTransactions.length > 0 &&
                            recurringTransactions.map(x =>
                                <RecurringTransactionSummary transaction={x} types={props.transactionTypes} />
                            )}
                    </Content>
                    <Content>
                        <CustomButton onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
                    </Content>
                </Section>
            }
            {showRecurringTransactionFields &&
                <Section>
                    <h1>Recurring transaction details</h1>
                    <Content>
                        <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={(value) => setTransactionType(value)} />
                        <AutocompleteField label="Category" value={category} options={props.categories} onChange={(value) => setCategory(value)} getOptions={(value) => props.getCategories(value)} />
                        <CustomText label="Description" value={transactionDescription} onChange={(value) => setTransactionDescription(value)} />
                        <CustomText error={amountError()} label="Amount" value={amount} preToken="$" onChange={(value) => setAmount(value)} />
                    </Content>
                    <Content>
                        <CustomButton disabled={addDisabled()} onClick={() => onAddClick()}>Add</CustomButton>
                    </Content>
                </Section>
            }
            <Section>
                <CustomButton disabled={addSourceOfIncomeDisabled()} onClick={() => onAddSourceOfIncomeClick()}>Add source of income</CustomButton>
            </Section>
        </Container>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AddIncomeGeneratorProps> => {
    return {
        categories: state.ledger.categories,
        frequencies: state.ledger.frequencies,
        salaryTypes: state.ledger.salaryTypes,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getCategories, getFrequencies, getSalaryTypes, getTransactionTypes, addIncomeGenerator, push })(AddSourceOfIncome as any);