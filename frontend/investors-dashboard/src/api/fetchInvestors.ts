import { ApiError } from "../../interfaces/Errors";
import { Investors } from "../../interfaces/Investors";

export const fetchInvestors = async () => {
    try {
        const res = await fetch('/api/investors');
        if (res.status !== 200) {
            const errorData = await res.json();
            return errorData as ApiError;
        }
        const data = await res.json();
        return data as Investors;
    } catch (error) {
        return error as ApiError;
    }
};
