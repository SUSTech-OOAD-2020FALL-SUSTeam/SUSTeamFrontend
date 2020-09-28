<template>
  <footer>
    <div class="copyright">
      © 2020, SUSteam, Org. 版权所有
    </div>
    <div class="legal">
      <router-link to="/termsofservice">
        服务条款
      </router-link>
      <router-link to="/privacypolicy">
        隐私政策
      </router-link>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class PageFooter extends Vue {
}

</script>

<style scoped lang="scss">

footer {
  color: #e7e7e7;
  background-color: #202020;
  padding: 1em 1.5em;
}

.copyright {
  font-size: 0.75rem;
  padding: 1.5em 0;
}

.legal {
  padding: 1.5em 0;
  font-size: 0.75rem;

  a {
    margin-right: 1.5em;
    color: white;
    transition: color .2s;

    &:hover {
      color: #0078f2
    }
  }
}

@media (min-width: 1024px) {
  footer {
    padding: 1.25em 5em 2.5em;
  }
}

</style>
