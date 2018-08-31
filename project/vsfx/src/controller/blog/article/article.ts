import { Controller, Get } from '../../../@common';
import { isNotInteger } from '../../../@common/utils';
import { ArticleService } from '../../../service/article/article';
// import { Article } from '../../../entity/article';
// import { ArticleType } from '../../../entity/articleType';
// import { Users } from '../../../entity/users';

/**
 * 文章controller
 * 
 * @export
 * @class ArticleController
 */
const articleService = new ArticleService();
@Controller('/article')
export class ArticleController {
    /**
     * 获取文章列表
     * 
     * @param {any} { query } 
     * @param {any} res 
     * @memberof ArticleController
     */
    @Get('/findAll')
    async findAllArticle({ query: { articleTypeId, type, identity, currPage = 1, pageSize = 15 } }, res) {
        if (articleTypeId && isNotInteger(articleTypeId)) {
            return res.sendError('分类type类型错误');
        }
        if (currPage && isNotInteger(currPage)) {
            return res.sendError('入参异常类型错误');
        }
        if (pageSize && isNotInteger(pageSize)) {
            return res.sendError('入参异常类型错误');
        }
        res.sendSuccess(await articleService.findAllArticle({ articleTypeId, type, identity, currPage, pageSize }));
    }

    @Get('/findHot')
    async findHotArticle({ query: { identity = '' } }, res) {
        let [articleList, noteList] = await Promise.all([articleService.findHotArticle(1, identity), articleService.findHotArticle(2, identity)]);
        res.sendSuccess({
            articleList,
            noteList
        })
    }

    /**
     * 根据id获取一篇文章
     * 
     * @param {any} { params } 
     * @param {any} res 
     * @memberof ArticleController
     */
    @Get('/info/:id')
    async getArticleInfoById({ params: { id } }, res) {
        if (isNotInteger(+id)) {
            res.sendError('入参类型错误')
        } else {
            let article = await articleService.getArticleInfoById(id);
            res.sendSuccess(article);
        }
    }
}