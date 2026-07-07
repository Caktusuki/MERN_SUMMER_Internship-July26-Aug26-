// 1. Storing functions in an array or object
const mathOperations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};

console.log(mathOperations.add(20, 10)); // Output: 30

// 2. Passing a function as an argument (Callbacks)
function processUserInput(callback) {
    let name = "Bob";
    callback(name); // We execute the function that was passed in
}

// We pass this arrow function into processUserInput
processUserInput((userName) => {
    console.log("Welcome to the system, " + userName);
});