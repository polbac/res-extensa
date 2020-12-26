

export function arrayDivider(array, number) {
    const itemsPerArea = Math.floor(array.length / number);
    const newArray = [];
    let pos = 0;
    let index = 0;
    array = array.filter(item => item.type !== "sound")
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

export function create2Darray(A) {
    const arr = [];
    const rows = Math.floor(Math.sqrt(A.length));
    for (let i = 0; i < rows; i++) {
      arr[i] = [];
      for (let j = 0; j < rows; j++) {
        arr[i][j] = A[i * rows + j];
      }
    }
    return arr;
  }


  export function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}