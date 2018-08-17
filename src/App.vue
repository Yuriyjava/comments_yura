<template>
  <div id="app">
        <router-view/>
  </div>
</template>

<style  lang="scss">
@import '@/styles/custom.scss';
body{
background-color: $default-body-color;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 60px auto;
  
}
</style>
