<template>
  <div class="carousel">
    <div class="image-box">
      <div
        class="image-container"
        :style="{left: `${-selectIndex * 100}%`}"
      >
        <router-link
          v-for="(game, index) in fillGames"
          :key="`game-image-${index}`"
          :to="`/game/${game.gameId}`"
          class="carousel-link"
        >
          <img
            :src="game.imageFullSize"
            class="carousel-image"
            :alt="game.name"
          >
        </router-link>
      </div>
    </div>
    <div class="content-box">
      <div class="control-wrapper">
        <div class="control-arrow">
          <div
            class="control-icon"
            @click="selectIndex = (selectIndex + 6 - 1) % 6"
          >
            <a-icon type="left" />
          </div>
          <div
            class="control-icon"
            @click="selectIndex = (selectIndex + 6 + 1) % 6"
          >
            <a-icon type="right" />
          </div>
        </div>
        <div class="control-pagination">
          <div
            v-for="index in new Array(6).keys()"
            :key="index"
            class="pagination-icon"
            :class="{active: selectIndex === index}"
            @click="selectIndex = index"
          >
            <span class="dot-icon" />
          </div>
        </div>
      </div>
      <div class="content-wrapper">
        <div
          class="content-item-container"
          :style="{left: `${-selectIndex * 100}%`}"
        >
          <div
            v-for="(game, index) in fillGames"
            :key="`game-item-${index}`"
            class="content-item"
          >
            <div class="content-text">
              <div class="game-hint">
                现已推出
              </div>
              <router-link
                :to="`/game/${game.gameId}`"
                class="game-name"
              >
                {{ game.name }}
              </router-link>
              <div class="game-introduction">
                {{ game.introduction }}
              </div>
            </div>
            <div class="content-link">
              <router-link
                :to="`/game/${game.gameId}`"
              >
                了解详情
                <a-icon type="arrow-right" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { EMPTY_GAME, GameProfile } from '@/typings/GameProfile'

@Component
export default class DiscoveryCarousel extends Vue {
  selectIndex = 0

  @Prop()
  games!: Array<GameProfile>

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

@import "@/style/global.scss";

.carousel {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.image-box {
  overflow-x: hidden;
}

.image-container {
  width: 600%;
  transition: all .4s;
  position: relative;
}

.carousel-link {
  display: inline-block;
  width: calc(100% / 6);
}

.carousel-image {
  width: 100%;
}

.content-box {
  display: flex;
  flex-direction: column;
  align-items: stretch;

  background: $secondary-background;
  transition: all .2s;

  &:hover {
    background: lighten($secondary-background, 15%);
  }
}

.control-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.control-arrow {
  display: flex;
}

.control-pagination {
  display: flex;
}

.control-icon, .pagination-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  cursor: pointer;
}

.control-icon {
  width: 3em;
  height: 3em;
  transition: all .2s;

  &:hover {
    background: lighten($secondary-background, 30%);
  }
}

.pagination-icon {
  width: 2em;
  height: 2em;
}

.pagination-icon.active .dot-icon {
  background: $primary-text;
}

.dot-icon {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: $tertiary-text;
}

.content-wrapper {
  flex: 1;
  overflow-x: hidden;
}

.content-item-container {
  width: 600%;
  height: 100%;
  display: flex;
  align-items: stretch;
  transition: all .4s;
  position: relative;
}

.content-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: calc(100% / 6);
  padding: 1.2em 1em;
}

.content-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.game-hint {
  font-size: 0.875em;
  color: $tertiary-text;
}

.game-name {
  font-size: 1.6em;
  color: $primary-text;
  margin: 0.75rem 0;
}

.game-introduction {
  flex: 1;
  overflow: hidden;
  color: $tertiary-text;
}

.content-link {
  padding: 1em 0;

  a {
    color: $primary-text;
  }
}

@media (min-width: 1024px) {
  .carousel {
    flex-direction: row;
    border-radius: 3px;
    overflow: hidden;
  }
  .image-box {
    width: 60%;
  }
  .content-box {
    box-sizing: border-box;
    width: 40%;
    padding: 3em 2em;
  }
  .content-wrapper {
    height: 0;
  }
  .content-item {
    padding-bottom: 0;
  }
  .content-text {
    height: 0;
  }
  .content-link {
    padding: 1em 0 0;
  }
}

</style>
