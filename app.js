var express = require('express') // express 모듈 로드
var app = express();

app.use(express.static('public')); // express: public dir 안에서 그 파일 찾음

app.get('/', (req, res) => { // 사용자가 홈으로 접속하면
    res.send('Hello home page');
});

app.get('/dynamic', (req, res) => {
    var lis = '';
    for(var i=0; i<5; i++) {
        lis = lis + '<li>coding</li>';
    }
    var time = Date();
    var output = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
                ${lis}
            </ul>
            ${time}
        </body>
    </html>`;
    res.send(output);
});

app.get('/route', (req, res) => {
    res.send('Hello Router, <img src="/rilakkuma.png">');
});

app.get('/login', (req, res) => { // 사용자가 로그인 페이지로 접속하면
    res.send('Login please');
});

app.listen(3000, () => {
    console.log('Connected 3000 port!');
});

