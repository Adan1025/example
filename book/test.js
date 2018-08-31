const qs = require('qs');
let a = qs.parse('a=1&b=1', { allowPrototypes: true });
console.log(a)