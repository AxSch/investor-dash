import React, {useEffect, useState} from 'react';
import { Commitment } from "../../../interfaces/Commitments";
import {AgGridReact} from "ag-grid-react";

interface CommitmentsTableProps {
    commitments: Commitment[];
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({ commitments }) => {
    const [colDefs, setColDefs] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const setTableData = () => {
            const columnHeadings = Object.keys(commitments[0]).map(heading => {
                return {
                    field: heading,
                }
            });
            setRowData(commitments);
            setColDefs(columnHeadings);
        }
        setTableData();
    }, [commitments]);
    return (
        <div className="ag-theme-quartz-dark w-100" style={{ height: '40rem'}}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} ensureDomOrder={true} />
        </div>
    );
};

export default CommitmentsTable;
