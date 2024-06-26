import { describe, it, expect, afterEach, beforeAll, afterAll, vi } from "vitest";
import request from "supertest";
import { app } from "./index";
import { UpstreamInvestor } from "../interfaces/Investors";
import { ApiError } from "../interfaces/Errors";
import {UpstreamCommitment} from "../interfaces/Commitments";

describe("Express Endpoints", () => {
    let server: unknown;

    beforeAll(async () => {
        server = app.listen(3000);
        console.log("Server started");
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    afterAll(async () => {
        await new Promise<void>((resolve) => {
            server.close(() => {
                console.log("Server closed");
                resolve();
            });
        });
    });

    describe("GET /api/investors", () => {
        it("should return a list of investors", async () => {
            const mockUpstreamInvestors: UpstreamInvestor[] = [
                {
                    firm_id: 1,
                    firm_name: "DarthEmpire",
                    AUM: 1000000,
                    date_added: "2023-06-08",
                    last_updated: "2023-06-08",
                    established_at: "2000-01-01",
                    firm_type: "Hedge Fund",
                    city: "Corusant",
                    country: "Corusant",
                    address: "123 The Senate",
                    postal_code: "10001",
                },
            ];

            vi.spyOn(global, "fetch").mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockUpstreamInvestors),
                })
            );

            const response = await request(server).get("/api/investors");

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                investors: expect.arrayContaining([
                    expect.objectContaining({
                        firmId: 1,
                        firmName: "DarthEmpire",
                        AUM: 1000000,
                        dateAdded: "2023-06-08",
                        lastUpdated: "2023-06-08",
                        establishedAt: "2000-01-01",
                        firmType: "Hedge Fund",
                        city: "Corusant",
                        country: "Corusant",
                        address: "123 The Senate",
                        postalCode: "10001",
                    }),
                ]),
            });
        });

        it("should handle errors and return an error response", async () => {
            const mockError: ApiError = {
                name: "",
                stack: "",
                message: "Internal Server Error",
                statusCode: 500,
            };

            vi.spyOn(global, "fetch").mockRejectedValueOnce(mockError);

            const response = await request(server).get("/api/investors");

            expect(response.status).toBe(500);
            expect(response.body).toEqual(mockError);
        });
    });

    describe("GET /api/commitment/:investorId", () => {
        it("should return a list of commitments for the specific investor", async () => {
            const mockUpstreamCommitments: UpstreamCommitment[] = [
                {
                    id: 1,
                    firm_id: 230,
                    asset_class: "pe",
                    currency: "USD",
                    amount: "10M",
                }
            ];

            vi.spyOn(global, "fetch").mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockUpstreamCommitments),
                })
            );

            const response = await request(server).get(`/api/commitment/${230}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                commitments: expect.arrayContaining([
                    expect.objectContaining({
                        id: 1,
                        firmId: 230,
                        assetClass: "pe",
                        currency: "USD",
                        amount: "10M",
                    }),
                ]),
            });
        });

        it("should handle errors and return an error response - validation 500", async () => {
            const mockError = {
                message: "Invalid value: field",
                statusCode: 400,
            } as ApiError;

            vi.spyOn(global, "fetch").mockRejectedValueOnce(mockError);

            const response = await request(server).get("/api/commitment/koolaid");

            expect(response.status).toBe(400);
            expect(response.body).toEqual(mockError);
        });
    });

    describe("GET /api/commitment/:assetClass/:investorId", () => {
        it("should return a list of commitments for the selected asset class & specific investor", async () => {
            const mockUpstreamCommitments: UpstreamCommitment[] = [
                {
                    id: 1,
                    firm_id: 343,
                    asset_class: "pe",
                    currency: "USD",
                    amount: "10M",
                },
            ];

            vi.spyOn(global, "fetch").mockImplementation(() =>
                Promise.resolve({
                    json: () => Promise.resolve(mockUpstreamCommitments),
                })
            );

            const response = await request(server).get(`/api/commitment/pe/${343}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                commitments: expect.arrayContaining([
                    expect.objectContaining({
                        id: 1,
                        firmId: 343,
                        assetClass: "pe",
                        currency: "USD",
                        amount: "10M",
                    }),
                ]),
            });

        });

        it("should handle errors and return an error response - validation 500 for both params", async () => {
            const mockErrors = {
                errors: [
                    {
                        "message": "Invalid value: field",
                        "statusCode": 400,
                    },
                    {

                        "message": "Invalid value: field",
                        "statusCode": 400,
                    }
                ]
            };

            vi.spyOn(global, "fetch").mockRejectedValueOnce(mockErrors);

            const response = await request(server).get(`/api/commitment/private_equity/e_e`);

            expect(response.status).toBe(400);
            expect(response.body.errors).toHaveLength(2);
            expect(response.body).toEqual(mockErrors);
        });

        it("should handle errors and return an error response - validation 500 for one params", async () => {
            const mockErrors = {
                errors: [
                    {
                        "message": "Invalid value: field",
                        "statusCode": 400,
                    }
                ]
            };

            vi.spyOn(global, "fetch").mockRejectedValueOnce(mockErrors);

            const response = await request(server).get(`/api/commitment/pe/e_e`);

            expect(response.status).toBe(400);
            expect(response.body.errors).toHaveLength(1);
            expect(response.body).toEqual(mockErrors);
        });
    })
});
