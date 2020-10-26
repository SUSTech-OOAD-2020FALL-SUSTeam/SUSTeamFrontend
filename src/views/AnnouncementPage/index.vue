<template>
  <main class="announcement-page dark">
    <div class="page-nav">
      <nav
        class="page-nav-bar"
      >
        <router-link
          class="link nav-home"
          to="/"
        >
          <a-icon type="left" />
          返回商城
        </router-link>
        <span class="split">|</span>
        <router-link
          class="link nav-game"
          :to="`/game/${gameId}`"
        >
          {{ game.name }}
        </router-link>
        <span class="split">|</span>
        <span class="nav-title">
          {{ announcement.title }}
        </span>
      </nav>
    </div>
    <div class="announcement-container page-container">
      <div class="announcement">
        <h1 class="title">
          {{ announcement.title }}
        </h1>
        <div class="announcement-time">
          {{ announcement.announceTime.toLocaleString() }}
        </div>
        <vue-markdown
          class="announcement-content"
          :source="announcement.content"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Searcher from '@/components/PageNavigation/Searcher.vue'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import { gameDetail } from '@/api/Game'
import { CommentCard, ImageGallery } from '@/views/GamePage/components'
import VueMarkdown from 'vue-markdown'
import { Announcement } from '@/typings/Announcement'
import { gameAnnouncements } from '@/api/Announcement'

@Component({ components: { Searcher, ImageGallery, CommentCard, VueMarkdown } })
export default class AnnouncementPage extends Vue {
  game: GameDetail = EMPTY_GAME_DETAIL
  announcements: Array<Announcement> = []

  mounted () {
    const gameId = this.gameId
    if (gameId === undefined) {
      this.$message.error('Game not exist!')
      return
    }
    gameDetail(gameId)
      .then(it => {
        this.game = it
      })
      .catch(() => {
        this.$message.error('Game not exist!')
      })
    this.loadAnnouncements()
  }

  get gameId () {
    const id = parseInt(this.$route.params.gameId)
    return isNaN(id) ? undefined : id
  }

  get title () {
    return this.$route.params.title
  }

  get announcement () {
    const gameId = this.gameId
    if (gameId === undefined) {
      return {
        gameId: -1,
        announceTime: new Date(),
        title: 'No Game Found',
        content: ''
      }
    }
    return this.announcements.find((it) => it.title === this.title) || {
      gameId: gameId,
      announceTime: new Date(),
      title: 'No Announcement Found',
      content: ''
    }
  }

  async loadAnnouncements () {
    const gameId = this.gameId
    if (!gameId) {
      return
    }
    this.announcements = await gameAnnouncements(gameId)
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

@import "@/components/PageNavigation/nav.scss";

.announcement-page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.page-nav-bar {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.nav-home {
  flex-shrink: 0;
}

.nav-game, .nav-title {
  flex-shrink: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.split {
  color: $tertiary-text;
}

.page-container {
  background: darken($secondary-background, 15%);
  flex: 1;
}

.announcement {
  display: flex;
  flex-direction: column;
  padding: 2em 0;

  @include dark-markdown();
}

@media (max-width: 1024px) {
  .announcement {
    padding: 3em 2.5em 0;
  }
}

.announcement-content {
  margin-top: 1.5em;
}

</style>
