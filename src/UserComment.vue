<script>
import { collection, getDocs, DocumentReference, getDoc, setDoc, updateDoc, addDoc, serverTimestamp} from "firebase/firestore"
import {db} from "@/firebase";


export default {
  name: "UserComment",
  data: () => {return{
    blog_ref:null,
    blog_doc: null,
    nickname: null,
    email: null,
    text: null,
    comments: [],
    showed_comment_count: 0
  }},
  methods:{
    formatDistanceToNow(date) {
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
    },

    comment_context(comment_ref){
      const date = new Date(comment_ref.data().timestamp.seconds * 1000 + comment_ref.data().timestamp.nanoseconds / 1000000);
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
      const formattedDate = date.toLocaleDateString(undefined, options);
      return{
        id: comment_ref.id,
        email: comment_ref.data().email,
        nickname: comment_ref.data().nickname,
        show: comment_ref.data().show,
        text: comment_ref.data().text,
        human_readable_date: this.formatDistanceToNow(date),
        date: formattedDate,
      }
    },

    async get_comments_form_blog(){
      const blog_context_query_snapshot = await getDocs(collection(db, 'blog_context'));
      const targetDoc = blog_context_query_snapshot.docs.find(doc => doc.data().slug === this.$route.params.slug || doc.id === this.$route.params.slug);

      if (targetDoc) {
        this.blog_ref = targetDoc
        this.blog_doc = targetDoc.data()
      } else {
        router.push({
          name: 'NotFound'
        })
      }

      if (this.blog_doc){
        this.comments = []
        const commentsCollection = collection(db, 'blog_context', this.blog_ref.id, 'comments');
        const comments_snapshot = await getDocs(commentsCollection)
        comments_snapshot.docs.forEach(doc => {
          this.showed_comment_count += doc.data().show === true
          this.comments.push(this.comment_context(doc))})
      }
    },
    async send_comment () {
      const commentData = {
        nickname: this.nickname,
        email: this.email,
        text: this.text,
        show: false,
        timestamp: serverTimestamp(),
      };
      const commentsCollection = collection(db, 'blog_context', this.blog_ref.id, 'comments');
      const comment_id = await addDoc(commentsCollection, commentData);

      await this.get_comments_form_blog()
      this.$route.hash = '#' + comment_id.id
    },
  },
  async mounted() {
    await this.get_comments_form_blog()
  }
}
</script>

<template>
<section>
  <div class="card shadow">
    <div class="card-header d-flex justify-content-between">
      <div class="z-1">
        <i class="fa-regular fa-comments"></i>
        Yorumlar
        /
        <a href="#" class="fw-semibold text-decoration-none link-primary"><i class="fa-solid fa-plus"></i> Yorum Yap</a>

      </div>
      <div class="z-0 w-100 position-absolute text-center">
        <strong>Comment Manager</strong>
        <span class="mx-2"></span>
      </div>
      <div class="z-1">x</div>
    </div>
    <div class="card-body" id="yeni_yorum">

      <form @submit.prevent="send_comment" class="d-block d-md-flex " >
        <div class="w-100">
          <label class="form-text">Rumuz</label>
          <input v-model="nickname" class="form-control" type="text" placeholder="Rumuz" required>
          <label class="form-text">Email</label>
          <input v-model="email" class="form-control" type="email" placeholder="Email" required>
          <label class="form-text">Yorumunuz</label>
          <textarea v-model="text" class="form-control" cols="6" rows="3" placeholder="Yorumunuz" required></textarea>
          <div class="w-100 text-end mt-2">
            <button class="btn btn-primary" type="submit">Gönder</button>
          </div>
        </div>
        <hr class="d-none d-md-block vr mx-2 ">
        <div class="w-100">
          <hr class="d-block d-md-none">
          <span class="fw-semibold">Yorum Yaparken</span>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, vel!</p>
        </div>
      </form>

      <hr>
      <div v-if="! (showed_comment_count > 0)" class="border bg-light p-2 rounded">
        Henüz bir yorum yapılmadı <a href="#yeni_yorum" class="fw-bold">Yorum yapın</a>
      </div>
      <div v-else v-for="comment in comments" :id="comment.id" >
        <div class="d-flex border-bottom p-2" v-if="comment && comment.show">
          <div class="rounded-circle border text-center pt-2 my-auto" style="width: 50px; height: 50px">
            <i class="fa-solid fa-user" style="font-size: 30px"></i>
          </div>
          <div class="ms-1 w-100">
            <strong>
              {{ comment.nickname }}
            </strong>
            <br>
            {{ comment.text }}
            <br>
            <span class="text-secondary"><i class="fa-regular fa-clock me-1"></i>{{ comment.human_readable_date }}</span>
          </div>
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
