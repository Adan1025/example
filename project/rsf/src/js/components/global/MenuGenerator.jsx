import React, { Component } from 'react';
import 'Style/global/menuGenerator'
export class MenuGeneratoe extends Component {
    hReg = /<h\d[^>]*>(.*?)<\/h\d>/g;
    iReg = /<h(\d)[\w\S -]*id=([^ ]+)[^>]+>([^<]+)<\/h\d.*/
    constructor(props) {
        super(props);
        this.state = {
            HLabel: [],
            content: props.content
        }
    }
    render() {
        let HLabel = this.genterator(),
            prevLevel = 0,
            html = [`<ul>`];
        let gt = 0, lt = 0;
        HLabel.forEach((item) => {
            if (item.level < prevLevel) {
                lt++
                html.push(`</ul>`);
            }
            if (item.level > prevLevel && prevLevel != 0) {
                gt++
                html.push(`<ul>`);
            }
            html.push(`<li>`);
            html.push(item.value);
            html.push(`</li>`);
            prevLevel = item.level;
        });
        for (var k = 0; k < gt - lt; k++) {
            html.push(`</ul>`);
        }
        html.push(`</ul>`);
        return (
            <div dangerouslySetInnerHTML={{ __html: html.join('') }} />
        );
    }
    genterator() {
        let { content } = this.state;
        let HLabel = [], prevType = 0, prevLevel = 0;
        content && (content).match(this.hReg).forEach(item => {
            let [, type, id, value] = item.match(this.iReg),
                child = [],
                itemObj = {
                    type,
                    value,
                    level: prevLevel
                };
            // console.log(prevType, +type, +type < prevType, +type > prevLevel);
            if (+type < prevType) { // 父
                itemObj.level = this.getLevel(+type, HLabel);
                prevLevel = itemObj.level;
            } else if (+type > prevType) {// 子
                itemObj.level = ++prevLevel;
            }
            prevType = +type;
            HLabel.push(itemObj);
        });
        return HLabel;
    }
    componentWillReceiveProps({ content }) {
        this.setState({ content })
    }
    getLevel(type, arr) {
        let arrs = arr.concat().reverse(), level = type;
        for (let i = 0; i < arrs.length; i++) {
            if (type >= +arrs[i].type) {
                level = arrs[i].level;
                break;
            }
        }
        return level;
    }
}
