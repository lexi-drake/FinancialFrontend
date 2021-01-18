import { useState } from "react"
import { connect } from "react-redux";
import Container from "../components/custom/Container";
import Content from "../components/custom/Content";
import CustomButton from "../components/custom/CustomButton";
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown";
import CustomText from "../components/custom/CustomText";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import { makeAdminRequest, submitFrequency } from "../store/admin/actions";
import { AppDataState } from "../store/appdata";

interface AdminDashboardProps {
    makeAdminRequest: typeof makeAdminRequest;
    submitFrequency: typeof submitFrequency;
}

const AdminDashboard = (props: AdminDashboardProps) => {
    const [type, setType] = useState('role');
    const [description, setDescription] = useState('');
    const [frequencyDescription, setFrequencyDescription] = useState('');
    const [timesPerYear, setTimesPerYear] = useState('');

    const dropdownOptions = (): DropdownOption[] => {
        const options: DropdownOption[] = [
            { key: '0', text: 'User role', value: 'role' },
            { key: '2', text: 'Salary type', value: 'salarytype' },
            { key: '3', text: 'Transaction type', value: 'transactiontype' },
        ];
        return options;
    }

    const onSubmit = () => {
        setDescription('');
        props.makeAdminRequest(type, description);
    }

    const submitFrequencyDisabled = (): boolean => {
        return !frequencyDescription
            || isNaN(parseInt(timesPerYear));
    }

    const onSubmitFrequencyClick = () => {
        setFrequencyDescription('');
        setTimesPerYear('');
        props.submitFrequency({
            description: frequencyDescription,
            approxTimesPerYear: parseInt(timesPerYear)
        });
    }

    // TODO (alexa): hide this stuff in a modal or something
    // and repurpose the admin-dashboard for message-handling.
    return (
        <Container>
            <Header>
                <h1>Administration</h1>
            </Header>
            <Section>
                <h1>General admin</h1>
                <Content>
                    <CustomDropdown value={type} label="Type" onSelect={(value) => setType(value)} options={dropdownOptions()} />
                    <CustomText value={description} label="Description" onChange={(value) => setDescription(value)} />
                </Content>
                <CustomButton onClick={() => onSubmit()}>Submit</CustomButton>
            </Section>
            <Section>
                <h1>Frequency</h1>
                <Content>
                    <CustomText value={frequencyDescription} label="Description" onChange={(value) => setFrequencyDescription(value)} />
                    <CustomText value={timesPerYear} label="Approx. times per year" onChange={(value) => setTimesPerYear(value)} />
                </Content>
                <CustomButton disabled={submitFrequencyDisabled()} onClick={() => onSubmitFrequencyClick()}>Submit Frequency</CustomButton>
            </Section>
        </Container>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AdminDashboardProps> => {
    return {};
}

export default connect(mapStateToProps, { makeAdminRequest, submitFrequency })(AdminDashboard as any);