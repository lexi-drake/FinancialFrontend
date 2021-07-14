import { useState } from "react";
import { connect } from "react-redux";
import Frequency from "../../models/Frequency";
import { RecurringTransactionRequest } from "../../models/RecurringTransaction";
import TransactionType from "../../models/TransactionType";
import { AppDataState } from "../../store/appdata";
import { addIncomeGenerator, clearCategories, getCategories } from "../../store/ledger/actions";
import { MAXIMUM_CATEGORY_LENGTH, MAXIMUM_DESCRIPTION_LENGTH } from "../../utilities/constants";
import { getDateFromFrequency } from "../../utilities/dates";
import { checkValidAmount, formatCategoryAndDescription, numberToDollarString } from "../../utilities/utilities";
import AutocompleteField from "../custom/AutocompleteField";
import CustomButton from "../custom/CustomButton";
import CustomDatepicker from "../custom/CustomDatepicker";
import CustomDropdown, { DropdownOption } from "../custom/CustomDropdown";
import CustomText from "../custom/CustomText";
import Modal, { ModalContent, ModalHeader } from "../custom/Modal";

interface AddIncomeGeneratorProps {
    categories: string[];
    frequencies: Frequency[];
    transactionTypes: TransactionType[];
    getCategories: typeof getCategories;
    clearCategories: typeof clearCategories;
    addInomeGenerator: typeof addIncomeGenerator;
}

const AddIncomeGenerator = (props: AddIncomeGeneratorProps) => {
    const [description, _setDescription] = useState('');
    const [lastTriggered, setLastTriggered] = useState(new Date());
    const [frequency, setFrequency] = useState('');
    const [transactions, setTransactions] = useState([] as RecurringTransactionRequest[]);
    const [showModal, setShowModal] = useState(false);

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

    const submitDisabled = !description
        || !frequency
        || transactions.length === 0;

    const onSubmitClick = async () => {
        await props.addInomeGenerator({
            description,
            frequencyId: frequency,
            recurringTransactions: transactions.map(x => ({
                ...x,
                frequencyId: frequency,
                lastTriggered
            }))
        });
    }

    const calculateAmountClasses = (amount: number): string => {
        const classes: string[] = ['summary-amount'];
        if (amount <= 0) { classes.push('negative'); }
        return classes.join(' ');
    }

    const calculateAmount = (request: RecurringTransactionRequest): number => {
        const transactionType: TransactionType | undefined = props.transactionTypes.find(x => x.id === request.transactionTypeId);
        if (!transactionType) {
            return 0;
        }
        return transactionType.description === 'Income' ? request.amount : -request.amount
    }

    const frequencies: DropdownOption[] = props.frequencies.map(x => { return { key: x.id, text: x.description, value: x.id }; });

    return (
        <div className="add-income-generator">
            <h1 className="title">Add income</h1>
            <div className="description">
                <CustomText label="Description" value={description} onChange={setDescription} />
            </div>
            <div className="date">
                <CustomDatepicker label="Transaction date" value={lastTriggered} onChange={(date) => handleDateChanged(date)} minDate={getDateFromFrequency(frequency, props.frequencies)} maxDate={new Date()} />
            </div>
            <div className="frequency">
                <CustomDropdown label="Frequency" value={frequency} options={frequencies} onSelect={(value) => setFrequency(value)} />
            </div>
            <div className="add-transaction">
                <CustomButton onClick={() => setShowModal(true)}>Add transaction</CustomButton>
            </div>
            <div className="submit">
                <CustomButton disabled={submitDisabled} onClick={onSubmitClick}>Add income</CustomButton>
            </div>
            <div className="list">
                {transactions.map(x => {
                    const amount: number = calculateAmount(x);

                    return (
                        <div className="transaction">
                            <div className={calculateAmountClasses(amount)}>${numberToDollarString(amount)}</div>
                            <div className="summary-description">{formatCategoryAndDescription(x.category, x.description)}</div>
                        </div>
                    );
                })}
            </div>
            <AddTransaction
                show={showModal}
                categories={props.categories}
                transactionTypes={props.transactionTypes}
                frequencies={props.frequencies}
                close={() => setShowModal(false)}
                submit={(request: RecurringTransactionRequest) => setTransactions([...transactions, request])}
                getCategories={props.getCategories}
                clearCategories={props.clearCategories}
            />
        </div>
    );
}

interface AddTransactionProps {
    show: boolean;
    categories: string[];
    transactionTypes: TransactionType[];
    frequencies: Frequency[];
    close: () => void;
    submit: (request: RecurringTransactionRequest) => void;
    getCategories: typeof getCategories;
    clearCategories: typeof clearCategories;
}

const AddTransaction = (props: AddTransactionProps) => {
    const [amount, setAmount] = useState('');
    const [category, _setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState('');

    const setCategory = (value: string) => {
        if (value.length <= MAXIMUM_CATEGORY_LENGTH) {
            _setCategory(value);
        }
    }

    const submitDisabled = (): boolean => {
        const numericAmount: number = parseFloat(amount);

        return !amount || isNaN(numericAmount)
            || !category
            || !description
            || !transactionType;
    }

    const onSubmitClick = () => {
        props.submit({
            category,
            description,
            amount: parseFloat(amount),
            transactionTypeId: transactionType,
            // These will get set later, when the income generator is submitted.
            lastTriggered: new Date(),
            frequencyId: '',
        });
        props.close();
    }

    const transactionTypes: DropdownOption[] = props.transactionTypes.map(x => { return { key: x.id, text: x.description, value: x.id } });

    return (
        <Modal show={props.show} close={props.close}>
            <ModalHeader>
                <h1>Add Transaction</h1>
            </ModalHeader>
            <ModalContent>
                <div className="add-transaction-to-income-generator">
                    <div className="transaction-type">
                        <CustomDropdown label="Transaction type" value={transactionType} options={transactionTypes} onSelect={setTransactionType} />
                    </div>
                    <div className="transaction-amount">
                        <CustomText label="Amount" error={checkValidAmount(amount)} preToken="$" value={amount} onChange={setAmount} />
                    </div>
                    <div className="transaction-category">
                        <AutocompleteField label="Category" value={category} options={props.categories} onChange={setCategory} getOptions={(value) => props.getCategories(value)} clearOptions={() => props.clearCategories()} />
                    </div>
                    <div className="transaction-description">
                        <CustomText label="Description" value={description} onChange={setDescription} />
                    </div>
                    <div className="transaction-submit">
                        <CustomButton disabled={submitDisabled()} onClick={onSubmitClick}>Add transaction</CustomButton>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AddIncomeGeneratorProps> => {
    return {
        categories: state.ledger.categories,
        frequencies: state.ledger.frequencies,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getCategories, clearCategories })(AddIncomeGenerator as any)