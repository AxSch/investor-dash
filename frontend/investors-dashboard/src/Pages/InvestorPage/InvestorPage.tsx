import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Commitments } from "../../../interfaces/Commitments";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllCommitments, selectCommitments } from "../../reducers/commitmentsSlice";
import ErrorFallback from "../../Components/Error/ErrorFallback";
import { withErrorBoundary, useErrorBoundary } from "react-error-boundary";

const InvestorPage: React.FC<{}> = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [_, setCommitments] = useState<Commitments>();
    const { showBoundary } = useErrorBoundary();
    const dispatch = useAppDispatch();
    const commitmentData = useAppSelector(selectCommitments);

    useEffect(() => {
        dispatch(fetchAllCommitments({ firmId: id }));
        setLoading(commitmentData.loading);
        setCommitments(commitmentData.data);

        if (commitmentData.error) {
            showBoundary(commitmentData.error);
        }
    }, [dispatch]);

    return (
        <div>
            <h1>Investor Details</h1>
            <p>Investor ID: {id}</p>
            {loading && <div>Loading...</div>}
        </div>
    )
}

const InvestorPageWithErrorBoundary = withErrorBoundary(InvestorPage, {
    FallbackComponent: ErrorFallback
})


export default InvestorPageWithErrorBoundary;
