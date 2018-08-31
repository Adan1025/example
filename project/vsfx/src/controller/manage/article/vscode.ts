import { Controller, Get, Post, isInteger, Crypto, isNotEmpty, NoInterceptors } from '../../../@common';

import { Only, isNotInteger, isEmpty, isFalse, Format } from '../../../@common/utils';
import { ArticleService } from '../../../service/article/article';
import { UsersService } from '../../../service/users/users';
import { UsersInterfaceService } from '../../../service/users/usersInterface';
import { Article } from '../../../entity/article';
import { ArticleType } from '../../../entity/articleType';
import { Users } from '../../../entity/users';
import { ArticleTypeService } from '../../../service/article/articleType';
import { ArticleSeriesService } from '../../../service/article/articleSeries';
import { ArticleSeries } from 'entity/articleSeries';


const articleService = new ArticleService();
const usersService = new UsersService();
const articleTypeService = new ArticleTypeService();
const articleSeriesService = new ArticleSeriesService();
let usersInterfaceService = new UsersInterfaceService();
/**
 * 文章controller
 * 
 * @export
 * @class ArticleController
 */
@Controller('/vsarticle')
@NoInterceptors()
export class ArticleController {
    @Post('/savea')
    // @Validation(ArticleCreateDto)
    async saveArticleInfo(req, res, next) {
        let { body } = req;
        let loginUsers = await this.checkUserInfo(req, res, next);
        if (!loginUsers) {
            return next();
        }

        let article = <Article>{};

        let typeId = await this.checkArticleType(req, res, next);
        if (!typeId) {
            return next();
        } else {
            let articleType = <ArticleType>{};
            articleType.id = typeId;
            articleType.name = body.articleType;
            article.articleType = articleType;
        }

        let seriesId = await this.checkArticleSeries(req, res, next);
        if (!seriesId) {
            return next();
        } else if (seriesId != true) {
            let articleSeries = <ArticleSeries>{};
            articleSeries.id = seriesId;
            article.articleSeries = articleSeries;
        }
        if (isNotEmpty(body.id)) {
            if (isInteger(body.id)) {
                article.id = body.id;
            } else {
                return res.sendError('id入参类型异常');
            }
        }
        if (isEmpty(body.title) || (body.title.length > 50)) {
            return res.sendError('标题长度必须为1-50个字符');
        }
        if (isEmpty(body.content)) {
            return res.sendError('内容不能为空');
        }
        // if (isNotInteger(body.articleTypeId)) {
        //     return res.sendError('articleTypeId类型异常');
        // }
        let users = <Users>{};
        try {
            users.id = loginUsers.id;
        } catch (e) {
            users.id = 2;
        }
        article.users = users;
        Object.assign(article, Only(body, ['title', 'content', 'pricture', 'docreader', 'labelId', 'publishDate', 'type']))

        if (article.type == 1) {
            if (isEmpty(article.picture)) {
                // return res.sendError('题图不能为空');
            }
        }
        let nowTime = Format.date(new Date(), 'yyyy-MM-dd hh:mm:ss');
        if (!article.publishDate) {
            article.publishDate = nowTime;
        }
        if (!article.id) {
            article.createDate = nowTime;
        }
        if (!article.docreader || !article.docreader.replace(/\s/g, '')) {
            // let docreader = article.content;
            // docreader = docreader.replace(/(\&|\&)gt;/g, ">")
            //     .replace(/(\&|\&)lt;/g, "<")
            //     .replace(/(\&|\&)quot;/g, "\"");
            // article.docreader = docreader.replace(/\<[^\>]+\>|\< ?\/[^\>]+\>/g, '').substr(0, 200);
        }
        article.picture = body.picture;
        let lastId = await articleService.saveOrUpdateAndGetId(article);
        res.sendSuccess({ lastId });
    }

    async checkUserInfo(req, res, next) {
        let { body: { users: { email, password: upass } } } = req;
        if (isEmpty(email)) {
            res.sendError('邮箱地址不能为空');
            return false;
            // return '邮箱地址不能为空';
        }
        var users = await usersService.getUsersLogin({ email });
        if (users.id) {
            let { password } = users;
            password = Crypto.aesDecryptPipe(password);
            if (password != upass) {
                res.sendError('用户名或密码不正确');
                return false;
                // return '用户名或密码不正确';
            }

        } else {
            res.sendError('用户名不存在');
            return false;
            // return '用户名不存在'
        }
        try {
            let interfaceList = await usersInterfaceService.getInterfaceListByRoleId(users.usersRoleId);
            let interUrl = req.baseUrl + req.route.path;
            let _interceptor = interfaceList.some(item => interUrl == item.interfaceUri);
            // url不在menu列表中
            if (!_interceptor) {
                res.sendError('暂无访问权限', 996);
                return false;
            }
        } catch (e) {
            console.log('登录获取权限失败:' + e.message);
            res.sendError('获取权限失败', 996);
            return false;
        }
        return users;
    }

    async checkArticleType(req, res, next) {
        let { body: { articleType } } = req;
        if (!articleType) {
            res.sendError('文章类型不能为空');
            return false;
        }
        let typeId = await articleTypeService.findIdByTypeName(articleType);
        if (!typeId) {
            let typesList = await articleTypeService.findByTypeName(articleType);
            if (typesList.length > 0) {
                let types = typesList.map((item: ArticleType) => item.name);
                res.sendError('类型不存在，找到相似类型有: ' + (types.join()));
            } else {
                res.sendError('类型不存在');
            }
            return false;
        }
        return typeId;
    }

    async checkArticleSeries(req, res, next) {
        let { body: { seriesName } } = req;
        if (!seriesName) {
            return true;
        }
        let seriesId = await articleSeriesService.findIdBySeriesName(seriesName);
        if (!seriesId) {
            let seriesList = await articleSeriesService.findBySeriesName(seriesName);
            if (seriesList.length > 0) {
                let series = seriesList.map((item: ArticleSeries) => item.name);
                res.sendError('系列不存在，找到相似系列有: ' + (series.join()));
            } else {
                res.sendError('系列不存在');
            }
            return false;
        }
        return seriesId;
    }
    @Post('/savet')
    // @Validation(ArticleCreateDto)
    async saveArticleTypeInfo({ body, session }, res) {
        var articleType = <ArticleType>{};
        if (isNotEmpty(body.id)) {
            if (isInteger(body.id)) {
                articleType.id = body.id;
            } else {
                return res.sendError('id入参类型异常');
            }
        }
        if (isEmpty(body.name) || (body.name.length > 25)) {
            return res.sendError('类型标题长度必须为1-25个字符');
        }
        articleType.name = body.name;
        res.sendSuccess(await articleTypeService.saveOrUpdateArticleType(articleType));
    }
    @Post('/saves')
    // @Validation(ArticleCreateDto)
    async saveArticleSeriesInfo({ body, session }, res) {
        var articleSeries = <ArticleSeries>{};
        if (isNotEmpty(body.id)) {
            if (isInteger(body.id)) {
                articleSeries.id = body.id;
            } else {
                return res.sendError('id入参类型异常');
            }
        }
        if (isEmpty(body.name) || (body.name.length > 25)) {
            return res.sendError('系列标题长度必须为1-25个字符');
        }
        articleSeries.name = body.name;
        res.sendSuccess(await articleSeriesService.saveOrUpdateArticleSeries(articleSeries));
    }
}