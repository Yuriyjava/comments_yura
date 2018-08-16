<template>
<div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <router-link to="/about">About</router-link>
    <Comment v-for="comment in validComments" :comment="comment" :key="comment.id"></Comment>

</div>
</template>

<script>
// @ is an alias to /src
import Comment from '@/components/Comment.vue'
import API from '@/services/api.service'
export default {
    name: 'home',
    components: {
        Comment
    },
    created() {
        this.getComments()
    },
    data() {
        // debugger;
        return {
            comments: []
        };
    },
    computed: {
        validComments: function () {
            return this.comments.filter(function (comment) {
               // eslint-disable-next-line
              debugger
                return comment.id
            });
        }
    },
    methods: {
        getComments() {
          
            API.get("comments").then((e) => {
               
                if (e.data.success) {
                    this.comments = e.data;
                }
            });
        }
    }
}
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
