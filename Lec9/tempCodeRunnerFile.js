const http = require('http');

//create new server
const server = http.createServer((req, res) => {
    
    // The switch statement must live inside here to see 'req.url'
    switch (req.url) {
        case '/': 
            res.end('Hello from server');
            break;
        case '/contact': 
            res.end('Contact page');
            break;
        case '/about': 
            res.end('About page');
            break;
        default: 
            res.end('404 Not Found');
            break;
    }
    
});
    
//server listen on port 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});