<template>
  <div :class="['toaster', `toaster--${type}`]" v-if="isShow">
    <slot></slot>
    <span @click="$emit('close')">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    type: String,
    isShow: Boolean,
    closeToast: Function
  }
};
</script>

<style lang="scss" scoped>
.toaster {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;

  &--success {
    background-color: #E2EED8;
    color: #5CB85C;
  }

  &--error {
    background-color: #efdfdf;
    color: #d9534f;
  }
}
</style>