<template>
  <main class="game-page dark page-container">
    <div class="title">
      <a-row
        type="flex"
        justify="space-between"
      >
        我的好友
        <div>
          <a-space>
            <a-popover
              placement="bottom"
            >
              <template slot="content">
                <div
                  v-for="user in invitationUserList"
                  :key="user"
                  style="padding-bottom: 1em;"
                >
                  <Invitation :user="user" />
                </div>
              </template>
              <a-space>
                <a-icon type="inbox" />
                <div style="font-size: 0.5em">
                  申请列表
                </div>
              </a-space>
            </a-popover>
            <a-divider type="vertical" />
            <a-popover
              placement="bottom"
            >
              <template slot="content">
                <a-space>
                  <a-input
                    v-model="inviteTarget"
                    placeholder="用户名"
                  />
                  <a-button
                    type="link"
                    @click="doAddFriend"
                  >
                    添加
                  </a-button>
                </a-space>
              </template>
              <a-space>
                <a-icon type="plus" />
                <div style="font-size: 0.5em">
                  添加好友
                </div>
              </a-space>
            </a-popover>
          </a-space>
        </div>
      </a-row>
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
import FriendReply from '@/views/Friend/component/Invitation.vue'
import { addFriend, friends, getInvitations, getUser } from '@/api/Friend'
import { Friend } from '@/typings/Friend'
import { EMPTY_USER, User } from '@/typings/User'

@Component({
  components: { Invitation: FriendReply, ProfileCard }
})
export default class FriendPage extends Vue {
  friendList: Array<Friend> = []
  friendUser: Array<User> = []
  invitationUserList: Array<User> = []
  inviteTarget = ''

  async mounted () {
    this.friendList = await friends()
    await this.updateInvitationList()
  }

  async updateInvitationList () {
    const invitationList = await getInvitations()
    const tempUserList = Array(invitationList.length).fill(EMPTY_USER)
    for (const [index, invitation] of invitationList.entries()) {
      getUser(invitation.from).then(user => {
        tempUserList[index] = user
        this.invitationUserList = Array.from(tempUserList)
      })
    }
  }

  doAddFriend () {
    addFriend(this.inviteTarget).then(() => {
      this.$message.success('好友请求已发送')
      this.inviteTarget = ''
    })
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
