<template>
  <div class="no-found">
    <div class="main">
      404 Not Found
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class DevNoFound extends Vue {

}

</script>

<style scoped lang="scss">

.main {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5em;
  font-weight: 600;
}

</style>
