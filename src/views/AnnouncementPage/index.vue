<template>
  <main class="announcement-page dark">
    <PageNavigation
      :items="[
        {content: '返回商城', icon:'left', url:'/'},
        {content: game.name, url:`/game/${gameId}`, flex:1},
        {content: announcement.title, flex:1},
      ]"
      :show-searcher="false"
    />
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
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import { gameDetail } from '@/api/Game'
import { CommentCard, ImageGallery } from '@/views/GamePage/components'
import VueMarkdown from 'vue-markdown'
import { Announcement } from '@/typings/Announcement'
import { gameAnnouncements } from '@/api/Announcement'
import PageNavigation from '@/components/PageNavigation/index.vue'

@Component({ components: { PageNavigation, ImageGallery, CommentCard, VueMarkdown } })
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

.announcement-page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
