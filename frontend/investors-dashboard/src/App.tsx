import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "./store/hooks";
import {selectInvestors, setInvestors} from "./reducers/investorsSlice";
import { Investors } from "../interfaces/Investors";

function App() {
  const dispatch = useAppDispatch();
  const investors = useAppSelector(selectInvestors)
      useEffect(() => {
        const fetchInvestorServices = async () => {
            const response = await fetch('/api/investors');
            const data = await response.json() as Investors;
            dispatch(setInvestors(data.investors));
        }
        if (investors === null) {
            fetchInvestorServices();
        }
    }, [dispatch])

  return (
    <>
        {investors ? <div>
            Render investor table
        </div> : <div>Loading...</div>}
    </>
  )
}

export default App
