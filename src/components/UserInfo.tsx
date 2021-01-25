import { MINIMUM_PASSWORD_LENGTH } from "../utilities/constants";
import CustomText from "./custom/CustomText";

interface UserInfoProps {
    username: string;
    password: string;
    error?: boolean;
    handleUsernameChanged: (value: string) => void;
    handlePasswordChanged: (value: string) => void;
}

const UserInfo = (props: UserInfoProps) => {

    const usernameHasError = (): boolean => !!props.error && !props.username;
    const passwordHasError = (): boolean =>
        (props.error && !props.password)
        || (!!props.password && props.password.length < MINIMUM_PASSWORD_LENGTH);

    return (
        <div className="user-info">
            <CustomText error={usernameHasError()} value={props.username} label="Username" onChange={(value) => props.handleUsernameChanged(value)} />
            <CustomText error={passwordHasError()} value={props.password} label="Password" password onChange={(value) => props.handlePasswordChanged(value)} />
        </div>
    );
}
export default UserInfo;