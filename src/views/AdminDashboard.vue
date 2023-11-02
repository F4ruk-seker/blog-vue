<script setup>
import { useStore } from 'vuex'
const store = useStore()

const getUser = store.getters.get_user

</script>

<template>
<section class="card shadow">
  <div class="card-header">
    DASH BOARD
  </div>
  <div class="card-body">
    {{ getUser }}
  </div>

</section>
</template>

<style scoped>

</style>
