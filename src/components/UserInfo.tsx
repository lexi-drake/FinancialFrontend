import { Fragment } from "react"
import { MINIMUM_PASSWORD_LENGTH } from "../utilities/constants";
import CustomText from "./custom/CustomText";

interface UserInfoProps {
    username: string;
    password: string;
    handleUsernameChanged: (value: string) => void;
    handlePasswordChanged: (value: string) => void;
}

const UserInfo = (props: UserInfoProps) => {

    const passwordHasError = (): boolean => {
        return !!props.password
            && props.password.length < MINIMUM_PASSWORD_LENGTH;
    }

    return (
        <Fragment>
            <CustomText value={props.username} label="Username" onChange={(value) => props.handleUsernameChanged(value)} />
            <CustomText value={props.password} label="Password" password error={passwordHasError()} onChange={(value) => props.handlePasswordChanged(value)} />
        </Fragment>
    );
}
export default UserInfo;