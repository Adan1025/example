<template>
<div class="container">
    <div class="table-box">
        <el-form :inline="true" class="form-box">
            <el-button size="mini" @click="handlerRoleEmpoMenu">确定</el-button>
        </el-form>
        <el-checkbox-group v-model="roleHavMenuIds">
            <table id="sample-table-1" class="table">
                <tbody id="ul_infoList">
                    <tr v-if="!umenuList || umenuList.length == 0">
                        <td colspan=7>
                            <p class='noInfoMsg'>暂无权限数据信息</p>
                        </td>
                    </tr>
                    <template v-for="(item, index) in umenuList" v-else>
                        <tr :key="index" class="tr-parent">
                            <td colspan="2">
                                <el-checkbox :label="item.id" @change="handlerCheckboxAll">{{item.menuName}}</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td width="10%"></td>
                            <td>
                                <el-checkbox :label="citem.id"  @change="handlerCheckboxChild"
                                    border v-for="(citem, cindex) in item.children" :key="cindex">{{citem.menuName}}</el-checkbox>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </el-checkbox-group>
    </div>
</div>
</template>
<script>
import DOM from '@common/DOM.js'
const HttpUrl = {
    findUMenuAll: '/manage/usersmenu/list',
    findUMenuIdsByRoleId: '/manage/usersrole/getMenuIdsByRoleId',
    updateMenu: '/manage/usersrole/updateMenu'
}
export default {
    name: 'role-empo-menu',
    data(){
        return {
            loading: {
                umenuList: true
            },
            umenuList: [],
            roleHavMenuIds: [],
            roleId: 0,
        }
    },
    created(){
        this.roleId = this.$route.params.id;
        if(!this.roleId){
            this.$alert('id获取异常，请重试', '异常', {
                confirmButtonText: '确定'
            });
            return;
        }
        this.loadUMenuList().then( () => {
            this.loadUMenuListByRoleId();
        });
    },
    methods:{
        loadUMenuList(){
            return this.$.get(`${HttpUrl.findUMenuAll}?format=1`).then( umenuList => {
                this.umenuList = umenuList;
            });
        },
        loadUMenuListByRoleId(){
            this.$.get(`${HttpUrl.findUMenuIdsByRoleId}?roleId=${this.roleId}`).then( roleHavMenuIds => {
                this.roleHavMenuIds = roleHavMenuIds;
            });
        },
        handlerRoleEmpoMenu(){
            this.$.post(`${HttpUrl.updateMenu}`,
                {ids: this.roleHavMenuIds, id: this.roleId}
            ).then( () => {
                // this.$router.push('/index');
                window.location.reload()
                this.loadUMenuListByRoleId();
            });
        },
        handlerCheckboxAll(val){
            let target = event.target;
            let ptr = DOM.parentNode(target, 'tr');
            if(!ptr){return true;}
            ptr = DOM.nextSibling(ptr, 'tr');
            let checkboxs = DOM.getByTagName('input', ptr);
            let roleHavMenuIds = this.roleHavMenuIds;
            if(!val) {
                checkboxs.forEach( item => {
                    let index = roleHavMenuIds.indexOf(+item.value);
                    if (index > -1) {
                        roleHavMenuIds.splice(index, 1);
                    }
                });
                this.roleHavMenuIds = roleHavMenuIds;
            } else {
                checkboxs.forEach( item => {
                    let index = roleHavMenuIds.indexOf(+item.value);
                    if (index <= -1) {
                        roleHavMenuIds.push(+item.value);
                    }
                });
                this.roleHavMenuIds = roleHavMenuIds;
            }
        },
        handlerCheckboxChild(val){
            let target = event.target,
                ptr = DOM.parentNode(target, 'tr'),
                checkboxs = DOM.getByTagName('input', ptr),
                roleHavMenuIds = this.roleHavMenuIds,
                len = checkboxs.length;
            let checkedList = checkboxs.filter( item => {
                return roleHavMenuIds.indexOf(+item.value) === -1;
            });
            if(checkedList.length && checkedList.length != len){ return true;}
            ptr =  DOM.prevSibling(ptr, 'tr');
            let parentCheckbox = DOM.getByTagName('input', ptr)[0];
            if(!parentCheckbox || !parentCheckbox.value) return true;
            let index = roleHavMenuIds.indexOf(+parentCheckbox.value);
            // 全未选
            if(checkedList.length > 0 && index > -1) {
                roleHavMenuIds.splice(index, 1);
            } else {// 全选
                if(index <= -1){
                    roleHavMenuIds.push(+parentCheckbox.value);
                }
            }
            this.roleHavMenuIds = roleHavMenuIds;
        }
    }
}
</script>
<style scoped lang="scss" type="text/css">
    @import '../../../css/components/list.scss';
    .table{
        color: #606266;
        width: 100%;
        tr,td,th{
            padding-left: 15px;
            height: 50px;
            border: 1px solid #ebeef5;
        }
        .tr-parent,
        .tr-parent td{
            height: 40px;
        }
    }
</style>