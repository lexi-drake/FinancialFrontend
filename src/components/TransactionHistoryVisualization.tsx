import { connect } from "react-redux";
import { AppDataState } from "../store/appdata"

interface ITransactionHistoryVisualizationProps {

}

const TransactionHistoryVisualization = (props: ITransactionHistoryVisualizationProps) => {

    return (
        <div className="transaction-history-visualization">

        </div>
    );
}

const mapStateToProps = (state: AppDataState): Partial<ITransactionHistoryVisualizationProps> => {
    return {

    };
}

export default connect(mapStateToProps, {})(TransactionHistoryVisualization as any);