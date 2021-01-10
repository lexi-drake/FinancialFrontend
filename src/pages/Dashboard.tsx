import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Container from "../components/custom/Container";
import Header from "../components/custom/Header";
import Section from "../components/custom/Section";
import IncomeGeneratorComponent from "../components/transactions/IncomeGeneratorComponent";
import LedgerHistoryComponent from "../components/transactions/LedgerHistoryComponent";
import TransactionType from "../models/TransactionType";
import { AppDataState } from "../store/appdata";
import { getTransactionTypes } from "../store/ledger/actions";

interface DashboardProps {
    username: string;
    transactionTypes: TransactionType[];
    getTransactionTypes: typeof getTransactionTypes;
}

const Dashboard = (props: DashboardProps) => {

    // At least two components on this page require transaction types, so putting
    // this here potentially saves a call to the backend.
    useEffect(() => {
        const getTransactionTypes = props.getTransactionTypes;
        if (props.transactionTypes.length === 0) {
            getTransactionTypes();
        }
    }, [props.transactionTypes, props.getTransactionTypes]);

    const headline: string = `Welcome, ${props.username}`

    return (
        <Fragment>
            <Container>
                <Header>
                    <h1>Dashboard</h1>
                    <p>{headline}</p>
                </Header>
                <Section>
                    <IncomeGeneratorComponent />
                </Section>
            </Container >
            <Container>
                <Section>
                    <LedgerHistoryComponent />
                </Section>
            </Container>
        </Fragment>
    );
}

const mapStateToProps = (state: AppDataState): Partial<DashboardProps> => {
    return {
        username: state.user.username,
        transactionTypes: state.ledger.transactionTypes
    };
}

export default connect(mapStateToProps, { getTransactionTypes })(Dashboard as any);