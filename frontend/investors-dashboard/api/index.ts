import express, * as expressComplete from "express";
import { Request, Response } from "@types/express";
import fetch from "node-fetch";
import {validationResult, query } from "express-validator";
import { InvestorCommitment, Investors} from "../interfaces/Investors";

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({redirectUrl: '/'});
        return;
    }

    const url = process.env.INVESTOR_API + `api/investors`;
    try {
        const response = await fetch(url);
        const data = await response.json() as Investors;
        return res.json({
            investors: data
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: 'Bad Request' });
        return;
    }
});

const investorQueries = [
    query('investorId').notEmpty().escape(),
    query('assetClass').notEmpty().escape()
];

app.get('/api/commitment/:assetClass/:investorId', investorQueries, async(req: Request, res: Response) => {
    const errors = validationResult(req);
    console.info(errors);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
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
        console.error(e.message);
        res.status(500).json({ error: 'Bad Request' });
        return;
    }
});
