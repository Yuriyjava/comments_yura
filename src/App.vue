<template>
  <div id="app">
        <transition  name="slide-fade">
          <router-view></router-view>
        </transition>
  </div>
</template>

<style  lang="scss">
.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(1.0, 0.5, 0.8, 1.0) ;
}
/* .slide-fade-leave-active {
  transition: all .3s ease;
} */
.slide-fade-enter {
  transform: translateX(1000px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(1000px);
  opacity: 0;
}

#app {
  width: 90vw;
  max-width: 930px;
  padding: 0px 5px 0px 5px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 60px auto;
  
}
</style>
