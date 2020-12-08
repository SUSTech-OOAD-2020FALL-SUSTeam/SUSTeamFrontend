<template>
  <main class="home dark">
    <div class="page-container">
      <div class="title">
        账户信息
      </div>
      <a-card
        class="user-card"
        title="我的SUSTeam名片"
        :head-style="{color: 'white'}"
      >
        <!--        <a-->
        <!--          slot="extra"-->
        <!--          href="/account/personal/edit"-->
        <!--        >编辑</a>-->
        <div>
          <a-space
            align="start"
            size="large"
          >
            <a-avatar
              :size="96"
              :src="user.avatar"
            />
            <div>
              <div class="username user-profile-entry">
                {{ user.username }}
              </div>
              <div class="email user-profile-entry">
                {{ user.mail }}
              </div>
              <div class="user-profile-entry">
                余额：${{ user.balance }}
                <a-button
                  type="link"
                >
                  充值
                </a-button>
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
import { UserRole } from '@/typings/User'
import { GameProfile } from '@/typings/GameProfile'
import { games } from '@/api/Order'

@Component({ components: { GameCard } })
export default class DetailedProfile extends Vue {
  user: UserRole | null = UserStore.user
  purchasedGames: Array<GameProfile> = []

  mounted () {
    if (this.user !== null) {
      games(this.user.username).then(it => {
        this.purchasedGames = it
      })
    }
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
