import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'

@Module({ name: 'store', dynamic: true, store })
export default class StoreModule extends VuexModule {
  public windowWidth = 0

  @Mutation
  setWindowWidth (windowWidth: number) {
    this.windowWidth = windowWidth
  }
}

export const Store = getModule(StoreModule)
