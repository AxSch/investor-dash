import React, {useEffect, useState} from 'react';
import { Commitment } from "../../../interfaces/Commitments";
import { AgGridReact } from "ag-grid-react";
import { formatAssetAmount } from "../../utils/formatAssetAmounts";
import { formatAssetClass } from "../../utils/formatAssetClass";

interface CommitmentsTableProps {
    commitments: Commitment[];
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({ commitments }) => {
    const [colDefs, setColDefs] = useState([]);
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const setTableData = () => {
            const columnHeadings = Object.keys(commitments[0]).map(heading => {
                if (heading === 'amount') {
                    return {
                        field: heading,
                        valueFormatter: params => formatAssetAmount(params.value)
                    }
                }

                if (heading === 'assetClass') {
                    return {
                        field: heading,
                        valueFormatter: params => formatAssetClass(params.value)
                    }
                }
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
        <div className="ag-theme-quartz-dark " style={{ height: '40rem'}}>
            <AgGridReact rowData={rowData} columnDefs={colDefs} ensureDomOrder={true} autoSizeStrategy={{type: 'fitGridWidth'}} />
        </div>
    );
};

export default CommitmentsTable;
