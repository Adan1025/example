const fs = require('fs');
const path = require('path');
import { exec } from 'child_process';
import renderHtml from './index-info';
import template from './template/html';
const renderer = async (data) => {
    try {
        let html = await renderHtml(data),
            { articleinfo: { title, id, docreader: description, content, articleType: { name } } } = data;
        let obj = {
            title,
            description,
            content,
            keywords: `天冰,天冰博客,${title},${name},${title.replace(/(\s*-\s*)/g, item => ',')}`
        }
        let str = template.replace(/(\{##([a-zA-Z0-9_$]+)##\})+/g, function (item) {
            item = item.replace('{##', '').replace('##}', '');
            return obj.hasOwnProperty(item) ? obj[item] : '';
        });
        fs.writeFileSync(`/static/article/tb_${id}.html`, str);
        exec('webpack', {
            cwd: __dirname,
            encoding: "utf8"
        }, function (err, stdout, srderr) {
            console.log('执行webpack完成')
            if (err) {
                console.log(err);
                return;
            }
        })
    } catch (e) {
        console.log(e);
    }
};
export default renderer;