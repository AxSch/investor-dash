import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInvestors, selectInvestors } from "../../reducers/investorsSlice";
import InvestorTable from "../../Components/InvestorTable/InvestorTable";
import { useErrorBoundary, withErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../Components/Error/ErrorFallback";
import {Investors} from "../../../interfaces/Investors";
import {ApiError} from "../../../interfaces/Errors";

const InvestorDashboard: React.FC<{}> = () => {
    const { showBoundary } = useErrorBoundary();
    const dispatch = useAppDispatch();
    const { loading, data: investors, error } = useAppSelector<{ loading: boolean, data: Investors, error: ApiError }>(selectInvestors);

    useEffect(() => {
        if (!investors || !investors.investors) {
            dispatch(fetchInvestors());
        }

        if (error) {
            showBoundary(error);
        }
    }, [dispatch, showBoundary, investors, error]);

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
