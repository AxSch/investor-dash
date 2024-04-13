import { describe, it, expect, afterEach, beforeAll, afterAll, vi } from "vitest";
import request from "supertest";
import { app } from "./index";
import { UpstreamInvestor } from "../interfaces/Investors";
import { ApiError } from "../interfaces/Errors";

describe("Express Endpoints", () => {
    let server: any;

    beforeAll
    (async () => {
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
});
