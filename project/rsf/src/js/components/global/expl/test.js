var a = `<h1 class="mume-header" id="http10">http/1.0</h1>

<h2 class="mume-header" id="keep-alive">Keep-Alive</h2>

<p>客户端通过包含<code>Connection: Keep-Alive</code>首部请求将一条连接保持在打开状态， 如果服务器包含湘潭的首部，表示服务端支持keep-alive，如果不包含，则在发回响应报文之后关闭链接</p>
<h4 class="mume-header" id="%E5%8F%82%E6%95%B0">参数</h4>
<h4 class="mume-header" id="%E5%8F%82%E6%95%B0">参数</h4>

<ol>
<li>timeout: 响应首部定义。它估计了故武器希望将链接保持在活跃状态的时间。</li>
<li>max: 响应首部定义。保持多少个链接为活跃状态。</li>
<li>自定义: key[=value]格式，一般用于调试</li>
</ol>
<h3 id="qq">qqqqqqqqq</h3>
<h4 id="44">4444444</h4>
<h4 id="445">4444444</h4>
<h2 id="bbb">bbbb</h2>
<h4 id="ada">ddddd</h4>
<pre data-role="codeBlock" data-info="bash" class="language-bash">Connection: Keep-Alive
Keep-Alive: max<span class="token operator">=</span>1, timeout<span class="token operator">=</span>120, name<span class="token operator">=</span>qualc
</pre>
      </div>`,
    hReg = /<h\d[^>]*>(.*?)<\/h\d>/g;
iReg = /<h(\d)[\w\S -]*id=([^ ]+)[^>]+>([^<]+)<\/h\d.*/

function getLevel(type, arr) {
    let arrs = arr.concat().reverse(), level = type;
    console.log
    for (let i = 0; i < arrs.length; i++) {
        if (type >= +arrs[i].type) {
            level = arrs[i].level;
            break;
        }
    }
    return level;
}
function genterator(content) {
    let HLabel = [], prevType = 0, prevLevel = 0;
    content.match(hReg).forEach(item => {
        let [, type, id, value] = item.match(iReg),
            child = [],
            itemObj = {
                type,
                value,
                level: prevLevel
            };
        // console.log(prevType, +type, +type < prevType, +type > prevLevel);
        if (+type < prevType) { // 父
            // itemObj.level = --prevLevel;
            itemObj.level = getLevel(+type, HLabel);
            prevLevel = itemObj.level;
        } else if (+type > prevType) {// 子
            itemObj.level = ++prevLevel;
        }
        prevType = +type;
        HLabel.push(itemObj);
    });
    return HLabel;
}
let HLabel = genterator(a), prevLevel = 0,
    html = [`<ul>`];

let i = 0, j = 0;
HLabel.forEach((item) => {
    console.log(item.level, prevLevel)
    if (item.level < prevLevel) {
        j++
        html.push(`</ul>`);
    }
    if (item.level > prevLevel && prevLevel != 0) {
        i++
        html.push(`<ul>`);
    }
    html.push(`<li>`);
    html.push(item.value);
    html.push(`</li>`);
    prevLevel = item.level;
});
for (var k = 0; k < i - j; k++) {
    html.push(`</ul>`);
}
html.push(`</ul>`);
// console.log(i, j)
console.log(html.join(''));