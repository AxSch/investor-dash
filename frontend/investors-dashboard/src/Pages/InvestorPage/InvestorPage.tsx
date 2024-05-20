import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorFallback from "../../Components/Error/ErrorFallback";
import { withErrorBoundary, useErrorBoundary } from "react-error-boundary";
import CommitmentsTable from "../../Components/CommitmentsTable/CommitmentsTable";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCommitments, fetchSelectedCommitments } from "../../api/fetchCommitments";

const InvestorPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { showBoundary } = useErrorBoundary();
    const [assetClass, setAssetClass] = useState<string | undefined>(undefined);

    const { error, data: commitments } = useQuery({
        queryKey: ['commitments', id, assetClass],
        queryFn: () => assetClass ? fetchSelectedCommitments({ assetClass, firmId: Number(id) }) :
            fetchAllCommitments({ firmId: Number(id) }),
        enabled: !!id,
        select: (data) => data.commitments,
    });

    useEffect(() => {
        if (error) {
            showBoundary(error);
        }
    }, [error, showBoundary]);

    const handleAssetClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAssetClass(event.target.value);
    };
    return (
        <div className="container mx-auto mb-10">
            <div className="mt-8 mb-4 flex justify-center">
                <h1 className="text-3xl font-bold">Investor ID: {id}</h1>
            </div>
                <div className="mb-4 flex flex-col items-center">
                    <label htmlFor="assetClass" className="block text-sm font-medium text-gray-700">
                        Filter by Asset Class:
                    </label>
                    <select
                        id="assetClass"
                        name="assetClass"
                        value={assetClass}
                        onChange={handleAssetClassChange}
                        className="
                            mt-1 block w-auto py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm
                            focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="">All</option>
                        <option value="pe">Private Equity</option>
                        <option value="pd">Private Debt</option>
                        <option value="re">Real Estate</option>
                        <option value="inf">Infrastructure</option>
                        <option value="nr">Natural Resources</option>
                        <option value="hf">Hedge Funds</option>
                    </select>
                </div>
                {commitments && (<CommitmentsTable commitments={commitments} />)}
        </div>
    )
}

const InvestorPageWithErrorBoundary = withErrorBoundary(InvestorPage, {
    FallbackComponent: ErrorFallback
})


export default InvestorPageWithErrorBoundary;
