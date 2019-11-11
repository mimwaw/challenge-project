<template>
  <div class="container-fluid">
    <div class="row">
      <Navigation />
    </div>
    <div class="row">
      <div class="col-lg-3">
        <div class="row">
          <Sidebar />
        </div>
      </div>
      <div class="col-lg-9">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";

export default {
  components: {
    Navigation,
    Sidebar
  }
}
</script>