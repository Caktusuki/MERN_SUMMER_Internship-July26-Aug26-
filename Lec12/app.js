const express = require('express');
const app = express();
const PORT = 8000;
const users =require('./MOCK_DATA.json');
app.get('/', (req, res) => {
    res.send('Hello World');
});
//get all users data
app.get('/api/users', (req, res) => {
    res.json(users);
});
// //Get user by there id(find)
// app.get('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     const user = users.find((u) => u.id === parseInt(id));
//     if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
// });
//middleware
app.user
//get user by filter
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const filteredUsers = users.filter((u) => u.id === parseInt(id));
    res.json(filteredUsers);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});