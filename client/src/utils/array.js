
export function arrayDivider(array, number) {
    const itemsPerArea = Math.floor(array.length / number);
    const newArray = [];
    let pos = 0;
    let index = 0;

    array.forEach((item, i) => {
        if (!newArray[pos]) {
            newArray[pos] = [];
        }

        newArray[pos].push(item);

        if (i === itemsPerArea) {
            pos++;
            index = 0;
        }
        
        index++;
    });

    return newArray
}