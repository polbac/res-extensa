

export function arrayDivider(array, number) {
    const itemsPerArea = Math.floor(array.length / number);
    const newArray = [];
    let pos = 0;

    array.forEach((item, i) => {
        if (!newArray[pos]) {
            newArray[pos] = [];
        }

        newArray[pos].push(item);

        if (i === itemsPerArea) {
            pos++;
        }
        
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


  export function shuffle(b) {
    const a = [...b]
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function randomProperty (obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};
