let startDisco = document.querySelector('#startDisco');
let stopDisco = document.querySelector('#stopDisco');
let divs = document.querySelectorAll('.color');

let intervalTracker = null; // Holds the ID of the running loop
const discoColors = ['lightgreen', 'lightyellow', 'plum', 'orange', 'cyan'];

// 1. Start the repeating interval loop
startDisco.addEventListener('click', () => {
    // Guard clause: Prevent stacking multiple loops if clicked repeatedly
    if (intervalTracker !== null) return; 

    // Run this block every 800 milliseconds continuously
    intervalTracker = setInterval(() => {
        let randomChoice = discoColors[Math.floor(Math.random() * discoColors.length)];
        document.body.style.backgroundColor = randomChoice;
    }, 800);
});

// 2. Stop the interval loop cleanly using clearInterval
stopDisco.addEventListener('click', () => {
    clearInterval(intervalTracker); // Kills the interval from memory
    intervalTracker = null;          // Reset tracker value
    document.body.style.backgroundColor = 'white'; // Reset page
});

// 3. Manual block clicks
divs.forEach((div) => {
    div.addEventListener('click', (e) => {
        clearInterval(intervalTracker); // Stop disco loop if box is clicked manually
        intervalTracker = null;
        
        if (e.target.id === 'id3') document.body.style.backgroundColor = 'lightgreen';
        if (e.target.id === 'id4') document.body.style.backgroundColor = 'lightyellow';
    });
});