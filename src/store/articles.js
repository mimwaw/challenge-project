import api from '../api/api';

export const articles = {
  namespaced: true,
  state: {
    articles: [],
    status: '',
    error: '',
    articlesPages: ''
  },
  getters: {
    getArticles: state => state.articles,
    getArticleStatus: state => state.status,
    getArticleError: state => state.error,
    getArticlesPages: state => state.articlesPages
  },
  mutations: {
    ARTICLES_REQ: (state) => {
      state.status = 'loading';
    },
    ARTICLES_SUCCESS: (state, articles) => {
      state.status = 'success';
      state.articles = articles;
    },
    ARTICLES_ERROR: (state, error) => {
      state.status = 'error';
      state.error = error;
    },
    ARTICLES_PAGES: (state, pages) => {
      state.articlesPages = pages;
    }
  },
  actions: {
    FETCH_ARTICLES_REQ: ({ commit, dispatch, rootState }, { limit, offset }) => {
      return new Promise((resolve, reject) => {
        commit('ARTICLES_REQ');
        dispatch('login/AUTH_USERNAME', null, {
          root: true
        }).then(() => {
          api.get('/articles', {
            params: {
              author: rootState.login.userName,
              limit: limit,
              offset: offset
            }
          })
          .then(res => {
            commit('ARTICLES_SUCCESS', res.data.articles);
            dispatch('FETCH_ARTICLES_PAGES', res.data.articlesCount/limit)
            resolve(res);
          })
          .catch(err => {
            commit('ARTICLES_ERROR', err);
            reject(err);
          })
        })
      })
    },
    FETCH_ARTICLES_PAGES: ({ commit }, pages) => {
      const pageCount = Math.ceil(pages);
      commit('ARTICLES_PAGES', pageCount);
    }
  }
}