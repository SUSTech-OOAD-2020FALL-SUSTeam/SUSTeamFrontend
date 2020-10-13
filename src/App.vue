<template>
  <router-view class="root" />
</template>
<script lang="ts">
import Vue from 'vue'
import { Store } from '@/store/modules/StoreModule'
import { UserStore } from '@/store/modules/UserStoreModule'

export default Vue.extend({
  name: 'App',
  mounted () {
    window.addEventListener('resize', () => {
      Store.setWindowWidth(window.innerWidth)
    })
    this.$nextTick(() => {
      Store.setWindowWidth(window.innerWidth)
    })
    UserStore.update()
  }
})

</script>
<style scoped lang="scss">

</style>
