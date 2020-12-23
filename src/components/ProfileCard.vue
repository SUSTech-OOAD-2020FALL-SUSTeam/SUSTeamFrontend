<template>
  <a-card
    class="user-card"
  >
    <div>
      <a-space
        align="center"
        :size="20"
      >
        <div>
          <a-upload
            v-if="isMyself"
            :before-upload="uploadAvatar"
            :show-upload-list="false"
          >
            <a-tooltip
              title="点击更换头像"
            >
              <a-avatar
                :size="96"
                :src="user.avatar"
                class="avatar-box"
              />
            </a-tooltip>
          </a-upload>
          <a-avatar
            v-else
            :size="96"
            :src="user.avatar"
            class="avatar-box"
          />
          <div
            v-if="isMyself"
            class="balance-entry"
          >
            <a-space
              align="baseline"
            >
              <a-icon
                type="money-collect"
              />
              ${{ balance }}
            </a-space>
          </div>
          <div
            v-else-if="lastSeen !== null"
            class="lastseen-entry"
          >
            <a-icon
              type="clock-circle"
            />
            {{ lastSeen.toLocaleDateString() }}
          </div>
        </div>
        <div class="profile-entries">
          <a-row
            type="flex"
            justify="space-between"
          >
            <div class="username user-profile-entry">
              {{ user.username }}
            </div>
            <a-badge
              v-if="online"
              status="success"
            />
          </a-row>
          <div class="email user-profile-entry">
            {{ user.mail }}
          </div>
          <a-row
            type="flex"
            justify="space-between"
            class="description-head"
          >
            <div>个人简介</div>
            <a
              v-if="isMyself"
              class="edit-button"
              @click="startEdit"
            ><a-icon type="edit" /></a>
          </a-row>
          <a-card
            v-if="edit === false"
            class="user-description"
            type="inner"
            :body-style="{'text-align': 'left', 'padding': '5px'}"
          >
            {{ user.description }}
          </a-card>
          <a-card
            v-else
            class="user-description"
          >
            <a-textarea
              v-model="description"
              style="width: 100%"
            />
            <a-button
              type="primary"
              style="margin-top: 1em"
              @click="updateDescription"
            >
              更新
            </a-button>
          </a-card>
        </div>
      </a-space>
    </div>
  </a-card>
</template>
<script lang="ts">

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { EMPTY_USER, User } from '@/typings/User'
import { UserStore } from '@/store/modules/UserStoreModule'
import { uploadAvatar, updateDescription } from '@/api/User'

@Component
export default class ProfileCard extends Vue {
  @Prop({ default: EMPTY_USER })
  user!: User

  @Prop({ default: 0 })
  balance!: number

  @Prop({ default: false })
  isMyself!: boolean

  @Prop({ default: null })
  lastSeen!: Date | null

  @Prop({ default: true })
  online!: boolean

  edit = false
  description = ''

  async uploadAvatar (file: File) {
    await uploadAvatar(this.user.username, file)
    this.$message.success('Upload success!')
    await UserStore.update()
  }

  async updateDescription () {
    await updateDescription(this.user.username, this.description)
    this.$message.success('Update success!')
    await UserStore.update()
    this.edit = false
  }

  startEdit () {
    this.edit = true
    this.description = this.user.description
  }
}

</script>

<style scoped lang="scss">
@import "@/style/global.scss";

@import "@/style/page.scss";

.page-container > * {
  margin-bottom: 3.6em;
  margin-top: 3.6em;
}

.user-card {
  width: 450px;
  color: $primary-text;
  background: $secondary-background;
  border-color: $secondary-background;
  border-radius: 10px;
  transition: all .2s;

  &:hover {
    background: lighten($secondary-background, 15%);
  }
}

.avatar-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all .2s;

  &:hover {
    filter: brightness(20%) blur(1px);
  }
}

.profile-entries {
}

.upload-avatar-button {
  display: inline-block;
  margin-top: 0.75em;
  color: $primary-color;
  cursor: pointer;
}

.edit-button {
  color: $primary-color;
  cursor: pointer;
  text-align: right;
  margin: auto 0 auto auto;
}

.user-description {
  width: 280px;
  background-color: inherit;
  border-color: #6a6a6a;
  color: inherit;
}

.username {
  font-size: 2.25em;
}

.email {
  color: #40a9ff;
  top: -0.5em;
  position: relative;
}

.user-profile-entry {
  padding-top: 4px;
}

.balance-entry {
  margin: auto;
  text-align: center;
}

.lastseen-entry {
  margin: auto;
  padding-top: 1em;
  text-align: center;
  color: #7b7b7b;
}

.description-head {
  padding-bottom: 0.5em;
}

@media (max-width: 768px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}
</style>
