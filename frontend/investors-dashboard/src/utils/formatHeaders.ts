export const formatHeaders = (str: string) => {
    if (str === 'AUM') return str;
    return str.split(/(?=[A-Z])/).map((word: string) => {
       return word.charAt(0).toUpperCase() + word.slice(1);
   }).join(' ');
}
