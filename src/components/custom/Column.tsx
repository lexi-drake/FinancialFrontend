import { FunctionComponent } from "react";

interface ColumnProps {

}

const Column: FunctionComponent<ColumnProps> = (props) => {

    return (
        <div className="column">
            {props.children}
        </div>
    );
}

export default Column;