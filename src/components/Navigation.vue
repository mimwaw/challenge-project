<template>
  <div class="nav">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-2 col-md-3 col-sm-4 col-6">
          <h4>Arvan Challenge</h4>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-4 col-4">
          <span>Welcome, {{ username }}</span>
        </div>
        <div class="col-lg-1 col-md-2 col-sm-2 col-2 ml-auto">
          <button
            type="button"
            class="btn btn-outline-info"
            @click="handleLogOut"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/api';
import BaseButton from './BaseButton';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: null,
    };
  },
  created() {
    this.fetchUsername();
  },
  methods: {
    ...mapActions({
      logOut: 'login/AUTH_LOGOUT',
    }),
    fetchUsername: function() {
      api.get('/user').then(res => {
        this.username = res.data.user.username;
      });
    },
    handleLogOut: function() {
      this.logOut().then(() => {
        this.$router.push('/login');
      });
    },
  },
  components: {
    BaseButton,
  },
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #373a3c;
  width: 100%;
  height: 60px;
  color: white;
  padding: 10px 0;
}
</style>
