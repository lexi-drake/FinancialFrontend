import { Fragment, useState } from "react"
import { connect } from "react-redux";
import CustomButton from "../components/custom/CustomButton";
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown";
import CustomText from "../components/custom/CustomText";
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

    const onSubmitFrequencyClicked = () => {
        setFrequencyDescription('');
        setTimesPerYear('');
        props.submitFrequency({
            description: frequencyDescription,
            approxTimesPerYear: parseInt(timesPerYear)
        });
    }

    // TODO (alexa): I'm not sure what I want the admin dashboard to be for,
    // but this works as a temporary solution so that I can add some default
    // values to the database.
    return (
        <Fragment>
            <h1>Admin Dashboard</h1>
            <h2>General admin</h2>
            <CustomDropdown value={type} label="Type" onSelect={(value) => setType(value)} options={dropdownOptions()} />
            <CustomText value={description} label="Description" onChange={(value) => setDescription(value)} />
            <CustomButton onClick={() => onSubmit()}>Submit</CustomButton>
            <br />
            <h2>Frequency</h2>
            <CustomText value={frequencyDescription} label="Description" onChange={(value) => setFrequencyDescription(value)} />
            <CustomText value={timesPerYear} label="Approx. times per year" onChange={(value) => setTimesPerYear(value)} />
            <CustomButton disabled={submitFrequencyDisabled()} onClick={() => onSubmitFrequencyClicked()}>Submit Frequency</CustomButton>
        </Fragment>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AdminDashboardProps> => {
    return {};
}

export default connect(mapStateToProps, { makeAdminRequest, submitFrequency })(AdminDashboard as any);