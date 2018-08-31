import React, { Component } from 'react';
import 'Style/main/article.scss';
import { Link } from 'react-router-dom';
import { Get } from '@/axios';

import { HotComponent } from './Hot';


export class ArticleComponent extends Component {
    state = {
        articleList: []
    }
    async componentDidMount() {
        this.setState({
            articleList: await this.findArticleData()
        })
    }
    render() {
        let { articleList } = this.state,
            listStr = [];

        if (!articleList || articleList.length == 0) {
            listStr.push('loding...');
        } else {
            listStr = articleList.map(item => {
                return (
                    <div className="c-box" key={item.id}>
                        <Link to={`/info/${item.id}`} className="c-article" >
                            <div className="c-article-header">
                                <span className="c-article-type">{item.articleTypeName}</span>
                                <span className="c-article-title">{item.title}</span>
                            </div>
                            <div className="c-article-main">
                                <img src={item.picture} alt="" />
                                {/* <img src={require('Img/t.jpg')} alt=""/> */}
                                <div className="c-article-content">
                                    {item.docreader}
                                </div>
                            </div>
                            <div className="c-article-meta">
                                <span>作者：{item.nickName}</span>
                                <span>发表于：{item.publishDate}</span>
                                <span>阅读次数：{item.visitors}</span>
                            </div>
                        </Link>
                    </div >
                )
            })
        }
        return (
            <div id="articleList" className="c-left" >
                <HotComponent />
                {listStr}
            </div>
        );
    }

    async findArticleData() {
        return Get('/restapi/article/findAll').then((results) => results.articleList);
    }
}
