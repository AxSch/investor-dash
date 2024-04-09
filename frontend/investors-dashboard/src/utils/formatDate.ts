export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(navigator.language, { year: 'numeric', month: 'long', day: 'numeric' });
}
