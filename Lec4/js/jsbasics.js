// ==========================================
// 1. STANDARD 'FOR' LOOPS
// ==========================================
console.log("--- Standard For Loop ---");

// A basic loop that runs 3 times
// syntax: for (start; condition; step)
for (let i = 1; i <= 3; i++) {
    console.log("Loop iteration number: " + i);
}

// ==========================================
// 2. PROMISES AND .then() .then()
// ==========================================
console.log("\n--- Promises and .then() ---");

/* 
  Sometimes JavaScript has to wait for an operation (like downloading data).
  It uses a "Promise" to handle this. You use .then() to say:
  "Try to get this data, and THEN when you have it, do this next step."
*/

// A simple simulated data fetch
const fetchStudentData = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ user: "Vikyraj", status: "Active" }); // Simulates a successful data load
    }, 1000); // Waits 1 second
});

// Chaining .then() blocks
fetchStudentData
    .then(data => {
        // First .then() receives the raw data
        console.log("1. Data fetched successfully!");
        return data.user; // Pass just the user name to the next .then()
    })
    .then(userName => {
        // Second .then() runs immediately after the first one finishes
        console.log("2. Processing user: " + userName);
    })
    .catch(error => {
        // .catch() handles any errors if the Promise fails
        console.log("Something went wrong:", error);
    });