<template>
  <main class="home dark">
    <PageNavigation
      :items="[
        {content: '我开发的游戏', icon:'left', url:'/developer'},
        {content: game.name}
      ]"
      :show-searcher="false"
    />
    <div class="page-container">
      <div class="game-description">
        <vue-markdown :source="game.description" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Navigation from '@/components/Navigation.vue'
import PageFooter from '@/components/PageFooter.vue'

import { gameDetail } from '@/api/Game'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import PageNavigation from '@/components/PageNavigation/index.vue'
import VueMarkdown from 'vue-markdown'

@Component({ components: { Navigation, PageFooter, PageNavigation, VueMarkdown } })
export default class DetailPanel extends Vue {
  game: GameDetail = EMPTY_GAME_DETAIL

  mounted () {
    const gameId = this.gameId
    if (gameId === undefined) {
      this.$message.error('Game not exist!')
      return
    }
    gameDetail(gameId)
      .then(it => {
        this.game = it
      })
      .catch(() => {
        this.$message.error('Game not exist!')
      })
  }

  get gameId () {
    const id = parseInt(this.$route.params.gameId)
    return isNaN(id) ? undefined : id
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

.game-description {
  @include dark-markdown();
}

</style>
