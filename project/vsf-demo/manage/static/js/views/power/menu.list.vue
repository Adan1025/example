<template>
<div class="container">
    <div class="table-box">
        <el-form :inline="true" class="form-box">
            <el-button size="mini" @click="toSaveUMenu">新增菜单</el-button>
        </el-form>
        <el-table :data="umenuList" stripe border height="480" v-loading="loading.umenuList" >
            <el-table-column fixed type="index"></el-table-column>
            <!-- <el-table-column prop="menuIds" label="所属菜单列表"></el-table-column> -->
            <el-table-column prop="menuName" label="菜单"></el-table-column>
            <el-table-column prop="menuUri" label="url"></el-table-column>
            <el-table-column prop="parentId" label="一级菜单" :formatter="parentStr"></el-table-column>
            <el-table-column prop="isShow" label="左侧显示" :formatter="isShowStr"></el-table-column>
            <el-table-column prop="descriptor" label="描述"></el-table-column>
            <el-table-column label="操作" width="175">
                <template slot-scope="scope">
                    <el-button
                      size="small"
                      icon="el-icon-edit"
                      @click="handlerEdit(scope.row)"></el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="handlerDelete(scope.row, scope.$index )">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog
      :title="panelTitle"
      :visible.sync="umenuInfoVisible"
      width="460px"
      :before-close="handlerCloseUMenuInfo">
        <el-form class="form-box article"  label-width="90px" :rules="rules" ref="umenuInfo" :model="umenuInfo">
            <el-form-item label="菜单名:" prop="menuName">
                <el-input
                    v-model="umenuInfo.menuName"
                    placeholder="请输入菜单名"></el-input>
            </el-form-item>
            <el-form-item label="url:" prop="menuUri">
                <el-input
                    v-model="umenuInfo.menuUri"
                    placeholder="请输入菜单地址"></el-input>
            </el-form-item>
            <el-form-item label="一级菜单:">
                <el-select v-model="umenuInfo.parentId" filterable placeholder="请选择">
                    <el-option
                      v-for="item in parentList"
                      :key="item.id"
                      :label="item.menuName"
                      :value="item.id">
                    </el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="是否显示:">
                <el-checkbox v-model="umenuInfo.isShow" :true-label="1" :false-label="0" checked></el-checkbox>
            </el-form-item>
            <el-form-item label="描述:">
                <el-input
                    v-model="umenuInfo.descriptor"
                    placeholder="请输入菜单描述"></el-input>
            </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="umenuInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('umenuInfo')">
                        {{umenuInfo.id ? '确认修改' : '立即添加'}}
                    </el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
const HttpUrl = {
    findUMenuAll: '/manage/usersmenu/list',
    findUMenuParent: '/manage/usersmenu/parentList',
    saveOrUpdateUMenu: '/manage/usersmenu/saveOrUpdate',
    deleteMenu: '/manage/usersmenu/delete/'
}
export default {
    name: 'umenuList',
    data(){
        return {
            loading:{
                umenuList: true
            },
            umenuInfo: {
                id: 0,
                menuName: '',
                menuUri: '',
                parentId: 0,
                descriptor: '',
                isShow: 1
            },
            umenuList: [],
            parentList: [],
            panelTitle: '新增菜单',
            umenuInfoVisible: false,
            rules: {
                menuName: [
                    { required: true, min: 1, max: 26, message: '请输入菜单名，长度不能超过 26 个字符', trigger: 'blur' }
                ],
                menuUri: [
                    { required: true, max: 150,message: '请输入菜单地址，长度不能超过 150 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.loadUMenuList();
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveOrUpdateUMenu();
                } else {
                    return false;
                }
            });
        },
        saveOrUpdateUMenu(){
            this.$.post(HttpUrl.saveOrUpdateUMenu, this.umenuInfo).then( () => {
                this.umenuInfoVisible = false;
                this.loadUMenuList();
            });
        },
        loadUMenuList(){
            this.$.get(HttpUrl.findUMenuAll).then( umenuList => {
                this.umenuList = umenuList;
                this.loading.umenuList = false;
            });
        },
        handlerEdit(item){
            this.umenuInfo = item;
            this.toUpdateUMenu();
          // this.$router.push(`/users/userSave/${item.id}`);
        },
        handlerDelete(item){
            this.$.get(HttpUrl.deleteMenu + item.id).then( message => {
                this.$message({
                    type: 'success',
                    message: '操作成功',
                    duration: 1500,
                    onClose: () => {
                        this.loadUMenuList();
                    }
                });
            });
        },
        toUpdateUMenu(){
            this.panelTitle = '修改菜单';
            this.umenuInfoVisible = true;
        },
        toSaveUMenu(){
            if(this.parentList.length == 0 ) {
                this.$.get(HttpUrl.findUMenuParent).then( parentList=> {
                    parentList.unshift({id: 0, menuName: '无一级菜单'})
                    this.parentList = parentList;
                    this.toSaveUMenuDo();
                })
            } else {
                this.toSaveUMenuDo()
            }
        },
        toSaveUMenuDo(){
            this.umenuInfo = {
                id: 0,
                menuName: '',
                menuUri: '',
                parentId: 0,
                descriptor: '',
                isShow: 1
            };
            this.panelTitle = '新增菜单';
            this.umenuInfoVisible = true;
        },
        handlerCloseUMenuInfo(done) {
            done();
        },
        parentStr(row, column, cellValue){
            return row.parentId == 0 ? '是' : '否';
        },
        isShowStr(row, column, cellValue){
            return row.isShow == 1 ? '显示' : '不显示';
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">@import '../../../css/components/list.scss';</style>