// let a = (new Buffer('305993897@qq.com')).toString('base64')
// console.log(a);

const fs = require('fs');
var str = '123';
var pubkey = Buffer.from(str, 'base64');
console.log('data:image/jpeg;base64,' + pubkey)
fs.writeFile('./a.jpg', pubkey, 'base64', function (err) {
    if (err) { console.log(err) }
});