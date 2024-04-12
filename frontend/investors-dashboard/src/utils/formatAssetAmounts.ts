export const formatAssetAmount = (amount: string): number => {
    const value = parseFloat(amount);
    const unit = amount.slice(-1);

    const formatter = new Intl.NumberFormat(navigator.language, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    if (unit === 'M') {
        return formatter.format(value * 1000000);
    } else if (unit === 'B') {
        return formatter.format(value * 1000000000);
    } else {
        return formatter.format(value);
    }
}
