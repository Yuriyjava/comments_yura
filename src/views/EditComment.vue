<template>
<div class="edit-comment"> 
    <div class="edit-header">{{$route.params.id?'Edit':'Create'}} comment</div>
    <div class="card">
        <div class="content">
            <div class="headers">
                <div><label for="author">author</label></div>
                <div><label for="text">text</label></div>
                <div></div>
                <div v-if="comment.created_at">created at</div>
                <div v-if="comment.created_at !== comment.updated_at">updated at</div>
            </div>
            <div class="body">
                <div><input  :class="errors.indexOf('author') >=0 ? 'is-invalid' : ''"  type="text" id="author" placeholder="name, max length 60 symbols" v-model="comment.author" :maxlength="nameMax"></div>
                <div><textarea :class="errors.indexOf('text') >=0 ? 'is-invalid' : ''" id="text" placeholder="input text, max length 256 symbols" v-model="comment.text" :maxlength="textMax"></textarea></div>
                <div class="textarea-addon"><span>simbols left: </span><span v-text="(textMax - comment.text.length)"></span></div>
                <div class="date" v-if="comment.created_at">{{ new Date(comment.created_at).toLocaleDateString(locale, dateOptions)}}</div>
                <div class="date" v-if="comment.created_at !== comment.updated_at">{{new Date(comment.updated_at).toLocaleDateString(locale, dateOptions)}}</div>
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
            nameMax:40,
            textMax:256,
            comment: {},
            errors:[],
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
     watch: {
        'comment.author' (val) {
        this.dropErrors(val, 'author');
        },
        'comment.text' (val) {
        this.dropErrors(val, 'text');
    }
    },
    created() {
        this.comment = this.$route.params.comment || {author:'', text:''};
       
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
            let c = this.comment,
                errs = this.errors;

                !c.author && errs.push('author');
                !c.text && errs.push('text');
                if (errs.length) return
           
                if (!c.created_at) {
                    API.post(`comments`, {
                            'author': c.author,
                            'text': c.text
                        }, {
                            notify: "Successfully Saved"
                        })
                        .then(() => (this.$nextTick(() => (this.$router.push('/')))))
                        // eslint-disable-next-line
                        .catch(err => (console.error(err)));

                } else {
                    API.put(`comments/${this.comment.id}`, {
                            'author': c.author,
                            'text': c.text
                        }, {
                            notify: "Successfully Edited"
                        })
                        .then(() => (this.$nextTick(() => (this.$router.push('/')))))
                            // eslint-disable-next-line
                            .catch(err => (console.error(err)));
                   }
            },
            dropErrors(val, n) {
                let i = this.errors.indexOf(n)
                i >= 0 && val && this.errors.splice(i, 1)
            },
        }
    }
</script>

<style lang="scss" scoped>
.edit-comment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10% 0 10%;
    color: #b5b5b7;
    .edit-header{
        font-size: 34px;
    }
}

.card {
    @include card();
    .content {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .headers,
        .body {
            div {
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 50px;
                text-align: center;
                line-height: 50px;
                border-radius: 5px; 
                padding: 0 5px 0 5px;
                &.date{
                    overflow: hidden;
                }

            }
        }
        .headers {
            div {
                text-transform: capitalize;
                width: 85px;
                margin-right: 15px;
            }
            div:nth-of-type(2) {
                min-height: 100px;
                line-height: 100px;
            }
        }
        .body {
             width: calc(100% - 130px);
            input {
                width: 100%;
                height: 25px;
                border-radius: 5px; 
                border: none;
                outline: 0px;
                padding: 0 5px 0 5px;

            }
            input.is-invalid {
                border: 2px solid $danger-color;
            }
            input.is-invalid:focus {
                outline: none;
            }
             input.is-invalid::placeholder {
               color:$danger-color;
            }
            textarea {
                width: 100%;
                height: 100%;
                border-radius: 5px;
                border: none;
                outline: 0px;
                line-height: 16px;
                overflow:auto;
                 padding: 0 5px 0 5px;

            }
            textarea.is-invalid {
                border: 2px solid $danger-color;
            }
            textarea.is-invalid::placeholder {
               color:$danger-color;
            }
            textarea.is-invalid:focus {
                outline: none;
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
           @include button();

            &.cancel {
                background-color: $danger-color;
            }
            &.save {
                background-color: $save-color;
            }
            &:hover {
                border: 1px solid;
                background-color: transparent;
                &.cancel {
                    color: $default-button-background-color;
                    border-color: $danger-color;
                }
                &.save {
                    color: $default-button-background-color;
                    border-color:$save-color;
            }
        }
        }
        
    }
}
</style>
