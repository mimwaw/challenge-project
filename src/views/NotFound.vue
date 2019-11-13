<template>
  <div class="wrapper d-flex align-items-center">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <p>Error 404, Not Found!</p>
      </div>
      <div class="row align-items-center justify-content-center">
        <button class="btn btn-outline-info" @click="$router.go(-2)">
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
}
</style>
