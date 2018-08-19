<template>
<div class="card" @mouseover="active=comment.id" @mouseout="active=''">

    <div class="headers">
        <div class="avatar">
       <img :src="getAvatar(comment.author)" alt="">
        </div>
    </div>
    <div class="body">
        <div>@{{comment.author}} <span v-if="comment.created_at !== comment.updated_at"> <span  class="time-header">Updated:</span>{{comment.updated_at | moment("from")}}</span></div>
        <div>{{comment.text}}</div>
        <div>
            <span><span class="time-header">Creadted:</span>{{ comment.created_at | moment("from")}}</span>
        </div>
    </div>
    <div class="card-buttons" :class="active!=comment.id? 'hidden':'' ">
        <router-link :to="{ name: 'edit', params: { id: comment.id, comment: comment } }"><button class="edit">Edit</button></router-link>
        <button @click="deleteComment(comment.id)" class="delete">Delete</button>
    </div>

</div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {}
  },
  data() {
    return {
      active: ""
    };
  },
  methods: {
    getAvatar(author) {
      return "https://robohash.org/" + author + ".png?set=set1&size=100x100";
    },
    deleteComment(commentID) {
      this.$swal({
        title: "You are going to delete comment now! Are you sure?",
        showCancelButton: true,
        customClass: "swal-modal"
      }).then(({ value }) => {
        if (!value) return;
        this.$emit("delete", commentID);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.card {
  @include card();
  margin-bottom: 15px;
  overflow: hidden;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  .headers,
  .body {
    div {
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: 40px;
      text-align: left;
      line-height: 40px;
    }
    span {
      text-align: left;
      margin-left: 10px;
      font-size: 85%;
      opacity: 0.7;
      &.time-header {
        opacity: 1;
        margin-right: 5px;
        font-size: 100%;
      }
    }
  }
  .headers {
    margin-right: 15px;
    .avatar {
      @include avatar();
    }
  }
  .body {
    width: calc(100% - 95px);
    div:nth-of-type(1) {
      color: $save-color;
      font-weight: 600;
      text-decoration: underline;
    }
    div:nth-of-type(2) {
      line-height: 16px;
    }
  }
  .card-buttons {
    position: absolute;
    background-color: $default-card-button-background-color;
    width: 100%;
    height: 50px;
    left: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: bottom 0.5s ease-out 0.2s;
    button {
      @include button();
      margin-left: 20px;
      margin-bottom: 0px;
      &.edit {
        background-color: $save-color;
        &:hover {
          background-color: $default-card-background-color;
          color: $save-color;
          border: 1px solid $save-color;
        }
      }
      &.delete {
        background-color: $danger-color;
        &:hover {
          background-color: $default-card-background-color;
          color: $danger-color;
          border: 1px solid $danger-color;
        }
      }
    }
    &.hidden {
      bottom: -50px;
    }
  }
}
</style>
<style  lang="scss">
.swal-modal {
  background-color: $default-card-border-color;
  .swal2-title {
    color: $default-text-color;
  }
  .swal2-actions {
    button {
      @include button() border: 0px;
      /* &.swal2-cancel {
        background-color: $save-color;
        &:hover {
          background-color: $default-card-background-color;
          border: 3px $save-color;
          color: $save-color;
        }
      } */
      &.swal2-confirm {
        background-color: $danger-color;
        &:hover {
          background-color: $default-card-background-color;
          border: 3px $danger-color;
          color: $danger-color;
        }
      }
    }
  }
}
</style>
