<template>
  <div :class="['toaster', `toaster--${type}`]" v-if="!isHide">
    <slot></slot>
    <span class="glyphicon glyphicon-remove" @click="isHide = !isHide"></span>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    isHide: Boolean
  }
}
</script>

<style lang="scss" scoped>
.toaster {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;

  &--success {

  }

  &--error {
    background-color: #efdfdf;
    color: #d9534f;
  }

}
</style>