import { FunctionComponent } from "react";

interface ContentProps {

}

const Content: FunctionComponent<ContentProps> = (props) => {

    return (
        <div className="content">
            {props.children}
        </div>
    )
}

export default Content;