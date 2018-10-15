<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" class="form-box">
            <el-form-item label="标题">
                <el-input v-model="formInline.title" placeholder="标题"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="table-box">
			<el-form :inline="true" class="form-box">
				<el-button size="mini" @click="typeListVisible = true">查看类型</el-button>
				<el-button size="mini" @click="typeInfoVisible = true">新增类型</el-button>
			</el-form>
			<el-table :data="articleList" stripe border height="480" v-loading="loading.articleList">
				<el-table-column fixed type="index"></el-table-column>
				<el-table-column prop="title" label="标题" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="articleTypeName" label="分类"  width="120"></el-table-column>
				<el-table-column prop="type" :formatter="typeStr" label="类型" width="80" show-overflow-tooltip></el-table-column>
				<el-table-column prop="publishDate" label="发布时间" width="185" :default-sort = "{prop: 'date', order: 'descending'}"></el-table-column>
				<el-table-column prop="docreader" label="概述" width="220" show-overflow-tooltip></el-table-column>
				<el-table-column prop="disabled" label="状态" :formatter="disabledStr"  width="80">
				<template slot-scope="scope">
					<el-tag
					:type="scope.row.disabled === 1 ? 'primary' : 'info'"
					close-transition>{{scope.row.disabled | disabledStr}}</el-tag>
				</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="210">
					<template slot-scope="scope">
						<el-button
						size="small"
						icon="el-icon-edit"
						@click="handlerEdit(scope.row)"></el-button>
						<el-button v-if="scope.row.disabled == 0"
						size="small"
						type="info"
						icon="el-icon-circle-check-outline"
						@click="handlerPublish(scope.row)">发布</el-button>
						<el-button v-if="scope.row.disabled == 1"
						size="small"
						type="primary"
						icon="el-icon-circle-close-outline"
						@click="handlerDisabled(scope.row)">下线</el-button>
						<el-button
						size="small"
						type="danger"
						icon="el-icon-delete"
						@click="handlerDelete(scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="table-box" style="float: right">
			<el-pagination
				@size-change="handlerSizeChange"
				@current-change="handlerAgination"
				:current-page="formInline.currPage"
				:page-sizes="[20, 50, 100, 200]"
				:page-size="formInline.currPage"
				layout="total, sizes, prev, pager, next, jumper"
				:total="formInline.total"></el-pagination>
		</div>
		<el-dialog
		:title="typeTitle"
		:visible.sync="typeListVisible"
		width="440px"
		:before-close="handlerCloseTypeList">
		<div>
			<el-table :data="articleTypeList" stripe border v-loading="loading.articleTypeList">
					<el-table-column type="index" align="center" ></el-table-column>
					<el-table-column prop="name" align="center" label="分类名称"  width="191"></el-table-column>
					<el-table-column fixed="right" align="center" label="操作" width="160">
						<template slot-scope="scope">
							<el-button
							size="small"
							icon="el-icon-edit"
							@click="toUpdateAType(scope.row)"></el-button>
							<el-button
							size="small"
							type="danger"
							icon="el-icon-delete"
							@click="handlerDeleteAType(scope.row)"></el-button>
						</template>
					</el-table-column>
				</el-table>

		</div>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="typeListVisible = false">确 定</el-button>
		</div>
		</el-dialog>

		<el-dialog
		:title="typeTitle"
		:visible.sync="typeInfoVisible"
		width="360px"
		:before-close="handlerCloseTypeInfo">
			<el-form class="form-box article"  label-width="60px">
				<el-form-item label="名称:">
					<el-input v-model="articleType.name"  class="width50" placeholder="请输入分类名称"></el-input>
				</el-form-item>
			</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="typeInfoVisible = false">取 消</el-button>
			<el-button type="primary" @click="saveArticleType">确 定</el-button>
		</div>
		</el-dialog>
	</div>
