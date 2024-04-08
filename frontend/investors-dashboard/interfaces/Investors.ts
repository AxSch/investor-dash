interface Investor {
    firmId: number,
    firmName: string,
    AUM: number,
    dateAdded: string,
    lastUpdated: string,
    establishedAt: string,
    firmType: string,
    city: string,
    country: string,
    address: string,
    postal_code: string,
}

export interface InvestorCommitment {
    id: number,
    assetClass: string,
    firmId: number,
    currency: string,
    amount: string
}

export interface Investors {
    investors: Investor[]
}