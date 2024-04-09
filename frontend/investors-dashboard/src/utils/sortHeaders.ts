export const sortHeaders = (headers: string[]) => {
    const positionMap = {
        'Firm Id': 0,
        'Firm Name': 1,
        'Firm Type': 2,
        'AUM': 3,
        'Location': 4,
        'Established At': 5,
        'Date Added': 6,
        'Last Updated': 7,
    };

    headers.splice(4, 0, 'Location');

    return headers.sort((a, b) => positionMap[a] - positionMap[b]);
}