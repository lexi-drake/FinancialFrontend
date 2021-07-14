import { useState } from "react";
import { connect } from "react-redux";
import { makeAdminRequest, submitFrequency } from "../../store/admin/actions";
import { AppDataState } from "../../store/appdata";
import CustomButton from "../custom/CustomButton";
import CustomDropdown, { DropdownOption } from "../custom/CustomDropdown";
import CustomText from "../custom/CustomText";
import Modal, { ModalContent, ModalHeader } from "../custom/Modal";
import Section from "../custom/Section";

interface AddTypeComponentProps {
    makeAdminRequest: typeof makeAdminRequest;
    submitFrequency: typeof submitFrequency;
}

const AddTypeComponent = (props: AddTypeComponentProps) => {
    const [show, setShow] = useState(false);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [timesPerYear, setTimesPerYear] = useState('');

    const options: DropdownOption[] = [
        { key: '1', text: 'User role', value: 'role' },
        { key: '3', text: 'Transaction type', value: 'transactiontype' },
        { key: '4', text: 'Frequency', value: 'frequency' }
    ];

    const showModalFor = (value: string) => {
        setShow(true);
        setType(value);
    }

    const onCloseClick = () => {
        setShow(false);
        setType('');
    }

    const onSubmitClick = () => {
        if (type === 'frequency') {
            props.submitFrequency({
                description,
                approxTimesPerYear: parseInt(timesPerYear)
            });
        } else {
            props.makeAdminRequest(type, description);
        }
        setType('');
        setDescription('');
        setTimesPerYear('');
    }

    const submitDisabled = (): boolean => !description || (type === 'frequency' && isNaN(parseInt(timesPerYear)));

    return (
        <div className="add-type">
            <Section>
                <h1>Add admin type</h1>

                <CustomDropdown value={type} label="Select" options={options} onSelect={value => showModalFor(value)} />

            </Section>
            <Modal show={show} close={onCloseClick}>
                <ModalHeader>
                    <h1>
                        {`Add ${options.find(x => x.value === type)?.text}`}
                    </h1>
                </ModalHeader>
                <ModalContent>
                    <CustomText value={description} label="Description" onChange={value => setDescription(value)} />
                    {type === 'frequency' &&
                        <CustomText value={timesPerYear} label="Approx. times per year" onChange={value => setTimesPerYear(value)} />
                    }
                    <CustomButton onClick={onSubmitClick} disabled={submitDisabled()}>Submit</CustomButton>
                </ModalContent>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AddTypeComponentProps> => ({});
export default connect(mapStateToProps, { makeAdminRequest, submitFrequency })(AddTypeComponent as any);