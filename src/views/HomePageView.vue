<script setup>

import UserCard from "@/components/UserCard.vue";
import BlogPreView from "@/components/BlogPreView.vue";
</script>

<template>
<!-- Main User detail -->
<main class="">

  <user-card class="shadow" />
  <div class="d-flex my-2">
    <button class="btn btn-outline-primary" style="width: 100px" >
      <i class="fa-solid fa-moon text-warning"></i>
      <strong class="fw-bold">
        Auto
      </strong>
    </button>
    <hr class="w-100 ms-2 my-auto">
  </div>

  <BlogPreView />
</main>
</template>

<style scoped>

</style>
