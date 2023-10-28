<script setup>
import { ref } from "vue";
import { db } from '@/firebase'
import { collection, getDocs } from "firebase/firestore"
import { onMounted } from "vue";

const blog_text_list = ref({})

onMounted(async () => {
  const blog_context_query_snapshot = await getDocs(collection(db, 'blog_context'))
  let blog_context_query_results = []
  blog_context_query_snapshot.forEach((doc) => {
    const blog_context = {
      id: doc.id,
      title: doc.data().title,
      explanation: doc.data().explanation,
      slug: doc.data().slug
    }
    blog_context_query_results.push(blog_context)
  })
  blog_text_list.value = blog_context_query_results
})


</script>

<template>
<div class="card shadow" style="border:2px dashed var(--bs-secondary)!important;">
  <div class="card-header text-secondary d-flex justify-content-between">
    <div>
      <i class="fa-solid fa-terminal"></i> <strong class="fw-semibold">BLOG CONTEXT</strong>
    </div>
    <div></div>
    <div>
      Lastest
    </div>
  </div>
  <div class="card-body row p-0 m-0">

    <div class="col-3 p-1 " v-for="blog_text in blog_text_list">
      <div class="card" >
        <img class="card-img-top" src="https://github.com/F4ruk-seker.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{ blog_text.title }}</h5>
          <p class="card-text">{{ blog_text.explanation }}</p>
          <router-link
              class="btn btn-primary fw-semibold"
              :to="{
                name: 'blog_read',
                params: {
                  'slug': blog_text.slug ? blog_text.slug : blog_text.id,
                   }
              }"
          >
            OKU
          </router-link>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<style scoped>

</style>
