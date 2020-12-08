<template>
  <div class="app">
    <Navigation />
    <router-view class="main" />
    <PageFooter />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Navigation from '@/components/Navigation.vue'
import PageFooter from '@/components/PageFooter.vue'

import DetailedProfile from '@/views/Personal/pages/DetailedProfile.vue'
import ModifyProfile from '@/views/Personal/pages/ModifyProfile.vue'

@Component({ components: { Navigation, DetailedProfile, ModifyProfile, PageFooter } })
export default class PersonalProfile extends Vue {
}
</script>

<style scoped lang="scss">
  .app {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .main {
    flex: 1;
  }
</style>
