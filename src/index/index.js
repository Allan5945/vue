import css from "./static/css/index.css"
import csssss from "./static/a.css"
import Vue from 'Vue';
import 'babel-polyfill'
import App from './page/App.vue'

const v = new Vue({
    el: '#app',
    render: h => h(App)
});
