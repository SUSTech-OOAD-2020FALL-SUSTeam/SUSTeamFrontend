<template>
  <main class="game-page dark page-container">
    <div class="title">
      我的好友
    </div>
    <div>
      <a-row
        v-for="(friend, index) in friendUser"
        :key="`game-${index}`"
        type="flex"
        justify="center"
        class="profile-card-wrapper"
      >
        <div
          class="profile-card-wrapper"
        >
          <ProfileCard
            :user="friend"
            :last-seen="friendList[index].lastSeen"
            :online="friendList[index].online"
          />
        </div>
      </a-row>
    </div>
  </main>
</template>

<script lang="ts">

import { Component, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import ProfileCard from '@/components/ProfileCard.vue'
import { friends, getUser } from '@/api/Friend'
import { Friend } from '@/typings/Friend'
import { EMPTY_USER, User, userRoleToUser } from '@/typings/User'

@Component({
  components: { ProfileCard }
})
export default class FriendPage extends Vue {
  friendList: Array<Friend> = []
  friendUser: Array<User> = []

  async mounted () {
    this.friendList = await friends()
    console.log(this.friendList)
  }

  @Watch('friendList')
  updateFriendUser () {
    const tempUser = Array(this.friendList.length).fill(EMPTY_USER)
    for (const [index, friend] of this.friendList.entries()) {
      getUser(friend.username).then(user => {
        tempUser[index] = user
        this.friendUser = Array.from(tempUser)
      })
    }
  }
}
</script>

<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.profile-card-wrapper {
  padding-bottom: 1em;
}

.title {
  font-size: 1.25em;
  margin-bottom: 0.75em;
}

.page-container > * {
  margin-bottom: 3.6em;
  margin-top: 3.6em;
}

</style>
