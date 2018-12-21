<template>
<div class="container">
    <div class="table-box">
        <el-form :inline="true" class="form-box">
            <el-button size="mini" @click="handlerRoleEmpoMenu">确定</el-button>
        </el-form>
        <el-checkbox-group v-model="roleHavInterfaceIds">
            <table id="sample-table-1" class="table">
                <tbody id="ul_infoList">
                    <tr v-if="!uinterfaceList || uinterfaceList.length == 0">
                        <td colspan=7>
                            <p class='noInfoMsg'>暂无权限数据信息</p>
                        </td>
                    </tr>
                    <template v-for="(item, index) in uinterfaceList" v-else>
                        <tr :key="index" class="tr-parent">
                            <td colspan="2">
                                <el-checkbox :label="`model${item.index}`"
                                    @change="handlerCheckboxAll">{{item.key}}</el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td width="10%"></td>
                            <td>
                                <el-checkbox class="checkbox" :label="citem.id"  @change="handlerCheckboxChild"
                                    border v-for="(citem, cindex) in item.children" :key="cindex">{{citem.interfaceName}}</el-checkbox>
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
    findUMenuAll: '/manage/usersinterface/list',
    findUInterfaceIdsByRoleId: '/manage/usersrole/getInterfaceIdsByRoleId',
    updateInterface: '/manage/usersrole/updateInterface'
}
export default {
    name: 'role-empo-interface',
    data(){
        return {
            loading: {
                uinterfaceList: true
            },
            uinterfaceList: [],
            roleHavInterfaceIds: [],
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
            return this.$.get(`${HttpUrl.findUMenuAll}?format=1`).then( uinterfaceList => {
                this.uinterfaceList = uinterfaceList;
            });
        },
        loadUMenuListByRoleId(){
            this.$.get(`${HttpUrl.findUInterfaceIdsByRoleId}?roleId=${this.roleId}`).then( roleHavInterfaceIds => {
                this.roleHavInterfaceIds = roleHavInterfaceIds;
            });
        },
        handlerRoleEmpoMenu(){
            let roleHavInterfaceIds = this.roleHavInterfaceIds.filter( item => {
                return /^\d+$/.test(item);
            });
            this.$.post(`${HttpUrl.updateInterface}`,
                {ids: roleHavInterfaceIds, id: this.roleId}
            ).then( () => {
                // this.$router.push('/index');
                window.location.reload()
                this.loadUMenuListByRoleId();
            });
        },
        handlerCheckboxAll(val){
            let target = event.target;
            let ptr = DOM.parentNode(target, 'tr');
            console.log(ptr)
            if(!ptr){return true;}
            ptr = DOM.nextSibling(ptr, 'tr');
            console.log(ptr)
            let checkboxs = DOM.getByTagName('input', ptr);
            console.log(checkboxs)
            let roleHavInterfaceIds = this.roleHavInterfaceIds;
            if(!val) {
                checkboxs.forEach( item => {
                    let index = roleHavInterfaceIds.indexOf(+item.value);
                    if (index > -1) {
                        roleHavInterfaceIds.splice(index, 1);
                    }
                });
                this.roleHavInterfaceIds = roleHavInterfaceIds;
            } else {
                checkboxs.forEach( item => {
                    let index = roleHavInterfaceIds.indexOf(+item.value);
                    if (index <= -1) {
                        roleHavInterfaceIds.push(+item.value);
                    }
                });
                this.roleHavInterfaceIds = roleHavInterfaceIds;
            }
            console.log(roleHavInterfaceIds)
        },
        // 还有问题 后期优化
        handlerCheckboxChild(val){
            let target = event.target,
                ptr = DOM.parentNode(target, 'tr'),
                checkboxs = DOM.getByTagName('input', ptr),
                roleHavInterfaceIds = this.roleHavInterfaceIds,
                len = checkboxs.length;
            let checkedList = checkboxs.filter( item => {
                return roleHavInterfaceIds.indexOf(item.value) === -1;
            });
            if(checkedList.length && checkedList.length != len){ return true;}
            ptr =  DOM.prevSibling(ptr, 'tr');
            let parentCheckbox = DOM.getByTagName('input', ptr)[0];
            if(!parentCheckbox || !parentCheckbox.value) return true;
            let index = roleHavInterfaceIds.indexOf(parentCheckbox.value);
            // 全未选
            if(checkedList.length > 0 && index > -1) {
                roleHavInterfaceIds.splice(index, 1);
            } else {// 全选
                if(index <= -1){
                    roleHavInterfaceIds.push(parentCheckbox.value);
                }
            }
            this.roleHavInterfaceIds = roleHavInterfaceIds;
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
            // height: 50px;
            border: 1px solid #ebeef5;
        }
        .tr-parent,
        .tr-parent td{
            height: 40px;
        }
    }
    .checkbox{
        margin: 5px 0 5px 0;
    }
</style>