<template>
    <div class="container">
        <el-form class="form-box article" label-width="80px">
            <el-form-item label="标题:">
                <el-input v-model="article.title" class="width50" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label分="类:">
                <el-select class="width50" v-model="article.articleTypeId" placeholder="请选择分类" @change="articleTypeChangeHandle">
                    <el-option v-for="item in articleType" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="概要:">
                <el-input type="textarea" v-model="article.docreader" placeholder="请输入概要"></el-input>
            </el-form-item>
            <el-form-item label="类型:">
                <el-radio-group v-model="article.type">
                    <el-radio :label="1">文章</el-radio>
                    <el-radio :label="2">短记</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="题图:" v-if="article.type != 2" class="headimg-box">
                <el-select class="width50" v-model="article.picture" placeholder="请选择题图">
                    <el-option v-for="item in pictureList" :key="item.id" :label="item.name" :value="item.imgUrl">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="" ref="picture" v-if="article.type != 2" class="headimg-box">
                <el-upload drag class="avatar-uploader" action="/manage/picture/upload" :data="picture" :show-file-list="false" :on-success="uploadSuccess" :on-error="uploadError">
                    <div class="avatar-box" v-if="article.picture">
                        <img :src="article.picture" class="avatar-headimg">
                    </div>
                    <div class="el-upload__tip" slot="tip">
                        <div class="el-upload__text">将文件拖到虚框，或点击虚框上传。 <el-checkbox v-model="picture.used">是否设为常用</el-checkbox>
                        </div>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="编辑:">
                <template>
                    <el-radio v-model="editType" label="edit">富文本</el-radio>
                    <el-radio v-model="editType" label="text">纯文本</el-radio>
                </template>
            </el-form-item>
            <el-form-item label="正文:">
                <!-- <vue-editor v-model="article.content" placeholder="请输入正文"></vue-editor> -->
                <!-- <mavon-editor v-model="article.content" :ishljs="true" @change="formatContent"
                    :editable="false" :toolbarsFlag="false" :defaultOpen="'preview'" :subfield="false"
                ></mavon-editor> -->
                <div v-if="editType == 'text'">
                    <el-input type="textarea" :rows="18" placeholder="请输入内容" v-model="article.content">
                    </el-input>
                </div>
                <quill-editor v-model="article.content" v-else ref="myQuillEditor">
                </quill-editor>
            </el-form-item>
            <el-form-item label="发布时间:">
                <el-date-picker v-model="article.publishDate" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item class="article-input article-label">
                    <el-tag
                      v-for="item in articleLabel"
                      :key="item.id"
                      :closable="true"
                      :type="'primary'"
                      >{{item.name}}</el-tag>
            </el-form-item> -->
            <el-form-item class="article-input">
                <el-button @click="resetArticle">重置</el-button>
                <el-button type="primary" @click="saveArticle">确认发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
const HttpUrl = {
    findArticleTypeAll: "/manage/articletype/findAll",
    pulishArticle: "/manage/article/saveOrUpdate",
    findArticleInfo: "/manage/article/info/",
    findPictureAll: "/manage/picture/all"
};
import CommFunc from "@common/CommFunc.js";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

