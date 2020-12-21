<template>
  <div>
    <a-row
      type="flex"
      :gutter="[16,16]"
      justify="center"
      style="margin-bottom: 0.5em;"
    >
      <a-col :span="6">
        游戏名称: {{ game.name }}
      </a-col>
      <a-col :span="6">
        作者: {{ game.author }}
      </a-col>
      <a-col :span="6">
        发布时间: {{ game.publishDate.toISOString() }}
      </a-col>
    </a-row>

    <a-form-model
      :model="basicInfo"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="价格">
        <a-input-number
          v-model="basicInfo.price"
          :formatter="value => `$ ${value}`"
          :parser="value => value.replace(/\$\s+/g, '')"
        />
      </a-form-model-item>
      <a-form-model-item label="简介">
        <a-input v-model="basicInfo.introduction" />
      </a-form-model-item>
      <a-form-model-item label="详情">
        <a-input
          v-model="basicInfo.description"
          type="textarea"
          :auto-size="{ minRows: 8, maxRows: 16 }"
        />
      </a-form-model-item>

      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          type="primary"
          @click="updateBasicInfo"
        >
          更新
        </a-button>
        <a-button style="margin-left: 10px;">
          取消
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import { updateGame } from '@/api/Developer'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import DevGameEdit from '@/views_dev/GameEdit'

@Component
export default class BasicInfoEdit extends Vue {
  @Prop()
  game: GameDetail = EMPTY_GAME_DETAIL

  basicInfo = {
    price: 0,
    introduction: '',
    description: ''
  }

  @Watch('game')
  onGameChange () {
    this.basicInfo.price = this.game.price
    this.basicInfo.introduction = this.game.introduction
    this.basicInfo.description = this.game.description
  }

  async updateBasicInfo () {
    const game = { ...this.game, ...this.basicInfo }
    try {
      await updateGame(game)
    } catch (error) {
      if (typeof error === 'string') {
        this.$message.error(error)
      } else {
        this.$message.error('update failed')
      }
      console.error(error)
      return
    }
    this.$message.success('update success')

    const parent: DevGameEdit = this.$parent as DevGameEdit
    await parent.loadGame()
  }
}
</script>

<style scoped>

</style>
