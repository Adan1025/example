<template>
    <div class="login-box" id="app">
        <el-row>
            <el-col :span="24">
                <el-input id="email" v-model="email" placeholder="请输入帐号">
                    <template slot="prepend">帐号</template>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
                    <template slot="prepend">密码</template>
                </el-input>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button id="login" v-on:click="check" style="width:100%" type="primary">登录</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
const HttpUrl = {
    loginUrl: '/manage/users/login'
};
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    created() {
        document.body.onkeyup = event => {
            this.enterLogin(event);
        };
    },
    methods: {
        enterLogin(event) {
            if (event.keyCode == 13) {
                this.check();
            }
        },
        check() {
            //获取值
            var email = this.email;
            var password = this.password;
            if (email == '' || password == '') {
                this.$message({
                    message: '账号或密码为空！',
                    type: 'error'
                });
                return;
            }
            this.$.post(HttpUrl.loginUrl, { email, password }).then(res => {
                let rec = this.$route.query.redirect;
                if (rec) {
                    this.$router.push(rec);
                } else {
                    rec;
                    this.$router.push('/');
                }
            });
        }
    },
    beforeDestroy() {
        document.body.onkeyup = function() {};
    }
};
</script>

<style  scoped type="text/css">
.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 240px;
    height: 160px;
    margin-top: -80px;
    margin-left: -120px;
}
</style>