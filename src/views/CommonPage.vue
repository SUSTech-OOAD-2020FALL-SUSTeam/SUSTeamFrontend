<template>
  <div class="app">
    <Navigation />
    <router-view class="main" />
    <PageFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Store } from '@/store/modules/StoreModule'
import Navigation from '@/components/Navigation.vue'
import PageFooter from '@/components/PageFooter.vue'

export default Vue.extend({
  name: 'CommonPage',
  components: {
    Navigation,
    PageFooter
  },
  mounted () {
    window.addEventListener('resize', () => {
      Store.setWindowWidth(window.innerWidth)
    })
    this.$nextTick(() => {
      Store.setWindowWidth(window.innerWidth)
    })
  }
})

</script>

<style scoped lang="scss">

.app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.main {
  flex: 1;
}

</style>
