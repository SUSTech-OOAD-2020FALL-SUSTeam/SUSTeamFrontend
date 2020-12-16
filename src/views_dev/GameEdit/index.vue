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
    </div>

    <div class="content-card">
      <div class="content-title">
        折扣
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
        <DiscountEdit :discounts="discounts" />
      </div>
    </div>

    <div class="content-card">
      <div class="content-title">
        图片
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
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
    </div>

    <div class="content-container">
      <div class="content-card">
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
    </div>

    <div class="content-card">
      <div class="content-title">
        公告
      </div>
    </div>

    <div class="content-container">
      <div class="content-card">
        <AnnouncementEdit :announcements="announcements" />
      </div>
    </div>

    <div class="content-card">
      <div class="content-title">
        标签
      </div>
    </div>
    <div class="content-container">
      <div class="content-card">
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
              style="background: #fff; borderStyle: dashed;"
              @click="showInput"
            >
              <a-icon type="plus" /> New Tag
            </a-tag>
          </div>
          <a-button>
            <a-icon type="upload" />
            Upload
          </a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import { gameDetail } from '@/api/Game'
import { EMPTY_GAME } from '@/typings/GameProfile'
import { updateGame } from '@/api/Developer'
import DiscountEdit from '@/views_dev/components/DiscountEdit.vue'
import { Discount } from '@/typings/Discount'
import AnnouncementEdit from '@/views_dev/components/AnnouncementEdit.vue'
import { Announcement } from '@/typings/Announcement'

@Component({ components: { AnnouncementEdit, DiscountEdit } })
export default class DevGameEdit extends Vue {
  game: GameDetail = EMPTY_GAME_DETAIL

  discounts: Array<Discount> = [{
    gameId: 1,
    type: 1,
    percentage: 10,
    startTime: new Date(),
    endTime: new Date()
  }]

  announcements: Array<Announcement> = [
    {
      gameId: 1,
      announceTime: new Date(),
      title: 'Test1',
      content: 'Hello world1'
    },
    {
      gameId: 1,
      announceTime: new Date(),
      title: 'Test2',
      content: 'very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long Hello world2'
    }
  ]

  basicInfo = {
    price: 0,
    introduction: '',
    description: ''
  }

  imageList = []

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

  get fullImage () {
    return this.game.images.find(it => it.type === 'F')?.url || EMPTY_GAME.imageFullSize
  }

  get cardImage () {
    return this.game.images.find(it => it.type === 'C')?.url || EMPTY_GAME.imageFullSize
  }

  get gameImages () {
    return this.game.images.filter(it => it.type !== 'F' && it.type !== 'C')
  }

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
    const game = await gameDetail(gameId)
    this.game = game
    this.basicInfo.price = game.price
    this.basicInfo.introduction = game.introduction
    this.basicInfo.description = game.description
  }

  async updateBasicInfo () {
    const gameId = this.gameId
    if (!gameId) {
      return
    }
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
    await this.loadGame()
  }

  uploadFullSizeImage (file: any) {
    // TODO
    console.log(file)
    return false
  }

  uploadCardSizeImage (file: any) {
    // TODO
    console.log(file)
    return false
  }

  uploadGameImage (file: any) {
    // TODO
    console.log(file)
    return false
  }
}

</script>

<style scoped lang="scss">

@import "@/style/dev_panel.scss";

</style>
