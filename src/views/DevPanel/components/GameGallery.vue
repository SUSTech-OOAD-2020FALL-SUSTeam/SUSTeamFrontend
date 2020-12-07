<template>
  <div class="game-gallery">
    <div class="title">
      {{ title }}
    </div>
    <div class="list">
      <div
        v-for="(game, index) in fillGames"
        :key="`game-${index}`"
        class="game-card-wrapper"
      >
        <GameCard
          :game="game"
          :dst="'developer'"
          class="game-card"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GameProfile } from '@/typings/GameProfile'
import GameCard from '@/components/GameCard.vue'

@Component({ components: { GameCard } })
export default class GameGallery extends Vue {
  @Prop()
  games!: Array<GameProfile>

  @Prop({ default: '我开发的游戏' })
  title!: string

  get fillGames () {
    return this.games
  }
}

</script>

<style scoped lang="scss">

.game-gallery {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 1.2em;
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

.game-card-wrapper {
  box-sizing: border-box;
  width: calc((100% - (2 - 1) * 1.2em) / 2);
  margin: auto 0.3em;
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
    margin: auto calc(3 / 4 * 0.6em);
  }
}

@media (min-width: 1024px) {
  .game-gallery {
    padding: 0;
  }
  .game-card-wrapper {
    width: calc((100% - (5 - 1) * 1.2em) / 5);
    margin: auto calc(4 / 5 * 0.6em);
  }
}

</style>
