import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Investor } from "interfaces/Investors";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { formatDate } from "../../utils/formatDate";
import { formatAUM } from "../../utils/formatAUM";

interface InvestorTableProps {
    investors: Investor[];
}

const InvestorTable: React.FC<InvestorTableProps> = ({ investors }) => {
    const navigate = useNavigate();
    const [colDefs, setColDefs] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const setTableData = () => {
            const columnHeadings = Object.keys(investors![0]).map(heading => {
                if(heading === 'dateAdded' || heading === 'establishedAt' || heading === 'lastUpdated') {
                    return {
                        field: heading,
                        valueFormatter: params => formatDate(params.value),
                    }
                }
                if(heading === 'AUM') {
                    return {
                        field: heading,
                        valueFormatter: params => formatAUM(params.value),
                    }
                }
                return {
                    field: heading,
                }
            });
            setRowData(investors!);
            setColDefs(columnHeadings);
        }
        setTableData();
    }, []);

    const handleClick = (investor: Investor) => {
        navigate(`/investor/${investor.firmId}`);
    };

    return (
        <div className="ag-theme-quartz-dark w-100" style={{ height: '15rem'}}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} ensureDomOrder={true} onRowClicked={(e) => handleClick(e.data)} />
        </div>
    );
};

export default InvestorTable;
