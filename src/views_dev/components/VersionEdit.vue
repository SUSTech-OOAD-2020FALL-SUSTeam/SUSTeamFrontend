<template>
  <div>
    <div>
      <a-table
        :columns="columns"
        :data-source="versions"
        row-key="name"
      >
        <span
          slot="date"
          slot-scope="date"
        >
          {{ date.toLocaleString() }}
        </span>
      </a-table>
    </div>
    <div style="margin-top: 1em">
      <a-space direction="vertical">
        <span style="font-size: 1.2em; font-weight: 600;">发布版本：</span>
        <div>
          <span class="input-label">分支:</span>
          <a-input
            v-model="newVersion.branch"
            style="width: 10em"
          />
        </div>
        <div>
          <span class="input-label">名称:</span>
          <a-input
            v-model="newVersion.name"
            style="width: 10em"
          />
        </div>
        <div>
          <span class="input-label">上传游戏</span>
          <a-upload
            :before-upload="uploadGame"
            :show-upload-list="false"
          >
            <a-button>
              <a-icon type="upload" />
              Upload
            </a-button>
            <span v-show="newVersion.url">{{ newVersion.url }}</span>
          </a-upload>
        </div>
        <div>
          <span class="input-label">上传增量更新包（可选）</span>
          <a-upload
            :before-upload="uploadGameUpdatePackage"
            :show-upload-list="false"
          >
            <a-button>
              <a-icon type="upload" />
              Upload
            </a-button>
            <span v-show="newVersion.updateUrl">{{ newVersion.updateUrl }}</span>
          </a-upload>
        </div>
        <a-button
          type="primary"
          @click="createVersion"
        >
          创建
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { GameVersion } from '@/typings/GameVersion'
import { branches, upload, versions, createVersion } from '@/api/Version'

@Component
export default class VersionEdit extends Vue {
  versions: Array<GameVersion> = []

  newVersion: GameVersion = {
    gameId: this.gameId,
    branch: 'Main',
    name: '',
    url: '',
    updateUrl: '',
    uploadTime: new Date()
  }

  columns = [
    {
      title: 'Branch',
      dataIndex: 'branch'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      scopedSlots: { customRender: 'date' }
    },
    {
      title: 'Upload Time',
      dataIndex: 'uploadTime',
      scopedSlots: { customRender: 'date' }
    },
    {
      title: 'Download URL',
      dataIndex: 'url'
    },
    {
      title: 'Upgrade URL',
      dataIndex: 'updateUrl'
    }
  ]

  async mounted () {
    await this.loadVersions()
  }

  get gameId () {
    return parseInt(this.$route.params.gameId)
  }

  async loadVersions () {
    this.versions = []
    const branch = await branches(this.gameId)
    await Promise.all(
      branch.map(async it => {
        this.versions.push(...await versions(this.gameId, it))
      })
    )
  }

  async createVersion () {
    try {
      await createVersion(this.newVersion)
    } catch (error) {
      if (typeof error === 'string') {
        this.$message.error(error)
      } else {
        this.$message.error('update failed')
      }
      console.error(error)
    }
  }

  async uploadGame (file: File) {
    this.newVersion.url = await upload(this.gameId, file)
    return false
  }

  async uploadGameUpdatePackage (file: File) {
    this.newVersion.updateUrl = await upload(this.gameId, file)
    return false
  }
}
</script>

<style scoped lang="scss">

.input-label {
  display: inline-block;
  width: 15em;
}

</style>
