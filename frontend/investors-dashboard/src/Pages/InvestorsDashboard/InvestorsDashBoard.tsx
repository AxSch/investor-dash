import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInvestors, selectInvestors } from "../../reducers/investorsSlice";
import InvestorTable from "../../Components/InvestorTable/InvestorTable";
import { Investors } from "../../../interfaces/Investors";

const InvestorPage: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const investorsData: Investors = useAppSelector(selectInvestors);
    useEffect(() => {
        if (investorsData.investors === null) {
            dispatch(fetchInvestors());
        }
    }, [dispatch])
    return (
        <div className="container mx-auto">
            {investorsData.investors !== null ? <InvestorTable data={investorsData} /> : <div>Loading...</div>}
        </div>
    )
}

export default InvestorPage;