</template>
<script>
const HttpUrl = {
  findArticleAll: "/manage/article/findAll",
  publishArticle: "/manage/article/pulish",
  disabledArticle: "/manage/article/disabled",
  deleteArticle: "/manage/article/delete",
  findArticleTypeAll: "/manage/articletype/findAll",
  deleteArticleType: "/manage/articletype/delete",
  saveArticleType: "/manage/articletype/saveOrUpdate"
};
export default {
  data() {
    return {
      formInline: {
        title: "",
        pageSize: 20,
        currPage: 1,
        total: 0
      },
      articleType: {
        id: 0,
        name: ""
      },
      loading: {
        articleList: true,
        articleTypeList: true
      },
      articleList: [],
      articleTypeList: [],
      typeListVisible: false,
      typeInfoVisible: false,
      typeTitle: "新增类型"
    };
  },
  created() {
    this.loadArticleList();
    this.loadArticleTypeList();
  },
  methods: {
    loadArticleList() {
      this.$.post(HttpUrl.findArticleAll, this.formInline).then(results => {
        this.articleList = results.articleList;
        this.formInline.total = results.total;
        this.loading.articleList = false;
      });
    },
    loadArticleTypeList() {
      return this.$.get(HttpUrl.findArticleTypeAll).then(articleTypeList => {
        this.articleTypeList = articleTypeList;
        this.loading.articleTypeList = false;
      });
    },
    // 发布
    handlerPublish(item) {
      this.$confirm("发布文章", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$.get(`${HttpUrl.publishArticle}?id=${item.id}`).then(
            results => {
              this.$message({
                type: "success",
                message: "操作成功",
                duration: 1500,
                onClose: () => {
                  this.loadArticleList();
                }
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    handlerDisabled(item) {
      this.$.get(`${HttpUrl.disabledArticle}?id=${item.id}`).then(() => {
        this.loadArticleList();
      });
    },
    handlerDelete(item) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$.get(`${HttpUrl.deleteArticle}?id=${item.id}`).then(() => {
            this.$message("操作成功");
            this.loadArticleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    handlerDeleteAType(item) {
      this.$.get(`${HttpUrl.deleteArticleType}?id=${item.id}`).then(() => {
        this.$message("操作成功");
        this.loadArticleTypeList();
      });
    },
    saveArticleType() {
      this.$.post(HttpUrl.saveArticleType, this.articleType).then(results => {
        this.loadArticleTypeList().then(() => {
          this.typeInfoVisible = false;
        });
      });
    },
    handlerEdit(item) {
      this.$router.push(`/article/articlePulish/${item.id}`);
    },
    handlerAgination(currentPage) {
      if (this.formInline.currPage != currentPage) {
        this.formInline.currPage = currentPage;
        this.loadArticleList();
      }
    },
    handlerSizeChange(size) {
      if (this.formInline.pageSize != size) {
        this.formInline.pageSize = size;
        this.formInline.currPage = 1;
        this.loadArticleList();
      }
    },
    toUpdateAType({ id, name }) {
      this.articleType.id = id;
      this.articleType.name = name;
      this.typeTitle = "修改类型";
      this.typeInfoVisible = true;
    },
    toSaveType() {
      this.articleType.id = 0;
      this.articleType.name = "";
      this.typeTitle = "新增类型";
      this.typeInfoVisible = true;
    },
    disabledStr(row, column, cellValue) {
      return row.disabled == 1 ? "发布中" : "已下线";
    },
    handlerCloseTypeList(done) {
      done();
    },
    handlerCloseTypeInfo(done) {
      done();
    },
    typeStr({ type }) {
      return type == 1 ? "文章" : type == 2 ? "随记" : "";
    }
  },
  filters: {
    disabledStr: function(disabled) {
      return disabled == 1 ? "发布中" : "已下线";
    }
  }
};
</script>
<style scoped lang="scss" type="text/css">
@import "../../../css/components/list.scss";
</style>