import {Scroll} from './scroll';

const install = function (Vue) {
    Vue.component(Scroll.name, Scroll);
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};