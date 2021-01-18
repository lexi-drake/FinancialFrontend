import { FunctionComponent } from "react";

interface ModalProps {
    show: boolean;
}

const Modal: FunctionComponent<ModalProps> = (props) => {

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-body">
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