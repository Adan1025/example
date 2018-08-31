import Vue from 'vue';
import loadingVue from './loading.vue';
const LoadingConstructor = Vue.extend(loadingVue);

const defaults = {};

LoadingConstructor.prototype.close = function() {
    this.visible = false;
};

const Loading = (options = {}) => {
    if (Vue.prototype.$isServer) return;
    options = Object.assgin({}, defaults, options);
    if (typeof options.target === 'string') {
        options.target = document.querySelector(options.target);
    }
    options.target = options.target || document.body;
    if (options.target == document.body) {
        options.body = true;
    }

    let parent = options.body ? document.body : options.target;
    let instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: options
    });
    parent.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.visible = true;
    });
    return instance;
};

export
default Loading;