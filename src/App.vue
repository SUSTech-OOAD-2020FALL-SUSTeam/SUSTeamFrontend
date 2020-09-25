<template>
  <div id="app">
    <Navigation />
    <router-view class="main" />
    <PageFooter />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Navigation from '@/components/Navigation.vue'
import PageFooter from '@/components/PageFooter.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Navigation,
    PageFooter
  }
})

</script>
<style scoped lang="scss">

#app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.main {
  flex: 1;
}

</style>
