const http = require('http');
const fs = require('fs'); // FIX 1: Added this so fs.readFile works!

//create new server
const server = http.createServer((req, res) => {
    
    // The switch statement must live inside here to see 'req.url'
    switch (req.url) {
        case '/': 
            fs.readFile('./index.html', (err, data) => {
                if (err) {
                    res.end('File Not Found');
                } else {
                    res.end(data); // Sends the actual HTML content
                }
            });
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
    
// FIX 2: Changed port to 3005 to bypass the EADDRINUSE error
server.listen(3005, () => {
    console.log('Server running at http://localhost:3005/');
});