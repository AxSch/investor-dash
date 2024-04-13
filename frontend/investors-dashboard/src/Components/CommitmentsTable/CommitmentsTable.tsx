import React from 'react';
import { Commitment, Commitments } from "../../../interfaces/Commitments";
import { formatAssetClass } from "../../utils/formatAssetClass";
import { formatAssetAmount } from "../../utils/formatAssetAmounts";
import CommitmentCards from "../CommitmentsCards/CommitmentsCards";

interface CommitmentsTableProps {
    data: Commitments;
}

const CommitmentsTable: React.FC<CommitmentsTableProps> = ({ data }) => {
    const headings = Object.keys(data.commitments![0]).filter((heading: string) => heading !== 'firmId');

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
                    {data.commitments!.map((commitment: Commitment) => (
                        <tr key={commitment.id} className="hover:bg-gray-100">
                            <td className="px-6 py-4 whitespace-nowrap">{commitment.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatAssetClass(commitment.assetClass)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{commitment.currency}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatAssetAmount(commitment.amount)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <CommitmentCards data={data} />
        </>
    );
};

export default CommitmentsTable;
