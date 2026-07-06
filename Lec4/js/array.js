// ==========================================
// 1. WHAT IS AN ARRAY? 
// Think of an array exactly like an empty cardboard box.
// ==========================================
console.log("--- 1. Adding Items One by One ---");

let myBox = []; // We start with a completely empty box

// We want to add 1, 2, and 3 one at a time.
// Tossing things into the box is called .push()
myBox.push(1); // Drops 1 in
myBox.push(2); // Drops 2 in on top of it
myBox.push(3); // Drops 3 in on top of that

console.log("Using Push (Tossing them in):", myBox); 
// Output: [ 1, 2, 3 ]


// --- Alternative: Using exact positions (Indexes) ---
// If you don't want to toss them, you can place them in exact spots.
// Remember: The first spot is always 0.
let indexBox = [];

indexBox[0] = 1; // Placed exactly in spot 0
indexBox[1] = 2; // Placed exactly in spot 1
indexBox[2] = 3; // Placed exactly in spot 2

console.log("Using exact positions:", indexBox); 
// Output: [ 1, 2, 3 ]


// ==========================================
// 2. WHAT DOES "HETEROGENEOUS" MEAN?
// It just means "a mix of different things."
// ==========================================
console.log("\n--- 2. Heterogeneous Arrays ---");

/*
  Some programming languages are strict. If a box is meant for numbers, 
  and you put a word in it, the program will crash.

  JavaScript is like a chill roommate. It does not care. You can put 
  text, numbers, and true/false values all in the exact same box. 
  Because it allows mixed items, we call it a "heterogeneous" array.
*/

let chillRoommateBox = [
    "A regular book",    // Text (String)
    42,                  // A Number
    true                 // A true/false value (Boolean)
];

console.log("The Heterogeneous Box contains:", chillRoommateBox);
// Output: [ 'A regular book', 42, true ]

// You can even .push() a different type into an existing number array:
myBox.push("Hello!");
console.log("My Box after pushing text into it:", myBox);
// Output: [ 1, 2, 3, 'Hello!' ]