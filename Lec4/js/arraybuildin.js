// Start with a basic array
let numbers = [1, 2, 3, 4];
console.log(numbers); // Output: [ 1, 2, 3, 4 ]

// 1. push() - Adds an item to the END of the array
numbers.push(5);
console.log(numbers); // Output: [ 1, 2, 3, 4, 5 ]

// 2. pop() - Removes the last item from the END of the array
numbers.pop();
console.log(numbers); // Output: [ 1, 2, 3, 4 ]

// 3. unshift() - Adds an item to the BEGINNING of the array
numbers.unshift(0);
console.log(numbers); // Output: [ 0, 1, 2, 3, 4 ]

// 4. shift() - Removes the first item from the BEGINNING of the array
numbers.shift();
console.log(numbers); // Output: [ 1, 2, 3, 4 ]