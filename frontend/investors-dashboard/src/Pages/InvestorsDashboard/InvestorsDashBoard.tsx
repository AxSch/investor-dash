import React, {useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInvestors, selectInvestors } from "../../reducers/investorsSlice";
import InvestorTable from "../../Components/InvestorTable/InvestorTable";
import { Investors } from "../../../interfaces/Investors";
import { useErrorBoundary, withErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../Components/Error/ErrorFallback";

const InvestorDashboard: React.FC<{}> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [investors, setInvestors] = useState<Investors>();
    const { showBoundary } = useErrorBoundary();
    const dispatch = useAppDispatch();
    const investorsData = useAppSelector(selectInvestors);

    useEffect(() => {
        dispatch(fetchInvestors());
        setLoading(investorsData.loading);
        setInvestors(investorsData.data);

        if (investorsData.error) {
            showBoundary(investorsData.error);
        }
    }, [dispatch]);
    return (
        <div className="container mx-auto">
            {loading && <div>Loading...</div>}
            {investors && <InvestorTable data={investors} />}
        </div>
    )
}

const InvestorDashboardWithErrorBoundary = withErrorBoundary(InvestorDashboard, {
    FallbackComponent: ErrorFallback
})


export default InvestorDashboardWithErrorBoundary;
