<template>
  <div>
    <div class="announcement-container">
      <a-list
        item-layout="horizontal"
        :data-source="announcements"
      >
        <a-list-item
          slot="renderItem"
          slot-scope="item"
        >
          <a-list-item-meta
            :title="item.title"
            :description="item.content"
          />
          <div>
            {{ item.announceTime }}
          </div>
        </a-list-item>
      </a-list>
    </div>
    <div>
      添加新公告：
      <div class="input-box">
        <a-input
          v-model="newAnnouncement.title"
          size="large"
          placeholder="Title"
        />
      </div>
      <div class="input-box">
        <a-textarea
          v-model="newAnnouncement.content"
          placeholder="Content"
        />
      </div>
      <br>
      <a-button
        type="primary"
        @click="addAnnouncement"
      >
        Add
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { Announcement } from '@/typings/Announcement'
import { announcements, addAnnouncement } from '@/api/Developer'

@Component
export default class AnnouncementEdit extends Vue {
  announcements: Array<Announcement> = []

  newAnnouncement: Announcement = {
    gameId: this.gameId,
    announceTime: new Date(),
    title: '',
    content: ''
  }

  get gameId () {
    return parseInt(this.$route.params.gameId)
  }

  async mounted () {
    this.announcements = await this.getAnnouncements()
  }

  async addAnnouncement () {
    await addAnnouncement(this.newAnnouncement)
    this.announcements = await this.getAnnouncements()
  }

  private async getAnnouncements () {
    return await announcements(this.gameId)
  }
}
</script>

<style scoped>
.announcement-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  max-height: 300px;
  padding: 8px 24px;
  margin-bottom: 20px;
}
.input-box {
  margin-bottom: 10px;
}
</style>
