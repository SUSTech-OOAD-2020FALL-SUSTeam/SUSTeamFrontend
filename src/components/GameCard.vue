<template>
  <div class="game-card">
    <router-link
      :to="`/game/${game.gameId}`"
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
        <div
          v-if="game.discount === null"
          class="game-price"
        >
          {{ game.price > 0 ? "$" + game.price : "免费" }}
        </div>
        <div
          v-else
        >
          <a-space :size="4">
            <a-tag color="#108ee9">
              -{{ 100 * game.discount.percentage }}%
            </a-tag>
            <div class="old-price">
              <s>
                ${{ game.price }}
              </s>
            </div>
            <div class="game-price">
              ${{ Math.round( game.price * game.discount.percentage * 100 + Number.EPSILON ) / 100 }}
            </div>
          </a-space>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { GameProfile } from '@/typings/GameProfile'

@Component
export default class GameCard extends Vue {
  @Prop()
  game!: GameProfile
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

.old-price {
  font-size: 1.2em;
  opacity: 0.5;
}

</style>
