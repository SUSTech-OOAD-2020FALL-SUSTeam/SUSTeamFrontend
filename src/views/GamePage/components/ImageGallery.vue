<template>
  <div class="gallery">
    <div class="image-box">
      <div class="image-box-holder">
        <div
          class="image-container"
          :style="{width: `${images.length * 100}%`, left: `${-selectIndex * 100}%`}"
        >
          <div
            v-for="(url, index) in images"
            :key="`image-${index}`"
            class="image-wrapper"
            :style="{width: `calc(1 / ${images.length} * 100%)`}"
          >
            <img
              :src="url"
              class="gallery-image"
              :alt="url"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="control-box">
      <div class="control-arrow">
        <div
          class="control-icon"
          @click="selectIndex = (selectIndex + images.length - 1) % images.length"
        >
          <a-icon type="left" />
        </div>
        <div
          class="control-icon"
          @click="selectIndex = (selectIndex + images.length + 1) % images.length"
        >
          <a-icon type="right" />
        </div>
      </div>
      <div class="control-pagination">
        <div
          v-for="index in images.keys()"
          :key="index"
          class="pagination-icon"
          :class="{active: selectIndex === index}"
          @click="selectIndex = index"
        >
          <span class="dot-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class ImageGallery extends Vue {
  selectIndex = 0

  @Prop()
  images!: Array<string>
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

.gallery {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.image-box {}

.image-box-holder {
  position: relative;
  height: 0;
  padding-bottom: calc(9 / 16 * 100%);
  overflow: hidden;
  background: darken($secondary-background, 30%)
}

.image-container {
  position: absolute;
  display: flex;
  height: 100%;
  align-items: stretch;
  transition: all .4s;
}

.image-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gallery-image {
  max-width: 100%;
  max-height: 100%;
}

.control-box {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: darken($secondary-background, 30%);
  transition: all .2s;

  &:hover {
    background: lighten($secondary-background, 15%);
  }
}

.control-arrow {
  display: flex;
}

.control-pagination {
  display: flex;
}

.control-icon, .pagination-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  cursor: pointer;
}

.control-icon {
  width: 3em;
  height: 3em;
  transition: all .2s;

  &:hover {
    background: lighten($secondary-background, 30%);
  }
}

.pagination-icon {
  width: 2em;
  height: 2em;
}

.pagination-icon.active .dot-icon {
  background: $primary-text;
}

.dot-icon {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: $tertiary-text;
}

</style>
