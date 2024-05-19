import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Investor } from "interfaces/Investors";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface InvestorTableProps {
    data: Investor[];
}

const InvestorTable: React.FC<InvestorTableProps> = ({ data }) => {
    const navigate = useNavigate();
    const [colDefs, setColDefs] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const setTableData = () => {
            const columnHeadings = Object.keys(data![0]).map(heading => {
                return {
                    field: heading,
                    filter: true,
                }
            });
            setRowData(data!);
            setColDefs(columnHeadings);
        }
        setTableData();
    }, []);

    const handleClick = (investor: Investor) => {
        navigate(`/investor/${investor.firmId}`);
    };

    return (
        <>
            <div className="ag-theme-quartz-dark w-100" style={{ height: '15rem'}}>
                <AgGridReact rowData={rowData} columnDefs={colDefs} ensureDomOrder={true} onRowClicked={(e) => handleClick(e.data)} />
            </div>
        </>
    );
};

export default InvestorTable;
