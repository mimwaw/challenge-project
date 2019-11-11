<template>
  <div class="sidebar">
      <h2>Post</h2>
      <!-- <a href="#" class="sidebar__link">All Articles</a> -->
      <router-link to="/articles" class="sidebar__link" active-class="sidebar__link--active" exact>All Articles</router-link>
      <router-link to="/articles/create" class="sidebar__link" active-class="sidebar__link--active" exact>New Article</router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #1C7CD5;
  width: 100%;
  height: 100%;
  min-height: 200vh;
  color: white;

  h2 {
    margin-top: 20px;
    margin-left: 10px;
  }

  &__link {
    display: block;
    color: white;
    padding: 10px 20px;
    width: 100%;

    &:hover, &--active {
      background-color: rgba($color: #fff, $alpha: 0.2);
    }
  }
}
</style>