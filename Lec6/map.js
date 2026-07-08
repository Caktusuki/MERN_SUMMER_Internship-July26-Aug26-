let myarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Changed '-' to '='
// 2. Changed '->' to '=>'
let newarr = myarr.map((item) => {
    return item + 10;
});

console.log(newarr);
let chainedArr = myarr
  .map((item) => {
      return item + 10; // Step 1: Add 10 to every number
  })
  .map((item) => {
      return item + 1;  // Step 2: Add 1 to those new numbers
  })
  .filter((item) => {
      return item > 15; // Step 3: Only keep the numbers bigger than 15
  });

console.log(chainedArr);
