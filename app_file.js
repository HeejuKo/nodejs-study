var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.urlencoded({ extended: false })); // 미들웨어

app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

app.listen(3000, () => {
    console.log('Connected, 3000 port!');
});

app.get('/topic/new', (req, res) => {
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics: files});
    });
});

app.get(['/topic', '/topic/:id'], (req, res) => { // express: 배열로 여러 경로 입력 가능
    fs.readdir('data', (err, files) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id) {
            // id 값이 있을 때
            fs.readFile('data/'+id, 'utf-8', (err, data) =>{ 
                if(err) {
                    console.log(err);
                    return res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics: files, title: id, description: data});
            });
        } else {
            // id 값이 없을 때
            res.render('view', {topics: files, title: 'Welcome', description: 'Hello, JavaScript for server.'});
        }
    })
});

app.post('/topic', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('data/'+title, description, (err) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
});