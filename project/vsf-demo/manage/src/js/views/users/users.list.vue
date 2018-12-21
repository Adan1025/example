<template>
    <div class="container">
        <el-form :inline="true" :model="formInline" class="form-box">
            <el-form-item label="用户名">
                <el-input v-model="formInline.userName" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formInline.email" placeholder="邮箱"></el-input>
            </el-form-item>
        <el-form-item>
            <el-button type="primary">查询</el-button>
        </el-form-item>
    </el-form>
    <div class="table-box">
        <el-form :inline="true" class="form-box">
            <el-button size="mini" @click="roleListVisible = true">查看角色</el-button>
            <el-button size="mini" @click="roleInfoVisible = true">新增角色</el-button>
        </el-form>
        <el-table :data="usersList" stripe border height="480" v-loading="loading.usersList">
            <el-table-column fixed type="index"></el-table-column>
            <el-table-column prop="nickName" label="昵称"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column prop="motto" label="座右铭"></el-table-column>
            <!-- <el-table-column prop="juejin" label="掘金"></el-table-column>
        <el-table-column prop="zhihu" label="知乎"></el-table-column>
        <el-table-column prop="github" label="GitHub"></el-table-column>
        -->
        <el-table-column label="操作" width="175">
            <template slot-scope="scope">
                <el-button
                  size="small"
                  icon="el-icon-edit"
                  @click="handlerEdit(scope.row)"></el-button>
                <el-button v-if="scope.row.disabled == 0"
                  size="small"
                  type="info"
                  @click="handlerPublish(scope.row, scope.$index )">启用</el-button>
                <el-button v-if="scope.row.disabled == 1"
                  size="small"
                  type="primary"
                  @click="handlerDisabled( scope.row, scope.$index)">禁用</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="handlerDelete(scope.row, scope.$index )">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
    <el-dialog
      :title="roleTitle"
      :visible.sync="roleListVisible"
      width="630px"
      :before-close="handlerCloseRoleList">
      <div>
           <el-table :data="usersRoleList" stripe border  v-loading="loading.roleList">
                <el-table-column type="index" align="center"></el-table-column>
                <el-table-column prop="name"  align="center" label="角色名称" width="191"></el-table-column>
                <el-table-column label="操作" align="center" width="350">
                    <template slot-scope="scope">
                        <el-button
                          size="small"
                          icon="el-icon-edit"
                          @click="toUpdateUsersRole(scope.row)"></el-button>
                        <el-button
                          size="small"
                          type="danger"
                          icon="el-icon-delete"
                          @click="handlerDeleteUsersRole(scope.row)"></el-button>
                        <el-button
                          size="small"
                          type="warning"
                          icon="el-icon-setting"
                          @click="handlerJurisdMenuUsersRole(scope.row)">菜单权限</el-button>
                        <el-button
                          size="small"
                          type="warning"
                          icon="el-icon-setting"
                          @click="handlerJurisdInterfaceUsersRole(scope.row)">接口权限</el-button>
                    </template>
                </el-table-column>
            </el-table>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="roleListVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="roleTitle"
      :visible.sync="roleInfoVisible"
      width="360px"
      :before-close="handlerCloseRoleInfo">
        <el-form class="form-box article"  label-width="45px">
            <el-form-item label="名称:">
                <el-input v-model="usersRole.name"  class="width50" placeholder="请输入角色名称"></el-input>
            </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleInfoVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUsersRole">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
const HttpUrl = {
    findUsersAll: '/manage/users/findAll',
    disabledUsers: '/manage/users/disabled/',
    deleteUsers: '/manage/users/delete/',
    findUsersRoleAll: '/manage/usersrole/findAll',
    deleteUsersRole: '/manage/usersrole/delete/',
    saveUsersRole: '/manage/usersrole/saveOrUpdate',
}
export default {
    data(){
        return {
            formInline: {
                userName: '',
                nickName: '',
                email:''
            },
            loading:{
                usersList: true,
                roleList: true
            },
            usersRole: {},
            usersList: [],
            usersRoleList: [],
            roleTitle: '角色管理',
            roleListVisible: false,
            roleInfoVisible: false
        }
    },
    created(){
        this.loadUsersList();
        this.loadUsersRoleList();
    },
    methods:{
        loadUsersList(){
            this.$.get(HttpUrl.findUsersAll).then( usersList => {
                this.usersList = usersList;
                this.loading.usersList = false;
            });
        },
        loadUsersRoleList(){
            return this.$.get(HttpUrl.findUsersRoleAll).then( usersRoleList => {
                this.usersRoleList = usersRoleList;
                this.loading.roleList = false;
            });
        },
        handlerEdit(item){
          this.$router.push(`/users/usersSave/${item.id}`);
        },
        handlerDelete(item){
            this.$confirm('此操作将永久删除用户和用户的文章, 是否继续?', '提示', {
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
        handlerDisabled(item){
            this.$.get(HttpUrl.disabledUsers + item.id).then( results => {
                this.$message({
                    type: 'success',
                    message: '操作成功'
                });
            });
        },
        handlerPublish(item){
            this.$.get(HttpUrl.deleteUsers + item.id).then( results => {
                this.$message({
                    type: 'success',
                    message: '操作成功'
                });
            });
        },
        toUpdateUsersRole({id, name}){
            this.usersRole.id = id;
            this.usersRole.name = name;
            this.roleTitle = '修改角色';
            this.roleInfoVisible = true;
        },
        toSaveType(){
            this.usersRole.id = 0;
            this.usersRole.name = '';
            this.roleTitle = '修改角色';
            this.roleInfoVisible = true;
        },
        handlerCloseRoleList(done) {
            done();
        },
        handlerCloseRoleInfo(done) {
            done();
        },
        saveUsersRole(){
            this.$.post(HttpUrl.saveUsersRole, this.usersRole).then( results => {
                this.loadUsersRoleList().then( () =>{
                    this.roleInfoVisible = false;
                })

            });
        },
        handlerDeleteUsersRole(item){
            this.$.get(`${HttpUrl.deleteUsersRole}?id=${item.id}`).then( message => {
                this.$message('操作成功')
                this.loadUsersRoleList();
            });
        },
        handlerJurisdMenuUsersRole(item) {
            this.$router.push({path: `/users/roleEmpoMenu/${item.id}`});
        },
        handlerJurisdInterfaceUsersRole(item){
          console.log(item.id)
            this.$router.push({path: `/users/roleEmpoInterface/${item.id}`});
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">@import '../../../css/components/list.scss';</style>