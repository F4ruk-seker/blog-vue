<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import CustomNavbar from "@/components/CustomNavbar.vue";
import BlogPreView from "@/components/BlogPreView.vue";
import UserCard from "@/components/UserCard.vue";
</script>

<template>
<CustomNavbar />


  <main class="container-fluid">
    <div class="row m-0 mt-3 p-0">
      <aside class="col-12 col-sm-4 col-lg-3">
        <user-card class="" />
        <hr>
        <div class="border rounded shadow p-2 d-flex">
        <span class="border rounded py-1 px-2 me-2">
          <i class="fa-solid fa-magnifying-glass my-auto"></i>
        </span>
          <input class="form-control border-primary-subtle" type="search" placeholder="search">
        </div>
        <hr>
        <section>
          <div class="card shadow w-100">
            <div class="card-header justify-content-between d-flex">
      <span style="width: 80px">
        <i class="fa-regular fa-clock"></i>
      </span>
              <span class="w-100 text-center">Son Olaylar</span>
              <div class="d-flex">
                <div class="btn btn-light btn-sm p-0 px-1 m-0" @click="field = !field">
                  <i class="fa-solid fa-minus"></i>
                </div>
                <i class="fa-regular fa-square mx-2"></i>
                <i class="fa-solid fa-xmark text-danger"></i>
              </div>
            </div>
            <Transition>
              <div class="card-body">
                s
              </div>
            </Transition>
          </div>
        </section>
      </aside>
      <section class="col-12 col-sm-8 col-lg-9">
        <router-view />
      </section>
    </div>

  </main>


</template>

<style scoped>
*{
  background-color: var(--bs-light);
}
/*
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
*/
</style>
