<template>
  <main class="home dark">
    <Navigation />
    <div class="page-container">
      <GameGallery :games="listGames" />
    </div>
    <PageFooter />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Navigation from '@/components/Navigation.vue'
import PageFooter from '@/components/PageFooter.vue'

import { GameProfile } from '@/typings/GameProfile'
import { games } from '@/api/Developer'
import GameGallery from '@/views/DevPanel/components/GameGallery.vue'

@Component({ components: { GameGallery, Navigation, PageFooter } })
export default class DevPanel extends Vue {
  listGames: Array<GameProfile> = []

  mounted () {
    games().then(it => { this.listGames = it })
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.page-container > * {
  margin-bottom: 3.6em;
  margin-top: 3.6em;
}

</style>
