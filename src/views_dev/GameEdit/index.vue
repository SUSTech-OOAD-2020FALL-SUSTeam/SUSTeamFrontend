<template>
  <div class="dev-game-edit">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item>Game</a-breadcrumb-item>
      <a-breadcrumb-item>{{ game.name }}</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-card games-list-header">
      <div class="content-title">
        基本信息
      </div>
    </div>
    <div class="content-container">
      <div class="content-card">
        <GameKeyDisplay />
      </div>
    </div>
    <div class="content-container">
      <div class="content-card">
        <BasicInfoEdit :game="game" />
      </div>
    </div>

    <div class="content-card">
      <div class="content-title">
        版本
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
        <VersionEdit />
      </div>
    </div>

    <div class="content-card">
      <div class="content-title">
        折扣
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
        <DiscountEdit />
      </div>
    </div>

    <div class="content-card">
      <div class="content-title">
        图片
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
        <ImagePrimaryEdit :game="game" />
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
        <ImageAdditionalEdit :game="game" />
      </div>
    </div>

    <div class="content-card">
      <div class="content-title">
        公告
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
        <AnnouncementEdit />
      </div>
    </div>

    <div class="content-card">
      <div class="content-title">
        标签
      </div>
    </div>
    <div class="content-container">
      <div class="content-card">
        <TagEdit :game="game" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import { gameDetail } from '@/api/Game'
import DiscountEdit from '@/views_dev/components/DiscountEdit.vue'
import AnnouncementEdit from '@/views_dev/components/AnnouncementEdit.vue'
import BasicInfoEdit from '@/views_dev/components/BasicInfoEdit.vue'
import GameKeyDisplay from '@/views_dev/components/GameKeyDisplay.vue'
import ImagePrimaryEdit from '@/views_dev/components/ImagePrimaryEdit.vue'
import ImageAdditionalEdit from '@/views_dev/components/ImageAdditionalEdit.vue'
import TagEdit from '@/views_dev/components/TagEdit.vue'
import VersionEdit from '@/views_dev/components/VersionEdit.vue'

@Component({
  components: {
    BasicInfoEdit,
    GameKeyDisplay,
    ImagePrimaryEdit,
    ImageAdditionalEdit,
    VersionEdit,
    AnnouncementEdit,
    DiscountEdit,
    TagEdit
  }
})
export default class DevGameEdit extends Vue {
  game: GameDetail = EMPTY_GAME_DETAIL

  get gameId () {
    const id = parseInt(this.$route.params.gameId)
    return isNaN(id) ? undefined : id
  }

  async mounted () {
    await this.loadGame()
  }

  async loadGame () {
    const gameId = this.gameId
    if (!gameId) {
      return
    }
    this.game = await gameDetail(gameId)
  }
}

</script>

<style scoped lang="scss">

@import "@/style/dev_panel.scss";

</style>
