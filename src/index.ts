
import Config from "./api/config";
import * as Mastodon from "./api/mastodon";

if (Config.token) {
    Mastodon.setToken(Config.token.access_token);
}

import Vue from 'vue'
import VueRouter, { RouterOptions } from 'vue-router'

import BootstrapVue from 'bootstrap-vue';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon.vue'

import routes from './routes'
import app from "./app.vue"
import store from './store/'

Vue.use(VueRouter)
Vue.component('icon', Icon)
Vue.use(BootstrapVue);

const router = new VueRouter({
  mode: 'history',
  routes
} as RouterOptions);

new Vue({
  router,
  store,
  render: h => h(app)
}).$mount('#app');

