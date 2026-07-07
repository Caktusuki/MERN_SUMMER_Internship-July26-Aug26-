// 1. Standard Arrow Function
const sayHi = () => {
    console.log("Hi there!");
};
sayHi();

// 2. Arrow Function with Parameters
const addNumbers = (a, b) => {
    return a + b;
};
console.log(addNumbers(10, 5)); // Output: 15

// 3. Implicit Return (One-liner)
// If your function just returns a single expression, you can drop the {} and 'return' keyword.
const multiply = (x, y) => x * y;
const square = x => x * x; // You can even drop the () if there is exactly one parameter

console.log(multiply(4, 5)); // Output: 20
console.log(square(6));      // Output: 36