<template>
  <div
    class="searcher"
    @click="$refs.searchInput.focus()"
  >
    <a-input
      ref="searchInput"
      v-model="searchText"
      placeholder="搜索"
      class="search-input"
    >
      <a-icon
        slot="prefix"
        type="search"
        class="search-icon"
      />
    </a-input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Searcher extends Vue {
  searchText = ''
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

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

@media (max-width: 768px) {
  .searcher {
    width: 3.8em;
    height: 2.8em;
  }
  .search-input {
    position: absolute;
    width: 3.8em;

    &:focus-within {
      left: 0;
      width: 100%;
    }
  }
}

</style>
