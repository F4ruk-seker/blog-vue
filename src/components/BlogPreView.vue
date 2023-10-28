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
  <div class="card-body">

    <div class="border-bottom pb-2" v-for="blog_text in blog_text_list">

      <div class="row p-0 m-0">
        <div class="col-12 col-sm-4 col-md-3 ">
          <img class="ratio ratio-1x1 rounded" src="https://github.com/F4ruk-seker.png" alt="user profile picture">
        </div>
        <div class="col ps-2 flex-column d-flex">
          <div class="h-25 flex-column">
            <strong class="fw-bold text-primary" style="font-size: 24px;">
              {{ blog_text.title }}
            </strong>
          </div>
          <div class="h-100 align-content-center flex-grow-1 flex-column">
            <p class="ms-2">
<!--              md text-->
              {{ blog_text.explanation }}

            </p>
          </div>
          <div class="h-25 my-auto flex-column" >
            <router-link
                class="btn btn-primary fw-semibold"
              :to="{
                name: 'blog_read',
                params: {
                  'slug': blog_text.slug ? blog_text.slug : blog_text.id,
                   }
              }"
            >OKU</router-link>

          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<style scoped>

</style>
