import api from '../api/api';

export const articles = {
  namespaced: true,
  state: {
    articles: [],
    fetchStatus: '',
    error: '',
    articlesPages: '',

    // Delete States
    deleteStatus: '',
    deleteError: '',
  },
  getters: {
    getArticles: state => state.articles,
    getArticleStatus: state => state.fetchStatus,
    getArticleError: state => state.error,
    getArticlesPages: state => state.articlesPages,
  },
  mutations: {
    ARTICLES_REQ: state => {
      state.fetchStatus = 'loading';
    },
    ARTICLES_SUCCESS: (state, articles) => {
      state.fetchStatus = 'success';
      state.articles = articles;
    },
    ARTICLES_ERROR: (state, error) => {
      state.fetchStatus = 'error';
      state.error = error;
    },
    ARTICLES_PAGES: (state, pages) => {
      state.articlesPages = pages;
    },

    // Delete Article by slug
    DELETE_ARTICLE_REQ: state => {
      state.deleteStatus = 'loading';
    },
    DELETE_ARTICLE_SUCCESS: state => {
      state.deleteStatus = 'success';
    },
    DELETE_ARTICLE_ERROR: (state, error) => {
      state.deleteStatus = 'error';
      state.deleteError = error;
    },
  },
  actions: {
    FETCH_ARTICLES_REQ: (
      { commit, dispatch, rootState },
      { limit, offset }
    ) => {
      return new Promise((resolve, reject) => {
        commit('ARTICLES_REQ');
        dispatch('login/AUTH_USERNAME', null, {
          root: true,
        }).then(() => {
          api
            .get('/articles', {
              params: {
                author: rootState.login.userName,
                limit: limit,
                offset: offset,
              },
            })
            .then(res => {
              commit('ARTICLES_SUCCESS', res.data.articles);
              dispatch('FETCH_ARTICLES_PAGES', res.data.articlesCount / limit);
              resolve(res);
            })
            .catch(err => {
              commit('ARTICLES_ERROR', err);
              reject(err);
            });
        });
      });
    },
    FETCH_ARTICLES_PAGES: ({ commit }, pages) => {
      const pageCount = Math.ceil(pages);
      commit('ARTICLES_PAGES', pageCount);
    },
    DELETE_ARTICLES: ({ commit }, slug) => {
      return new Promise((resolve, reject) => {
        commit('DELETE_ARTICLE_REQ');
        api
          .delete(`/articles/${slug}`)
          .then(res => {
            commit('DELETE_ARTICLE_SUCCESS');
            resolve(res);
          })
          .catch(err => {
            commit('DELETE_ARTICLE_ERROR', err);
            reject(err);
          });
      });
    },
  },
};
