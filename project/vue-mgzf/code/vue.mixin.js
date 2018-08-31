initGlobalAPI(Vue) => initUse(Vue) {
    Vue.mixin = function(mixin) {
        // 把传入的mixin传入并绑定到整个Vue对象options上， 影响之后所有创建的vue实例
        this.options = mergeOptions(this.options, mixin);
        return this
    };
}