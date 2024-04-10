import React from 'react';
import { Investor, Investors } from 'interfaces/Investors';
import InvestorRow from './InvestorRow';
import { formatHeaders } from "../../utils/formatHeaders";
import { sortHeaders } from "../../utils/sortHeaders";
import InvestorCards from "../InvestorCards/InvestorCards";

interface InvestorTableProps {
    data: Investors;
}

const InvestorTable: React.FC<InvestorTableProps> = ({ data }) => {
    const handleClick = (investor: Investor) => {
        console.log('Clicked investor:', investor);
    };

    const numOfKeys = Object.keys(data.investors![0]).length;
    const headings = sortHeaders(Object.keys(data.investors![0]).slice(0, numOfKeys -4).map(formatHeaders) as string[]);
    return (
        <>
            <div className="overflow-x-auto mx-auto rounded-lg shadow m-8 max-w-fit">
                <table className="divide-y divide-gray-200 table-auto hidden md:block">
                    <thead className="bg-gray-200">
                    <tr>
                        {headings.map((heading: string) => (
                            <th key={heading} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {heading}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {data.investors!.map((investor: Investor) => (
                        <InvestorRow key={investor.firmId} investor={investor} onRowClick={handleClick} />
                    ))}
                    </tbody>
                </table>
            </div>
            <InvestorCards data={data} onCardClick={handleClick} />
        </>
    );
};

export default InvestorTable;
