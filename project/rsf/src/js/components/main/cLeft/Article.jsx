import React, { Component } from 'react';
import 'Style/main/article.scss';
import { Link } from 'react-router-dom';
import { Get } from '@/axios';

import { HotComponent } from './Hot';
import { CircleComponent } from '../../global/Circle';
import { ScrollComponent } from '../../global/Scroll';


export class ArticleComponent extends Component {
    pathReg = new RegExp('\/([^/]*).*')
    typeEnum = ['', 'article', 'note']
    state = {
        currPage: 0,
        pageSize: 5,
        isNext: true,
        type: 0,
        articleList: []
    }
    async componentDidMount() {
        let { pathname } = this.props.location;
        let type = this.typeEnum.indexOf(pathname.replace(this.pathReg, '$1'));
        this.setState({ type });
        this.findArticleData(type)
    }
    render() {
        let { articleList, type, isNext, currPage } = this.state,
            listStr = [];

        if (!articleList || articleList.length == 0 || currPage == 0) {
            return <CircleComponent />;
        }
        console.log(articleList)
        listStr = articleList.map(item => {
            return (
                <div className="c-box" key={item.id}>
                    <Link to={`/info/${item.id}`} className="c-article" >
                        <div className="c-article-header">
                            <span className="c-article-type">{item.articleTypeName}</span>
                            <span className="c-article-title">{item.title}</span>
                        </div>
                        <div className="c-article-main">{item.type}
                            <img src={item.type == '2' ? require('Img/note.jpg') : item.picture} alt="" />
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
                </div>
            )
        });
        return (
            <div id="articleList" className="c-left" >
                <HotComponent type={type} />
                <ScrollComponent load={this.nextPage.bind(this)} isNext={isNext}>
                    {listStr}
                </ScrollComponent>
            </div>
        );
    }

    findArticleData(_type) {
        let { type, currPage, articleList } = this.state;
        type = _type || type;
        console.log(this.state)
        let params = this.getPageParams()
        return Get(`/restapi/article/findAll?type=${type}${params ? params : ''}`).then((results) => {
            let isNext = true;
            if (results.articleList.length == 0) {
                isNext = false;
            }
            console.log()
            this.setState({
                isNext,
                currPage: currPage + 1,
                articleList: articleList.concat(results.articleList)
            });
        });
    }
    getPageParams() {
        let { currPage, pageSize } = this.state;
        return `&currPage=${currPage + 1}&pageSize=${pageSize}`;
    }
    nextPage() {
        this.findArticleData()
    }
}
