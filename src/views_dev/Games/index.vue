<template>
  <div class="dev-games">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item>Games</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-card games-list-header">
      <div class="content-title">
        发布的游戏
      </div>
      <a-button
        type="primary"
        @click="$router.push(`/dev/games/create`)"
      >
        创建游戏
      </a-button>
    </div>

    <div class="content-container">
      <a-row :gutter="[16,16]">
        <a-col
          v-for="(game, index) in games"
          :key="`game-${index}`"
          :span="8"
        >
          <a-card
            hoverable
            @click="$router.push(`/dev/game/${game.gameId}`)"
          >
            <img
              slot="cover"
              :src="game.imageFullSize"
              :alt="game.name"
            >
            <div>{{ game.name }}</div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { games } from '@/api/Developer'
import { GameProfile } from '@/typings/GameProfile'

@Component
export default class DevGames extends Vue {
  games: Array<GameProfile> = []

  async mounted () {
    this.games = await games()
  }
}

</script>

<style scoped lang="scss">

@import "@/style/dev_panel.scss";

.games-list-header {
  display: flex;
  justify-content: space-between;
}

</style>
