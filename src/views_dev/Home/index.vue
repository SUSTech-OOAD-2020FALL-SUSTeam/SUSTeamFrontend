<template>
  <div class="dev-home">
    <a-breadcrumb class="breadcrumb">
      <a-breadcrumb-item>Home</a-breadcrumb-item>
    </a-breadcrumb>
    <div class="content-card main-card">
      Developer Panel
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class DevHome extends Vue {

}

</script>

<style scoped lang="scss">

@import "@/style/dev_panel.scss";

.main-card {
  min-height: 300px;
}

</style>
