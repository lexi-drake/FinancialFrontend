import { FunctionComponent } from "react";

interface ModalProps {
    show: boolean;
    close: () => void;
}

const Modal: FunctionComponent<ModalProps> = (props) => {

    const close = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        props.close();
    }

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal" onClick={(event) => close(event)}>
            <div className="modal-body" onClick={(event) => event.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
}

export default Modal;

interface ModalHeaderProps { }

export const ModalHeader: FunctionComponent<ModalHeaderProps> = (props) => {

    return (
        <div className="modal-header">
            {props.children}
        </div>
    );
}

interface ModalContentProps { }

export const ModalContent: FunctionComponent<ModalContentProps> = (props) => {

    return (
        <div className="modal-content">
            {props.children}
        </div>
    );
}