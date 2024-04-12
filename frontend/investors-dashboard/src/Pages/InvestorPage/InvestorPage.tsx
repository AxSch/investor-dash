import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Commitments } from "../../../interfaces/Commitments";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllCommitments, fetchSelectedCommitments, selectCommitments } from "../../reducers/commitmentsSlice";
import ErrorFallback from "../../Components/Error/ErrorFallback";
import { withErrorBoundary, useErrorBoundary } from "react-error-boundary";
import CommitmentsTable from "../../Components/CommitmentsTable/CommitmentsTable";
import { ApiError } from "../../../interfaces/Errors";
import ReactPaginate from "react-paginate";

const InvestorPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { showBoundary } = useErrorBoundary();
    const dispatch = useAppDispatch();
    const { loading, data: commitments, error } =
        useAppSelector<{loading: boolean, data: Commitments, error: ApiError | Error | undefined}>(selectCommitments);
    const [assetClass, setAssetClass] = React.useState<string | undefined>(undefined);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const commitmentsPerPage = 10;
    const offset = currentPage * commitmentsPerPage;
    const currentCommitments = commitments.commitments.slice(offset, offset + commitmentsPerPage);
    const pageCount = Math.ceil(commitments.commitments.length / commitmentsPerPage);

    useEffect(() => {
        if (assetClass) {
            dispatch(fetchSelectedCommitments({ assetClass: assetClass, firmId: Number(id) }));
        } else {
            dispatch(fetchAllCommitments({ firmId: Number(id) }));
        }
    }, [dispatch, id, assetClass]);

    useEffect(() => {
        if (error) {
            showBoundary(error);
        }
    }, [error, showBoundary]);

    const handleAssetClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAssetClass(event.target.value);
        setCurrentPage(0);
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="container mx-auto mb-10">
            <div className="mt-8 mb-4 flex justify-center">
                <h1 className="text-3xl font-bold">Investor ID: {id}</h1>
            </div>
            {loading && <div className="flex justify-center">Loading...</div>}

            {commitments! && !!commitments.commitments && (
                <>
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

                    <CommitmentsTable data={{commitments: currentCommitments}} />

                    <div className="mt-4">
                        <ReactPaginate
                            previousLabel="Previous"
                            nextLabel="Next"
                            pageCount={pageCount}
                            onPageChange={handlePageChange}
                            containerClassName="flex justify-center"
                            previousLinkClassName="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                            nextLinkClassName="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                            disabledClassName="opacity-50 cursor-not-allowed"
                            activeClassName="bg-blue-500 text-white"
                            pageClassName="mx-1"
                            pageLinkClassName="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                        />
                    </div>
                </>
            )}
        </div>
    )
}

const InvestorPageWithErrorBoundary = withErrorBoundary(InvestorPage, {
    FallbackComponent: ErrorFallback
})


export default InvestorPageWithErrorBoundary;
