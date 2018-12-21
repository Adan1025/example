<template>
<div class="container form-box">
    <el-row :gutter="20">
        <el-col :span="12">
          <el-form :model="userInfo" :rules="rules" ref="userInfo" label-width="100px" class="user-form">
              <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="userInfo.email" placeholder="请输入电子邮箱"></el-input>
              </el-form-item>
              <el-form-item label="昵称" prop="nickName">
                  <el-input v-model="userInfo.nickName" placeholder="请输入用户昵称，长度1-16个字符"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                  <el-input  type="password" v-model="userInfo.password"placeholder="请输入用户密码"></el-input>
              </el-form-item>
              <el-form-item label="角色" prop="roleId">
                  <span>{{userInfo.roleName}}</span>
                  <el-input type="hidden" v-model="userInfo.roleId" style="display:none;"></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="userName">
                  <el-input v-model="userInfo.userName" placeholder="请输入用户名，长度2-8个字符"></el-input>
              </el-form-item>
              <el-form-item label="联系方式" prop="phone">
                  <el-input v-model="userInfo.phone" placeholder="请输入联系方式"></el-input>
              </el-form-item>
              <el-form-item>
                    <el-button type="primary" @click="submitForm('userInfo')">
                        确认修改
                    </el-button>
                  <el-button @click="resetForm('userInfo')">重置</el-button>
              </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" class="headimg-box">
            <el-upload
              class="avatar-uploader"
              action="/manage/picture/upload"
              :show-file-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload">
                <div class="avatar-box">
                    <img v-if="userInfo.headimg" :src="userInfo.headimg" class="avatar-headimg">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </div>
                <el-button size="small" type="primary" class="avatar-btn">上传头像</el-button>
            </el-upload>
        </el-col>
    </el-row>
</div>
</template>
<script>
    const HttpUrl = {
        getOneByLogin: '/manage/users/getOneByLogin',
        updateByLogin: '/manage/users/updateLoginUsers'
    }
  export default {
    data() {
      return {
        userInfo: {
            email: '',
            phone: '',
            nickName: '',
            userName: '',
            password: '',
            roleId: 0,
            headimg: ''
        },
        usersGroup:[{
          id: 0,
          name: '临时用户'
        }],
        rules: {
            email: [
                { required: true, type:'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
            ],
            nickName: [
                { required: true, pattern: /^[0-9a-zA-Z\.\s\u4e00-\u9fa5]{2,20}$/,message: '请输入用户昵称，长度 2 到 20 个字符', trigger: 'blur' },
                { pattern: /^[0-9a-zA-Z\.\s\u4e00-\u9fa5]{2,20}$/, message: '用户昵称为长度 2 到 20 个字符', trigger: 'blur' }
            ],
            userName: [
                { message: '请输入用户名，长度 2 到 20 个字符',  trigger: 'blur' },
                { pattern: /^[a-zA-Z\.\s\u4e00-\u9fa5]{2,20}$/, message: '用户名为长度 2 到  20 个非数字字符', trigger: 'blur' }
            ],
            phone: [
                { message: '请填写11位长度的手机号码', trigger: 'blur' },
                { pattern: /^1\d{10}$/, message: '请填写11位长度的手机号码', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入用户密码', trigger: 'blur' },
                { min: 6, max: 26, message: '长度在6 到 26 个字符', trigger: 'blur' }
            ],
            roleId: [
                { required: true, message: '请选择用户组'}
            ]
        }
      };
    },
    created(){
        let {id} = this.$route.params;
        this.userInfo.id = id || 0;
        this.getUsersInfo();
    },
    methods: {
      getUsersInfo(){
            this.$.get(`${HttpUrl.getOneByLogin}?id=${this.userInfo.id}`).then( userInfo => {
                console.log(userInfo)
                this.userInfo = userInfo;
            });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.registerUsers();
          } else {
            return false;
          }
        });
       },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        registerUsers(){
            this.$.post(HttpUrl.updateByLogin, this.userInfo).then( results => {
                this.$router.push('/index');
            });
        },
        uploadSuccess(data){
            if(data.status == 1) {
                this.userInfo.headimg = data.results;
            } else {
                this.$alert(data.errmsg, '上传图片异常', {
                    confirmButtonText: '确定'
                });
            }
        },
        uploadError(err){
            this.$alert(err.message, `上传图片异常:${err.status}`, {
                confirmButtonText: '确定'
            });
        },
        beforeUpload(file){
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    watch:{
        "$route"(){
            this.userInfo = {
              id: 0,
              email: '',
              phone: '',
              nickName: '',
              userName: '',
              password: '',
              roleId: 0,
              headimg: ''
            }
            this.getUsersInfo();
        }
    }
  }
</script>
<style scoped lang="scss" type="text/css">
    @import '../../../css/components/user/user.add.scss';
</style>