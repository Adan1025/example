const Vue = require('vue');
import axios from './common/axios.js';
import sfLeftAuthor from './views/indexLeft/author';
import sfLeftMenu from './views/indexLeft/menu';
import sfHotArticle from './views/indexLeft/hotArticle';
Vue.filter('time', function (str) {
    return str.split(' ')[0]
});
new Vue({
    el: '#app',
    data() {
        return {
            authorInfo: {
                nickName: '天冰',
                headimg: '',
                metto: ''
            },
            isShowArticle: false,
            isShowNote: false,
            articleList: [],
            noteList: []
        }
    },
    components: {
        // sfLeft
        sfLeftMenu,
        sfLeftAuthor,
        sfHotArticle
    },
    created() {
        axios.get(`/restapi/article/findHot`).then(results => {
            let { articleList = [], noteList = [] } = results;
            if (articleList.length > 0) {
                this.articleList = articleList;
                this.isShowArticle = true;
            }
            if (noteList.length > 0) {
                this.noteList = noteList;
                this.isShowNote = true;
            }
        })
    }
});