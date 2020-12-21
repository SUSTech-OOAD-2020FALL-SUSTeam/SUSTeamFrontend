<template>
  <div>
    <a-space direction="vertical">
      <div>其他图片 (任意大小):</div>

      <a-list :data-source="gameImages">
        <a-list-item
          slot="renderItem"
          slot-scope="item"
        >
          <a-card :title="item.title">
            <img
              slot="cover"
              :src="item.url"
              :alt="item.url"
            >
            <span><a-icon type="delete" />delete</span>
          </a-card>
        </a-list-item>
      </a-list>

      <a-upload
        :before-upload="uploadGameImage"
      >
        <a-button>
          <a-icon type="upload" />
          Upload
        </a-button>
      </a-upload>
    </a-space>
  </div>
</template>

<script lang="ts">

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'

@Component
export default class ImageAdditionalEdit extends Vue {
  @Prop()
  game: GameDetail = EMPTY_GAME_DETAIL

  get gameImages () {
    return this.game.images.filter(it => it.type !== 'F' && it.type !== 'C')
  }

  uploadGameImage (file: any) {
    // TODO
    console.log(file)
    return false
  }
}
</script>

<style scoped>

</style>
