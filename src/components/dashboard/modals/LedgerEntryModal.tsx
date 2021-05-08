import { LedgerEntry } from "../../../models/LedgerEntry";
import { deleteLedgerEntry, getLedgerEntries } from "../../../store/ledger/actions";
import { getReadableDate } from "../../../utilities/dates";
import CustomButton from "../../custom/CustomButton";
import Modal, { ModalContent, ModalHeader } from "../../custom/Modal"
import NameValue from "../../custom/NameValue";
import Section from "../../custom/Section"

interface LedgerEntryModalProps {
    id: string;
    entries: LedgerEntry[];
    getLedgerEntries: typeof getLedgerEntries;
    deleteLedgerEntry: typeof deleteLedgerEntry;
    close: () => void;
}

const LedgerEntryModal = (props: LedgerEntryModalProps) => {

    const getSelectedEntry = (): LedgerEntry | null => {
        const selected: LedgerEntry[] = props.entries.filter(x => x.id === props.id);
        if (selected.length === 0) {
            return null;
        }
        return selected[0];
    }

    const entry: LedgerEntry | null = getSelectedEntry();

    const onDeleteClick = () => {
        props.deleteLedgerEntry(props.id);
        props.close();
    }

    return (
        <Modal show={!!props.id} close={props.close}>
            <ModalHeader>
                <h1>Transaction</h1>
            </ModalHeader>
            <ModalContent>
                <Section>
                    <NameValue name="Category" value={entry ? entry.category : ''} />
                    <NameValue name="Description" value={entry ? entry.description : ''} />
                    <NameValue name="Amount" value={entry ? entry.amount.toFixed(2) : ''} />
                    <NameValue name="Type" value={entry ? entry.transactionType : ''} />
                    <NameValue name="Transaction Date" value={entry ? getReadableDate(entry.transactionDate) : ''} />
                </Section>
                <Section>
                    <CustomButton onClick={() => onDeleteClick()} error>Delete</CustomButton>
                </Section>
            </ModalContent>
        </Modal>
    );
}

export default LedgerEntryModal;