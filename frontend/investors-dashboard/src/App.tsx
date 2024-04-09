import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchInvestors, selectInvestors } from "./reducers/investorsSlice";

function App() {
  const dispatch = useAppDispatch();
  const investors = useAppSelector(selectInvestors);
      useEffect(() => {
        if (investors === null) {
          dispatch(fetchInvestors());
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
