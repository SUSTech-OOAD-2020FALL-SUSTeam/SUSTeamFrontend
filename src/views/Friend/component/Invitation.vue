<template>
  <div>
    <a-space>
      <a-avatar
        shape="square"
        :src="avatar"
      />
      {{ username }}
      <a-button
        shape="circle"
        icon="check"
        style="background-color: lightgreen;"
      />
      <a-button
        type="danger"
        shape="circle"
        icon="close"
      />
    </a-space>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import ProfileCard from '@/components/ProfileCard.vue'

@Component({
  components: { ProfileCard }
})
export default class Invitation extends Vue {
  @Prop({ default: '/default_avatar.jpg' })
  avatar!: string

  @Prop({ default: 'username' })
  username!: string
}

</script>

<style scoped>

</style>
