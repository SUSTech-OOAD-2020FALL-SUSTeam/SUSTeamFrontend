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
    <div class="show-all">
      查看完整评论
    </div>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Comment } from '@/typings/Comment'
import VueMarkdown from 'vue-markdown'

@Component({ components: { VueMarkdown } })
export default class CommentCard extends Vue {
  @Prop()
  comment!: Comment
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
