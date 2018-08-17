<template>
<div class="edit-comment">
    <div class="card">
        <div class="content">
            <div class="headers">
                <div><label for="author">author</label></div>
                <div><label for="text">text</label></div>
                <div v-if="comment.created_at">created at</div>
                <div v-if="comment.created_at !== comment.updated_at">updated at</div>
            </div>
            <div class="body">
                <div><input type="text" id="author" placeholder="name" v-model="comment.author"></div>
                <div><textarea id="text" placeholder="input text" v-model="comment.text"></textarea></div>
                <div v-if="comment.created_at">{{ new Date(comment.created_at).toLocaleDateString(locale, dateOptions)}}</div>
                <div v-if="comment.created_at !== comment.updated_at">{{new Date(comment.updated_at).toLocaleDateString(locale, dateOptions)}}</div>
            </div>
        </div>
        <div class="buttons">
            <router-link :to="{ name: 'home'}"><button class="cancel">Cancel</button></router-link>
            <button class="save" @click="save">Save</button>

        </div>
    </div>
</div>
</template>

<script>
import API from '@/services/api.service'
export default {
    name: 'Comment',
    data() {
        return {
            comment: {},
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
    mounted() {
        this.comment = this.$route.params.comment || {};
       
        if (this.$route.params.id && !this.comment.id){
            this.getComment();
        }
       
    },
    methods: {
        getComment(){
             API.get(`comments/${this.$route.params.id}`).then((e) => {
                 // eslint-disable-next-line
                if (e.data.success) {
                    this.comment= e.data
                }
            });
        },
        save() {
            if ((this.comment.author && this.comment.text)) {
                if (!this.comment.created_at) {
                    API.post(`comments`, {
                            'author': this.comment.author,
                            'text': this.comment.text
                        }, {
                            notify: "Successfully Saved"
                        })
                        .then(() => (this.$nextTick(() => (this.$router.push('/')))))
                        // eslint-disable-next-line
                        .catch(err => (console.error(err)));
                } else {
                    API.put(`comments/${this.comment.id}`, {
                            'author': this.comment.author,
                            'text': this.comment.text
                        }, {
                            notify: "Successfully Edited"
                        })
                        .then(() => (this.$nextTick(() => (this.$router.push('/')))))
                            // eslint-disable-next-line
                            .catch(err => (console.error(err)));
                        }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.edit-comment {
    display: flex;
    justify-content: center;
}

.card {
    width: 400px;
    height: 100%;
    border: 1px solid #4a5055;
    border-radius: 5px;
    background-color: #677077;
    color: #b5b5b7;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .content {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
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
            input {
                width: 250px;
            }
            textarea {
                width: 250px;
                height: 100%;
            }
            div:nth-of-type(2) {
                min-height: 100px;
                text-align: left;
                line-height: 16px;
            }
        }
    }
    .buttons {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        button {
            height: 40px;
            width: 150px;
            border-radius: 5px;
            color: #677077;
            border: none;
            outline-width: 0px;
            font-size: 18px;
            &.cancel {
                background-color: #b56969;
            }
            &.save {
                background-color: #22264b;
            }
        }
        button:hover {
            cursor: pointer;
            background-color: #677077;
            border: 1px solid;
            &.cancel {
                color: #e6cf8b;
                border-color: #b56969;
            }
            &.save {
                color: #e6cf8b;
                border-color: #22264b;
            }
        }
    }
}
</style>
