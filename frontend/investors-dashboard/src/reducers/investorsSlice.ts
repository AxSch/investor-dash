import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Investor, Investors } from "../../interfaces/Investors";
import { ApiError } from "../../interfaces/Errors";

interface InvestorsState {
    data: Investors | undefined,
    investor: Investor | null,
    loading: boolean,
    error: ApiError | undefined,
}

const initialState: InvestorsState = {
    data: undefined,
    investor: null,
    loading: false,
    error: undefined,
}

export const fetchInvestors = createAsyncThunk<Investors, void, { rejectValue: ApiError }>(
    'investors/fetchInvestors',
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/investors');
            if (res.status !== 200) {
                const errorData = await res.json();
                return rejectWithValue(errorData as ApiError);
            }
            const data = await res.json();
            return data as Investors;
        } catch (error) {
            return rejectWithValue(error as ApiError);
        }
    }
);

export const investorSlice = createSlice({
    name: 'investors',
    initialState,
    reducers: {
        setInvestor: (state, action: PayloadAction<Investor>) => {
            state.investor = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInvestors.pending, (state: InvestorsState) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchInvestors.fulfilled, (state: InvestorsState, action: PayloadAction<Investors>) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchInvestors.rejected, (state: InvestorsState , action: PayloadAction<ApiError>) => {
            state.loading = false;
            state.data = undefined;
            state.error = action.payload;
        });
    },
});

export const { setInvestor } = investorSlice.actions

export const selectInvestors = (state: RootState) => state.investors;

export default investorSlice.reducer;
