import React from 'react';
import { Investor } from 'interfaces/Investors';
import { formatDate } from "../../utils/formatDate";
import { formatAUM } from "../../utils/formatAUM";

interface InvestorRowProps {
    investor: Investor;
    onRowClick: (investor: Investor) => void;
}



const InvestorRow: React.FC<InvestorRowProps> = ({ investor, onRowClick }) => {
    return (
        <tr onClick={() => onRowClick(investor)} className="cursor-pointer hover:bg-gray-100">
            <td className="px-6 py-4 whitespace-nowrap">{investor.firmId}</td>
            <td className="px-6 py-4 whitespace-nowrap">{investor.firmName}</td>
            <td className="px-6 py-4 whitespace-nowrap capitalize">{investor.firmType}</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatAUM(investor.AUM)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{`${investor.city}, ${investor.postalCode}, ${investor.country}`}</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatDate(investor.establishedAt)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatDate(investor.dateAdded)}</td>
            <td className="px-6 py-4 whitespace-nowrap">{formatDate(investor.lastUpdated)}</td>
        </tr>
    );
};

export default InvestorRow;