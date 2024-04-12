import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInvestors, selectInvestors } from "../../reducers/investorsSlice";
import InvestorTable from "../../Components/InvestorTable/InvestorTable";
import { useErrorBoundary, withErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../Components/Error/ErrorFallback";
import { Investors } from "../../../interfaces/Investors";
import { ApiError } from "../../../interfaces/Errors";

const InvestorDashboard: React.FC = () => {
    const { showBoundary } = useErrorBoundary();
    const dispatch = useAppDispatch();
    const { loading, data: investors, error } =
        useAppSelector<{ loading: boolean, data: Investors, error: ApiError | Error | undefined }>(selectInvestors);

    useEffect(() => {
        if (!investors || !investors.investors) {
            dispatch(fetchInvestors());
        }
    }, [dispatch, investors]);

    useEffect(() => {
        if (error) {
            showBoundary(error);
        }
    }, [error, showBoundary]);

    return (
        <div className="container mx-auto">
            <div className="my-8 flex justify-center">
                <h1 className="text-3xl font-bold">Investors</h1>
            </div>
            {loading && <div className="flex justify-center">Loading...</div>}
            {investors! && !!investors.investors && <InvestorTable data={investors} />}
        </div>
    )
}

const InvestorDashboardWithErrorBoundary = withErrorBoundary(InvestorDashboard, {
    FallbackComponent: ErrorFallback
})


export default InvestorDashboardWithErrorBoundary;
