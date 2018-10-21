import './style/common/layout.scss';
import './style/iconfont/iconfont.css';
import {Navbar} from './components/navbar';
import {Vpp} from './components/vpp';
import {Album} from './components/album';
import {Btn, BtnGroup} from './components/Btn';
import {Slide, SlideItem} from './components/slide';
import {ListView, ListItem} from './components/ListView';
import {Pannel} from './components/Pannel';
import {FromItem, FromGroup} from './components/From';
window.document.addEventListener('touchstart', function (event) {
    /* Do Nothing */
}, false);

const install = function (Vue) {
    Vue.component(Navbar.name, Navbar);
    Vue.component(Vpp.name, Vpp);
    Vue.component(Album.name, Album);
    Vue.component(Slide.name, Slide);
    Vue.component(SlideItem.name, SlideItem);
    Vue.component(Btn.name, Btn);
    Vue.component(BtnGroup.name, BtnGroup);
    Vue.component(ListView.name, ListView);
    Vue.component(ListItem.name, ListItem);
    Vue.component(Pannel.name, Pannel);
    Vue.component(FromItem.name, FromItem);
    Vue.component(FromGroup.name, FromGroup);
    // Vue.prototype.$dialog = {
    //     confirm: Confirm,
    //     alert: Alert,
    //     toast: Toast,
    //     notify: Notify,
    //     loading: Loading,
    // };
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
};