<template>
  <button :type="btnType" :class="btnClass" :disabled="isLoading">
    <slot v-if="!isLoading"></slot>
    <span v-else class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  </button>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props : {
    btnType: String,
    btnClass: String,
    isLoading: Boolean
  }

}
</script>