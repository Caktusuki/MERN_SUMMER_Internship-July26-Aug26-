let divs = document.querySelectorAll('.color');
let btn = document.querySelector('button');

// Reset button returns layout to white
btn.addEventListener('click', () => {
    document.body.style.backgroundColor = 'white';
});

// Loop over all boxes and assign click events based on target IDs
divs.forEach((div) => {
    div.addEventListener('click', (e) => {
        if (e.target.id === 'id1') {
            document.body.style.backgroundColor = 'red';
        } else if (e.target.id === 'id2') {
            document.body.style.backgroundColor = 'lightblue';
        } else if (e.target.id === 'id3') {
            document.body.style.backgroundColor = 'lightgreen';
        } else if (e.target.id === 'id4') {
            document.body.style.backgroundColor = 'lightyellow';
        }
    });
});