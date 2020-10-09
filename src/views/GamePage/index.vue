<template>
  <main class="game-page dark">
    <div class="page-nav">
      <nav>
        <router-link
          class="link"
          to="/"
        >
          <a-icon type="left" />
          返回商城
        </router-link>
        <span class="split">|</span>
        <span class="nav-game-name">
          {{ game.name }}
        </span>
      </nav>
      <Searcher />
    </div>
    <ImageGallery
      :images="game.images.map(it => it.url)"
      class="page-item"
    />
    <div class="game-container page-container">
      <div class="game-content">
        <div class="game-introduction-container">
          <img
            :src="coverImage"
            :alt="game.name"
            class="game-introduction-cover-image"
          >
          <div class="game-introduction">
            {{ game.introduction }}
          </div>
          <div class="purchase-box">
            <div class="purchase-price">
              ${{ game.price }}
            </div>
            <a-button
              type="primary"
              class="purchase-button"
            >
              立即购买
            </a-button>
          </div>
        </div>
      </div>
      <div class="game-description-container game-content">
        <div class="game-content-title">
          关于游戏
        </div>
        <div class="game-description-body game-content-body">
          <div class="game-property-box">
            <div class="game-property">
              <div class="game-property-key">
                发行商
              </div>
              <div class="game-property-value">
                {{ game.author }}
              </div>
            </div>
            <div class="game-property">
              <div class="game-property-key">
                发行日期
              </div>
              <div class="game-property-value">
                {{ game.publishDate.toLocaleDateString() }}
              </div>
            </div>
            <div class="game-property">
              <div class="game-property-key">
                标签
              </div>
              <div class="game-property-value">
                {{ game.tags.join(', ') }}
              </div>
            </div>
          </div>
          <div class="game-description">
            <vue-markdown :source="game.description" />
          </div>
        </div>
      </div>
      <div class="game-comment-container game-content">
        <div class="game-content-title">
          评论
        </div>
        <div class="game-comment-body game-content-body">
          <div class="game-comment-control">
            <a
              class="game-comment-control-link"
              @click="triggerShowAllComment"
            >
              {{ showAllComment ? '关闭评论' : '查看所有评论' }}
            </a>
          </div>
          <div
            class="game-comment-box"
            :class="{close: !showAllComment}"
          >
            <CommentCard
              v-for="(comment, index) in filledComment"
              :key="`comment-${index}`"
              :comment="comment"
              class="game-comment"
              :class="{selected: index === selectedComment}"
              @select-comment="selectComment(index)"
            />
          </div>
        </div>
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
import { ImageGallery, CommentCard } from '@/views/GamePage/components'
import { EMPTY_GAME } from '@/typings/GameProfile'
import VueMarkdown from 'vue-markdown'
import { Comment, EMPTY_COMMENT } from '@/typings/Comment'
import { gameComments } from '@/api/Comment'

@Component({ components: { Searcher, ImageGallery, CommentCard, VueMarkdown } })
export default class GamePage extends Vue {
  game: GameDetail = EMPTY_GAME_DETAIL

  comments: Array<Comment> = []

  showAllComment = false

  selectedComment = -1

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
    gameComments(gameId).then(it => {
      this.comments = it
    })
  }

  get gameId () {
    const id = parseInt(this.$route.params.gameId)
    return isNaN(id) ? undefined : id
  }

  get coverImage () {
    return this.game.images.find(it => it.type === 'F')?.url || EMPTY_GAME.imageFullSize
  }

  get filledComment () {
    if (this.comments.length < 3) {
      return [...this.comments, EMPTY_COMMENT]
    } else {
      return this.comments
    }
  }

  triggerShowAllComment () {
    this.showAllComment = !this.showAllComment
    this.selectedComment = -1
  }

  selectComment (index: number) {
    this.showAllComment = true
    this.selectedComment = index
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

@import "@/components/PageNavigation/nav.scss";

.split {
  color: $tertiary-text;
}

.game-container {
  background: darken($secondary-background, 15%);
}

.game-content {
  padding: 2em 0;
}

.game-introduction-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.game-introduction-cover-image {
  max-width: 25%;
  margin-right: 2em;
  border-radius: 3px;
}

.game-introduction {
  flex: 1;
  font-size: 1.5em;
}

.purchase-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.purchase-price {
  font-size: 1.125em;
  margin-bottom: 1rem;
}

.purchase-button {
  width: 16em;
  height: 3.6em;
}

.game-content {
  display: flex;
}

.game-content-title {
  font-size: 1.2em;
  margin-bottom: 1.5em;
}

.game-description-body {
  display: flex;
  flex-direction: column;
}

.game-property-box {
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 1em;
}

.game-property {
  width: calc(1 / 3 * 100%);
  margin-bottom: 1em;
}

@media (max-width: 768px) {
  .game-property {
    width: calc(1 / 2 * 100%);
  }
}

.game-property-key {
  color: $secondary-text;
}

.game-description {
  color: $tertiary-text;

  & /deep/ h1,
  & /deep/ h2,
  & /deep/ h3,
  & /deep/ h4,
  & /deep/ h5,
  & /deep/ h6 {
    color: $secondary-text;
  }
}

.game-comment-body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.game-comment-control {
  align-self: flex-end;
  padding-bottom: 1.5em;

  .game-comment-control-link {
    color: $secondary-text;
  }
}

.game-comment-box {
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  &.close {
    height: 25em;
  }
}

.game-comment {
  height: 24em;
  margin-bottom: 1.5em;
  transition: all .2s;

  &.selected {
    width: 100%;
    height: auto;
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .game-comment {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .game-comment {
    width: calc((100% - 3 * 1.2em) / 3);
    margin-right: 1.2em;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .game-comment {
    width: calc((100% - 2 * 1.2em) / 2);
    margin-right: 1.2em;
  }
}

@media (min-width: 1280px) {
  .game-comment {
    width: calc((100% - 3 * 1.2em) / 3);
    margin-right: 1.2em;
  }
}

@media (min-width: 1024px) and (max-width: 1280px) {
  .purchase-button {
    width: 12em;
    height: 2.6em;
  }
  .game-introduction {
    font-size: 1.25em;
  }
}

@media (max-width: 1024px) {
  .game-introduction-container {
    padding: 0 6em;
  }
  .game-introduction {
    font-size: 1.25em;
  }
  .purchase-button, .purchase-box {
    width: 100%;
  }
  .game-content {
    flex-direction: column;
    padding: 3em 2.5em 0;
  }
}

@media (min-width: 1024px) {
  .purchase-box {
    margin-left: 2em;
  }
  .game-content {
    flex-direction: row;
  }
  .game-content-title {
    width: 27.5%;
  }
  .game-content-body {
    flex: 1;
  }
}

</style>
