<template>
  <div id="app">
    <!-- {{ num }}
    <button @click="fn">++</button> -->
    <router-view />
  </div>
</template>

<script>
// import { mapState, mapMutations } from 'vuex';
export default {
  name: 'App',
  // computed: {
  //   ...mapState('user', ['num'])
  // },
  // methods: {
  //   ...mapMutations('user', ['changeNum']),
  //   fn() {
  //     this.changeNum()
  //   }
  // }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

#app,
html,
body {
  width: 100%;
  height: 100%;
}
</style>
