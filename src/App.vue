<template>
  <router-view class="root" />
</template>
<script lang="ts">
import Vue from 'vue'
import { Store } from '@/store/modules/StoreModule'

export default Vue.extend({
  name: 'App',
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

</style>
