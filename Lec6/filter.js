let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let newarr = []; // 1. Create an empty array

arr.forEach((item) => {
    if (item > 6) {
        newarr.push(item); // 2. Push it in if it's greater than 6
    }
});

// Sample data so you can test the script
let books = [
    { title: 'Book One', genre: 'history', edition: 2005 },
    { title: 'Book Two', genre: 'science', edition: 2001 },
    { title: 'Book Three', genre: 'history', edition: 2010 },
    { title: 'Book Four', genre: 'fiction', edition: 2008 }
];

// -----------------------------------------
// Example 1: Filter by genre only (Corrected)
// -----------------------------------------
// let myarr = books.filter((item) => {
//     return item.genre === "history";
// });
//
// console.log(myarr);

// -----------------------------------------
// Example 2: Filter by edition only (Corrected)
// -----------------------------------------
// edition > 2004
//
// let newarr2 = books.filter((item) => {
//     return item.edition > 2004;
// });
//
// console.log(newarr2);

// -----------------------------------------
// Example 3: Filter by BOTH (Active code on your screen)
// -----------------------------------------
let newarr = books.filter((item) => {
    return item.edition > 2004 && item.genre === "history";
});

console.log(newarr);