<template>
  <main class="home dark">
    <PageNavigation />
    <div class="page-container">
      <DiscoveryCarousel :games="carouselGames" />
      <DiscoveryList :games="listGames" />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PageNavigation from '@/components/PageNavigation/index.vue'
import { DiscoveryCarousel, DiscoveryList } from '@/views/Home/components'
import { GameProfile } from '@/typings/GameProfile'
import { recommendGames } from '@/api/Game'

@Component({ components: { PageNavigation, DiscoveryCarousel, DiscoveryList } })
export default class Home extends Vue {
  carouselGames: Array<GameProfile> = []
  listGames: Array<GameProfile> = []

  mounted () {
    recommendGames().then(it => { this.carouselGames = it })
    recommendGames().then(it => { this.listGames = it })
  }
}
</script>
<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.page-container > * {
  margin-bottom: 3.6em;
}

</style>
