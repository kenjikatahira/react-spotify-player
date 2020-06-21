const http = require('http');
const hostname = 'localhost';
const port = 3000;


fs.readFile('./build/index.html', function(err, content){
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(helpText);
            response.write(content);
            response.end();
        });
        server.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
});
