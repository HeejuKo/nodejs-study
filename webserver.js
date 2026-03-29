const http = require('http'); // http 모듈을 가져옴
 
const hostname = '127.0.0.1'; // 이 주소로 요청을 보내면 응답해라
const port = 1337; // 웹서버가 1337 포트에서 listening
 
http.createServer((req, res) => { // http 모듈의 createServer 메소드 호출 (Server 객체 return)
 res.writeHead(200, { 'Content-Type': 'text/plain' });
 res.end('Hello World\n');
}).listen(port, hostname, () => { // server 객체의 listen 메소드 호출
 console.log(`Server running at http://${hostname}:${port}/`);
});