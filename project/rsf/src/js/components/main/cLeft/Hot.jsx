import React, { Component } from 'react';
import 'Style/main/hot.scss';


export class HotComponent extends Component {
    state = {
        articleList: []
    }
    async componentDidMount() {
        let articleList = [];

        // let _t = 'Python2爬虫学习系列教程';
        // articleList = [1, 2, 3, 4, 5].map(item => {
        //     return {
        //         id: item,
        //         title: _t + item,
        //         praise: Math.floor(Math.random() * 50000)
        //     }
        // });

        this.setState({
            articleList: await this.findHotArticle()
        })
    }
    render() {
        let { articleList } = this.state,
            listStr = [];

        if (!articleList || articleList.length == 0) {
            return null
        }
        listStr = articleList.map(item => {
            return (
                <li className="c-hot-item" key={item.id}>
                    <a href="#">
                        <span className="c-hot-title">{item.title}</span>
                        <span className="c-hot-praise">{item.praise}</span>
                    </a>
                </li>
            )
        });
        return (
            <div className="c-box">
                <div className="c-box-header">热门排行</div>
                <div className="c-hot">
                    <ul className="c-hot-list">
                        {listStr}
                    </ul>
                </div>
            </div>
        );
    }
    async findHotArticle() {
        return Get(`/restapi/article/info/${this.props.match.params.id}`).then((results) => results);
    }
}
