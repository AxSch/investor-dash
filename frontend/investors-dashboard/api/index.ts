import express, * as expressComplete from "express";
import { Request, Response } from "@types/express";
import fetch from "node-fetch";
import {validationResult, query } from "express-validator";
import { InvestorCommitment, Investors, UpstreamInvestor} from "../interfaces/Investors";

interface ApiError extends Error {
    statusCode: number,
}

export const app = express ? express() : expressComplete();
if (!process.env['VITE']) {
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    app.listen(process.env['PORT'])
}

app.get('/api/investors', async(req: Request, res: Response) => {
    const url = process.env.INVESTOR_API + `api/investors`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const serializedData: Investors = data.map((item: UpstreamInvestor) => {
            return {
                firmId: item.firm_id,
                firmName: item.firm_name,
                AUM: item.AUM,
                dateAdded: item.date_added,
                lastUpdated: item.last_updated,
                establishedAt: item.established_at,
                firmType: item.firm_type,
                city: item.city,
                country: item.country,
                address: item.address,
                postalCode: item.postal_code,
            }
        });
        return res.json({
            investors: serializedData
        });
    } catch (e) {
        const error: ApiError = e;
        res.status(error.statusCode).send(error);
        return;
    }
});

const investorQueries = [
    query('investorId').notEmpty().escape(),
    query('assetClass').notEmpty().escape()
];

app.get('/api/commitment/:assetClass/:investorId', investorQueries, async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors as ApiError;
        res.status(error.statusCode).send(error);
        return;
    }
    const url = process.env.INVESTOR_API + `api/commitment/investor/${req.query.assetClass}/${req.query.investorId}`;

    try {
        const response = await fetch(url);
        const data = await response.json() as InvestorCommitment[];
        return res.json({
            investors: data
        });
    } catch (e) {
        const error: ApiError = e;
        res.status(error.statusCode).send(error);
        return;
    }
});
