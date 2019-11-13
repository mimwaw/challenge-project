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

    // Create States
    createStatus: '',
    createError: '',

    // Tags
    articleTags: [],
    tagsStatus: '',
    tagsError: '',

    // Edit Article
    updateArticleStatus: '',
    updateArticleError: '',
  },
  getters: {
    getArticles: state => state.articles,
    getArticleStatus: state => state.fetchStatus,
    getArticleError: state => state.error,
    getArticlesPages: state => state.articlesPages,
    getCreateStatus: state => state.createStatus,
    getCreateError: state => state.createError,
    getTagsStatus: state => state.tagsStatus,
    getTags: state => state.articleTags,
    getUpdateStatus: state => state.updateArticleStatus
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

    // Create New Article
    CREATE_ARTICLE_REQ: state => {
      state.createStatus = 'loading';
    },
    CREATE_ARTICLE_SUCCESS: state => {
      state.createStatus = 'success';
    },
    CREATE_ARTICLE_ERROR: (state, error) => {
      state.createStatus = 'error';
      state.createError = error;
    },

    // Get Tags
    FETCH_TAGS_REQ: state => {
      state.tagsStatus = 'loading';
    },
    FETCH_TAGS_SUCCESS: (state, tags) => {
      state.tagsStatus = 'success';
      state.articleTags = tags;
    },
    FETCH_TAGS_ERROR: (state, error) => {
      state.tagsStatus = 'error';
      state.tagsError = error;
    },

    // Update Article
    UPDATE_ARTICLE_REQ: state => {
      state.updateArticleStatus = 'loading';
    },
    UPDATE_ARTICLE_SUCCESS: state => {
      state.updateArticleStatus = 'success';
    },
    UPDATE_ARTICLE_ERROR: (state, error) => {
      state.updateArticleStatus = 'error';
      state.updateArticleError = error;
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
    CREATE_ARTICLE: ({ commit }, { title, desc, body, tags }) => {
      return new Promise((resolve, reject) => {
        commit('CREATE_ARTICLE_REQ');
        api
          .post('/articles', {
            article: {
              title: title,
              description: desc,
              body: body,
              tagList: tags,
            },
          })
          .then(res => {
            commit('CREATE_ARTICLE_SUCCESS');
            resolve(res);
          })
          .catch(err => {
            commit('CREATE_ARTICLE_ERROR', err);
            reject(err);
          });
      });
    },
    FETCH_TAGS: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit('FETCH_TAGS_REQ');
        api
          .get('/tags')
          .then(res => {
            commit('FETCH_TAGS_SUCCESS', res.data.tags.sort());
            resolve(res);
          })
          .catch(err => {
            commit('FETCH_TAGS_ERROR', err);
            reject(err);
          });
      });
    },
    UPDATE_ARTICLE: ({ commit }, { slug, title, desc, body, tags }) => {
      return new Promise((resolve, reject) => {
        commit('UPDATE_ARTICLE_REQ');
        api
          .put(`/articles/${slug}`,{
            article: {
              title: title,
              description: desc,
              body: body,
              tagList: tags
            }
          })
          .then(res => {
            commit('UPDATE_ARTICLE_SUCCESS');
            resolve(res);
          })
          .catch(err => {
            const error = res.response.data;
            commit('UPDATE_ARTICLE_ERROR', error);
            reject(err);
          });
      });
    },
  },
};
