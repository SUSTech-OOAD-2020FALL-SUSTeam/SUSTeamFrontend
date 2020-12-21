<template>
  <div>
    <div>
      <a-table
        :columns="columns"
        :data-source="discounts"
      >
        <span
          slot="percentage"
          slot-scope="percentage"
        >
          {{ percentage * 100 + '%' }}
        </span>
        <span
          slot="date"
          slot-scope="date"
        >
          {{ date.toString() }}
        </span>
      </a-table>
    </div>
    <div>
      <a-space>
        新增折扣：
        <a-input-number
          v-model="newDiscount.percentage"
          :min="0"
          :max="100"
          :formatter="value => `${value}%`"
          :parser="value => value.replace('%', '')"
        />
        生效时间：
        <a-range-picker @change="selectDiscountRange" />
        <a-button
          type="primary"
          @click="addDiscount"
        >
          添加
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">

import { Component } from 'vue-property-decorator'
import Vue from 'vue'
import { Discount } from '@/typings/Discount'
import { discounts, addDiscount } from '@/api/Developer'

@Component
export default class DiscountEdit extends Vue {
  discounts: Array<Discount> = []

  newDiscount: Discount = {
    gameId: this.gameId,
    percentage: 10,
    startTime: new Date(),
    endTime: new Date()
  }

  columns = [
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      scopedSlots: { customRender: 'percentage' }

    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      scopedSlots: { customRender: 'date' }
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      scopedSlots: { customRender: 'date' }
    }
  ]

  async mounted () {
    this.discounts = await this.loadDiscounts()
  }

  private async loadDiscounts () {
    return await discounts(this.gameId)
  }

  get gameId () {
    return parseInt(this.$route.params.gameId)
  }

  async addDiscount () {
    const uploadedDiscount = { ...this.newDiscount }
    uploadedDiscount.percentage /= 100
    await addDiscount(uploadedDiscount)
    this.discounts = await this.loadDiscounts()
  }

  selectDiscountRange (date: [moment.Moment, moment.Moment], dateString: [string, string]) {
    this.newDiscount.startTime = new Date(dateString[0])
    this.newDiscount.endTime = new Date(dateString[1])
    console.log(this.newDiscount)
  }
}
</script>

<style scoped>

</style>
