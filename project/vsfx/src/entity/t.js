// 名称:类型:长度:是否为空:默认值:描述
const fs = require('fs');
let b = fs.readFileSync('./t1.js', 'utf8').split('\n').map(item => {
    let [name, type = 'string', length = 0, nullable = false, defaults = '', comments = ''] = item.split(':');
    if (!name) {
        return item;
    }
    if (name == 'id') {
        return `@PrimaryGeneratedColumn() \nid: number;\n\n`;
    }
    // return `\n@Column('${type}',${JSON.stringify(opt)})\n${name}:${type};\n`;
    let s = '@Column(\'' + trim(type) + '\',{ ';
    if (length) {
        s = s + 'length: ' + trim(length) + ',';
        console.log(s)
    }
    if (comments) {
        s = s + 'comment:\''
        console.log(s)
        s = s + trim(comments)
        console.log(s)
        s = s + '\',';
        console.log(s)
    }
    // if (nullable) {
    //     s += `nullable: ${trim(nullable)},`;
    // }
    // if (defaults) {
    //     if (type == 'string') {
    //         s += 'default:\' ' + trim(defaults) + '\',';
    //     } else {
    //         s += 'default:' + trim(defaults) + ',';
    //     }
    // }
    console.log('\n\n')
    s = s.slice(0, -1)
    return s + '})\n' + trim(name) + ':' + trim(type) + ';\n\n';
});

function trim(str) {
    return str;
    return str.replace(/ /g, '');
}
console.log('----')
console.log(b.join(''))
