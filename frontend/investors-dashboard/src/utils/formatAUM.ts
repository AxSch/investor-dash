export const formatAUM = (aum: number): string => {
    const formatter = new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(aum);
};