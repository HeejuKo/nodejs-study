var express = require('express') // express 모듈 로드
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true; // prettier

app.set('views', './views'); // views, 템플릿이 있는 디렉토리, 생략 가능
app.set('view engine', 'jade'); // jade라는 템플릿 엔진 세팅 (express와 연결)

app.use(express.static('public')); // express: public dir 안에서 그 파일 찾음
app.use(bodyParser.urlencoded({ extended: false })); // 미들웨어

app.get('/form', (req, res) => {
    res.render('form');
});

app.get('/form-receiver', (req, res) => {
    // get 방식으로 전송된 데이터는 req.query에 저장됨
    var title = req.query.title;
    var des = req.query.description;
    res.send(title+', '+des);
});

app.post('/form-receiver', (req, res) => {
    var title = req.body.title;
    var des = req.body.description;
    res.send(title+', '+des);
});

// req 객체가 갖고 있는 query라는 객체의 id라는 프로퍼티를 통해서 사용자가 쿼리 스트링으로 접속할 때 전달한 정보 사용
// app.get('/topic', (req, res) => {
//     var topics = [
//         'Javascript is ...',
//         'Node.js is ...',
//         'Express is ...'
//     ];
//     var output = `
//         <a href="/topic?id=0">JavaScript</a><br>
//         <a href="/topic?id=1">Node.js</a><br>
//         <a href="/topic?id=2">Express</a><br><br>
//         ${topics[req.query.id]}
//     `
//     res.send(output);
// });

//
app.get('/topic/:id', (req, res) => {
    var topics = [
        'Javascript is ...',
        'Node.js is ...',
        'Express is ...'
    ];
    var output = `
        <a href="/topic/0">JavaScript</a><br>
        <a href="/topic/1">Node.js</a><br>
        <a href="/topic/2">Express</a><br><br>
        ${topics[req.params.id]}
    `
    res.send(output);
});

app.get('/topic/:id/:mode', (req, res) => {
    res.send(req.params.id+', '+req.params.mode);
});

app.get('/template', (req, res) => {
    res.render('temp', {title: 'Jade', time: Date()}); // temp라는 템플릿 호출 및 렌더링
});

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

