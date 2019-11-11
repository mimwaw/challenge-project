<template>
  <div class="nav">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-2">
          <h4>Arvan Challenge</h4>
        </div>
        <div class="col-lg-2">
          <span>Welcome, {{ username }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      username: null
    };
  },
  created() {
    this.fetchUsername();
  },
  methods: {
    fetchUsername() {
      api.get("/user").then(res => {
        this.username = res.data.user.username;
      });
    }
  }
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