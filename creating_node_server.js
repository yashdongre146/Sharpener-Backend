const http = require('http');

const server = http.createServer((req, res)=>{
    console.log("Yash Dongre");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Yash Dongre')
})

server.listen(4000);
