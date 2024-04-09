import React from 'react';
import { Investor } from 'interfaces/Investors';
import { formatDate } from "../utils/formatDate";
import { formatAUM } from "../utils/formatAUM";

interface InvestorRowProps {
    investor: Investor;
    onRowClick: (investor: Investor) => void;
}



const InvestorRow: React.FC<InvestorRowProps> = ({ investor, onRowClick }) => {
    return (
        <tr onClick={() => onRowClick(investor)} className="cursor-pointer hover:bg-gray-100">
            <td className="px-6 py-4">{investor.firmName}</td>
            <td className="px-6 py-4">{formatAUM(investor.AUM)}</td>
            <td className="px-6 py-4">{investor.firmType}</td>
            <td className="px-6 py-4">{`${investor.city}, ${investor.postalCode}, ${investor.country},`}</td>
            <td className="px-6 py-4">{formatDate(investor.establishedAt)}</td>
            <td className="px-6 py-4">{formatDate(investor.dateAdded)}</td>
            <td className="px-6 py-4">{formatDate(investor.lastUpdated)}</td>
        </tr>
    );
};

export default InvestorRow;