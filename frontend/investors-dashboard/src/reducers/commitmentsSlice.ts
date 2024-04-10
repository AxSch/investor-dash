import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Commitment, Commitments } from "../../interfaces/Commitments";
import { ApiError } from "../../interfaces/Errors";

interface CommitmentsState {
    data: Commitments | undefined,
    loading: boolean,
    error: ApiError | undefined,
}

const initialState: CommitmentsState = {
    data: undefined,
    loading: false,
    error: undefined,
}

export const fetchSelectedCommitments = createAsyncThunk<Commitments, { assetClass: string; firmId: number }, { rejectValue: ApiError }>(
    'commitments/fetchSelectedCommitments',
    async ({ assetClass, firmId }, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/commitment/${assetClass}/${firmId}`);
            if (res.status !== 200) {
                const errorData = await res.json();
                return rejectWithValue(errorData as ApiError);
            }
            const data = await res.json();
            return data as Commitments;
        } catch (error) {
            return rejectWithValue(error as ApiError);
        }
    }
);

export const fetchAllCommitments = createAsyncThunk<Commitments, { firmId: number }, { rejectValue: ApiError }>(
    'commitments/fetchAllCommitments',
    async ({ firmId }, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/commitment/${firmId}`);
            if (res.status !== 200) {
                const errorData = await res.json();
                return rejectWithValue(errorData as ApiError);
            }
            const data = await res.json();
            return data as Commitments;
        } catch (error) {
            return rejectWithValue(error as ApiError);
        }
    }
);

export const commitmentsSlice = createSlice({
    name: 'commitments',
    initialState,
    reducers: {
        setCommitments: (state, action: PayloadAction<Commitment>) => {
            state.commitments = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSelectedCommitments.pending, (state: CommitmentsState) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchSelectedCommitments.fulfilled, (state: CommitmentsState, action: PayloadAction<Commitments>) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchSelectedCommitments.rejected, (state: CommitmentsState , action: PayloadAction<ApiError>) => {
            state.loading = false;
            state.data = undefined;
            state.error = action.payload;
        });
        builder.addCase(fetchAllCommitments.pending, (state: CommitmentsState) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(fetchAllCommitments.fulfilled, (state: CommitmentsState, action: PayloadAction<Commitments>) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAllCommitments.rejected, (state: CommitmentsState , action: PayloadAction<ApiError>) => {
            state.loading = false;
            state.data = undefined;
            state.error = action.payload;
        });
    },
});

export const { setCommitments } = commitmentsSlice.actions

export const selectCommitments = (state: RootState) => state.commitments;

export default commitmentsSlice.reducer;
