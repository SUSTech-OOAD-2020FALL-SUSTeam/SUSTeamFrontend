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
import { Game, parseGame } from '@/typings/Game'
import GameCard from '@/components/GameCard.vue'

@Component({ components: { GameCard } })
export default class DiscoveryList extends Vue {
  @Prop()
  games!: Array<Game>

  @Prop({ default: '畅销游戏' })
  title!: string

  get fillGames () {
    const arr: Array<Game> = []
    Array.from(new Array(5)).forEach((v, i) => {
      if (i < this.games.length) {
        arr.push(this.games[i])
      } else {
        arr.push(parseGame({
          id: -1,
          name: 'NULL',
          price: 0,
          publishDate: '2020-01-01T01:00:00.000Z',
          author: 'admin',
          description: null,
          imageFullSize: '/img_full.jpg',
          imageCardSize: '/img_card.jpg'
        }))
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
