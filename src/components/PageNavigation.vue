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
    <div class="searcher">
      <a-input
        v-model="searchText"
        placeholder="搜索"
      >
        <a-icon
          slot="prefix"
          type="search"
          class="search-icon"
        />
      </a-input>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class PageNavigation extends Vue {
  searchText = ''
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

.page-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4em;
  padding: 0 1em;

}

nav > * {
  margin-right: 1.25em;
}

.link {
  color: $tertiary-text;
  font-weight: 400;

  &.router-link-exact-active, &:hover {
    color: $primary-text;
  }
}

.searcher /deep/ input.ant-input {
  color: white;
  background: darken($secondary-background, 15%);
  border-color: transparent;
  padding-left: 3em;
  height: 2.8em;

  &::placeholder {
    color: $tertiary-text;
  }

  &:hover {
    border-color: transparent;
  }

  &:focus {
    background: lighten($secondary-background, 5%);
    box-shadow: none;
  }
}

.searcher /deep/ .ant-input-prefix {
  left: calc((3em - 6px) / 2);
}

.search-icon {
  color: white;
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
