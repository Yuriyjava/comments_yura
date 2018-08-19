<template>
<div>
    <div class="buttons-group">
        <router-link :to="{ name: 'edit'}"> <button>Add new comment</button></router-link>
    </div>
    <div class="home">

        <Comment v-for="comment in comments" :comment="comment" :key="comment.id" @delete="deleteComment"></Comment>

    </div>
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

    },
    methods: {
        getComments() {
            API.get("comments").then((e) => {

                if (e.data.success) {
                    let arr = Object.values(e.data);
                    this.comments = arr.filter(function (comment) {
                        return comment.id
                    });
                }
            });
        },
        deleteComment(commentID) {
            // eslint-disable-next-line
            API.delete(`comments/${commentID}`)
                .then(() => (this.getComments()))
                // eslint-disable-next-line
                .catch(err => (console.error(err)));
        }
    }

}
</script>

<style lang="scss">
.home {
    margin: 70px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.buttons-group {
    width: 100%;
    height: 70px;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 3;
    @include body-background();
    button {
        margin-top: 20px;
        @include button();
    }
}
</style>
