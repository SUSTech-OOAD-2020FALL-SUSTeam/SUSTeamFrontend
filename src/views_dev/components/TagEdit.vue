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
import { addTag, tags } from '@/api/Developer'

@Component
export default class TagEdit extends Vue {
  @Prop()
  game: GameDetail = EMPTY_GAME_DETAIL

  tags: Array<string> = []
  inputVisible = false
  inputValue = ''

  get gameId () {
    return parseInt(this.$route.params.gameId)
  }

  async mounted () {
    this.tags = await this.getTags()
  }

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

  async handleInputConfirm () {
    const inputValue: string = this.inputValue
    console.log(inputValue)
    await addTag(this.gameId, inputValue)
    Object.assign(this, {
      tags: await this.getTags(),
      inputVisible: false,
      inputValue: ''
    })
    this.$message.info('添加成功')
    /*
    addTag(this.gameId, inputValue).then(async () => {
      Object.assign(this, {
        tags: await this.getTags(),
        inputVisible: false,
        inputValue: ''
      })
      this.$message.info('添加成功')
    }).catch(err => {
      this.$message.error(err)
      this.inputVisible = false
      this.inputValue = ''
    })
    */
  }

  private async getTags () {
    return await tags(this.gameId)
  }
}
</script>

<style scoped>

</style>
