initGlobalAPI(Vue) => initUse(Vue) {
    Vue.use = function(plugin) {
        // 如果已经挂载了  则无视
        if (plugin.installed) {
            return this
        }
        // additional parameters
        var args = toArray(arguments, 1);
        args.unshift(this);


        // 如果存在install 并且是函数  则表示是vue插件
        // Vue 的插件必须提供一个公开方法 install，该方法会在你使用该插件，
        // 也就是 Vue.use(yourPlugin)时被调用，相当于是一个插件的注册或者声明。
        // install 接受 Vue 构造器作为第一个参数，并且有一个可选的选项对象作为第二个参数，
        // const A = {
        //      install(Vue){
        //          Vue.a = 'b';
        //      }
        // }
        if (typeof plugin.install === 'function') {
            plugin.install.apply(plugin, args);
        } else if (typeof plugin === 'function') {
            // 执行函数
            plugin.apply(null, args);
        }
        // 标记改plugin已挂载
        plugin.installed = true;
    }
}