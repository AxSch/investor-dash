import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
import { Investors } from "../../interfaces/Investors";

interface InvestorsState {
    investors: Investors | null,
    length: number,
}

const initialState: InvestorsState = {
    investors: null,
    length: 0,
}

export const investorSlice = createSlice({
    name: 'investors',
    initialState,
    reducers: {
        setInvestors: (state, action: PayloadAction<Investors>) => {
            state.investors = action.payload;
        },
    },
});

export const { setInvestors } = investorSlice.actions;

export const selectInvestor = (state: RootState, id: number) => state.investors.find(id);

export const selectInvestors = (state: RootState) => state.investors;

export default investorSlice.reducer;