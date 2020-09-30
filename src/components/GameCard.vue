<template>
  <div class="game-card">
    <router-link
      :to="`/game/${game.id}`"
      class="wrapper"
    >
      <div class="game-image-wrapper">
        <img
          :src="game.imageCardSize"
          :alt="game.name"
          class="game-image"
        >
      </div>
      <div class="game-info">
        <div class="game-name">
          {{ game.name }}
        </div>
        <div class="game-author">
          {{ game.author }}
        </div>
        <div class="game-price">
          ${{ game.price }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Game } from '@/typings/Game'

@Component
export default class GameCard extends Vue {
  @Prop()
  game!: Game
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

.game-card {
  border-radius: 3px;
  overflow: hidden;
}

.wrapper {
  display: block;
  color: rgb(245, 245, 245);
}

.game-image {
  width: 100%;
}

.game-info {
  padding: 1.5em 0 0.5em;
}

.game-author {
  color: $tertiary-text;
}

.game-price {
  font-size: 1.2em;
  padding: 0.5em 0;
}

</style>
