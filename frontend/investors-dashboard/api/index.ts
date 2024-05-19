import express, * as expressComplete from "express";
import { Request, Response } from "@types/express";
import { validationResult, param, ValidationError } from "express-validator";
import { Investors, UpstreamInvestor} from "../interfaces/Investors";
import { Commitments, UpstreamCommitment} from "../interfaces/Commitments";
import { ApiError } from "../interfaces/Errors";

export const app = express ? express() : expressComplete();
if (!process.env['VITE'] && process.env.NODE_ENV !== "test") {
    const frontendFiles = process.cwd() + '/dist'
    app.use(express.static(frontendFiles))
    app.get('/*', (_, res) => {
        res.send(frontendFiles + '/index.html')
    })
    const port = process.env["PORT"] || 3001;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
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
                location: `${item.address}, ${item.city}, ${item.country}, ${item.postal_code}`,
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
    param('investorId').notEmpty().isInt().escape(),
    param('assetClass').notEmpty().isLength({ max: 3 }).escape()
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
    const validationErrors: Record<string, ValidationError> = validationResult(req).mapped();
    const errors: ApiError[] = [];

    if (validationErrors['investorId']) {
        const investorIdError: ValidationError = validationErrors['investorId'];
        errors.push({
            message: `${investorIdError.msg}: ${investorIdError.type}`,
            statusCode: 400
        } as ApiError);
    }

    if (validationErrors['assetClass']) {
        const assetClassError: ValidationError = validationErrors['assetClass'];
        errors.push({
            message: `${assetClassError.msg}: ${assetClassError.type}`,
            statusCode: 400
        }  as ApiError);
    }

    if (errors.length > 0) {
        res.status(400).send({ errors });
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
        if (error.statusCode) {
            res.status(error.statusCode).send(error);
        } else res.status(500).send({ message: "Server Error", statusCode: 500 });
        return;
    }
});

app.get('/api/commitment/:investorId', param('investorId').notEmpty().isInt().escape(), async(req: Request, res: Response) => {
    const validationError: Record<string, ValidationError> = validationResult(req).mapped();
    if (validationError['investorId']) {
        const investorIdError: ValidationError = validationError['investorId'];
        const error = {
           message: `${investorIdError.msg}: ${investorIdError.type}`,
           statusCode: 400
        } as ApiError;
        res.status(error.statusCode).send(error);
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
        if (error.statusCode) {
            res.status(error.statusCode).send(error);
        } else res.status(500).send({ message: "Server Error", statusCode: 500 });
        return;
    }
});
