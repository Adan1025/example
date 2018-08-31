import React, { Component } from 'react';
import 'Style/main/topic.scss';


export class TopicComponent extends Component {
    state = {
        articleList: []
    }
    componentDidMount() {

    }
    render() {
        return <div></div>
        return (
            <div className="c-box">
                <div className="c-box-header">热门专题</div>
                <div className="c-topic">
                    <div className="c-topic-item">
                        <img src={require('Img/t.jpg')} />
                        <p>Python2爬虫学习系列教程</p>
                    </div>
                </div>
            </div>
        );
    }
}
