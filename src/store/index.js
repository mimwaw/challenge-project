import Vue from "vue";
import Vuex from "vuex";
import api from "../api/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("user-token") || "",
        status: ""
    },
    getters: {
        isAuthenticated: state => !!state.token,
        authStatus: state => state.status
    },
    mutations: {
        AUTH_REQ (state) {
            state.status = "loading";
        },
        AUTH_SUCCESS (state, token) {
            state.status = "success";
            state.token = token;
        },
        AUTH_ERROR (state) {
            state.status = "error";
        }
    },
    actions: {
        AUTH (context, user) {
            return new Promise((resolve, reject) => {
                context.commit('AUTH_REQ');
                api.post("/users/login", {
                    "user": {
                        "email": user.email,
                        "password": user.password
                    }
                })
                    .then(res => {
                        const token = res.data.user.token;
                        localStorage.setItem("user-token", token);
                        context.commit('AUTH_SUCCESS', res);
                        resolve(res);
                    })
                    .catch(err => {
                        context.commit('AUTH_ERROR', err);
                        localStorage.removeItem("user-token");
                        reject(err);
                    });
            });
        },
        AUTH_LOGOUT: () => {
            return new Promise(resolve => {
                localStorage.removeItem("user-token");
                resolve();
            });
        }
    }
});
