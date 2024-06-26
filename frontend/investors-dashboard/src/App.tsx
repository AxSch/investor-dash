import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import InvestorsDashBoard from "./Pages/InvestorsDashboard/InvestorsDashBoard";
import Header from "./Components/Header/Header";
import InvestorPage from "./Pages/InvestorPage/InvestorPage";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Header />}>
          <Route index element={<InvestorsDashBoard />} />
          <Route path="investor/:id" element={<InvestorPage />} />
        </Route>
    )
)

function App() {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
