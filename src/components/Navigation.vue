<template>
  <header
    class="nav-wrapper"
    :class="mediaSize"
  >
    <div class="nav">
      <div class="logo">
        <router-link
          class="logo-image-wrapper"
          to="/"
        >
          <img
            class="logo-image"
            src="@/assets/logo.png"
            alt=""
          >
        </router-link>
      </div>
      <div
        class="nav-bar"
        :class="{'show-menu': showMenu}"
      >
        <div class="left-nav">
          <router-link
            to="/"
            class="link"
          >
            商城
          </router-link>
          <router-link
            v-if="user && user.roles.includes('developer')"
            to="/dev"
            class="link"
          >
            开发者
          </router-link>
          <router-link
            to="/help"
            class="link"
          >
            帮助
          </router-link>
        </div>
        <div class="right-nav">
          <router-link
            v-if="user === null"
            :to="`/login?redirect=${$route.path}`"
            class="button login-button"
          >
            <a-icon type="user" />
            登录
          </router-link>
          <template v-else>
            <a-dropdown
              v-if="mediaSize !== 'small'"
              class="button user-info-button"
            >
              <a>
                <a-icon type="user" />
                <span class="username">
                  {{ user.username }}
                </span>
              </a>
              <a-menu slot="overlay">
                <a-menu-item key="0">
                  <router-link
                    :to="`/account/personal`"
                    class="user-link"
                  >
                    账户
                  </router-link>
                </a-menu-item>
                <a-menu-item key="1">
                  <a
                    class="user-link"
                    @click="logout"
                  >登出</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <div
              v-else
              class="button user-info-line"
            >
              <a class="username-box">
                <a-icon type="user" />
                <span class="username">
                  {{ user.username }}
                </span>
              </a>
              <router-link
                :to="`/account/personal`"
                class="user-link"
              >
                账户
              </router-link>
              <a
                class="user-link"
                @click="logout"
              >登出</a>
            </div>
          </template>
          <a class="button primary">
            获取客户端
          </a>
        </div>
      </div>
      <div
        v-if="mediaSize==='small'"
        class="menu-button"
      >
        <a
          class="button"
          :class="{'primary': !showMenu}"
          @click="showMenu = !showMenu"
        >
          <a-icon
            v-show="showMenu"
            type="close"
          />
          <a-icon
            v-show="!showMenu"
            type="menu"
          />
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import router from '@/router'
import { Store } from '@/store/modules/StoreModule'
import { UserStore } from '@/store/modules/UserStoreModule'
import { clearToken } from '@/utils/Auth'

@Component
export default class Navigation extends Vue {
  showMenu = false

  get mediaSize () {
    const width = Store.windowWidth

    if (width < 768) {
      return 'small'
    } else if (width < 1200) {
      return 'middle'
    } else {
      return 'large'
    }
  }

  get user () {
    return UserStore.user
  }

  async logout () {
    clearToken()
    await UserStore.update()
    this.$message.success('Logout success!')
    await router.push('/')
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

$height: 52px;

.nav-wrapper {
  height: $height;
}

.logo {
  text-align: center;
  font-size: 0.875rem;
}

.nav {
  position: fixed;
  width: 100%;
  height: $height;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  color: $secondary-text;
  background-color: $secondary-background;
  font-size: 0.75rem;
}

.logo-image-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-image {
  width: 3.0em;
}

.link {
  color: $secondary-text;
  font-weight: 400;

  &.router-link-exact-active, &:hover {
    color: $primary-text;
  }
}

.button {
  display: block;
  text-align: center;
  color: $secondary-text;

  &:hover {
    color: $primary-text;
  }
}

.button.primary {
  background: $primary-color;

  &:hover {
    background: lighten($primary-color, 5%);
  }
}

.username {
  display: inline-block;
  max-width: 10em;
  overflow: hidden;
}

.login-button > i {
  font-size: 1.25em;
  padding: 0 0.75em;
}

.user-info-line {
  display: flex;

  .username-box {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > * {
    display: inline-block;
    box-sizing: border-box;
    flex: 1;
    color: $secondary-text;
    border-right: solid 1px rgba(255,255,255,0.1);
  }
}

.large {
  .logo {
    width: 5em;
  }

  .link {
    padding: 0 1.25em;
  }

  .button {
    padding: 0 2.5em;
  }
}

.middle {
  .logo {
    width: 4.5em;
  }

  .link {
    padding: 0 1em;
  }

  .button {
    padding: 0 2em;
  }
}

.small {
  .logo {
    width: 4.5em;
  }
}

.large, .middle {

  .nav-bar {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }

  .left-nav, .right-nav {
    height: 100%;
    display: flex;
    align-items: stretch;
  }

  .link, .button {
    display: flex;
    align-items: center;
    position: relative;
  }

  .link::after {
    position: absolute;
    content: " ";
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all .3s;
    border-bottom: solid 0 $primary-color;
  }

  .link.router-link-exact-active::after, .link:hover::after {
    border-bottom-width: 5px;
  }

}

.small {
  .menu-button {
    z-index: 150;
    width: 52px;
    font-size: 2.5em;
    transition: all .2s;
    & > .button {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .nav-bar {
    z-index: 100;
    position: fixed;
    width: 90vw;
    height: 100vh;
    right: -90vw;
    padding-top: 52px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: stretch;

    font-size: 0.875rem;
    overflow: hidden;
    background-color: $secondary-background;
    transition: right .2s;

    &.show-menu {
      right: 0;
    }
  }

  .left-nav, .right-nav {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .left-nav {
    .link {
      padding: .5em 2em;
      line-height: 2em;
      border-bottom: solid 1px lighten($secondary-background, 5%);
    }
  }

  .right-nav {
    box-shadow: 0 0 5px 5px darken($secondary-background, 25%);

    .button {
      height: 3.5rem;
      line-height: 3.5rem;
    }
  }

}

</style>
