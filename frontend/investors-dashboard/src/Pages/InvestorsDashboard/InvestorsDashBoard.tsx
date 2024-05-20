import React, { useEffect } from "react"
import InvestorTable from "../../Components/InvestorTable/InvestorTable";
import { useErrorBoundary, withErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../Components/Error/ErrorFallback";
import { useQuery } from "@tanstack/react-query";
import { fetchInvestors } from "../../api/fetchInvestors";

const InvestorsDashboard: React.FC = () => {
    const { showBoundary } = useErrorBoundary();

    const { isLoading, error, data: investors } = useQuery({
        queryKey: ['investors'],
        queryFn: fetchInvestors,
        select: (data) => data.investors,
    });

    useEffect(() => {
        if (error) {
            showBoundary(error);
        }
    }, [error, showBoundary]);

    return (
        <div className="container mx-auto">
            <div className="my-8 flex justify-center">
                <h1 className="text-3xl font-bold" data-testid="investors-heading">Investors</h1>
            </div>
            {isLoading && <div className="flex justify-center" data-testid="investors-loading">Loading...</div>}
            {investors && <InvestorTable investors={investors} />}
        </div>
    )
}

const InvestorsDashboardWithErrorBoundary = withErrorBoundary(InvestorsDashboard, {
    FallbackComponent: ErrorFallback
})


export default InvestorsDashboardWithErrorBoundary;
