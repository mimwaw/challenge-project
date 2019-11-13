<template>
  <div class="container-fluid">
    <div class="row">
      <Navigation />
    </div>
    <div class="row">
      <div class="col-lg-2 col-md-3 col-sm-3 col-12">
        <div class="row">
          <Sidebar />
        </div>
      </div>
      <div class="col-lg-10 col-md-9 col-sm-9 col-12">
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