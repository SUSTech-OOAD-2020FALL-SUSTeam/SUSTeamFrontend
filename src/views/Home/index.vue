<template>
  <main
    class="home"
    :class="mediaSize"
  >
    <PageNavigation />
    <div class="page-container">
      Main
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Store } from '@/store/modules/StoreModule'
import PageNavigation from '@/components/PageNavigation.vue'

@Component({ components: { PageNavigation } })
export default class Home extends Vue {
  get mediaSize () {
    const width = Store.windowWidth

    if (width < 768) {
      return 'small'
    } else if (width < 1024) {
      return 'middle'
    } else {
      return 'large'
    }
  }
}
</script>
<style scoped lang="scss">

main {
  color: #fff;
  background-color: #121212;
}

@media (min-width: 1024px) {
  .page-container {
    padding: 0 12.5vw;
  }
}

</style>
