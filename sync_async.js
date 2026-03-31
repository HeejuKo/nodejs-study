var fs = require('fs');

// Sync
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);

// Async
console.log(2);
fs.readFile('data.txt', {encoding:'utf8'}, function(err, data){
    console.log(3);
    console.log(data);
})
console.log(4);
// 출력 순서: 2->4->3->data
// 파일을 완전히 읽은 후 data에 넣고 function(3, data 출력) 실행