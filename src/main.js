import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Qs from "qs"
import {Slider} from 'element-ui'

Vue.use(Slider)

Vue.config.productionTip = false

// axios默认配置
axios.defaults.timeout = 5000;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://127.0.0.1:5000';

Vue.prototype.$axios = axios;
Vue.prototype.qs = Qs;

new Vue({
  render: h => h(App),
}).$mount('#app')
