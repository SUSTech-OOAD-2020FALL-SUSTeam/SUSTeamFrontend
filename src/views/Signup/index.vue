<template>
  <div class="app signup-page">
    <main class="main dark">
      <div class="signup-box">
        <div class="logo">
          <img
            class="logo-image"
            src="@/assets/logo.png"
            alt=""
          >
        </div>
        <div class="signup-hint">
          注册
        </div>
        <a-form-model
          :model="form"
          class="signup-form"
          @submit="handleSubmit"
          @submit.native.prevent
        >
          <a-form-model-item class="form-item">
            <a-input
              v-model="form.username"
              placeholder="用户名"
              class="text-input"
            />
          </a-form-model-item>
          <a-form-model-item class="form-item">
            <a-input
              v-model="form.mail"
              placeholder="电子邮件地址"
              class="text-input"
            />
          </a-form-model-item>
          <a-form-model-item class="form-item">
            <a-input
              v-model="form.password"
              type="password"
              placeholder="密码"
              class="text-input"
            />
          </a-form-model-item>
          <a-form-model-item class="form-item">
            <a-button
              type="primary"
              html-type="submit"
              :disabled="form.username === ''|| form.mail === '' || form.password === ''"
              class="submit-button"
            >
              注册
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <div class="privacy-policy">
          <router-link
            to="/privacypolicy"
            class="link"
          >
            隐私政策
          </router-link>
        </div>
        <div class="login">
          已有 SUSTeam 账户？
          <router-link
            :to="`/login?redirect=${redirect}`"
            class="link"
          >
            登录
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { login, signup } from '@/api/User'
import { setToken } from '@/utils/Auth'
import { UserStore } from '@/store/modules/UserStoreModule'

@Component
export default class Signup extends Vue {
  form: { username: string; password: string; mail: string } = { username: '', password: '', mail: '' }

  get redirect () {
    return this.$route.query.redirect as string || '/'
  }

  async handleSubmit () {
    try {
      await signup(this.form.username, this.form.password, this.form.mail)
      const token = await login(this.form.username, this.form.password)
      setToken(token)
      await UserStore.update()
      await this.$router.push(this.redirect)
    } catch (error) {
      console.log(error)
      if (typeof error === 'string') {
        this.$message.error(error)
      } else {
        this.$message.error('signup error')
      }
    }
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-box {
  width: 32em;
  padding: 3em 4em 4em;
  background: darken($secondary-background, 20%);
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.logo-image {
  max-height: 3.6em;
}

.signup-hint {
  font-size: 0.875em;
  font-weight: 500;
  margin-bottom: 0.6rem;
}

.signup-form {
  margin-bottom: 2.5em;
}

.form-item {
  margin-bottom: 1em;
}

.text-input {
  color: $primary-text;
  height: 3.5em;
  background: $secondary-background;
  border-color: transparent;

  &::placeholder {
    color: $tertiary-text;
  }

  &:hover, &:focus {
    border-color: transparent;
    background: lighten($secondary-background, 5%);
    box-shadow: none;
  }
}

.submit-button {
  color: $primary-text;
  width: 100%;
  height: 3.5em;
  margin-top: 1em;
  border-color: transparent;

  &[disabled], &[disabled]:hover {
    color: $tertiary-text;
    background: darken($secondary-background, 40%);
    border-color: transparent;
    cursor: auto;
  }
}

.privacy-policy {
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
}

.login {
  color: $tertiary-text;
  display: flex;
  justify-content: center;
}

.link {
  color: $primary-text;
}

</style>
