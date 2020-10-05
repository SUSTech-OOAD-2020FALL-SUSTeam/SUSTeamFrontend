<template>
  <main class="home">
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
import PageNavigation from '@/components/PageNavigation.vue'
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

main {
  color: $primary-text;
  background-color: $primary-background;
}

.page-container > * {
  margin-bottom: 3.6em;
}

@media (min-width: 1024px) {
  .page-container {
    padding: 0 12.5vw;
  }
}

</style>
