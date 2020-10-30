<template>
  <nav class="breadcrumb">
    <router-link
      class="link breadcrumb-item"
      :class="items[0].flex ? 'flex1' : 'flex0'"
      :to="items[0].url"
    >
      <a-icon
        v-if="items[0].icon"
        :type="items[0].icon"
      />
      {{ items[0].content }}
    </router-link>

    <template
      v-for="(item,index) in items.slice(1)"
    >
      <span
        :key="`item-${index}-split`"
        class="split"
      >|</span>

      <router-link
        v-if="item.url"
        :key="`item-${index}`"
        class="link breadcrumb-item"
        :class="item.flex ? 'flex1' : 'flex0'"
        :to="item.url"
      >
        <a-icon
          v-if="item.icon"
          :type="item.icon"
        />
        {{ item.content }}
      </router-link>
      <span
        v-else
        :key="`item-${index}`"
        class="breadcrumb-item"
        :class="item.flex ? 'flex1' : 'flex0'"
      >
        <a-icon
          v-if="item.icon"
          :type="item.icon"
        />
        {{ item.content }}
      </span>
    </template>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

export interface BreadcrumbItem{
  url?: string;
  content: string;
  icon?: string;
  flex?: number;
}

@Component
export default class Breadcrumb extends Vue {
  @Prop()
  items!: BreadcrumbItem[]
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

.breadcrumb {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.breadcrumb-item, .split {
  margin-right: 1.25em;
}

.link {
  color: $tertiary-text;
  font-weight: 400;

  &.router-link-exact-active, &:hover {
    color: $primary-text;
  }
}

.split {
  color: $tertiary-text;
}

.flex0 {
  flex-shrink: 0;
}

.flex1 {
  flex-shrink: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>
