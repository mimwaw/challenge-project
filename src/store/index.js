import Vue from 'vue';
import Vuex from 'vuex';
import { articles } from '../store/articles';
import { login } from '../store/login';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    articles: articles,
    login: login,
  }
});
