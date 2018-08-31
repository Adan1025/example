<template>
<div class="container">
    <div class="table-box">
        <el-form :inline="true" class="form-box">
            <el-button size="mini" @click="toSaveUIface">新增接口</el-button>
        </el-form>
        <el-table :data="uifaceList" stripe border height="480" v-loading="loading.uifaceList" >
            <el-table-column fixed type="index"></el-table-column>
            <!-- <el-table-column prop="menuIds" label="所属菜单列表"></el-table-column> -->
            <el-table-column prop="interfaceName" label="接口"></el-table-column>
            <el-table-column prop="interfaceType" label="模块"></el-table-column>
            <el-table-column prop="interfaceUri" label="url"></el-table-column>
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
      :visible.sync="uifaceInfoVisible"
      width="460px"
      :before-close="handlerCloseUifaceInfo">
        <el-form class="form-box article"  label-width="70px" :rules="rules" ref="uifaceInfo" :model="uifaceInfo">
            <el-form-item label="接口名:" prop="interfaceName">
                <el-input
                    v-model="uifaceInfo.interfaceName"
                    placeholder="请输入接口名"></el-input>
            </el-form-item>
            <el-form-item label="模块:" prop="interfaceType">
                <el-input
                    v-model="uifaceInfo.interfaceType"
                    placeholder="请选择所属模块"></el-input>
            </el-form-item>
            <el-form-item label="url:" prop="interfaceUri">
                <el-input
                    v-model="uifaceInfo.interfaceUri"
                    placeholder="请输入接口地址"></el-input>
            </el-form-item>
            <el-form-item label="描述:">
                <el-input
                    v-model="uifaceInfo.descriptor"
                    placeholder="请输入接口描述"></el-input>
            </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uifaceInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('uifaceInfo')">
                        {{uifaceInfo.id ? '确认修改' : '立即添加'}}
                    </el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
const HttpUrl = {
    findUIfaceAll: '/manage/usersinterface/list',
    saveOrUpdateUIface: '/manage/usersinterface/saveOrUpdate',
}
export default {
    name: 'uifaceList',
    data(){
        return {
            loading:{
                uifaceList: true
            },
            uifaceInfo: {
                id: 0,
                interfaceName: '',
                interfaceType: '',
                interfaceUri:'',
                descriptor: '',
                menuIds: []
            },
            uifaceList: [],
            panelTitle: '新增接口',
            uifaceInfoVisible: false,
            rules: {
                interfaceName: [
                    { required: true, min: 1, max: 26, message: '请输入接口名，长度不能超过 26 个字符', trigger: 'blur' }
                ],
                interfaceType: [
                    { required: true, max: 26,message: '所属模块长度不能超过 26个 字符', trigger: 'blur' }
                ],
                interfaceUri: [
                    { required: true, max: 150,message: '请输入接口地址，长度不能超过 150 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.loadUifaceList();
    },
    methods:{
        modelLength(row){
            return `${row.key}(${row.length})`
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveOrUpdateUiface();
                } else {
                    return false;
                }
            });
        },
        saveOrUpdateUiface(){
            this.$.post(HttpUrl.saveOrUpdateUIface, this.uifaceInfo).then( () => {
                this.uifaceInfoVisible = false;
                this.loadUifaceList();
            });
        },
        loadUifaceList(){
            this.$.get(HttpUrl.findUIfaceAll).then( uifaceList => {
                this.uifaceList = uifaceList;
                this.loading.uifaceList = false;
            });
        },
        handlerEdit(item){
            this.uifaceInfo = item;
            this.toUpdateUIface();
          // this.$router.push(`/users/userSave/${item.id}`);
        },
        handlerDelete(item){
            this.$confirm('确定永久删除该接口?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
            }).then(() => {
                this.$.get(HttpUrl.deleteUsers + item.id).then( message => {
                    this.$message({
                        type: 'success',
                        message: '操作成功',
                        duration: 1500,
                        onClose: () => {
                            this.loadUsersList();
                        }
                    });

                });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
        },
        toUpdateUIface(){
            this.panelTitle = '修改接口';
            this.uifaceInfoVisible = true;
        },
        toSaveUIface(){
            this.uifaceInfo = {
                id: 0,
                interfaceName: '',
                interfaceType: '',
                interfaceUri:'',
                descriptor: ''
            };
            this.panelTitle = '新增接口';
            this.uifaceInfoVisible = true;
        },
        handlerCloseUifaceInfo(done) {
            done();
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">@import '../../../css/components/list.scss';</style>