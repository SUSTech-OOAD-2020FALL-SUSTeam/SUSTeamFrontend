<template>
  <div class="dev-game-edit">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item>Game</a-breadcrumb-item>
      <a-breadcrumb-item>New</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-card games-list-header">
      <div class="content-title">
        创建游戏
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
        <a-form-model
          :model="data"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-form-model-item label="名称">
            <a-input v-model="data.name" />
          </a-form-model-item>
          <a-form-model-item label="价格">
            <a-input-number
              v-model="data.price"
              :formatter="value => `$ ${value}`"
              :parser="value => value.replace(/\$\s+/g, '')"
            />
          </a-form-model-item>
          <a-form-model-item label="简介">
            <a-input v-model="data.introduction" />
          </a-form-model-item>
          <a-form-model-item label="详情">
            <a-input
              v-model="data.description"
              type="textarea"
              :auto-size="{ minRows: 8, maxRows: 16 }"
            />
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button
              type="primary"
              @click="createGame"
            >
              创建
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { games, createGame } from '@/api/Developer'

@Component
export default class DevGameNew extends Vue {
  data = {
    name: '',
    price: 0,
    introduction: null,
    description: null
  }

  async createGame () {
    const oldGames = await games()
    await createGame(this.data)
    const newGames = await games()
    const game = newGames.find(game => oldGames.find(it => game.gameId === it.gameId) === undefined)!
    await this.$router.push(`/dev/game/${game.gameId}`)
  }
}

</script>

<style scoped lang="scss">

@import "@/style/dev_panel.scss";

</style>
