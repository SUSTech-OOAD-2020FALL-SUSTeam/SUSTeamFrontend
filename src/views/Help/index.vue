<template>
  <main class="home">
    <div class="page-container help-container">
      <vue-markdown
        class="announcement-content"
        :source="help"
      />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import VueMarkdown from 'vue-markdown'

@Component({ components: { VueMarkdown } })
export default class Help extends Vue {
  help = `
# 用户帮助

## 账户

您可以通过注册页面注册 SUSTeam 账户，通过登录页面登录

## 游戏

花费 SUSTeam 余额购买游戏，当然，SUTeam 也能为您提供免费游戏

## 评论

您可以对游戏发布评论、进行打分，玩家评分及评分会反应在游戏详情页面上

若想与其他玩家进步与交流，您也可以对其他玩家的评论进行支持或反对，让更多的人了解您的想法

## 个人主页

点击导航栏中您的用户名可以访问个人主页，您可以为自己添加头像，编辑个人介绍，让更多玩家了解

## 客户端

访问导航栏右端的客户端按钮，您可以获取 SUSTeam 客户端，客户端可以为您提供包含下载、更新在内的更多的功能

## 库

客户端中的库页面，包含所有您拥有的游戏

您可以在该页面中选择游戏的某个分支，并进行下载，下载完成后点击“开始”按钮即可进行游戏

若游戏发布了更新，您也可以在该页面更新游戏

SUSTeam 客户端会向游戏提供您的账户、好友等信息，也可以享受 SUSTeam 提供的云存档、成就、排行榜等功能

# 开发者帮助

## 成为开发者

向 SUSTeam 的管理员提交申请，您可以成为为 SUSTeam 提供游戏的开发者

成为开发者后，您可以通过导航栏进入开发者面板，进行进一步操作

## 发布游戏

您可以点击开发者面板的游戏管理页面，发布您的游戏，只需要提供几项游戏基本信息，您就能成功创建游戏

发布游戏后，您会进入游戏编辑页面，在此页面您可以进行各项管理

## SDK Key

游戏编辑页面顶部是一个 SDK key，您的游戏中可以使用此 key，验证游戏信息，获取 SUSTeam SDK 提供的各种服务

**注意：请妥善保管您的 SDK key，避免泄露影响游戏管理**

## 版本管理

游戏编辑页面的版本管理可以创建游戏的版本

当您创建版本时，您可以为版本选择一个分支，玩家可以下载某个分支最新版本的游戏

您可以为不同的平台发布不同的分支，也可以为预先体验内容单独创建分支

## 折扣

折扣管理可以创建游戏的折扣，您可以设定折扣起止时间、折扣金额

## 媒体

多媒体面板可以上传游戏的宣传多媒体

其中封面图片和缩略图片将会显示在最显眼的位置，有特定的大小限制

## 公告

公告功能可以让您发布公告，您可以通过此功能发布版本更新说明、创作计划等

## 标签

为游戏设定合适的标签，可以方便其他玩家更容易地检索到您的游戏

`
}
</script>
<style scoped lang="scss">

@import "@/style/global.scss";

@import "@/style/page.scss";

.help-container {
  padding-top: 3em;
  padding-bottom: 3em;
}

</style>
