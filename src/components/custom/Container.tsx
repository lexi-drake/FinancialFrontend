import { FunctionComponent } from 'react';

interface ContainerProps {

}

const Container: FunctionComponent<ContainerProps> = (props) => {
    return (
        <div className='container'>
            {props.children}
        </div>
    )
}

export default Container;