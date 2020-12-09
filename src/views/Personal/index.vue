<template>
  <main class="home dark">
    <Navigation />
    <div class="page-container">
      <div class="title">
        账户信息
      </div>
      <a-card
        class="user-card"
        title="我的SUSTeam名片"
        :head-style="{color: '$primary-text'}"
      >
        <div>
          <a-space
            align="start"
            size="large"
          >
            <a-avatar
              :size="96"
              :src="user.avatar"
            />
            <span>
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
              </div>
              <a-card
                class="user-description"
                type="inner"
                :body-style="{'text-align': 'left', 'padding': '5px'}"
              >
                {{ user.description }}
              </a-card>
            </span>
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
    <PageFooter />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Navigation from '@/components/Navigation.vue'
import GameCard from '@/components/GameCard.vue'
import PageFooter from '@/components/PageFooter.vue'
import { UserStore } from '@/store/modules/UserStoreModule'
import { GameProfile } from '@/typings/GameProfile'
import { games } from '@/api/Order'
import { EMPTY_USER } from '@/typings/User'

@Component({ components: { Navigation, GameCard, PageFooter } })
export default class PersonalProfile extends Vue {
  purchasedGames: Array<GameProfile> = []

  get user () {
    const dispUser = UserStore.user || EMPTY_USER
    games(dispUser.username).then(it => {
      this.purchasedGames = it
    })
    return dispUser
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
    justify-content: space-between;
  }

  .ant-card-head-title {
    color: $primary-text;
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
    width: calc((100% - (2 - 1) * 1.2em) / 2);
  }

  @media (max-width: 1024px) {
    .game-card-wrapper {
      &:last-child {
        display: none;
      }
    }
  }

  @media (min-width: 768px) {
    .game-card-wrapper {
      width: calc((100% - (4 - 1) * 1.2em) / 4);
    }
  }

  @media (min-width: 1024px) {
    .game-card-wrapper {
      width: calc((100% - (5 - 1) * 1.2em) / 5);
    }
  }
</style>
