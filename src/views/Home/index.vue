<template>
  <main
    class="home"
    :class="mediaSize"
  >
    <PageNavigation />
    <div class="page-container">
      <DiscoveryCarousel :games="carouselGames" />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Store } from '@/store/modules/StoreModule'
import PageNavigation from '@/components/PageNavigation.vue'
import { DiscoveryCarousel } from '@/views/Home/components'
import { Game, parseGame } from '@/typings/Game'

@Component({ components: { PageNavigation, DiscoveryCarousel } })
export default class Home extends Vue {
  carouselGames: Array<Game> = []

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
    })
  }

  get mediaSize () {
    const width = Store.windowWidth

    if (width < 768) {
      return 'small'
    } else if (width < 1024) {
      return 'middle'
    } else {
      return 'large'
    }
  }
}
</script>
<style scoped lang="scss">

main {
  color: #fff;
  background-color: #121212;
}

@media (min-width: 1024px) {
  .page-container {
    padding: 0 12.5vw;
  }
}

</style>
