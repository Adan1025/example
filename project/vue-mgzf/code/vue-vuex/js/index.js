import Vue from 'vue';
import Vuex, {
    mapState, mapMutations, mapGetters
}
from 'vuex';
// 内置logger
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);


const store = new Vuex.Store({
    // 插件挂载
    // 很多插件不推荐在生产用 所以借助构建工具来处理Webpack 或 Browserify
    // PRODUCTION  webpack.config 中 new webpack.DefinePlugin定义
    plugins: !!PRODUCTION ? [createLogger()] : [],
    // 组件调用store.state.xxx
    state: {
        count: 0,
        msg: '我是vuex.store.state msg属性'
    },
    // 可调用 只能是同步函数，不能存在异步
    // 组件调用 store.commit('increment')
    mutations: {
        increment(state) {
            state.count++;
        },
        decrease(state) {
            state.count--;
        }
    },
    // 与mutations类似，提交mutations， 并且可以包含异步操作
    // 组件调用store.dispatch('increment2')
    // mapActions用法和mapMutations相同
    // 支持返回promise  然后调用.then
    // 可以传参？？？
    // // 以载荷形式分发
    // store.dispatch('incrementAsync', {
    //      amount: 10
    // })；
    // // 以对象形式分发
    // store.dispatch({
    //      type: 'incrementAsync',
    //      amount: 10
    // })
    actions: {
        increment2(context) {
            // context == state
            // context.state
            // context.getters
            // 异步操作
            setTimeout(() => {
                context.commit('increment')
            }, 1000);
        },
        decrease2({ commit, state }) {
            commit('decrease');
        },
        increment3({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('someMutation')
                    resolve()
                }, 1000)
            });
        },
        decrease3({ dispatch, commit }) {
            return dispatch('increment3').then(() => {
                commit('increment');
            });
        }
    },
    // 类似于 store的计算属性computed
    // 组件调用 store.getters.fn
    // mapGetters用法和mapMutations相同
    getters: {
        msgLength: state => {
            return sstate.msg.length;
        }
    }
});


// 创建一个 Counter 组件
// 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
const Counter = {
    template: `
        <div>
            <div v-on:click="increment">{{ count }}</div>
            <div v-on:click="decrease">{{ count }}</div>
        </div>`,
    // 计算属性  默认只有getter
    computed: {
        count() {
            return this.$store.state.count
        }
    },
    methods: {
        // increment() {
        //     this.$store.commit('increment');
        // }
        ...mapMutations(['increment', 'decrease'])
        // 自命名
        // ...mapMutations({
        //  'cIncrement': 'increment',
        //  'decrease'
        // })
    }
}

const app = new Vue({
    el: '#app',
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    components: {
        Counter
    },
    data() {
        return {
            name: '我是组件的name'
        }
    },
    // 计算属性  默认只有getter
    computed: mapState({
        // 把store中的msg映射到message
        message: 'msg',
        // 访问局部属性需要借助函数，通过this访问
        msgName(state) {
            return state.msg + '-' + this.name;
        }
    }),
    // methods: {
    //     increment(){
    //         this.$store.commit('increment');
    //     }
    // },
    template: `
        <div class="app">
            <div>{{message}}</div>
            <div>{{msgName}}</div>
            <counter></counter>
        </div>
      `
});
// 要注意，logger 插件会生成状态快照，所以仅在开发环境使用。
// createLogger 函数有几个配置项：
// const logger = createLogger({
//     collapsed: false, // 自动展开记录的 mutation
//     filter(mutation, stateBefore, stateAfter) {
//         // returns true if a mutation should be logged
//         // `mutation` is a { type, payload }
//         return mutation.type !== "aBlacklistedMutation"
//     },
//     transformer(state) {
//         // 在开始记录之前转换状态
//         // 例如，只返回指定的子树
//         return state.subTree
//     },
//     mutationTransformer(mutation) {
//         // mutation 按照 { type, payload } 格式记录
//         // 我们可以按任意方式格式化
//         return mutation.type
//     }
// })