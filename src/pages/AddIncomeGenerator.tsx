import { useEffect, useState } from "react"
import { connect } from "react-redux";
import Container from "../components/custom/Container";
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
}

const AddSourceOfIncome = (props: AddIncomeGeneratorProps) => {
    const [category, _setCategory] = useState('');
    const [frequency, setFrequency] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [description, setDescription] = useState('');
    const [transactionDescription, setTransactionDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [recurringTransactions, setRecurringTransactions] = useState([] as RecurringTransactionRequest[]);
    const [showRecurringTransactionFields, setShowRecurringTransactionFields] = useState(false);

    useEffect(() => {
        const getFrequencies = props.getFrequencies;
        if (props.frequencies.length === 0) {
            getFrequencies();
        }
    }, [props.frequencies, props.getFrequencies]);

    useEffect(() => {
        const getSalaryTypes = props.getSalaryTypes;
        if (props.salaryTypes.length === 0) {
            getSalaryTypes();
        }
    }, [props.salaryTypes, props.getSalaryTypes]);

    useEffect(() => {
        const getTransactionTypes = props.getTransactionTypes;
        if (props.transactionTypes.length === 0) {
            getTransactionTypes();
        }
    }, [props.transactionTypes, props.getTransactionTypes]);

    const getTransactionType = (id: string) => {
    }

    const setCategory = (value: string) => {
        _setCategory(value);
        // TODO (alexa): make a custom component for handling categories as a text-option with a dropdown.
        //props.getCategories(value);
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
        setFrequency('');
        setSalaryType('');
        setDescription('');
        setRecurringTransactions([]);
    }

    const salaryTypes: DropdownOption[] = props.salaryTypes.map(x => { return { key: x.id, text: x.description, value: x.id }; });
    const frequencies: DropdownOption[] = props.frequencies.map(x => { return { key: x.id, text: x.description, value: x.id }; });
    const categories: DropdownOption[] = props.categories.map(x => { return { key: x, text: x, value: x }; });
    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => { return { key: x.id, text: x.description, value: x.id } });

    return (
        <Container>
            <Header>
                <h1>Add a source of income</h1>
            </Header>
            <Section>
                <h1>Details</h1>
                <CustomText label="Description" value={description} onChange={(value) => setDescription(value)} />
                <CustomDropdown label="Salary type" value={salaryType} options={salaryTypes} onSelect={(value) => setSalaryType(value)} />
                <CustomDropdown label="Payment frequency" value={frequency} options={frequencies} onSelect={(value) => setFrequency(value)} />
            </Section>
            {!showRecurringTransactionFields &&
                <div>
                    <Section>
                        <h1>Associated recurring transactions</h1>
                        {recurringTransactions.map(x =>
                            <RecurringTransactionSummary transaction={x} types={props.transactionTypes} />
                        )}
                    </Section>
                    <CustomButton onClick={() => onAddTransactionClick()}>Add transaction</CustomButton>
                </div>
            }
            {showRecurringTransactionFields &&
                <Section>
                    <h1>Recurring transaction details</h1>
                    <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={(value) => setTransactionType(value)} />
                    <CustomText label="Category" value={category} onChange={(value) => setCategory(value)} />
                    <CustomText label="Description" value={transactionDescription} onChange={(value) => setTransactionDescription(value)} />
                    <CustomText error={amountError()} label="Amount" value={amount} preToken="$" onChange={(value) => setAmount(value)} />
                    <CustomButton disabled={addDisabled()} onClick={() => onAddClick()}>Add</CustomButton>
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

export default connect(mapStateToProps, { getCategories, getFrequencies, getSalaryTypes, getTransactionTypes, addIncomeGenerator })(AddSourceOfIncome as any);