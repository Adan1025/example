<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" class="form-box">
            <el-form-item label="图片名称">
                <el-input v-model="formInline.name" placeholder="图片名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
		</el-form>
		<div class="table-box">
			<!-- <el-form :inline="true" class="form-box">
				<el-button size="mini" @click="typeListVisible = true">查看类型</el-button>
				<el-button size="mini" @click="typeInfoVisible = true">新增类型</el-button>
			</el-form> -->
			<el-table :data="articleList" stripe border height="480" v-loading="loading.articleList">
				<el-table-column fixed type="index"></el-table-column>
				<el-table-column prop="name" label="图片名称" width="150"></el-table-column>
				<el-table-column prop="imgUrl" label="图片地址" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="alt" label="alt" width="220" ></el-table-column>
				<el-table-column prop="used" label="是否常用" width="80"></el-table-column>
				<el-table-column fixed="right" label="操作" width="210">
					<template slot-scope="scope">
						<el-button
						size="small"
						icon="el-icon-edit"
						@click="handlerEdit(scope.row)"></el-button>
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
	</div>
</template>
<script>
const HttpUrl = {
  findPictureAll: "/manage/picture/all"
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
        articleList: true
      },
      pictureList: [],
      typeTitle: "新增类型"
    };
  },
  created() {
    this.loadPicturAll();
  },
  methods: {
    loadPicturAll() {
      this.$.get(`${HttpUrl.findPictureAll}`).then(results => {
        this.pictureList = results;
      });
    }
  }
};
</script>
<style scoped lang="scss" type="text/css">
@import "../../../css/components/list.scss";
</style>