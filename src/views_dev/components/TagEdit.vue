<template>
  <div>
    <a-space direction="vertical">
      <div>
        <template v-for="tag in tags">
          <a-tag
            :key="tag"
            :closable="true"
            @close="() => handleClose(tag)"
          >
            {{ tag }}
          </a-tag>
        </template>
        <a-input
          v-if="inputVisible"
          ref="input"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          :value="inputValue"
          @change="handleInputChange"
          @blur="handleInputConfirm"
          @keyup.enter="handleInputConfirm"
        />
        <a-tag
          v-else
          style="background: #fff; border-style: dashed;"
          @click="showInput"
        >
          <a-icon type="plus" /> New Tag
        </a-tag>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts">

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import { EMPTY_GAME } from '@/typings/GameProfile'

@Component
export default class TagEdit extends Vue {
  @Prop()
  game: GameDetail = EMPTY_GAME_DETAIL

  tags = ['Unremovable', 'Tag 2', '现在这里是假的标签']
  inputVisible = false
  inputValue = ''

  handleClose (removedTag: string) {
    const tags = this.tags.filter(tag => tag !== removedTag)
    console.log(tags)
    this.tags = tags
  }

  showInput () {
    this.inputVisible = true
    // this.$nextTick(function () {
    //   this.$refs.input.focus()
    // })
  }

  handleInputChange (e: any) {
    this.inputValue = e.target.value
  }

  handleInputConfirm () {
    const inputValue = this.inputValue
    let tags = this.tags
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue]
    }
    console.log(tags)
    Object.assign(this, {
      tags,
      inputVisible: false,
      inputValue: ''
    })
  }
}
</script>

<style scoped>

</style>
