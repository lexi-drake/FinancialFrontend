import Frequency from "../../../models/Frequency";
import { RecurringTransaction } from "../../../models/RecurringTransaction";
import { deleteRecurringTransaction, getRecurringTransactions } from "../../../store/ledger/actions";
import CustomButton from "../../custom/CustomButton";
import Modal, { ModalContent, ModalHeader } from "../../custom/Modal";
import NameValue from "../../custom/NameValue";
import Section from "../../custom/Section";

interface RecurringTransactionModalProps {
    id: string;
    transactions: RecurringTransaction[];
    frequencies: Frequency[];
    getRecurringTransactions: typeof getRecurringTransactions;
    deleteRecurringTransaction: typeof deleteRecurringTransaction;
    close: () => void;
}

const RecurringTransactionModal = (props: RecurringTransactionModalProps) => {

    const getSelectedTransaction = (): RecurringTransaction | null => {
        const selected: RecurringTransaction[] = props.transactions.filter(x => x.id === props.id);
        if (selected.length === 0) {
            props.close();
            return null;
        }
        return selected[0];
    }

    const transaction: RecurringTransaction | null = getSelectedTransaction();

    const getFrequencyDescription = (): string => {
        const selected: Frequency[] = props.frequencies.filter(x => x.id === transaction?.frequencyId);
        if (selected.length === 0) {
            props.close();
            return '';
        }
        return selected[0].description;
    }

    const onDeleteClick = async () => {
        await props.deleteRecurringTransaction(props.id);
        props.getRecurringTransactions();
        props.close();
    }

    return (
        <Modal show={!!props.id}>
            <ModalHeader>
                <h1>Recurring transaction</h1>
            </ModalHeader>
            <ModalContent>
                <Section>
                    <NameValue name="Category" value={transaction ? transaction.category : ''} />
                    <NameValue name="Description" value={transaction ? transaction.description : ''} />
                    <NameValue name="Frequency" value={getFrequencyDescription()} />
                    <NameValue name="Amount" value={transaction ? transaction.amount.toFixed(2) : ''} />
                    <NameValue name="Type" value={transaction ? transaction.transactionType : ''} />
                </Section>
                <Section>
                    <CustomButton onClick={() => props.close()}>Close</CustomButton>
                    <CustomButton onClick={() => onDeleteClick()} error>Delete</CustomButton>
                </Section>
            </ModalContent>
        </Modal>
    );
}

export default RecurringTransactionModal;