// import mavonEditor from 'mavon-editor'
// markdown-it对象：md.s_markdown, md => mavonEditor实例
//                 or
//                 mavonEditor.markdownIt
// import 'mavon-editor/dist/css/index.css'
//
export default {
    components: {
        quillEditor
        // 'mavon-editor': mavonEditor.mavonEditor
    },
    data() {
        return {
            article: {
                id: 0,
                title: "",
                content: "",
                picture: "",
                docreader: "",
                articleTypeId: "",
                // labelId:[],
                publishDate: "",
                type: 1 //文章或短记
            },
            editType: "edit",
            infoImer: null,
            picture: {
                used: 1,
                name: "",
                noPage: true,
                vague: true
            },
            articleType: [],
            pictureList: []
        };
    },
    created() {
        let { id } = this.$route.params;
        this.article.id = id || 0;
        this.loadArticleType().then(() => {
            this.loadArticleInfo();
        });
        this.loadPicturAll();
        this.getCacheInfo();
        if (!this.article.id) {
            this.infoImer = setInterval(() => {
                this.cacheInfo();
            }, 10000);
        }
    },
    methods: {
        formatContent(mdCode, hmCode) {
            console.log(hmCode);
        },
        cacheInfo() {
            CommFunc.setSessionStorage(
                "__CACHE_ARTICLE_PUBLUISH",
                this.article
            );
        },
        getCacheInfo() {
            if (!this.article.id) {
                let article = CommFunc.getSessionStorage(
                    "__CACHE_ARTICLE_PUBLUISH"
                );
                if (CommFunc.isObject(article)) {
                    this.article = article;
                } else {
                    this.clearCacheInfo();
                }
            } else {
                this.clearCacheInfo();
            }
        },
        clearCacheInfo() {
            CommFunc.removeSessionStorage("__CACHE_ARTICLE_PUBLUISH");
        },
        checkLabel({ target }) {
            target.className += " cur";
        },
        uploadSuccess(data) {
            try {
                if (data.status == 1) {
                    this.article.picture = data.results;
                } else {
                    this.$alert(data.errmsg, "上传图片异常", {
                        confirmButtonText: "确定"
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        uploadError(err) {
            this.$alert(err.message, `上传图片异常:${err.status}`, {
                confirmButtonText: "确定"
            });
        },
        changePicture(value) {
            this.article.picture = value;
        },
        loadArticleType() {
            return this.$.get(HttpUrl.findArticleTypeAll).then(results => {
                this.articleType = results;
            });
        },
        loadArticleInfo() {
            let id = this.article.id;
            if (id) {
                this.$.get(`${HttpUrl.findArticleInfo}${id}`).then(results => {
                    this.article = results;
                });
            }
        },
        loadPicturAll() {
            this.$.get(`${HttpUrl.findPictureAll}`, this.picture).then(
                results => {
                    this.pictureList = results.pictureList;
                }
            );
        },
        articleTypeChangeHandle(typeId) {
            let obj = {};
            obj = this.articleType.find(item => {
                return item.id === typeId;
            });
            this.picture.name = obj.name;
        },
        saveArticle() {
            this.$.post(HttpUrl.pulishArticle, this.article).then(errmsg => {
                this.clearCacheInfo();
                this.$alert(errmsg, "上传文章成功", {
                    confirmButtonText: "确定",
                    callback: () => {
                        // location.reload();
                        this.$router.push("/article/articleList");
                    }
                });
            });
        },
        resetArticle() {
            this.clearCacheInfo();
            this.article = {
                title: "",
                content: "",
                picture: "",
                docreader: "",
                articleTypeId: "",
                publishDate: "",
                type: 1
            };
        }
    },
    watch: {
        // "article.type"(curVal, oldVal) {
        // if(curVal == 2) {
        //     this.$refs.picture.$el.style.display = 'none';
        // } else {
        //     this.$refs.picture.$el.style.display = 'block';
        // }
        // },
        "picture.name"() {
            this.loadPicturAll();
        },
        $route() {
            this.article = {
                id: 0,
                title: "",
                content: "",
                picture: "",
                docreader: "",
                articleTypeId: "",
                publishDate: "",
                type: 1 //文章或短记
            };
            this.loadArticleInfo();
        }
    },
    beforeDestroy() {
        clearInterval(this.infoImer);
    }
};
</script>
<style lang="scss" scoped type="text/css">
@import "../../../css/components/article/article.pulish.scss";
</style>
<style lang="scss" type="text/css">
.quill-editor {
    .ql-container.ql-snow {
        overflow-y: scroll;
        height: 300px;
    }
}
</style>