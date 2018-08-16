<template>
  <div class="card">
     <div>{{comment.author}}</div>
     <div>{{comment.text}}</div>
     <div>{{comment.created_at}}</div>
     <div v-if="comment.created_at !== comment.updated_at">{{comment.updated_at}}</div>
   
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment:{}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
  width: 400px;
  min-height: 150px;
  border: 1px solid  lightgreen;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: aquamarine;
}
</style>
