let delayBtn = document.querySelector('#delayBtn');
let divs = document.querySelectorAll('.color');

// 1. One-time delay when clicking the button
delayBtn.addEventListener('click', () => {
    // Wait 2000 milliseconds (2 seconds) then change background to lightpink
    setTimeout(() => {
        document.body.style.backgroundColor = 'lightpink';
    }, 2000);
});

// 2. Manual block clicks still work instantly
divs.forEach((div) => {
    div.addEventListener('click', (e) => {
        if (e.target.id === 'id1') document.body.style.backgroundColor = 'red';
        if (e.target.id === 'id2') document.body.style.backgroundColor = 'lightblue';
    });
});