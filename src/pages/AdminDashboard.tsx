import { Fragment, useState } from "react"
import { connect } from "react-redux";
import CustomButton from "../components/custom/CustomButton";
import CustomDropdown, { DropdownOption } from "../components/custom/CustomDropdown";
import CustomText from "../components/custom/CustomText";
import { makeAdminRequest } from "../store/admin/actions";
import { AppDataState } from "../store/appdata";

interface AdminDashboardProps {
    makeAdminRequest: typeof makeAdminRequest;
}

const AdminDashboard = (props: AdminDashboardProps) => {
    const [type, setType] = useState('role');
    const [description, setDescription] = useState('');

    const dropdownOptions = (): DropdownOption[] => {
        const options: DropdownOption[] = [
            { key: '0', text: 'User role', value: 'role' },
            { key: '1', text: 'Frequency', value: 'frequency' },
            { key: '2', text: 'Salary type', value: 'salarytype' },
            { key: '3', text: 'Transaction type', value: 'transactiontype' },
        ];
        return options;
    }

    const selectedText = (): string => {
        return dropdownOptions().filter(x => x.value === type)[0].text;
    }

    const onSubmit = () => {
        setDescription('');
        props.makeAdminRequest(type, description);
    }

    // TODO (alexa): I'm not sure what I want the admin dashboard to be for,
    // but this works as a temporary solution so that I can add some default
    // values to the database.
    return (
        <Fragment>
            <h1>Admin Dashboard</h1>
            <CustomDropdown value={selectedText()} label="Type" onSelect={(value) => setType(value)} options={dropdownOptions()} />
            <CustomText value={description} label="Description" onChange={(value) => setDescription(value)} />
            <CustomButton onClick={() => onSubmit()}>Submit</CustomButton>
        </Fragment>
    );
}

const mapStateToProps = (state: AppDataState): Partial<AdminDashboardProps> => {
    return {};
}

export default connect(mapStateToProps, { makeAdminRequest })(AdminDashboard as any);