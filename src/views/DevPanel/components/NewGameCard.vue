<template>
  <div class="game-card">
    <router-link
      :to="`/${dst}/newGame`"
      class="wrapper"
    >
      <div class="game-image-wrapper">
        <img
          src="/default_card.jpg"
          alt="NewGame"
          class="game-image"
        >
        <div class="game-info" />
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
// import { GameProfile } from '@/typings/GameProfile'

@Component
export default class NewGameCard extends Vue {
  // @Prop()
  // game!: GameProfile

  @Prop({ default: 'game' })
  dst!: string
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
  height: 8em;
}

</style>
