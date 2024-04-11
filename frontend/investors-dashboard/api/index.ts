import express, * as expressComplete from "express";
import { Request, Response } from "@types/express";
import fetch from "node-fetch";
import { validationResult, param } from "express-validator";
import { Investors, UpstreamInvestor} from "../interfaces/Investors";
import { Commitments, UpstreamCommitment} from "../interfaces/Commitments";
import { ApiError } from "../interfaces/Errors";

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

const commitmentQueries = [
    param('investorId').notEmpty().escape(),
    param('assetClass').notEmpty().escape()
];

const handleCommitmentRequest = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    const serializedData: Commitments = data.map((item: UpstreamCommitment) => {
        return {
            id: item.id,
            firmId: item.firm_id,
            assetClass: item.asset_class,
            currency: item.currency,
            amount: item.amount,
        }
    });
    return serializedData;
}

app.get('/api/commitment/:assetClass/:investorId', commitmentQueries, async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array() as ApiError;
        res.status(500).send({ message: error[0].msg, statusCode: 500 });
        return;
    }
    const url = process.env.INVESTOR_API + `api/investor/commitment/${req.params.assetClass}/${req.params.investorId}`;

    try {
        const serializedData = await handleCommitmentRequest(url);
        return res.json({
            commitments: serializedData
        });
    } catch (e) {
        const error: ApiError = e;
        res.status(error.statusCode).send(error);
        return;
    }
});

app.get('/api/commitment/:investorId', param('investorId').notEmpty().escape(), async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = errors.array() as ApiError;
        res.status(500).send({ message: error[0].msg, statusCode: 500 });
        return;
    }
    const url = process.env.INVESTOR_API + `api/investor/commitment/${req.params.investorId}`;

    try {
        const serializedData = await handleCommitmentRequest(url);
        return res.json({
            commitments: serializedData
        });
    } catch (e) {
        const error: ApiError = e;
        res.status(error.statusCode).send(error);
        return;
    }
});
