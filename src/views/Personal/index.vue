<template>
  <main class="home dark">
    <div class="page-container">
      <div class="title">
        账户信息
      </div>
      <a-card
        class="user-card"
        title="我的SUSTeam名片"
        :head-style="{color: '#fff'}"
      >
        <div>
          <a-space
            align="start"
            size="large"
          >
            <div class="avatar-box">
              <a-avatar
                :size="96"
                :src="user.avatar"
              />
              <a-upload
                :before-upload="uploadAvatar"
                :show-upload-list="false"
              >
                <span class="upload-avatar-button">
                  Upload Avatar
                </span>
              </a-upload>
            </div>
            <div>
              <div class="username user-profile-entry">
                {{ user.username }}
              </div>
              <div class="email user-profile-entry">
                {{ user.mail }}
              </div>
              <div class="user-profile-entry">
                余额：${{ user.balance }}
              </div>
              <div class="user-profile-entry">
                介绍：
                <span
                  class="edit-button"
                  @click="startEdit"
                >
                  编辑
                </span>
              </div>
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
      <div class="title">
        已购游戏
      </div>
      <div
        v-if="purchasedGames.length > 0"
        class="list"
      >
        <div
          v-for="(game, index) in purchasedGames"
          :key="`game-${index}`"
          class="game-card-wrapper"
        >
          <GameCard
            :game="game"
            class="game-card"
          />
        </div>
      </div>
      <div v-else>
        暂无
      </div>
      <div class="title">
        成就
      </div>
      <div>
        暂无
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import GameCard from '@/components/GameCard.vue'
import { UserStore } from '@/store/modules/UserStoreModule'
import { GameProfile } from '@/typings/GameProfile'
import { games } from '@/api/Order'
import { EMPTY_USER } from '@/typings/User'
import { uploadAvatar, updateDescription } from '@/api/User'

@Component({ components: { GameCard } })
export default class PersonalProfile extends Vue {
  purchasedGames: Array<GameProfile> = []

  edit = false
  description = ''

  get user () {
    const dispUser = UserStore.user || EMPTY_USER
    games(dispUser.username).then(it => {
      this.purchasedGames = it
    })
    return dispUser
  }

  async uploadAvatar (file: File) {
    await uploadAvatar(this.user.username, file)
    this.$message.success('Upload success!')
    await UserStore.update()
  }

  async updateDescription () {
    await updateDescription(this.user.username, this.description)
    this.$message.success('Update success!')
    await UserStore.update()
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

  .title {
    font-size: 1.25em;
    margin-bottom: 0.75em;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .ant-card-head-title {
    color: $primary-text;
  }

  .avatar-box {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  }

  .user-card {
    width: 450px;
    color: $primary-text;
    background-color: inherit;
    border-color: #6a6a6a;
    border-radius: 10px;
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
  }

  .user-profile-entry {
    padding-bottom: 5px;
  }

  .game-card-wrapper {
    box-sizing: border-box;
    margin-right: 1.2em;
  }

  @media (max-width: 768px) {
    .game-card-wrapper {
      width: calc((100% - (2 - 1) * 1.2em) / 2);
    }
    .game-card-wrapper:nth-child(2n) {
      margin-right: 0;
    }
  }

  @media (min-width: 768px) {
    .game-card-wrapper {
      width: calc((100% - (4 - 1) * 1.2em) / 4);
    }
    .game-card-wrapper:nth-child(4n) {
      margin-right: 0;
    }
  }

  @media (min-width: 1024px) {
    .game-card-wrapper {
      width: calc((100% - (5 - 1) * 1.2em) / 5);
    }
    .game-card-wrapper:nth-child(5n) {
      margin-right: 0;
    }
  }
</style>
