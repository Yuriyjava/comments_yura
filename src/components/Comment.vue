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
        <router-link :to="{ name: 'edit', params: { id: comment.id, comment: comment } }"><button>Edit comment</button></router-link>
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
                showCancelButton: true,
                customClass:"swal-modal"
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
     @include card();
    margin-bottom: 15px;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;
    .headers,
    .body {
        div {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 40px;
            text-align: left;
            line-height: 40px;
        }
    }
    .headers {
        div {
            text-transform: capitalize;
            min-width: 85px;
            flex-grow: 1;
            margin-right: 15px;
        }
    }
    .body {
        width: calc(100% - 95px);
         div:nth-of-type(1) {
            text-decoration: underline;
        }
    }
    .card-buttons {
        position: absolute;
        background-color: rgba(37, 40, 57, 0.6);
        width: 100%;
        height: 100%;
        left: 0px;
        top:0px;
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
<style  lang="scss">
.swal-modal{
    background-color: $default-card-border-color;
    .swal2-title{
        color:$default-text-color
    }
    .swal2-actions{
        button{
        @include button()
         border:0px;
            &.swal2-cancel{
                background-color: $save-color;
            }
            &.swal2-confirm{
                 border:0px;
                 background-color: $danger-color;
            }
        }
    }
}
</style>
