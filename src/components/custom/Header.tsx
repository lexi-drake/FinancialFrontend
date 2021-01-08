import { FunctionComponent } from "react";

interface HeaderProps {

}

const Header: FunctionComponent<HeaderProps> = (props) => {

    return (
        <div className="header">
            {props.children}
            <div className="accent" />
        </div>
    )
}

export default Header;