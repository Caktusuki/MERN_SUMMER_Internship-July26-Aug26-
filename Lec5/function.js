// 1. Function Declaration
// These are hoisted, meaning you can call them before they are defined in the code.
function greetUser(name) {
    return "Hello, " + name + "!";
}

console.log(greetUser("Alice")); // Output: Hello, Alice!

// 2. Function Expression
// Here, we create a function and store it inside a variable.
const calculateArea = function(width, height) {
    return width * height;
};

console.log(calculateArea(5, 10)); // Output: 50