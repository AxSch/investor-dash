import { ApiError } from "../../interfaces/Errors";
import { Commitments } from "../../interfaces/Commitments";

interface FetchAllCommitmentsParams {
    firmId: number;
}

interface FetchSelectedCommitmentParams extends FetchAllCommitmentsParams {
    assetClass: string;
}

export const fetchSelectedCommitments = async ({ assetClass, firmId } : FetchSelectedCommitmentParams) : Promise<Commitments | ApiError> => {
    try {
        const res = await fetch(`/api/commitment/${assetClass}/${firmId}`);
        if (res.status !== 200) {
            const errorData = await res.json();
            return errorData as ApiError;
        }
        const data = await res.json();
        return data as Commitments;
    } catch (error) {
        return error as ApiError;
    }
};

export const fetchAllCommitments = async ({ firmId } : FetchAllCommitmentsParams) : Promise<Commitments | ApiError> => {
    try {
        const res = await fetch(`/api/commitment/${firmId}`);
        if (res.status !== 200) {
            const errorData = await res.json();
            return errorData as ApiError;
        }
        const data = await res.json();
        return data as Commitments;
    } catch (error) {
        return error as ApiError;
    }
};
