<template>
  <main class="browse dark">
    <PageNavigation />
    <div class="page-container">
      <div class="game-list-container">
        <div class="game-list-controller">
          <a-dropdown
            :trigger="['click']"
          >
            <a class="order-link">
              排序方式:
              <span class="highlight">
                {{ order.text }}
                <a-icon type="down" />
              </span>
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="order=order.constructor.PUBLISH_DATE">发行日期</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="order=order.constructor.NAME">字母顺序</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <a
            class="filter-link"
            @click="showMenu = true"
          >
            筛选器
            <a-icon type="filter" />
          </a>
        </div>
        <div class="game-list">
          <div
            v-for="(game, index) in games"
            :key="`game-${index}`"
            class="game-card-wrapper"
          >
            <GameCard :game="game" />
          </div>
        </div>
      </div>
      <aside
        class="aside"
        :class="{show:showMenu}"
        @click.self="showMenu = false"
      >
        <div class="game-filter">
          <div class="filter-title">
            筛选器
          </div>
          <a-menu
            v-model="filterSelectedKeys"
            :open-keys.sync="filterOpenKeys"
            mode="inline"
            :multiple="true"
            :inline-indent="0"
            class="filter-menu"
          >
            <a-sub-menu key="Tag">
              <span slot="title">标签</span>
              <a-menu-item
                v-for="tag in tags"
                :key="tag"
              >
                {{ tag }}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </aside>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PageNavigation from '@/components/PageNavigation/index.vue'
import { GameProfile } from '@/typings/GameProfile'
import GameCard from '@/components/GameCard.vue'
import { games, gamesWithTag, tags } from '@/api/Game'
import { Watch } from 'vue-property-decorator'

class Order {
  static readonly PUBLISH_DATE = new Order('publishDate', '发行日期')
  static readonly NAME = new Order('name', '字母顺序')

  // eslint-disable-next-line no-useless-constructor
  private constructor (readonly key: string, readonly text: string) {}
}

@Component({ components: { PageNavigation, GameCard } })
export default class Browse extends Vue {
  order = Order.PUBLISH_DATE
  games: Array<GameProfile> = []

  filterOpenKeys: Array<string> = ['Tag']
  filterSelectedKeys: Array<string> = []

  showMenu = false

  tags: Array<string> = []

  mounted () {
    const tag = this.$route.query.tag
    if (typeof tag === 'string') {
      this.filterSelectedKeys.push(tag)
    } else if (Array.isArray(tag)) {
      this.filterSelectedKeys.push(...(tag as Array<string>))
    } else {
      games(this.order.key).then(it => { this.games = it })
    }

    tags().then(it => { this.tags = it })
  }

  @Watch('order')
  onOrderChanged (val: Order) {
    games(val.key).then(it => { this.games = it })
  }

  @Watch('filterSelectedKeys')
  onTagsChanged (val: Array<string>) {
    gamesWithTag(val).then(it => { this.games = it })

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.delete('tag')
    val.forEach(value => {
      searchParams.append('tag', value)
    })
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?' + searchParams.toString()
    window.history.pushState({ path: newUrl }, '', newUrl)
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.page-container {
  display: flex;
}

.game-list-container {
  flex: 1;
  padding: 0 1em;
}

.game-list-controller {
  padding: 1.2em 0;
  display: flex;
  justify-content: space-between;
}

.order-link {
  font-size: 0.875em;
  color: $tertiary-text;
  transition: all 0s;

  .highlight {
    margin-left: 0.5em;
    color: $secondary-text;
  }

  &:hover {
    color: $secondary-text;

    .highlight {
      color: $primary-text;
    }
  }
}

.game-list {
  display: flex;
  flex-wrap: wrap;
}

.game-card-wrapper {
  box-sizing: border-box;
  margin-right: 1.2em;
  width: calc((100% - (2 - 1) * 1.2em) / 2);
}

.game-card-wrapper:nth-child(2n) {
  margin-right: 0;
}

@media (min-width: 768px) {
  .game-card-wrapper {
    width: calc((100% - (4 - 1) * 1.2em) / 4);
  }

  .game-card-wrapper:nth-child(2n) {
    margin-right: 1.2em;
  }

  .game-card-wrapper:nth-child(4n) {
    margin-right: 0;
  }
}

.filter-link {
  color: $primary-text;
}

.game-filter {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.filter-menu {
  color: $tertiary-text;
  background: transparent;
  border-bottom: solid 1px lighten($secondary-background, 5%);
  border-right: transparent;

  & /deep/ .ant-menu-sub {
    color: inherit;
    background: transparent;
  }

  & /deep/ .ant-menu-submenu-active,
  & /deep/ .ant-menu-submenu-selected,
  & /deep/ .ant-menu-submenu-title:active,
  & /deep/ .ant-menu-item:active {
    color: inherit;
    background: transparent;
  }

  & /deep/ .ant-menu-item-selected {
    color: inherit;
    background-color: lighten($primary-background, 15%) !important;
  }

  & /deep/ .ant-menu-item {
    &::after {
      border-right: transparent;
    }
  }

  & /deep/ .ant-menu-submenu-title:hover {
    color: $primary-text;

    & > .ant-menu-submenu-arrow::before, & > .ant-menu-submenu-arrow::after {
      background-image: linear-gradient(to right, $primary-text, $primary-text);
    }
  }

  & /deep/ .ant-menu-item-active {
    color: $primary-text;
  }

}

@media (max-width: 1024px) {
  .aside {
    display: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.5);

    &.show {
      display: flex;
      flex-direction: row-reverse;
      align-items: stretch;
    }
  }

  .game-filter {
    background: lighten($primary-background, 5%);

    flex-basis: 360px;
  }

  .filter-title {
    padding: 3em 2em 2.25em;
    border-bottom: solid 1px lighten($secondary-background, 5%);
  }

  .filter-menu {

    & /deep/ .ant-menu-submenu-title {
      padding-left: 2em !important;
    }

    & /deep/ .ant-menu-item {
      padding-left: 2em !important;
    }

  }

}

@media (min-width: 1024px) {

  .game-list-container {
    padding: 0;
    margin-right: 1em;
  }

  .filter-link {
    display: none;
  }

  .aside {
    display: block;
    flex-basis: 245px;
  }

  .game-filter {
    padding: 0 1em;
  }

  .filter-title {
    padding: 1.2em 0;
    border-bottom: solid 1px lighten($secondary-background, 5%);
  }

}

</style>
