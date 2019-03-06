<template>
  <div>
    <el-row class="clearfix">
      <el-button type="primary" @click="SavedCraftControl(CraftControlDate)" size="small" :disabled="!isRedact" style="float: right">保存</el-button>
      <el-button type="primary" @click="SubmitCraftControl(CraftControlDate)" size="small" :disabled="!isRedact" style="float: right">提交</el-button>
    </el-row>
    <el-form :inline="true" :model="CraftControlDate" size="small" label-width="82px" class="topform">
      <el-form-item label="出曲开始时间：" label-width="120px">
        <el-input v-model="CraftControlDate.outStartTime" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
      </el-form-item>
      <el-form-item label="出曲结束时间：" label-width="120px">
        <el-input v-model="CraftControlDate.outEndTime" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
      </el-form-item>
      <el-form-item label="制曲时间：" label-width="120px">
        <el-input v-model="CraftControlDate.kojoMakingTime" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
      </el-form-item>
      <el-form-item label="出曲品温：" label-width="120px">
        <el-input v-model="CraftControlDate.outTempOne" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.outTempTwo" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.outTempThree" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.outTempFour" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.outTempFive" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="混合料温度：" label-width="120px">
        <el-input v-model="CraftControlDate.blendTempOne" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.blendTempTwo" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.blendTempThree" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.blendTempFour" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.blendTempFive" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="风速（R/min）：" label-width="125px">
        <el-input v-model="CraftControlDate.windSpeedOne" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.windSpeedTwo" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.windSpeedThree" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.windSpeedFour" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
        <el-input v-model="CraftControlDate.windSpeedFive" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="盐水用量：" label-width="120px">
        <el-input v-model="CraftControlDate.saltWaterUsed" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="盐水温度：" label-width="120px">
        <el-input v-model="CraftControlDate.saltWaterTemp" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="盐水浓度：" label-width="120px">
        <el-input v-model="CraftControlDate.saltWaterNd" :disabled="!isRedact" size="small" placeholder="手工录入" style="width: 80px"></el-input>
      </el-form-item>
      <el-form-item label="操作人：" label-width="120px">{{CraftControlDate.changed}}}</el-form-item>
    </el-form>
  </div>
</template>

<script>
import {KJM_API} from '@/api/api'
export default {
  name: 'craftControl',
  data () {
    return {
      CraftControlDate: {}
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
  },
  methods: {
    // 获取工艺数据
    GetTechList (formHeader) {
      this.$http(`${KJM_API.OUTTECHLIST_API}`, 'POST', {
        orderHouseId: formHeader.orderHouseId
      }).then(({data}) => {
        if (data.code === 0) {
          this.CraftControlDate = data.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    //  工艺保存
    SaveTech () {
      this.$http(`${KJM_API.OUTTECHLIST_API}`, 'POST', this.CraftControlDate).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
