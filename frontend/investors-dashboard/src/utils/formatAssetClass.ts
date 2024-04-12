export const formatAssetClass = (str: string) : string =>  {
    const assetClassMap = {
        'nr': "Natural Resources",
        'inf': "Infrastructure",
        're': "Real Estate",
        'pe': "Private Equity",
        'pd': "Private Debt",
        'hf': "Hedge Funds",
    }

    return assetClassMap[str];
}
