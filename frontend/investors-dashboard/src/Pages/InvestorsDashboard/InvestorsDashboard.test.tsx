import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import InvestorsDashboard from "./InvestorsDashboard";
import investorReducer, { fetchInvestors } from "../../reducers/investorsSlice";
import { Investors } from "../../../interfaces/Investors";
import { ApiError } from "../../../interfaces/Errors";

const createTestStore = () => {
    return configureStore({
        reducer: {
            investors: investorReducer,
        },
    });
};

describe("InvestorsDashboard", () => {
    let store;
    let mockInvestors: Investors;

    beforeEach(() => {
        mockInvestors = {
            investors: [
                {
                    firmId: 1,
                    firmName: "Investor 1",
                    AUM: 1000000,
                    dateAdded: "2023-06-08",
                    lastUpdated: "2023-06-08",
                    establishedAt: "2000-01-01",
                    firmType: "he",
                    city: "Tatooine",
                    country: "Hut County",
                    address: "Address 1: Boba Fett does not live here",
                    postalCode: "Order 455",
                },
                {
                    firmId: 2,
                    firmName: "Investor 2",
                    AUM: 2000000,
                    dateAdded: "2023-06-09",
                    lastUpdated: "2023-06-09",
                    establishedAt: "2000-01-02",
                    firmType: "pe",
                    city: "City of Naboo",
                    country: "Naboo",
                    address: "Trade Federation remains active",
                    postalCode: "564-565",
                },
            ],
        };
        vi.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockInvestors),
            })
        );

        store = createTestStore();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders loading state when fetching investors", () => {
        store.dispatch(fetchInvestors.pending());

        render(
            <Provider store={store}>
                <BrowserRouter>
                <InvestorsDashboard />

                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId("investors-loading")).toBeInTheDocument();
    });

    it("renders investor table when investors data is available", () => {
        store.dispatch(fetchInvestors.fulfilled(mockInvestors));

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <InvestorsDashboard />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId("investors-heading")).toBeInTheDocument();
        expect(screen.getByTestId("investor-table")).toBeInTheDocument();
    });

    it("shows error boundary when an error occurs", async () => {
        const error = {
            statusCode: 400,
            message: "Something, something, darkside",
        } as ApiError;
        vi.spyOn(global, "fetch").mockImplementation(() =>
            Promise.reject(error)
        );

        await act(() => {
            render(
                <Provider store={store}>
                    <BrowserRouter>
                        <InvestorsDashboard/>
                    </BrowserRouter>
                </Provider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText("I have failed you Anakin... I have failed you.")).toBeInTheDocument();
            expect(screen.getByText(error.message)).toBeInTheDocument();
        });
    });
});
