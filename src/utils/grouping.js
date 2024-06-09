export function groupingArray(data) {
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.product]) {
            acc[item.product] = [];
        }
        acc[item.product].push(item);
        return acc;
    }, {});

    const arrayOfArrays = Object.values(groupedData);
    return arrayOfArrays;
}

export function groupingDate(data) {
    const groupedByDate = data.reduce((acc, item) => {
        if (!acc[item.date]) {
            acc[item.date] = item;
        }
        return acc;
    }, {});

    const result = Object.values(groupedByDate);
    return result;
}