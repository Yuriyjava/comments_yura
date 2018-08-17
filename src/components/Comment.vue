<template>
<div class="card" @mouseover="active=comment.id" @mouseout="active=''">

    <div class="headers">
        <div>author</div>
        <div>text</div>
        <div>created at</div>
        <div v-if="comment.created_at !== comment.updated_at">updated at</div>
    </div>
    <div class="body">
        <div>{{comment.author}}</div>
        <div>{{comment.text}}</div>
        <div>{{ new Date(comment.created_at).toLocaleDateString(locale, dateOptions)}}</div>
        <div v-if="comment.created_at !== comment.updated_at">{{new Date(comment.updated_at).toLocaleDateString(locale, dateOptions)}}</div>
    </div>
    <div class="card-buttons" v-show="active===comment.id">
        <router-link :to="{ name: 'edit', params: { comment: comment } }"><button>Edit comment</button></router-link>
        <button @click="deleteComment(comment.id)">Delete comment</button>
    </div>

</div>
</template>

<script>
export default {
    name: 'Comment',
    props: {
        comment: {}
    },
    data() {
        return {
            active: '',
            locale: "en-US",
            dateOptions: {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "2-digit"
            }
        };
    },
    methods: {
        deleteComment(commentID) {
            this.$swal({
                title: "You are going to delete comment now! Are you sure?",
                showCancelButton: true
            }).then(({
                value
            }) => {
                if (!value) return;
                this.$emit("delete", commentID)
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card {
    width: 400px;
    height: 250px;
    border: 1px solid #4a5055;
    border-radius: 5px;
    margin-bottom: 15px;
    background-color: #677077;
    color: #b5b5b7;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    .headers,
    .body {
        div {
            height: 50px;
            text-align: center;
            line-height: 50px;
        }
    }
    .headers {
        div {
            width: 85px;
            margin-right: 15px;
        }
        div:nth-of-type(2) {
            min-height: 100px;
            line-height: 100px;
        }
    }
    .body {
        div:nth-of-type(2) {
            min-height: 100px;
            text-align: left;
            line-height: 16px;
        }
    }
    .card-buttons {
        position: absolute;
        background-color: rgba(37, 40, 57, 0.6);
        width: 400px;
        height: 250px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        button {
            margin-bottom: 20px;
        }
    }
}
</style>
