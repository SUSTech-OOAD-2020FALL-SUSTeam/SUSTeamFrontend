<template>
  <a
    class="comment-card"
    @click="$emit('select-comment')"
  >
    <a-rate
      :value="comment.score"
      :default-value="comment.score"
      allow-half
      disabled
    />
    <div class="author-date">
      <div class="author">
        作者: {{ comment.username }}
      </div>
      <div class="date">
        {{ comment.commentTime.toLocaleDateString() }}
      </div>
    </div>
    <div class="split-line" />
    <vue-markdown
      class="content"
      :source="comment.content"
    />
    <div
      class="vote-panel"
    >
      <div
        class="vote-button"
        :class="{active: vote === 1}"
        @click.stop="clickUpvote"
      >
        <a-icon
          style="font-size: 1.5em"
          type="caret-up"
        />
        {{ upvote }}
      </div>
      <div
        class="vote-button"
        :class="{active: vote === -1}"
        @click.stop="clickDownvote"
      >
        <a-icon
          style="font-size: 1.5em"
          type="caret-down"
        />
        {{ downvote }}
      </div>
    </div>
    <div class="show-all">
      查看完整评论
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { CommentWithThumb, EMPTY_COMMENT } from '@/typings/Comment'
import VueMarkdown from 'vue-markdown'
import { UserStore } from '@/store/modules/UserStoreModule'
import { updateCommentThumb } from '@/api/Comment'

@Component({ components: { VueMarkdown } })
export default class CommentCard extends Vue {
  @Prop()
  comment!: CommentWithThumb

  voteOperation: number | null = null

  get user () {
    return UserStore.user
  }

  get vote () {
    const voteOperation = this.voteOperation
    if (voteOperation !== null) {
      return voteOperation
    }
    return this.comment.vote || 0
  }

  get upvote () {
    let vote = this.comment.thumbSummary?.upvote || 0
    if (this.comment.vote === 1) {
      vote -= 1
    }
    if ((this.comment.vote === 1 && this.voteOperation === null) || this.voteOperation === 1) {
      vote += 1
    }
    return vote
  }

  get downvote () {
    let vote = this.comment.thumbSummary?.downvote || 0
    if (this.comment.vote === -1) {
      vote -= 1
    }
    if ((this.comment.vote === -1 && this.voteOperation === null) || this.voteOperation === -1) {
      vote += 1
    }
    return vote
  }

  async clickUpvote () {
    try {
      const vote = this.vote === 1 ? 0 : 1
      await updateCommentThumb(this.comment.gameId, this.comment.username, vote)
      this.voteOperation = vote
    } catch (error) {
      console.log(error)
      if (typeof error === 'string') {
        this.$message.error(error)
      } else {
        this.$message.error('vote error')
      }
    }
  }

  async clickDownvote () {
    try {
      const vote = this.vote === -1 ? 0 : -1
      await updateCommentThumb(this.comment.gameId, this.comment.username, vote)
      this.voteOperation = vote
    } catch (error) {
      console.log(error)
      if (typeof error === 'string') {
        this.$message.error(error)
      } else {
        this.$message.error('vote error')
      }
    }
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

.comment-card {
  color: $tertiary-text;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 1.5em 1.5em;
  background: $secondary-background;

  &:hover {
    background: lighten($secondary-background, 15%);
  }
}

.vote-panel {
  display: flex;
  float: right;
  margin-bottom: 0.5em;

  .vote-button {
    width: 4em;
    height: 1.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s;

    &.active {
      background-color: $primary-color;
      color: white;
    }

    &:hover {
      background-color: lighten($primary-color, 20%);
      color: white;
    }
  }
}

.author-date {
  margin-top: 0.5em;
  display: flex;
  justify-content: space-between;
}

.split-line {
  height: 1px;
  background: darken($tertiary-text, 60%);
  margin: 1.2em 0;
}

.content {
  flex: 1;
  height: 0;
  overflow: hidden;
}

</style>
