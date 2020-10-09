<template>
  <div class="app login-page">
    <main class="main dark">
      <div class="login-box">
        <div class="logo">
          <img
            class="logo-image"
            src="@/assets/logo.png"
            alt=""
          >
        </div>
        <div class="login-hint">
          用 SUSTeam 账户登录
        </div>
        <a-form-model
          :model="form"
          class="login-form"
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
              v-model="form.password"
              type="password"
              placeholder="密码"
              class="text-input"
            />
          </a-form-model-item>
          <a-form-model-item class="form-item">
            <div class="helper">
              <router-link
                to="forgetpassword"
                class="link"
              >
                忘记密码
              </router-link>
            </div>
          </a-form-model-item>
          <a-form-model-item class="form-item">
            <a-button
              type="primary"
              html-type="submit"
              :disabled="form.username === '' || form.password === ''"
              class="submit-button"
            >
              现在登录
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
        <div class="signup">
          没有 SUSTeam 账户？
          <router-link
            :to="`/signup?redirect=${redirect}`"
            class="link"
          >
            注册
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { login } from '@/api/User'
import { setToken } from '@/utils/Auth'
import { UserStore } from '@/store/modules/UserStoreModule'

@Component
export default class Login extends Vue {
  form: {username: string;password: string} = { username: '', password: '' }

  get redirect () {
    return this.$route.query.redirect as string || '/'
  }

  handleSubmit () {
    login(this.form.username, this.form.password)
      .then(token => {
        setToken(token)
        return UserStore.update()
      })
      .then(() => {
        this.$router.push(this.redirect)
      })
      .catch(error => {
        console.log(error)
        if (typeof error === 'string') {
          this.$message.error(error)
        } else {
          this.$message.error('login error')
        }
      })
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

.login-box {
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

.login-hint {
  font-size: 0.875em;
  font-weight: 500;
  margin-bottom: 0.6rem;
}

.login-form {
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

.helper{
  display: flex;
  justify-content: flex-end;
  line-height: normal;
  .link {
    color: $tertiary-text;
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

.signup {
  color: $tertiary-text;
  display: flex;
  justify-content: center;
}

.link {
  color: $primary-text;
}

</style>
