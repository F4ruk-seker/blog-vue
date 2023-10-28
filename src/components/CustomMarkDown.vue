<script>
import {marked} from "marked";


const compiledMarkdown = computed(
    () => {
    }
)

export default {
  name: 'CustomMarkDown',
  props:['context'],
  computed:{
    compiledMarkdown: () =>{
      return marked(this.context, {sanitize: true });

    }
  }
}

</script>

<template>
<div v-html="compiledMarkdown"></div>
</template>

<style scoped>

</style>
