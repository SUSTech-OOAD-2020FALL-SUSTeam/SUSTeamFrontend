<template>
  <main class="purchase-page dark">
    <PageNavigation
      :items="[
        {content: '返回商城', icon:'left',url:'/'},
        {content: game.name, url:`/game/${gameId}`},
        {content: '购买'},
      ]"
    />
    <div class="purchase-container page-container">
      <div class="purchase-box">
        <div class="cover-container">
          <img
            :src="coverImage"
            :alt="game.name"
          >
        </div>
        <div class="purchase-content">
          <div class="purchase-area">
            <div class="purchase-title">
              {{ game.name }}
            </div>
          </div>
          <div class="purchase-area">
            <div class="purchase-price price-item">
              <span class="price-label">原价</span> ${{ game.price }}
            </div>
            <div class="purchase-discount price-item">
              <span class="price-label">折扣</span> $0
            </div>
            <div class="purchase-final-price price-item">
              <span class="price-label">最终价格</span> ${{ finalPrice }}
            </div>
          </div>

          <div class="purchase-area">
            <div class="purchase-balance price-item">
              <span class="price-label">当前余额</span> ${{ balance }}
            </div>
            <div class="purchase-remain-balance price-item">
              <span
                class="price-label"
              >剩余余额</span>
              <span :class="{'negative-balance': remainBalance < 0}">
                ${{ remainBalance }}
              </span>
            </div>
          </div>

          <div class="purchase-area">
            <a-button
              type="primary"
              class="purchase-button"
              @click="purchase"
            >
              提交订单
            </a-button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { EMPTY_GAME_DETAIL, GameDetail } from '@/typings/GameDetail'
import { gameDetail } from '@/api/Game'
import PageNavigation from '@/components/PageNavigation/index.vue'
import { EMPTY_GAME } from '@/typings/GameProfile'
import { UserStore } from '@/store/modules/UserStoreModule'
import { createOrder } from '@/api/Order'

@Component({ components: { PageNavigation } })
export default class AnnouncementPage extends Vue {
  game: GameDetail = EMPTY_GAME_DETAIL

  mounted () {
    const gameId = this.gameId
    if (gameId === undefined) {
      this.$message.error('Game not exist!')
      return
    }
    gameDetail(gameId)
      .then(it => {
        this.game = it
      })
      .catch(() => {
        this.$message.error('Game not exist!')
      })
    UserStore.update()
  }

  get gameId () {
    const id = parseInt(this.$route.params.gameId)
    return isNaN(id) ? undefined : id
  }

  get coverImage () {
    return this.game.images.find(it => it.type === 'F')?.url || EMPTY_GAME.imageFullSize
  }

  get cardImage () {
    return this.game.images.find(it => it.type === 'C')?.url || EMPTY_GAME.imageFullSize
  }

  get user () {
    return UserStore.user
  }

  get finalPrice () {
    return this.game.price
  }

  get balance () {
    const user = this.user
    if (user) {
      return user.balance
    } else {
      return 0
    }
  }

  get remainBalance () {
    return this.balance - this.finalPrice
  }

  async purchase () {
    const gameId = this.gameId
    if (!gameId) {
      this.$message.error('Game not exist')
      return
    }
    const user = this.user
    if (!user) {
      this.$message.error('Please login')
      return
    }

    try {
      const isSuccess: boolean = await createOrder(gameId, this.finalPrice)
      if (isSuccess) {
        await UserStore.update()
        this.$message.success('purchase success')
      } else {
        this.$message.error('purchase failed')
      }
    } catch (error) {
      if (typeof error === 'string') {
        this.$message.error(error)
      } else {
        this.$message.error('purchase error')
      }
    }
  }
}

</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.purchase-page {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.page-container {
  background: darken($secondary-background, 15%);
  flex: 1;
}

.purchase-box {
  display: flex;
  padding: 2em 0;
}

@media (max-width: 1024px) {
  .purchase-box {
    flex-direction: column;
    align-items: stretch;
  }
  .cover-container {
    align-self: center;
    max-width: 400px;

    & > img {
      max-width: 100%;
    }
  }
  .purchase-content {
    padding: 2em 2.5em 0;
  }
}

@media (min-width: 1024px) {
  .purchase-box {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .cover-container {
    width: 40%;

    & > img {
      max-width: 100%;
    }
  }
  .purchase-content {
    width: 40%;
    padding-left: 3em;
    box-sizing: border-box;
  }
}

.purchase-area {
  margin: 0 0 1rem;
}

.purchase-title {
  font-size: 2em;
}

.price-item {
  font-size: 1em;
  line-height: 2em;
}

.price-label {
  color: $tertiary-text;
  display: inline-block;
  width: 10em;
}

.purchase-final-price, .purchase-remain-balance {
  border-top: solid 1px lighten($secondary-background, 5%);
}

.purchase-button {
  width: 100%;
}

.negative-balance {
  color: #ff4d4f;
}

</style>
