<template>
  <div class="page-nav">
    <nav>
      <router-link
        class="link"
        to="/"
      >
        探索
      </router-link>
      <router-link
        class="link"
        to="/browse"
      >
        浏览
      </router-link>
    </nav>
    <Searcher />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Searcher from '@/components/PageNavigation/Searcher.vue'

@Component({ components: { Searcher } })
export default class PageNavigation extends Vue {
  searchText = ''
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "nav.scss";

</style>
