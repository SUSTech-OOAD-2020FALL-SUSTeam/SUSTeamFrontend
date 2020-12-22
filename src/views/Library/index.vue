<template>
  <div class="app">
    <Navigation />
    <main class="main library-page dark">
      <div class="game-list">
        <div class="game-list-title">
          游戏列表
        </div>
        <div class="game-list-content">
          <div
            v-for="(game,index) in games"
            :key="`game-${index}-${game.gameId}`"
            class="game-list-item"
            :class="{active: selectedGame === game.gameId}"
            @click="selectGame(game.gameId)"
          >
            {{ game.name }}
          </div>
        </div>
      </div>

      <div
        v-if="selectedGame === -1"
        class="game-cards"
      >
        选择游戏
      </div>
      <div
        v-else
        class="game-preview"
      >
        <img
          :src="game.imageFullSize"
          :alt="game.name"
          class="game-cover"
        >
        <div class="game-preview-shadow">
          <button
            v-if="gameStatus.version === null"
            class="main-button download-button"
            @click="download(gameStatus.gameId, gameStatus.branch)"
          >
            下载
          </button>
          <button
            v-else-if="branchesLastVersion[gameStatus.branch] === undefined"
            class="main-button loading-button"
          >
            加载中
          </button>
          <button
            v-else-if="gameStatus.version === branchesLastVersion[gameStatus.branch]"
            class="main-button launch-button"
            @click="launch(game.gameId, gameStatus.branch)"
          >
            启动
          </button>
          <button
            v-else
            class="main-button update-button"
            @click="upgrade(game.gameId, gameStatus.branch)"
          >
            更新
          </button>
          <a-select
            class="version-select"
            :value="selectedBranch"
            @change="selectBranch"
          >
            <a-select-option
              v-for="branch in branches"
              :key="branch"
            >
              {{ branch }}
            </a-select-option>
          </a-select>
        </div>
        <div class="game-preview-box">
          <div class="game-preview-title">
            {{ game.name }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import VueMarkdown from 'vue-markdown'
import { UserStore } from '@/store/modules/UserStoreModule'
import Navigation from '@/components/Navigation.vue'
import { GameProfile } from '@/typings/GameProfile'
import { games } from '@/api/Order'
import { branches, versions } from '@/api/Version'
import { LocalGameStatus, LocalGameStatusMap } from '@/typings/LocalGameStatus'
import * as Client from '@/utils/Client'

@Component({ components: { Navigation, VueMarkdown } })
export default class Library extends Vue {
  games: Array<GameProfile> = []
  gameStatusMap: LocalGameStatusMap = new LocalGameStatusMap()

  selectedGame = -1
  selectedBranch = 'Main'
  branches: Array<string> = []
  branchesLastVersion: Record<string, string> = {}

  gameStatus: LocalGameStatus = { gameId: -1, branch: 'Main', version: null }

  async mounted () {
    const user = this.user
    if (user == null) {
      return
    }
    this.games = await games(user.username)
    this.gameStatusMap = Client.localGameStatus()
  }

  get user () {
    return UserStore.user
  }

  get game (): GameProfile | null {
    if (this.selectedGame !== -1) {
      return this.games.find(it => it.gameId === this.selectedGame) || null
    }
    return null
  }

  async selectGame (gameId: number) {
    this.selectedGame = gameId
    this.branches = await branches(gameId)

    let branch = 'Main'
    if (!this.branches.includes('Main')) {
      branch = this.branches[0] || ''
    }
    this.selectBranch(branch)

    this.branchesLastVersion = {}
    const promises = this.branches.map(branch =>
      versions(gameId, branch).then(version => {
        Vue.set(this.branchesLastVersion, branch, version[0].name)
        return version
      })
    )
    await Promise.all(promises)
  }

  selectBranch (branch: string) {
    this.selectedBranch = branch
    this.updateLocalGameStatus()
  }

  updateLocalGameStatus () {
    this.gameStatus = {
      gameId: this.selectedGame,
      branch: this.selectedBranch,
      version: this.gameStatusMap.get(this.selectedGame, this.selectedBranch)
    }
  }

  async download (gameId: number, branch: string) {
    await Client.downloadGame(gameId, branch)
    this.gameStatusMap = Client.localGameStatus()
    this.updateLocalGameStatus()
  }

  async launch (gameId: number, branch: string) {
    try {
      await Client.launchGame(gameId, branch)
    } catch (err) {
      this.$message.error('launch game failed!')
      console.error(err)
    }
  }

  async upgrade (gameId: number, branch: string) {
    await Client.upgradeGame(gameId, branch)
    this.gameStatusMap = Client.localGameStatus()
    this.updateLocalGameStatus()
  }
}

</script>

<style scoped lang="scss">

.app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.main {
  height: 0;
  flex: 1;
}

@import "@/style/global.scss";

@import "@/style/page.scss";

.library-page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.game-list {
  height: 100%;
  width: 300px;
  box-sizing: border-box;
  overflow-y: auto;

  background: darken($secondary-background, 15%);
}

.game-list-title {
  padding: 1em 1em;
  font-size: 1.2em;
}

.game-list-item {
  padding: 0.5em 2em;

  &:hover {
    background: darken($secondary-background, 0%);
  }

  &.active {
    background: lighten($secondary-background, 15%);
  }
}

.game-cards, .game-preview {
  height: 100%;
  flex: 1;
  overflow-y: auto;
}

.game-list, .game-preview, .game-cards {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.2);
  }

}

.game-preview {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 100%;
}

.game-cover {
  max-width: 100%;
}

.game-preview-shadow {
  margin-top: -100px;
  box-sizing: border-box;
  width: 100%;
  height: 100px;

  padding: 25px 40px;

  background-image: linear-gradient(rgba(0, 0, 0, 0), darken($secondary-background, 30%));
}

.main-button {
  box-sizing: border-box;
  width: 180px;
  height: 50px;
  z-index: 5;
  outline: none;
  border: none;
}

.download-button {
  background: lighten($primary-color, 20%);

  &:hover {
    background: lighten($primary-color, 30%);
  }
}

.loading-button {
  background: #424242;

  &:hover {
    background: lighten(#424242, 30%);
  }
}

.launch-button {
  background: #24b648;

  &:hover {
    background: lighten(#24b648, 10%);
  }
}

.update-button {
  background: lighten($primary-color, 20%);

  &:hover {
    background: lighten($primary-color, 30%);
  }
}

.version-select {
  width: 120px;
  margin-left: 2em;
}

.game-preview-box {
  flex: 1;
  box-sizing: border-box;
  padding: 0 50px;

  background: darken($secondary-background, 30%);
}

.game-preview-title {
  font-size: 2em;
}

</style>
