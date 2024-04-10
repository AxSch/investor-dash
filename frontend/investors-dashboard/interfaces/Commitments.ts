export interface Commitment {
    id: number,
    assetClass: string,
    firmId: number,
    currency: string,
    amount: string,
}

export interface UpstreamCommitment {
    id: number,
    asset_class: string,
    firm_id: number,
    currency: string,
    amount: string,
}

export interface Commitments {
    commitments: Commitment[],
}
