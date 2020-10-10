
export function arrayDivider(array, number) {
    const itemsPerArea = Math.floor(array.length / number);
    const newArray = [];
    let index = 0;

    array.forEach(item => {
        if (!newArray[index]) {
            newArray[index] = [];
        }

        newArray[index].push(item);

        if (index === itemsPerArea) {
            index++;
        }
    });

    return newArray
}