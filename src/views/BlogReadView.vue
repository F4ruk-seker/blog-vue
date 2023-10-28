<script setup>
import {computed, ref} from "vue";
import { db, storage } from '@/firebase'
import { getDownloadURL, ref as firebaseRef } from "firebase/storage"

import { collection, getDocs, DocumentReference, getDoc } from "firebase/firestore"
import { onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import {marked} from "marked";

const blog_context = ref({})
const route = useRoute()
const router = useRouter()

function complete_markdown(context){
  return marked(context, { sanitize: true });
}

async function download_markdown(file_name) {
  const markdown_ref = firebaseRef(storage, 'markdowns/' + file_name)
  if (markdown_ref){
    const download_url = await getDownloadURL(markdown_ref)
    const response = await fetch(download_url)
    return await response.text()
  }

}

onMounted(async () => {

  const blog_context_query_snapshot = await getDocs(collection(db, 'blog_context'))

  const get_from_slug = blog_context_query_snapshot.docs.filter(doc => doc.data().slug === route.params.slug)

  const get_from_id = blog_context_query_snapshot.docs.filter(doc => doc.id === route.params.slug)

  if (get_from_slug.length > 0) {
    blog_context.value = get_from_slug[0].data()
  } else if (get_from_id.length > 0) {
    blog_context.value = get_from_id[0].data()
  } else {
    router.push({
      name: 'NotFound'
    })
  }

  if (blog_context){

    const date = new Date(blog_context.value.created.seconds * 1000 + blog_context.value.created.nanoseconds / 1000000);
    const human_readable_time = formatDistanceToNow(date)
    // Format the date as a human-readable string
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    blog_context.value.created = {
      readable: human_readable_time,
      date: formattedDate
    }
    blog_context.value.explanation_completed_markdown = complete_markdown(blog_context.value.explanation)
    const content_context = await download_markdown(blog_context.value.content)
    blog_context.value.content_completed_markdown = complete_markdown(content_context)
  }
})


function formatDistanceToNow(date) {
  const now = new Date();
  const distanceInSeconds = Math.floor((now - date) / 1000);

  if (distanceInSeconds < 5) {
    return "şimdi";
  } else if (distanceInSeconds < 60) {
    return `${distanceInSeconds} saniye önce`;
  } else if (distanceInSeconds < 3600) {
    const minutes = Math.floor(distanceInSeconds / 60);
    return `${minutes} dakika önce`;
  } else if (distanceInSeconds < 86400) {
    const hours = Math.floor(distanceInSeconds / 3600);
    return `${hours} saat önce`;
  } else if (distanceInSeconds < 2592000) {
    const days = Math.floor(distanceInSeconds / 86400);
    return `${days} gün önce`;
  } else if (distanceInSeconds < 31536000) {
    const months = Math.floor(distanceInSeconds / 2592000);
    return `${months} ay önce`;
  } else {
    const years = Math.floor(distanceInSeconds / 31536000);
    return `${years} yıl önce`;
  }
}

</script>

<template>
<section class="">
  <div class="card shadow">
    <div class="card-header justify-content-between position-relative d-flex fw-semibold text-primary font-monospace">
      <div class="d-flex my-auto">
        <router-link class="z-1 text-secondary" :to="{name:'home_page'}">
          <i class="fa-solid fa-arrow-left m-auto"></i>
        </router-link>
        <hr class="vr p-0 m-0 mx-2">
        <span class="">
          {{ blog_context.title }}
        </span>
      </div>
      <span class="z-0 text-secondary text-center position-absolute w-100 mx-auto">Blog Reader</span>
      <router-link class="z-1 text-danger" :to="{name:'home_page'}">
        <i class="fa-solid fa-xmark"></i>
      </router-link>
    </div>
    <div class="card-body">
      <p>Ön yazı</p>
      <p v-html="blog_context.explanation_completed_markdown"></p>
      <hr class="w-25 bg-secondary">
      <p v-html="blog_context.content_completed_markdown"></p>
    </div>
    <div class="card-footer justify-content-between d-flex">
      <span>
        <i class="fa-regular fa-clock"></i>
        {{ blog_context.created ? blog_context.created.readable: 'NaN' }}
      </span>
      <span class="text-secondary">
        {{ blog_context.created ? blog_context.created.date: 'NaN' }}
      </span>
      <span>
        <i class="fa-regular fa-eye"></i>
        0
      </span>
    </div>
  </div>

  <hr>

  <div class="card shadow">
    <div class="card-header d-flex justify-content-between">
      <div class="z-1">
        <i class="fa-regular fa-comments"></i>
        Yorumlar
        /
        <a href="#" class="fw-semibold text-decoration-none link-primary"><i class="fa-solid fa-plus"></i> Yorum Yap</a>

      </div>
      <div class="z-0 w-100 position-absolute text-center">
        <strong>Comment Reader</strong>
        <span class="mx-2"></span>
      </div>
      <div class="z-1">x</div>
    </div>
  <div class="card-body">
    <div class="row p-0 m-0">
      <div class="col-2 col-lg-1">
        <img class=" ratio ratio-1x1 rounded-circle" src="https://github.com/F4ruk-seker.png" alt="user profile picture">
      </div>
      <div class="col">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, iure.
        <span class="text-secondary">
            <i class="fa-regular fa-clock"></i>
        </span>
      </div>
    </div>
  </div>
  <div class="card-footer">

  </div>
</div>
</section>
</template>

<style scoped>

</style>
