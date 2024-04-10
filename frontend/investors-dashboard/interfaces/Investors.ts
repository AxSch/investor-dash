export interface Investor {
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
    postalCode: string,
}

export interface UpstreamInvestor {
    firm_id: number,
    firm_name: string,
    AUM: number,
    date_added: string,
    last_updated: string,
    established_at: string,
    firm_type: string,
    city: string,
    country: string,
    address: string,
    postal_code: string,
}

export interface Investors {
    investors: Investor[] | undefined
}
