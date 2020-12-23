<template>
  <div>
    <a-row
      align="center"
      type="flex"
      justify="space-between"
    >
      <a-space>
        <a-avatar
          :src="user.avatar"
          :size="40"
        />
        <div>
          {{ user.username }}
        </div>
      </a-space>
      <a-space>
        <a-button
          type="primary"
          shape="circle"
          icon="check"
          style="margin-left: 1em;"
          @click="accept"
        />
        <a-button
          type="danger"
          shape="circle"
          icon="close"
          @click="reject"
        />
      </a-space>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { EMPTY_USER, User } from '@/typings/User'
import { replyTo } from '@/api/Friend'
import FriendPage from '@/views/Friend/index.vue'

@Component
export default class FriendReply extends Vue {
  @Prop({ default: EMPTY_USER })
  user!: User

  async accept () {
    await replyTo(this.user.username, true)
    this.$message.success('已同意申请')
    this.$router.go(0)
  }

  async reject () {
    await replyTo(this.user.username, false)
    this.$message.error('已拒绝申请')
    this.$router.go(0)
  }
}

</script>

<style scoped>

</style>
