<template>
  <div class="app">
    <Navigation />
    <router-view class="main" />
    <PageFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Navigation from '@/components/Navigation.vue'
import PageFooter from '@/components/PageFooter.vue'

import GameGallery from '@/views/DevPanel/components/GameGallery.vue'
import MyDevelopedGames from '@/views/DevPanel/pages/MyDevelopedGames.vue'

@Component({ components: { MyDevelopedGames, GameGallery, Navigation, PageFooter } })
export default class DevPanel extends Vue {

}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.page-container > * {
  margin-bottom: 3.6em;
  margin-top: 3.6em;
}

.main {
  flex: 1;
}

.app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

</style>
