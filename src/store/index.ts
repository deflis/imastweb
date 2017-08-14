import Vuex, { Store } from "vuex"
import Vue from "vue"

import actions from './actions';
import getters from './getter';
import mutations, { MutationTypes } from './mutations';
import state from './state';

export { MutationTypes }

Vue.use(Vuex)

const prod = (process.env.NODE_ENV === 'production');

const store = new Store({
    state,
    actions,
    mutations,
    getters,
    strict: prod,
});

export default store;