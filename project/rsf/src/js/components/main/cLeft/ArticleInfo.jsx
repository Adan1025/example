import React, { Component } from 'react';
import { Get } from '@/axios';

import 'Style/main/articleInfo.scss';
import { MenuGeneratoe } from '../../global/menuGenerator';

export class ArticleInfoComponent extends Component {
    state = {
        article: { content: '' }
    }
    async componentDidMount() {
        this.setState({
            article: await this.findArticleInfoData()
        })
    }
    render() {
        let { article } = this.state,
            isInfo = !!article.id;

        return (
            // <MenuGeneratoe content={article.content} /> 
            <div className="c-articleinfo">
                <h1 className={`${isInfo ? '' : 'white-seat white-seat-title'} c-articleinfo-title`}>
                    {article.title}
                </h1>
                <div className="c-articleinfo-meta">
                    <span>
                        发表于：<span className={`${isInfo ? '' : 'white-seat'} c-articleinfo-meta-publishDate`}>{article.publishDate}</span>
                    </span>
                    <span>分类：<span className={`${isInfo ? '' : 'white-seat'} c-articleinfo-meta-atype`}>{article.articleTypeName}</span>
                    </span>
                    <span>阅读次数：<span className={`${isInfo ? '' : 'white-seat'} c-articleinfo-meta-visitors`}>{article.visitors}</span>
                    </span>
                </div>
                <div
                    className={`${isInfo ? '' : 'white-seat'} c-articleinfo-content`}
                    dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
        );
    }
    async findArticleInfoData() {
        return Get(`/restapi/article/info/${this.props.match.params.id}`).then((results) => results);
    }
}
