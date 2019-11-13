import api from '../api/api';

export const login = {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    authStatus: '',
    authError: '',
    userName: '',

    // Register
    registerStatus: '',
    registerError: '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getAuthStatus: state => state.authStatus,
    getAuthError: state => state.error,
    getUserName: state => state.userName,
    getRegisterStatus: state => state.registerStatus,
    getRegisterError: state => state.registerError,
  },
  mutations: {
    AUTH_REQ: state => {
      state.authStatus = 'loading';
    },
    AUTH_SUCCESS: (state, token) => {
      state.authStatus = 'success';
      state.token = token;
    },
    AUTH_ERROR: (state, error) => {
      state.authStatus = 'error';
      state.authError = error;
    },
    AUTH_USERNAME_SUCCESS: (state, username) => {
      state.userName = username;
    },
    REGISTER_REQ: state => {
      state.registerStatus = 'loading';
    },
    REGISTER_SUCCESS: (state, token) => {
      state.registerStatus = 'success';
      state.token = token;
    },
    REGISTER_ERROR: (state, error) => {
      state.registerStatus = 'error';
      state.registerError = error.join('\n');
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
    REGISTER: ({ commit }, { username, email, password }) => {
      return new Promise((resolve, reject) => {
        commit('REGISTER_REQ');
        api
          .post('/users', {
            user: {
              username: username,
              email: email,
              password: password,
            },
          })
          .then(res => {
            const token = res.data.user.token;
            localStorage.setItem('user-token', token);
            commit('REGISTER_SUCCESS', token);
            resolve(res);
          })
          .catch(err => {
            const error = err.response.data.errors;
            commit(
              'REGISTER_ERROR',
              Object.entries(error).map(([key, value]) => {
                return `<b>${key}</b>: ${value}<br />`;
              })
            );
            console.log(error);
            localStorage.removeItem('user-token');
            reject(err);
          });
      });
    },
  },
};
