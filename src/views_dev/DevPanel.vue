<template>
  <a-layout
    class="app"
  >
    <a-layout-sider
      v-model="collapsed"
      class="side"
      :trigger="null"
    >
      <div class="logo-container">
        <router-link
          class="logo-wrapper"
          to="/dev"
        >
          <img
            class="logo-image"
            src="@/assets/logo.png"
            alt=""
          >
          <div class="site-name">
            SUSTeam
          </div>
        </router-link>
      </div>
      <a-menu
        theme="dark"
        :selected-keys="[path]"
        mode="inline"
        @select="onSelect"
      >
        <a-menu-item key="/dev/games">
          <a-icon type="desktop" />
          <span>游戏</span>
        </a-menu-item>
        <a-menu-item key="/">
          <a-icon type="logout" />
          <span>退出</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content class="content-area">
        <router-view class="content-component" />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        © 2020, SUSteam, Org. 版权所有
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class DevPanel extends Vue {
  collapsed = false

  get path () {
    return this.$route.path
  }

  onSelect (key: {key: string}) {
    this.$router.push(key.key)
  }
}

</script>

<style scoped lang="scss">

.app {
  width: 100%;
  min-height: 100vh;
}

.logo-container {
  margin: 16px;

  .logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-image {
    width: 2.25em;
    margin-right: 0.3em;
  }

  .site-name {
    display: inline-block;
    font-size: 1.6em;
    font-weight: 600;
    color: #fff;
  }
}

.side.ant-layout-sider-collapsed{
  .site-name {
    overflow: hidden;
    width: 0;
  }
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.content-area {
  display: flex;
  flex-direction: column;
}

.content-component {
  flex: auto;
}

</style>
