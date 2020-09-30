<template>
  <main class="home">
    <PageNavigation />
    <div class="page-container">
      <DiscoveryCarousel :games="carouselGames" />
      <DiscoveryList :games="listGames" />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PageNavigation from '@/components/PageNavigation.vue'
import { DiscoveryCarousel, DiscoveryList } from '@/views/Home/components'
import { Game, parseGame } from '@/typings/Game'

@Component({ components: { PageNavigation, DiscoveryCarousel, DiscoveryList } })
export default class Home extends Vue {
  carouselGames: Array<Game> = []
  listGames: Array<Game> = []

  mounted () {
    Array.from(new Array(6)).forEach(() => {
      this.carouselGames.push(parseGame({
        id: 1,
        name: '十三机兵防卫圈',
        price: 448,
        publishDate: '2020-01-01T12:34:45.789Z',
        author: 'admin',
        description: '穿越时代相遇的十三名少男少女搭乘名为「机兵」的巨大机器人，面对关乎人类存亡的最后一战。',
        imageFullSize: '/img_full.jpg',
        imageCardSize: '/img_card.jpg'
      }))
      this.listGames.push(parseGame({
        id: 1,
        name: '十三机兵防卫圈',
        price: 448,
        publishDate: '2020-01-01T12:34:45.789Z',
        author: 'admin',
        description: '穿越时代相遇的十三名少男少女搭乘名为「机兵」的巨大机器人，面对关乎人类存亡的最后一战。',
        imageFullSize: '/img_full.jpg',
        imageCardSize: '/img_card.jpg'
      }))
    })
  }
}
</script>
<style scoped lang="scss">

main {
  color: #fff;
  background-color: #121212;
}

.page-container > * {
  margin-bottom: 3.6em;
}

@media (min-width: 1024px) {
  .page-container {
    padding: 0 12.5vw;
  }
}

</style>
