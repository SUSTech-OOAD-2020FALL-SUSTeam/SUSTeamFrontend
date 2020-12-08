<template>
  <main class="home dark">
    <PageNavigation
      :items="[
        {content: '账户信息', icon:'left', url:'/account/personal'},
        {content: '编辑'}
      ]"
      :show-searcher="false"
    />
    <div class="page-container">
      modify
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import PageNavigation from '@/components/PageNavigation/index.vue'

// function getBase64 (img, callback) {
//   const reader = new FileReader()
//   reader.addEventListener('load', () => callback(reader.result))
//   reader.readAsDataURL(img)
// }

@Component({ components: { PageNavigation } })
export default class ModifyProfile extends Vue {

}
</script>

<style scoped lang="scss">
  @import "@/style/global.scss";

  @import "@/style/page.scss";

  .page-container > * {
    margin-bottom: 3.6em;
    margin-top: 3.6em;
  }

</style>
