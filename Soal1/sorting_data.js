const data = [
    {
        "nama": "Indomie", 
        "harga": 3000, 
        "rating": 5, 
        "likes": 150
    },
    {
        "nama": "Laptop", 
        "harga": 4000000, 
        "rating": 4.5, 
        "likes": 123
    },
    {
        "nama": "Aqua", 
        "harga": 3000, 
        "rating": 4, 
        "likes": 250
    },
    {
        "nama": "Smart TV", 
        "harga": 4000000, 
        "rating": 4.5, 
        "likes": 42
    },
    {
        "nama": "Headphone", 
        "harga": 4000000, 
        "rating": 3.5, 
        "likes": 90
    },
    {
        "nama": "Very Smart TV", 
        "harga": 4000000, 
        "rating": 3.5, 
        "likes": 87
    }
];

function shellSort(arr, n) {
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i=gap; i < n; i+=1) {
            let temp = arr[i];
            let j = i-gap;
            for (j=i-gap; j >= 0; j -= gap) {
                if (temp["harga"] < arr[j]["harga"] || (temp["harga"] == arr[j]["harga"] && temp["rating"] < arr[j]["rating"]) ||
                    (temp["rating"] == arr[j]["rating"] && temp["likes"] < arr[j]["likes"])) {
                    arr[j+gap] = arr[j];
                } else {
                    break;
                }
            }
            arr[j+gap] = temp;
        }
    }
    return arr;
}

var res = shellSort(data, data.length);
console.log(res);