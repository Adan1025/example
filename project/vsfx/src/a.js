
const fs = require('fs');
const pnglib = require('pnglib');


var p = new pnglib(80, 30, 8); // width,height,numeric captcha
p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
for (var i = 0; i < 50; i++) {
    let index = p.index(2, i);
    for (var j = 0; j < 30; j += 2) {
        j == i ? p.buffer[index + j] = '\x01' : null;
    }
}
var img = p.getBase64();
var imgbase64 = new Buffer(img, 'base64');
fs.writeFile('./a.jpg', imgbase64, function () { })