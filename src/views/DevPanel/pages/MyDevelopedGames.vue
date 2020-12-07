<template>
  <main class="home dark">
    <div class="page-container">
      <GameGallery :games="listGames" />
    </div>
  </main>
</template>
<script lang="ts">
import GameGallery from '@/views/DevPanel/components/GameGallery.vue'
import Vue from 'vue'
import Component from 'vue-class-component'
import { GameProfile } from '@/typings/GameProfile'
import { games } from '@/api/Developer'

@Component({ components: { GameGallery } })
export default class MyDevelopedGames extends Vue {
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
