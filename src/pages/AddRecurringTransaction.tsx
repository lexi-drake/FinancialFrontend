import { connect } from "react-redux"
import Container from "../components/custom/Container"
import Header from "../components/custom/Header"
import Section from "../components/custom/Section"
import { AppDataState } from "../store/appdata"

interface AddRecurringTransactionProps {

}

const AddRecurringTransaction = (props: AddRecurringTransactionProps) => {

    return (
        <Container>
            <Header>
                <h1>Add a recurring transaction</h1>
            </Header>
            <Section>

            </Section>
        </Container>
    )
}

const mapStateToProps = (state: AppDataState): Partial<AddRecurringTransactionProps> => {
    return {};
}

export default connect(mapStateToProps, {})(AddRecurringTransaction as any);