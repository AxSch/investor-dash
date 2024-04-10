import React from "react";
import { Investor, Investors } from "../../../interfaces/Investors";
import { formatAUM } from "../../utils/formatAUM";
import { formatDate } from "../../utils/formatDate";

interface InvestorCardProps {
    data: Investors;
    onCardClick: (investor: Investor) => void;
}

const InvestorCards: React.FC<InvestorCardProps> = ({ data, onCardClick }) => {
    return (
        <div className="grid grid-cols-1 gap-4 md:hidden m-6">
            {data.investors!.map((investor: Investor)=> (
                <div key={investor.firmId} onClick={() => onCardClick(investor)} className="bg-white p-8 rounded-lg drop-shadow-lg cursor-pointer hover:bg-gray-100">
                    <div className="grid grid-cols-2 content-between items-center">
                        <div className="text-gray-500 text-sm">#{investor.firmId}</div>
                        <div className="flex flex-row-reverse text-xs">
                            <span className="p-1.5 font-medium uppercase tracking-wider text-gray-600 bg-blue-300 rounded-md">{investor.firmType}</span>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold text-gray-700 flex items-center my-2 text-ellipsis overflow-hidden">
                            {investor.firmName}
                        </h3>
                        <div>
                            <span className="font-bold text-sm text-gray-600 mr-1">AUM</span>
                            <span className="text-xl font-extrabold text-gray-700">{formatAUM(investor.AUM)}</span>
                        </div>
                        <div className="text-md text-gray-700 mb-1">{`${investor.city}, ${investor.postalCode}, ${investor.country}`}</div>
                        <div className="text-sm text-gray-600">Established: {formatDate(investor.establishedAt)}</div>
                        <div className="text-sm text-gray-600">Date Added: {formatDate(investor.dateAdded)}</div>
                    </div>
                    <div className="text-gray-400 text-sm mt-3">Last updated on {formatDate(investor.lastUpdated)}</div>
                </div>
            ))}
        </div>
    );
};

export default InvestorCards;
