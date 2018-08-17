<template>
<div class="home">
    <div class="buttons-group">
       <router-link :to="{ name: 'edit', params: { comment: null } }"> <button>Add new comment</button></router-link>
    </div>
    <Comment v-for="comment in comments" :comment="comment" :key="comment.id" @delete="deleteComment"></Comment>

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
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
        height: 40px;
        width: 200px;
        border-radius: 5px;
        background-color: #f2b632;
        color: #677077;
        border: none;
        outline-width: 0px;
        font-size: 18px;
        margin-bottom: 20px;
    }
    button:hover {
        cursor: pointer;
        border: 1px solid #f2b632;
        background-color: #677077;
        color: #f2b632;
    }
}
</style>
