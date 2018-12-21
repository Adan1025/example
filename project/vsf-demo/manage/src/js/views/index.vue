<template>
    <div class="main">
        <header class="headband"></header>
        <el-row class="main">
            <el-col :span="4" class="left">
                <el-menu :router="true">
                    <template v-for="item in menuList" v-if="item.isShow == 1">
                        <el-submenu :index="item.id + ''" v-if="item.menuUri == '/'">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                {{item.menuName}}
                            </template>
                            <el-menu-item-group v-if="item.children && item.children.length > 0">
                                <el-menu-item v-for="citem in item.children" :index="citem.menuUri" :key="citem.id" v-if="citem.isShow == 1">
                                    {{citem.menuName}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item :index="item.menuUri" v-else>
                            <i class="el-icon-setting"></i>
                            {{item.menuName}}
                        </el-menu-item>
                    </template>
                </el-menu>
                <el-menu :router="false">
                    <el-menu-item index="quitLogin" @click="quitLogin">
                        <i class="el-icon-setting"></i>
                        退出
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <el-breadcrumb separator="/" class="breadcrumb">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{path: '/articlePulish'}">暂未实现</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
const HttpUrl = {
    findMenuList: '/manage/usersmenu/getMenuList',
    quitLogin: '/manage/users/quitLogin'
};

export default {
    name: 'manage-index',
    data() {
        return {
            menuList: []
            // menuList:[{
            //     id: 1,
            //     name: '用户中心',
            //     path: '/',
            //     parentId: 0,
            //     key: 'users',
            //     children:[{
            //         id: 2,
            //         name: '用户管理',
            //         path: '/users/usersList',
            //         parentId: 1,
            //         key: 'users'
            //     },{
            //         id: 3,
            //         name: '用户添加',
            //         path: '/users/usersSave',
            //         parentId: 1,
            //         key: 'users'
            //     }]
            // },{
            //     id: 4,
            //     name: '文章中心',
            //     path: '/',
            //     parentId: 0,
            //     key: 'article',
            //     children:[{
            //         id: 5,
            //         name: '文章管理',
            //         path: '/article/articleList',
            //         parentId: 4,
            //         key: 'article'
            //     },{
            //         id: 6,
            //         name: '文章发布',
            //         path: '/article/articlePulish',
            //         parentId: 4,
            //         key: 'article'
            //     }]
            // },{
            //     id: 7,
            //     name: '权限中心',
            //     path: '/',
            //     parentId: 0,
            //     key: 'power',
            //     children:[{
            //         id: 8,
            //         name: '菜单管理',
            //         path: '/power/menu',
            //         parentId: 7,
            //         key: 'menu'
            //     },{
            //         id: 9,
            //         name: '接口管理',
            //         path: '/power/interface',
            //         parentId: 7,
            //         key: 'interface'
            //     }]
            // }]
        };
    },
    created() {
        this.loadMenuList();
    },
    methods: {
        loadMenuList() {
            this.$.get(HttpUrl.findMenuList).then(results => {
                this.menuList = results;
            });
        },
        quitLogin() {
            this.$.get(HttpUrl.quitLogin).then(res => {
                this.$router.push({
                    path: '/login',
                    query: { redirect: this.$route.fullPath } // fullPath当前路由
                });
            });
        }
    }
};
</script>
<style scoped lang="scss" type="text/css">
@import '../../css/components/index.scss';
</style>