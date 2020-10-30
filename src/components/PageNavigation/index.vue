<template>
  <div class="page-nav">
    <Breadcrumb
      :items="items"
    />
    <Searcher v-if="showSearcher" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Searcher from '@/components/PageNavigation/Searcher.vue'
import Breadcrumb, { BreadcrumbItem } from '@/components/PageNavigation/Breadcrumb.vue'
import { Prop } from 'vue-property-decorator'

@Component({ components: { Searcher, Breadcrumb } })
export default class PageNavigation extends Vue {
  @Prop({ default: true })
  showSearcher!: boolean

  @Prop({
    default: [
      { content: '探索', url: '/' },
      { content: '浏览', url: '/browse' }
    ]
  })
  items!: BreadcrumbItem[]

  searchText = ''
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

.page-nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4em;
  padding: 0 1em;
}

@media (min-width: 1024px) {
  .page-nav {
    padding: 0 12.5vw;
    height: 80px;
  }
}

@media (min-width: 1280px) {
  .page-nav {
    height: 100px;
  }
}

</style>
