<template>
  <div class="loading" v-if="isShow">
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.loading  {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>