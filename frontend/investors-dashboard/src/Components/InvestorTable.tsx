import React from 'react';
import { Investor, Investors } from 'interfaces/Investors';
import InvestorRow from './InvestorRow';

interface InvestorTableProps {
    data: Investors;
}

const InvestorTable: React.FC<InvestorTableProps> = ({ data }) => {
    const handleRowClick = (investor: Investor) => {
        console.log('Clicked investor:', investor);
    };
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Firm Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AUM
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Firm Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Established
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Added
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.investors!.map((investor: Investor) => (
                    <InvestorRow key={investor.firmId} investor={investor} onRowClick={handleRowClick} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvestorTable;
