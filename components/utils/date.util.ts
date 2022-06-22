export const formatDateForInput = (date: string, dateOnly = false): string => {
    const targetDate = new Date(date);

    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() > 9 ? targetDate.getMonth() + 1 : '0' + (targetDate.getMonth() + 1);
    const day = targetDate.getDate();
    const hours = targetDate.getHours() > 9 ? targetDate.getHours() : '0' + targetDate.getHours();
    const minutes = targetDate.getMinutes() > 9 ? targetDate.getMinutes() : '0' + targetDate.getMinutes();
    const seconds = targetDate.getSeconds();

    return dateOnly ? `${year}-${month}-${day}` : `${year}-${month}-${day}T${hours}:${minutes}`;
};
