<script>
export default {
  name: "CustomNavbar"
}
</script>

<template>
<div class="bg-secondary text-center" style="height: 20vh">
  <strong >BANNER</strong>
</div>
<nav class="position-sticky position-absolute z-3 top-0 bg-dark border-light border-0 border-bottom">
<div class="container justify-content-between d-flex py-2">
  <strong class="breadcrumb-item text-light my-auto">
    <i class="fa-solid fa-blog"></i>
    Blog
  </strong>
  <div></div>
  <div>
    <button class="btn btn-outline-primary" style="width: 100px" >
      <i class="fa-solid fa-moon text-warning"></i>
      <strong class="fw-bold">
        Auto
      </strong>
    </button>
    <button class="btn btn-sm btn-success">Login</button>
  </div>
</div>
</nav>
</template>

<style scoped>

</style>
