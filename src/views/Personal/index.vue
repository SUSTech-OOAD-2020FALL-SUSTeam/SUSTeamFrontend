<template>
  <main class="home dark">
    <div class="page-container">
      <ProfileCard
        :user="user"
        :is-myself="true"
        :balance="balance"
        class="profile-card-wrapper"
      />
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
import { EMPTY_USER_ROLE, userRoleToUser } from '@/typings/User'
import ProfileCard from '@/components/ProfileCard.vue'

@Component({ components: { ProfileCard, GameCard } })
export default class PersonalProfile extends Vue {
  purchasedGames: Array<GameProfile> = []
  balance = 0
  edit = false
  description = ''

  get user () {
    const dispUser = UserStore.user || EMPTY_USER_ROLE
    games(dispUser.username).then(it => {
      this.purchasedGames = it
    })
    this.balance = dispUser.balance
    return userRoleToUser(dispUser)
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

  .game-card-wrapper {
    box-sizing: border-box;
    margin-right: 1.2em;
  }

  .profile-card-wrapper {
    margin: 50px auto;
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
