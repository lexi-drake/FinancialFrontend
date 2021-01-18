import Frequency from "../../../models/Frequency";
import { IncomeGenerator } from "../../../models/IncomeGenerator"
import CustomButton from "../../custom/CustomButton";
import Modal, { ModalContent, ModalHeader } from "../../custom/Modal"
import RecurringTransactionSummary from "../../transactions/RecurringTransactionSummary";
import NameValue from "../../custom/NameValue";
import Section from "../../custom/Section";
import { deleteIncomeGenerator, getIncomeGenerators } from "../../../store/ledger/actions";

interface IncomeGeneratorModalProps {
    id: string;
    generators: IncomeGenerator[];
    frequencies: Frequency[];
    getIncomeGenerators: typeof getIncomeGenerators;
    deleteIncomeGenerator: typeof deleteIncomeGenerator;
    close: () => void;
}

const IncomeGeneratorModal = (props: IncomeGeneratorModalProps) => {

    const getSelectedGenerator = (): IncomeGenerator | null => {
        const selected: IncomeGenerator[] = props.generators.filter(x => x.id === props.id);
        if (selected.length === 0) {
            props.close();
            return null;
        }
        return selected[0];
    }

    const generator: IncomeGenerator | null = getSelectedGenerator();

    const getFrequencyDescription = (): string => {
        const selected: Frequency[] = props.frequencies.filter(x => x.id === generator?.frequencyId);
        if (selected.length === 0) {
            props.close();
            return '';
        }
        return selected[0].description;
    }

    const onDeleteClick = async () => {
        await props.deleteIncomeGenerator(props.id);
        props.getIncomeGenerators();
        props.close();
    }

    return (
        <Modal show={!!props.id}>
            <ModalHeader>
                <h1>Source of income</h1>
            </ModalHeader>
            <ModalContent>
                <Section>
                    <NameValue name="Description" value={generator ? generator.description : ''} />
                    <NameValue name="Frequency" value={getFrequencyDescription()} />
                </Section>
                <Section>
                    <h1>Recurring transactions</h1>
                    {generator?.recurringTransactions.map(x =>
                        <RecurringTransactionSummary transaction={x} frequencies={props.frequencies} monthly={true} onClick={(value) => console.log(value)} />)

                    }
                </Section>
                <Section>
                    <CustomButton onClick={() => props.close()}>Close</CustomButton>
                    <CustomButton onClick={() => onDeleteClick()} error>Delete</CustomButton>
                </Section>
            </ModalContent>
        </Modal>
    );
}

export default IncomeGeneratorModal;