import React, {useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInvestors, selectInvestors } from "../../reducers/investorsSlice";
import InvestorTable from "../../Components/InvestorTable/InvestorTable";
import { Investors } from "../../../interfaces/Investors";
import {ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../Components/Error/ErrorFallback";

const InvestorPage: React.FC<{}> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [investors, setInvestors] = useState<Investors>();
    const dispatch = useAppDispatch();
    const investorsData = useAppSelector(selectInvestors);

    useEffect(() => {
        dispatch(fetchInvestors());
        setLoading(investorsData.loading);
        setInvestors(investorsData.data)
    }, [dispatch]);
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <div className="container mx-auto">
                {loading && <div>Loading...</div>}
                {investors && <InvestorTable data={investors} />}
            </div>
        </ErrorBoundary>
    )
}

export default InvestorPage;
