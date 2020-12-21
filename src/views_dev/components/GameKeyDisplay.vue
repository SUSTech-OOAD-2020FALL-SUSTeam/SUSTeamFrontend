<template>
  <div>
    <a-popover placement="bottom">
      <template slot="content">
        <p>SDK 密钥作为权限验证的重要部分，请务必妥善保管！</p>
      </template>
      <div class="key-display">
        SDK 密钥: {{ gameKey }}
        <a-button
          shape="circle"
          icon="copy"
        />
      </div>
    </a-popover>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { getGameKey } from '@/api/Developer'

@Component
export default class GameKeyDisplay extends Vue {
  gameKey = 'game key'
  get gameId () {
    return parseInt(this.$route.params.gameId)
  }

  async mounted () {
    this.gameKey = await getGameKey(this.gameId)
  }
}

</script>

<style scoped>
.key-display {
  text-align: center;
}
</style>
