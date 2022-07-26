export const firstLetterCap = (value: string) => {
    const result = value[0].toUpperCase() + value.substring(1);
    return result;
};
