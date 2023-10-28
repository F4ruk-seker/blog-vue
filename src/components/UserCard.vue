<script setup>
import {ref} from "vue";

const field = ref(true)

</script>

<template>
  <section class="">
    <div class="card shadow w-100">
      <div class="card-header justify-content-between d-flex">
      <span style="width: 80px">
        <i class="fa-solid fa-user"></i>
        User
      </span>
        <span class="w-100 text-center">Blog User</span>
        <div class="d-flex">
          <div class="btn btn-light btn-sm p-0 px-1 m-0" @click="field = !field">
            <i class="fa-solid fa-minus"></i>
          </div>
          <i class="fa-regular fa-square mx-2"></i>
          <i class="fa-solid fa-xmark text-danger"></i>
        </div>
      </div>
      <Transition>
        <div class="card-body" v-if="field">
        <div class="w-50 mx-auto">
          <img class=" ratio ratio-1x1 rounded-circle" src="https://github.com/F4ruk-seker.png" alt="user profile picture">
        </div>
        <div class="col my-auto ms-3">
          <strong>
            Faruk Şeker
          </strong>
          <p class="">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aut blanditiis deleniti eligendi explicabo minima, quidem sunt tenetur ullam voluptatibus.
          </p>
          <div class="">
            <button type="button" class="btn btn-outline-primary me-2">Python</button>
            <button type="button" class="btn btn-outline-secondary me-2">Django</button>
            <button type="button" class="btn btn-outline-success me-2">REST-API</button>
            <button type="button" class="btn btn-outline-danger me-2">Vue.js</button>
            <button type="button" class="btn btn-outline-warning me-2">Figma</button>
            <button type="button" class="btn btn-outline-info me-2">Davinci</button>
          </div>
        </div>
      </div>
      </Transition>
      <div class="card-footer text-secondary">
        last login ! NaN
      </div>
    </div>
  </section>
</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.50s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
