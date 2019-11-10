import api from '../api/api';
import { stat } from 'fs';

export const login = {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    authStatus: '',
    authError: '',
    userName: '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getAuthStatus: state => state.authStatus,
    getAuthError: state => state.error,
    getUserName: state => state.userName,
  },
  mutations: {
    AUTH_REQ(state) {
      state.authStatus = 'loading';
    },
    AUTH_SUCCESS(state, token) {
      state.authStatus = 'success';
      state.token = token;
    },
    AUTH_ERROR(state, error) {
      state.authStatus = 'error';
      state.authError = error;
    },
    AUTH_USERNAME_SUCCESS(state, username) {
      state.userName = username;
    },
  },
  actions: {
    AUTH({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AUTH_REQ');
        api
          .post('/users/login', {
            user: {
              email: user.email,
              password: user.password,
            },
          })
          .then(res => {
            const token = res.data.user.token;
            localStorage.setItem('user-token', token);
            commit('AUTH_SUCCESS', token);
            resolve(res);
          })
          .catch(err => {
            commit('AUTH_ERROR', err);
            localStorage.removeItem('user-token');
            reject(err);
          });
      });
    },
    AUTH_LOGOUT: () => {
      return new Promise(resolve => {
        localStorage.removeItem('user-token');
        resolve();
      });
    },
    AUTH_USERNAME: ({ commit }) => {
      return new Promise((resolve, reject) => {
        api
          .get('/user')
          .then(res => {
            commit('AUTH_USERNAME_SUCCESS', res.data.user.username);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
  },
};
