// 1. Change the page background color
document.body.style.backgroundColor = 'lightpink';

// 2. Create the layout elements in memory
let header = document.createElement('div');
let sidebar = document.createElement('div');
let content1 = document.createElement('div');
let content2 = document.createElement('div');
let footer = document.createElement('div');

// 3. Style the Header (From the image)
header.style.height = '200px';
header.style.width = '200px';
header.style.backgroundColor = 'white';

// 4. Style the Sidebar (Completed)
sidebar.style.height = '400px';
sidebar.style.width = '150px';
sidebar.style.backgroundColor = 'lightblue';
sidebar.style.marginTop = '10px';

// 5. Style Content Box 1 (Completed)
content1.style.height = '195px';
content1.style.width = '400px';
content1.style.backgroundColor = 'lightgreen';
content1.style.marginTop = '10px';

// 6. Style Content Box 2 (Completed)
content2.style.height = '195px';
content2.style.width = '400px';
content2.style.backgroundColor = 'lightyellow';
content2.style.marginTop = '10px';

// 7. Style the Footer (Completed)
footer.style.height = '100px';
footer.style.width = '560px';
footer.style.backgroundColor = 'plum';
footer.style.marginTop = '10px';

// 8. CRITICAL STEP: Append them to the body so they display on the screen!
document.body.appendChild(header);
document.body.appendChild(sidebar);
document.body.appendChild(content1);
document.body.appendChild(content2);
document.body.appendChild(footer);