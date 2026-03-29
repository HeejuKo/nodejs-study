const http = require('http');
 
const hostname = '127.0.0.1'; // 이 주소로 요청을 보내면 응답해라
const port = 1337; // 웹서버가 1337 포트에서 listening
 
http.createServer((req, res) => {
 res.writeHead(200, { 'Content-Type': 'text/plain' });
 res.end('Hello World\n');
}).listen(port, hostname, () => {
 console.log(`Server running at http://${hostname}:${port}/`);
});