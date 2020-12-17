<template>
  <main class="game-page dark">
    <PageNavigation
      :items="[
        {content: '返回商城', icon:'left', url:'/'},
        {content: game.name}
      ]"
    />
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
            <div
              v-if="game.discount === null"
              class="purchase-price"
            >
              ${{ game.price }}
            </div>
            <div v-else>
              <div class="purchase-box">
                <a-space size="middle">
                  <div class="purchase-price">
                    <s>
                      ${{ game.price }}
                    </s>
                  </div>
                  <div class="new-price">
                    ${{ Math.round( game.price * game.discount.percentage * 100 + Number.EPSILON ) / 100 }}
                  </div>
                </a-space>
              </div>
              <a-statistic-countdown
                title="距离优惠结束还有"
                format="D 天 H 时 m 分 s 秒"
                :value="deadline"
              />
            </div>
            <a-button
              type="primary"
              class="purchase-button"
              @click="$router.push(`/game/${gameId}/purchase`)"
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
      <div class="game-announcement-container game-content">
        <div class="game-content-title">
          公告
        </div>
        <div class="game-announcement-body game-content-body">
          <div
            v-if="announcements.length > 5"
            class="game-announcement-control"
          >
            <a
              class="game-announcement-control-link"
              @click="triggerShowAllAnnouncement"
            >
              {{ showAllAnnouncement ? '关闭公告' : '查看所有公告' }}
            </a>
          </div>
          <div
            class="game-announcement-box"
            :class="{'close': !showAllAnnouncement}"
          >
            <div
              v-if="announcements.length === 0"
              class="announcement-empty"
            >
              暂无公告
            </div>
            <router-link
              v-for="(announcement, index) in announcements"
              :key="`announcement-${index}`"
              class="game-announcement"
              :to="`/game/${gameId}/announcement/${announcement.title}`"
            >
              <div class="announcement-title">
                {{ announcement.title }}
              </div>
              <div class="announcement-time">
                {{ announcement.announceTime.toDateString() }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="game-comment-container game-content">
        <div class="game-content-title">
          评论
        </div>
        <div class="game-comment-body game-content-body">
          <div class="game-comment-average">
            平均评分: {{ averageScore }}
          </div>
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
          <div
            v-if="user"
            class="game-post-comment"
          >
            <a-rate
              v-model="commentScore"
              allow-half
              class="game-post-comment-score"
            />
            <a-textarea
              v-model="commentInput"
              placeholder="Input comment"
              class="game-post-comment-input"
            />
            <a-button
              type="primary"
              class="game-post-comment-button"
              @click="postComment"
            >
              提交评论
            </a-button>
          </div>
        </div>
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
import { EMPTY_GAME } from '@/typings/GameProfile'
import VueMarkdown from 'vue-markdown'
import { Comment, EMPTY_COMMENT } from '@/typings/Comment'
import { createComment, gameComments, updateComment } from '@/api/Comment'
import { UserStore } from '@/store/modules/UserStoreModule'
import { Watch } from 'vue-property-decorator'
import { Announcement } from '@/typings/Announcement'
import { gameAnnouncements } from '@/api/Announcement'
import PageNavigation from '@/components/PageNavigation/index.vue'

@Component({ components: { PageNavigation, ImageGallery, CommentCard, VueMarkdown } })
export default class GamePage extends Vue {
  game: GameDetail = EMPTY_GAME_DETAIL

  comments: Array<Comment> = []
  announcements: Array<Announcement> = []

  showAllComment = false
  showAllAnnouncement = false

  selectedComment = -1

  commentInput = ''
  commentScore = 0

  deadline: Date | null = null

  mounted () {
    const gameId = this.gameId
    if (gameId === undefined) {
      this.$message.error('Game not exist!')
      return
    }
    gameDetail(gameId)
      .then(it => {
        this.game = it
        this.deadline = this.game.discount?.endTime || null
      })
      .catch(() => {
        this.$message.error('Game not exist!')
      })
    this.loadAnnouncements()
    this.loadComments()
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

  get averageScore () {
    if (this.comments.length === 0) {
      return '暂无评分'
    } else {
      const sum = this.comments.map(it => it.score).reduce((a, b) => a + b)
      return `${(sum / this.comments.length).toFixed(2)}`
    }
  }

  get user () {
    return UserStore.user
  }

  @Watch('user')
  onUserChange () {
    this.loadUserComment()
  }

  triggerShowAllComment () {
    this.showAllComment = !this.showAllComment
    this.selectedComment = -1
  }

  triggerShowAllAnnouncement () {
    this.showAllAnnouncement = !this.showAllAnnouncement
  }

  selectComment (index: number) {
    this.showAllComment = true
    this.selectedComment = index
  }

  async loadAnnouncements () {
    const gameId = this.gameId
    if (!gameId) {
      return
    }
    this.announcements = await gameAnnouncements(gameId)
  }

  async loadComments () {
    const gameId = this.gameId
    if (!gameId) {
      return
    }
    this.comments = await gameComments(gameId)
    await this.loadUserComment()
  }

  private loadUserComment () {
    const user = this.user
    if (!user) {
      return
    }
    const comment = this.comments.find(it => it.username === user.username)
    if (comment) {
      this.commentInput = comment.content
      this.commentScore = comment.score
    }
  }

  async postComment () {
    const gameId = this.gameId
    if (!gameId) {
      return
    }
    const user = this.user
    if (!user) {
      return
    }
    const comment = this.comments.find(it => it.username === user.username)

    if (!comment) {
      await createComment(gameId, this.commentScore, this.commentInput)
    } else {
      await updateComment(gameId, this.commentScore, this.commentInput)
    }
    this.$message.success('Comment success!')

    await this.loadComments()
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.game-container {
  background: darken($secondary-background, 15%);
}

.game-introduction-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

@media (min-width: 768px) and (max-width: 1024px) {
  .game-introduction-container {
    padding: 0 6em;
  }
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

.new-price {
  font-size: 1.5em;
  color: aquamarine;
  margin-top: -1rem;
}

.purchase-button {
  width: 16em;
  height: 3.6em;
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
  .game-introduction {
    font-size: 1.25em;
  }
  .purchase-button, .purchase-box {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  .purchase-box {
    margin-left: 2em;
  }
}

.game-content {
  display: flex;
  padding: 2em 0;
}

.game-content-title {
  font-size: 1.2em;
  margin-bottom: 1.5em;
}

@media (min-width: 1024px) {
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

@media (max-width: 1024px) {
  .game-content {
    flex-direction: column;
    padding: 3em 2.5em 0;
  }
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
  @include dark-markdown();
}

.game-announcement-body, .game-comment-body {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.game-announcement-control, .game-comment-control {
  align-self: flex-end;
  padding-bottom: 1.5em;

  .game-comment-control-link, .game-announcement-control-link {
    color: $secondary-text;
  }
}

.announcement-empty {
  color: $secondary-text;
}

.game-announcement-box {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all .2s;

  &.close {
    max-height: 12.5em;
  }
}

.game-announcement {
  display: flex;
  align-items: stretch;
  height: 2.5em;

  color: $tertiary-text;
  background: $secondary-background;

  &:hover {
    background: lighten($secondary-background, 15%);
  }

  .announcement-title {
    width: 0;
    flex: 1;
    overflow: hidden;
    line-height: 2.5em;
    margin: 0 1.5em;
  }

  .announcement-time {
    text-align: right;
    line-height: 2.5em;
    margin: 0 1.5em;
    width: 10em;
  }
}

.game-comment-average {
  font-size: 1.2em;
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
  @include dark-markdown();
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

.game-post-comment-input {
  margin: 1em 0;
  min-height: 10em;
  padding: 1em 1.5em;
  background: $secondary-background;
  color: $tertiary-text;
  border-color: transparent;
}

.game-post-comment-button {
  margin: 1em 0;
}

@media (max-width: 768px) {
  .game-post-comment-button {
    width: 100%;
  }
}

.purchase-box /deep/ .ant-statistic {
  .ant-statistic-title {
    color: $primary-text;
    font-size: 16px;
    text-align: end;
    margin-bottom: -5px;
  }

  .ant-statistic-content-value {
    color: $primary-text;
    font-size: 20px;
  }
}

</style>
