<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" class="form-box">
            <el-form-item label="用户名">
                <el-input v-model="formInline.userName" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="formInline.nickName" placeholder="昵称"></el-input>
            </el-select>
            </el-form-item><el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <div class="table-box">
            <el-table :data="articleList" stripe border style="width: 100%" max-height="40px">
                <el-table-column fixed prop="title" label="标题" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userName" label="作者"  width="140"></el-table-column>
                <el-table-column prop="articleTypeName" label="类型"  width="140"></el-table-column>
                <el-table-column prop="labelIds" label="标签" width="140" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="185"></el-table-column>
                <el-table-column prop="publishTime" label="发布时间" width="185"></el-table-column>
                <el-table-column prop="docreader" label="概述" width="220" show-overflow-tooltip></el-table-column>
                <el-table-column fixed="right" label="操作" width="320">
                    <template  slot-scope="scope">
                    <el-button
                      size="small"
                      type="info"
                      @click="handlerDelete(scope.$index, scope.row)">详情</el-button>
                    <el-button
                      size="small"
                      type="info"
                      @click="handlerDelete( scope.row)">修改</el-button>
                    <el-button
                      size="small"
                      type="info"
                      @click="handlerPublish(scope.row, scope.$index)">发布</el-button>
                    <el-button
                      size="small"
                      type="info"
                      @click="handlerDelete(scope.$index, scope.row)">下线</el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handlerDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
const HttpUrl = {
    findArticleAll: '/manage/article/system/findAllRole',
    againPublishArticle: '/manage/article/againPublishArticle'
}
export default {
    data(){
        return {
            formInline: {
                userName: '',
                nickName: ''
            },
            articleList: []
        }
    },
    created(){
        this.loadArticleList();
    },
    methods:{
        loadArticleList(){
            this.$.get(HttpUrl.findArticleAll).then( res => {
                this.articleList = res.results;
            });
        },
        // 发布
        // handlerPublish(item){
        //     this.$.get(`${HttpUrl.againPublishArticle}?id=${item.id}`, {id: item.id}).then( res => {
        //         console.log(res)
        //     });
        // },
        handlerEdit(){

        }
    }
}
</script>
<style scoped lang="scss" type="text/css">
    @import '../../../css/components/list.scss';
</style>