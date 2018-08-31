import Vue from 'vue';

var E1 = Vue.extend({
    name: 'extend1',
    props: ['a', 'b', 'c'],
    data(){
        return {
            msg : '12345'
        }
    },
    template: '<h1>{{msg}}</h1>'
});

var vm1 = new E1({
    el: '#app2'
});
var vm2 = new Vue({
    el: '#app'
});

console.log(vm1) // constructor => VueComponent
console.log(vm2) // constructor => Vue$3

