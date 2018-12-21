<template>
    <div class="main">
        <header class="headband"></header>
        <el-row class="main">
            <el-col :span="4" class="left">
                <el-menu :router="true">
                    <template v-for="(item, index) in menuList" v-if="item.isShow == 1">
                        <el-submenu :index="item.id + ''" v-if="item.menuUri == '/'" :key="index">
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
                        <el-menu-item :index="item.menuUri" :key="index" v-else>
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
    findMenuList: "/manage/usersmenu/getMenuList",
    quitLogin: "auth/groupList"
};

export default {
    name: "manage-index",
    data() {
        return {
            // 定义数据对象，  我先定义了固定的数据，没有通过接口去获取值
            menuList: [
                {
                    id: 1,
                    menuName: "用户中心",
                    menuUri: "/",
                    parentId: 0,
                    key: "users",
                    isShow: 1,
                    children: [
                        {
                            id: 2,
                            menuName: "用户管理",
                            menuUri: "/users/usersList",
                            parentId: 1,
                            key: "users",
                            isShow: 1
                        },
                        {
                            id: 3,
                            menuName: "用户添加",
                            menuUri: "/users/usersSave",
                            parentId: 1,
                            key: "users",
                            isShow: 1
                        }
                    ]
                },
                {
                    id: 4,
                    menuName: "文章中心",
                    menuUri: "/",
                    parentId: 0,
                    key: "article",
                    isShow: 1,
                    children: [
                        {
                            id: 5,
                            menuName: "文章管理",
                            menuUri: "/article/articleList",
                            parentId: 4,
                            key: "article",
                            isShow: 1
                        },
                        {
                            id: 6,
                            menuName: "文章发布",
                            menuUri: "/article/articlePulish",
                            parentId: 4,
                            key: "article",
                            isShow: 1
                        }
                    ]
                },
                {
                    id: 7,
                    menuName: "权限中心",
                    menuUri: "/",
                    parentId: 0,
                    key: "power",
                    isShow: 1,
                    children: [
                        {
                            id: 8,
                            menuName: "菜单管理",
                            menuUri: "/power/menu",
                            parentId: 7,
                            key: "menu",
                            isShow: 1
                        },
                        {
                            id: 9,
                            menuName: "接口管理",
                            menuUri: "/power/interface",
                            parentId: 7,
                            key: "interface",
                            isShow: 1
                        }
                    ]
                }
            ]
        };
    },
    created() {
        // created() 是组建加载就会执行的一个函数， 在这里调用默认接口， ajajx
        this.loadMenuList();
    },
    methods: {
        loadMenuList() {
            // 这个是在index.js 中绑定的axios，相当于ajax。
            // 注意 get请求 如果没有data参数，需要传一个空对象
            // $.ajax({type:'get', rutl:'xxx',...}) ===  this.$.get(url, data, config);
            // $.ajax({type:'post'}) ===  this.$.post(url, data, config)
            this.$.get(HttpUrl.findMenuList).then(results => {
                // this.menuList 这个menuList 是在这个对象的data中定义的，
                // 只要你的模板里面用了data中的属性， 然后值改变的时候都会重新渲染页面
                // 这里当请求接口后拿到了数据并赋值，页面就会重新渲染模板
                this.menuList = results;
            });
        },
        // 退出方法   通过@click="quitLogin" 直接调用
        quitLogin() {
            this.$.get(HttpUrl.quitLogin).then(res => {
                // router的自己看api
                this.$router.push({
                    path: "/login",
                    query: { redirect: this.$route.fullPath } // fullPath当前路由
                });
            });
        }
    }
};
</script>

<style scoped type="text/css">
@import "../../css/index.css";
</style>