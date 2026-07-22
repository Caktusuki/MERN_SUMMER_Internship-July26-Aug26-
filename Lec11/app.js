const expreess = require('express');
const app = expreess();
const PORT = 4444;
app.get('/', (req, res) => {
    res.send('Hello World');
});
//Query
app.get('/about', (req, res) => {
    res.send('About Page');
});
app.get('/name', (req, res) => {
    console.log(req.query);
    const name = req.query.q;
    res.send(`Hello, ${name}!`);
});
// Params
app.get('/name/:id', (req, res) => {
    const id = req.params.id; 
    res.send(`Hello my ID is in the directory, ${id}!`);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});