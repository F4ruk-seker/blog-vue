<script setup>
import { ref } from "vue";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex";

const email = ref('f4rukseker@gmail.com');
const password = ref('1923100!TR');

const auth = getAuth();

const route = useRoute()
const router = useRouter()
const store = useStore()

async function login() {
  try {
    const credentials =await signInWithEmailAndPassword(auth, email.value, password.value);
    store.dispatch('login', credentials.user)
    router.push({
      name: 'admin_dashboard'
    })
    console.log("User successfully logged in!");
    // You can add further actions after successful login here
  } catch (error) {
    console.error("Error signing in:", error.message);
    // Handle error cases here, e.g., display an error message to the user
  }
}

</script>

<template>
<section class="card shadow">
  <div class="card-header">
    <strong>Login</strong>
  </div>
  <form class="card-body" @submit.prevent="login">
    <div class="mb-3">
      <label class="fw-semibold text-primary">Email<span class="text-danger ms-1">*</span></label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text h-100" id="email-addon">
            <i class="fa-regular fa-envelope"></i>
          </span>
        </div>
        <input v-model="email" class="form-control" type="email" placeholder="email" aria-describedby="email-addon">
      </div>
    </div>
    <div class="mb-3">
      <label class="fw-semibold text-primary">Şifre<span class="text-danger ms-1">*</span></label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text h-100">
            <i class="fa-solid fa-key"></i>
          </span>
        </div>
        <input v-model="password" class="form-control" type="password" placeholder="şifre">
      </div>
    </div>
    <hr class="w-25">
    <div class="w-100">
      <button type="submit" class="btn btn-primary">Giriş</button>
    </div>
  </form>
  <div class="card-footer">
    Req
  </div>
</section>
</template>

<style scoped>

</style>
