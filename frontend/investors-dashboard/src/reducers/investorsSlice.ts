import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Investors } from "../../interfaces/Investors";

interface ApiError {
    errorMessage: string,
    status: number,
}

interface InvestorsState {
    data: Investors | null,
    loading: boolean,
    error: ApiError | undefined,
}

const initialState: InvestorsState = {
    data: null,
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchInvestors.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchInvestors.fulfilled, (state, action: PayloadAction<Investors>) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchInvestors.rejected, (state , action: PayloadAction<ApiError | null>) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});

export const { setInvestors } = investorSlice.actions;

export const selectInvestor = (state: RootState, id: number) => state.investors.find(id);

export const selectInvestors = (state: RootState) => state.investors;

export default investorSlice.reducer;