import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchInvestors, selectInvestors } from "./reducers/investorsSlice";
import InvestorTable from "./Components/InvestorTable";
import { Investors } from "../interfaces/Investors";

function App() {
  const dispatch = useAppDispatch();
  const investorsData: Investors = useAppSelector(selectInvestors);
      useEffect(() => {
        if (investorsData.investors === null) {
          dispatch(fetchInvestors());
        }
    }, [dispatch])

  return (
    <>
        {investorsData.investors !== null ? <InvestorTable data={investorsData} /> : <div>Loading...</div>}
    </>
  )
}

export default App
