<template>
  <div>
    <a-row
      type="flex"
      :gutter="[16,16]"
      style="margin-bottom: 0.5em;"
    >
      <a-col :span="10">
        <a-space direction="vertical">
          <div>封面图片 (1920*1080):</div>
          <img
            :src="fullImage"
            alt="Full Size Image"
            style="max-height: 200px; max-width: 100%;"
          >
          <a-upload
            :before-upload="uploadFullSizeImage"
            :show-upload-list="false"
          >
            <a-button>
              <a-icon type="upload" />
              Upload
            </a-button>
          </a-upload>
        </a-space>
      </a-col>
      <a-col :span="8">
        <a-space direction="vertical">
          <div>缩略图片 (640*854):</div>
          <img
            :src="cardImage"
            alt="Full Size Image"
            style="max-height: 200px; max-width: 100%;"
          >
          <a-upload
            :before-upload="uploadCardSizeImage"
            :show-upload-list="false"
          >
            <a-button>
              <a-icon type="upload" />
              Upload
            </a-button>
          </a-upload>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import { EMPTY_GAME } from '@/typings/GameProfile'
import { uploadGameImage } from '@/api/Game'
import DevGameEdit from '@/views_dev/GameEdit/index.vue'

@Component
export default class ImagePrimaryEdit extends Vue {
  @Prop()
  game: GameDetail = EMPTY_GAME_DETAIL

  get fullImage () {
    return this.game.images.find(it => it.type === 'F')?.url || EMPTY_GAME.imageFullSize
  }

  get cardImage () {
    return this.game.images.find(it => it.type === 'C')?.url || EMPTY_GAME.imageCardSize
  }

  async uploadFullSizeImage (file: File) {
    await uploadGameImage(this.game.gameId, file, 'FullSize')
    await (this.$parent as DevGameEdit).loadGame()
    return false
  }

  async uploadCardSizeImage (file: File) {
    await uploadGameImage(this.game.gameId, file, 'CardSize')
    await (this.$parent as DevGameEdit).loadGame()
    return false
  }
}
</script>

<style scoped>

</style>
