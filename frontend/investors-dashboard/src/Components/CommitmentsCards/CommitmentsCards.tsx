import React from "react";
import { Commitment, Commitments } from "../../../interfaces/Commitments";
import {formatAssetClass} from "../../utils/formatAssetClass";
import {formatAssetAmount} from "../../utils/formatAssetAmounts";

interface CommitmentCardProps {
    data: Commitments;
}

const CommitmentCards: React.FC<CommitmentCardProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:hidden m-6">
            {data.commitments!.map((commitment: Commitment)=> (
                <div key={commitment.firmId} className="bg-white p-8 rounded-lg drop-shadow-lg cursor-pointer hover:bg-gray-100">
                    <div className="grid grid-cols-2 content-between items-center">
                        <div className="text-gray-500 text-sm">#{commitment.id}</div>
                        <div className="flex flex-row-reverse text-xs">
                            <span className="p-1.5 font-medium uppercase tracking-wider text-gray-600 bg-blue-300 rounded-md">{formatAssetClass(commitment.assetClass)}</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <span className="font-bold text-sm text-gray-600 mr-1 uppercase">Amount</span>
                        <h3 className="text-3xl font-bold text-gray-700 flex items-center my-2 text-ellipsis overflow-hidden">
                            {`${formatAssetAmount(commitment.amount)} ${commitment.currency}`}
                        </h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommitmentCards;
