const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile('/home/cactus/Documents/College/MERN Summer Internship/Lec9/index.html');
});

app.get('/about', (req, res) => {
    res.send('hello about page ');
});

app.listen(7001, () => {
    console.log('server started at http://localhost:7001/');
});