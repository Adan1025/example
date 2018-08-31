/**
 * 基于Vue新建一个vue组件
 * @Author   quancongjin550@pingan.com.cn FED
 * @DateTime 2017-05-10T16:42:27+0800
 * @param    {[type]}                     Vue [description]
 * @return   {[type]}                         [description]
 */
initGlobalAPI(Vue) => function initExtend(Vue) {
    Vue.cid = 0;
    var cid = 1;

    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};
        // 获取到Vue对象
        var Super = this;
        var SuperId = Super.cid;
        // _Ctor 就是 constructor，但是没有看大哪里转key
        var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
        // 如果存在 则直接返回
        // 执行完整个extend后的extendOptions._Ctor  = [VueComponent]
        if (cachedCtors[SuperId]) {
            return cachedCtors[SuperId]
        }
        var name = extendOptions.name || Super.options.name;
        if (process.env.NODE_ENV !== 'production') {
            if (!/^[a-zA-Z][\w-]*$/.test(name)) {
                warn(
                    'Invalid component name: "' + name + '". Component names ' +
                    'can only contain alphanumeric characters and the hyphen, ' +
                    'and must start with a letter.'
                );
            }
        }

        var Sub = function VueComponent(options) {
            this._init(options);
        };
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.cid = cid++;
        // 合并Vue和当前对象的options
        Sub.options = mergeOptions(
            Super.options,
            extendOptions
        );
        Sub['super'] = Super;

        // 继承props
        if (Sub.options.props) {
            // 把props绑定到实例属性的Sub.prototype._props上
            initProps$1(Sub);
        }
        if (Sub.options.computed) {
            // 同上 绑定各个computed到Sub.prototype
            initComputed$1(Sub);
        }

        //挂载Vue的属性
        Sub.extend = Super.extend;
        Sub.mixin = Super.mixin;
        Sub.use = Super.use;

        // create asset registers, so extended classes
        // can have their private assets too.
        // 挂载 'component', 'directive', 'filter'  和上面的区别？？？？
        ASSET_TYPES.forEach(function(type) {
            Sub[type] = Super[type];
        });
        // enable recursive self-lookup
        // 启动递归自查找
        if (name) {
            Sub.options.components[name] = Sub;
        }

        // keep a reference to the super options at extension time.
        // later at instantiation we can check if Super's options have
        // been updated.
        Sub.superOptions = Super.options;
        Sub.extendOptions = extendOptions;
        Sub.sealedOptions = extend({}, Sub.options);

        // cache constructor
        cachedCtors[SuperId] = Sub;
        // 返回扩展实例
        return Sub
    };
}



var sharedPropertyDefinition = {
    enumerable: true, // 可枚举
    configurable: true, // 可改变
    get: noop, //  function(){}
    set: noop
};


function initProps$1(Comp) {
    var props = Comp.options.props;
    // 遍历props
    for (var key in props) {
        proxy(Comp.prototype, "_props", key);
    }
}

function proxy(target, sourceKey, key) {
    // 重新定义get set
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    // 定义新属性或修改原有的属性。
    Object.defineProperty(target, key, sharedPropertyDefinition);
}



function initComputed$1(Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
        defineComputed(Comp.prototype, key, computed[key]);
    }
}

function defineComputed(target, key, userDef) {
    // 如果是函数   只实现get
    if (typeof userDef === 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key);
        sharedPropertyDefinition.set = noop;
    } else {
        // userDef 是对象
        sharedPropertyDefinition.get = userDef.get ? userDef.cache !== false ? createComputedGetter(key) : userDef.get : noop;
        sharedPropertyDefinition.set = userDef.set ? userDef.set : noop;
    }
    // 定义新属性或修改原有的属性。
    Object.defineProperty(target, key, sharedPropertyDefinition);
}