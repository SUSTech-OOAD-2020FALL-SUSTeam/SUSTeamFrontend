<template>
  <div class="discovery-list">
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
          class="game-card"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { EMPTY_GAME, GameProfile } from '@/typings/GameProfile'
import GameCard from '@/components/GameCard.vue'

@Component({ components: { GameCard } })
export default class DiscoveryList extends Vue {
  @Prop()
  games!: Array<GameProfile>

  @Prop({ default: '畅销游戏' })
  title!: string

  get fillGames () {
    const arr: Array<GameProfile> = []
    Array.from(new Array(5)).forEach((v, i) => {
      if (i < this.games.length) {
        arr.push(this.games[i])
      } else {
        arr.push(EMPTY_GAME)
      }
    })
    return arr
  }
}

</script>

<style scoped lang="scss">

.discovery-list {
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
  justify-content: space-between;
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
  .discovery-list {
    padding: 0;
  }
  .game-card-wrapper {
    width: calc((100% - (5 - 1) * 1.2em) / 5);
  }
}

</style>
