
import { Service } from '../@common';
import { BaseServiceInterface } from './BaseService.d';
@Service()
export class BaseService implements BaseServiceInterface {
    getRepository;

    /**
     *根据id获取
     *
     * @param {number} id
     * @memberof BaseService
     */
    async findAnyById(Model: any, id: number) {
        return await this.getRepository(Model).find(id);
    }
    /**
     * 添加或保存
     * 
     * @param {Article} article 
     * @memberof ArticleInterface
     */
    async saveOrUpdateAny(Model: any, article: any) {
        // save() 会先发起请求验证，来判断是添加或者修改
        // let exe = await this.getRepository(Model).save(article);
        if (article.id) {
            await this.getRepository(Model).update(article.id, article);
        } else {
            await this.getRepository(Model).insert(article);
        }
        return '操作成功';
    }

    /**
     * 逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async disabledAny(Model: any, id: number) {
        await this.getRepository(Model).updateById(id, { disabled: 0 });
        return '操作成功';
    }
    /**
     * 恢复逻辑删除
     * 
     * @param {(number | Article)}
     * @memberof ArticleInterface
     */
    async publishAny(Model: any, id: number) {
        await this.getRepository(Model).updateById(id, { disabled: 1 });
        return '操作成功';
    }

    /**
     * 物理删除
     * 
     * @param {(number | Article)} any 
     * @memberof ArticleInterface
     */
    async deletedAny(Model: any, id: number) {
        await this.getRepository(Model).removeById(id);
        return '操作成功';
    }

}