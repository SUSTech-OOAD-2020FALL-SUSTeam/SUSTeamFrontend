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
          {{ percentage + '%' }}
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

import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'
import { Discount } from '@/typings/Discount'

@Component
export default class DiscountEdit extends Vue {
  @Prop()
  discounts!: Array<Discount>

  newDiscount: Discount = {
    gameId: 1,
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

  addDiscount () {
    this.discounts.push({ ...this.newDiscount })
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
