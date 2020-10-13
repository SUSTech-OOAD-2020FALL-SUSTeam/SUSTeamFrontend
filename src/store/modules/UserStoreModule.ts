import { Module, VuexModule, Mutation, getModule, Action } from 'vuex-module-decorators'
import store from '@/store'
import { UserRole } from '@/typings/User'
import { token } from '@/api/User'
import { getToken, setToken } from '@/utils/Auth'

@Module({ name: 'user-module', dynamic: true, store })
export default class UserStoreModule extends VuexModule {
  public user: UserRole | null = null

  @Mutation
  setUser (user: UserRole | null) {
    this.user = user
  }

  @Action
  async update () {
    const storeToken = getToken()
    if (storeToken === undefined) {
      this.setUser(null)
      return
    }
    try {
      const user = await token()
      this.setUser(user)
    } catch (error) {
      setToken(undefined)
    }
  }
}

export const UserStore = getModule(UserStoreModule)
