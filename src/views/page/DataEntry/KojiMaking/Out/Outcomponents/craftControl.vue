<template>
  <div>
    <el-row class="clearfix" style="margin-bottom: 10px">
      <el-button type="primary" @click="SavedCraftControl('submit')" size="small" :disabled="!isRedact" style="float: right">提交</el-button>
      <el-button type="primary" @click="SavedCraftControl('saved')" size="small" :disabled="!isRedact" style="float: right;margin-right: 20px">保存</el-button>
    </el-row>
    <el-form :inline="true" :model="CraftControlDate" size="small" label-width="82px" class="topform">
      <el-form-item label="出曲开始时间：" label-width="125px">
        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="CraftControlDate.outStartTime" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" style="width: 184px"></el-date-picker>
      </el-form-item>
      <el-form-item label="出曲结束时间：" label-width="125px">
        <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="CraftControlDate.outEndTime" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" style="width: 184px"></el-date-picker>
      </el-form-item>
      <el-form-item label="制曲时间：" label-width="125px">
        <p style="min-width: 184px">{{CraftControlDate.kojoMakingTime = kojoMakingTime}}</p>
      </el-form-item>
      <el-form-item label="盐水用量：" label-width="125px">
        <p style="min-width: 184px">{{CraftControlDate.saltWaterUsed}}</p>
      </el-form-item>
      <el-form-item label="盐水温度：" label-width="125px">
        <el-input v-model="CraftControlDate.saltWaterTemp" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入"></el-input>
      </el-form-item>
      <el-form-item label="盐水浓度：" label-width="125px">
        <el-input v-model="CraftControlDate.saltWaterNd" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入"></el-input>
      </el-form-item>
      <el-row>
      <el-form-item label="出曲品温：" label-width="125px" class="techitem">
        <el-input v-model="CraftControlDate.outTempOne" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.outTempTwo" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.outTempThree" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.outTempFour" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.outTempFive" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="混合料温度：" label-width="125px" class="techitem">
        <el-input v-model="CraftControlDate.blendTempOne" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.blendTempTwo" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.blendTempThree" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.blendTempFour" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.blendTempFive" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="风速（R/min）：" label-width="125px" class="techitem">
        <el-input v-model="CraftControlDate.windSpeedOne" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.windSpeedTwo" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.windSpeedThree" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.windSpeedFour" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
        <el-input v-model="CraftControlDate.windSpeedFive" :disabled="!(isRedact && CraftControlDate.status !== 'submit')" size="small" placeholder="手工录入" style="width: 149px;margin-right: 17px"></el-input>
      </el-form-item>
      </el-row>
      <el-row>
      <el-form-item label="操作人：" label-width="120px">
        <el-select v-model="CraftControlDate.operator" filterable placeholder="请选择" :disabled="!(isRedact && CraftControlDate.status !== 'submit')"  size="small">
          <el-option :label="item.realName + '（' + ((item.workNum !== null && item.workNum !== '') ? item.workNum : item.workNumTemp) + '）'" v-for="(item, index) in userlist" :key="index" :value="item.realName + '（' + ((item.workNum !== null && item.workNum !== '') ? item.workNum : item.workNumTemp) + '）'"></el-option>
        </el-select>
      </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {SYSTEMSETUP_API, KJM_API} from '@/api/api'
import { toDate } from '@/net/validate'
export default {
  name: 'craftControl',
  data () {
    return {
      CraftControlDate: {
        saltWaterUsed: 0
      },
      userlist: []
    }
  },
  props: {
    isRedact: {},
    formHeader: {}
  },
  mounted () {
  },
  methods: {
    GetsaltWaterUsed (num) {
      this.CraftControlDate.saltWaterUsed = num
      this.$forceUpdate()
    },
    // 获取工艺数据
    GetTechList (formHeader) {
      this.$http(`${KJM_API.OUTTECHLIST_API}`, 'POST', {
        orderHouseId: formHeader.id
      }).then(({data}) => {
        if (data.code === 0) {
          this.CraftControlDate = data.list[0] ? data.list[0] : {}
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    //  工艺保存
    SavedCraftControl (str) {
      if (str === 'submit') {
        if (!this.TechRul()) {
          return false
        }
      }
      if (this.CraftControlDate.status) {
        if (this.CraftControlDate.status === 'saved') { this.CraftControlDate.status = str } else if (this.CraftControlDate.status === 'noPass' && str === 'submit') { this.CraftControlDate.status = str }
      } else {
        this.CraftControlDate.status = str
      }
      this.CraftControlDate.orderHouseId = this.formHeader.id
      this.$http(`${KJM_API.OUTTECHSAVE_API}`, 'POST', [this.CraftControlDate]).then(({data}) => {
        if (data.code === 0) {
          if (str === 'saved') {
            this.$message.success('保存成功')
          } else if (str === 'submit') {
            this.$message.success('提交成功')
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    TechRul () {
      let ty = true
      let windSpeed = this.CraftControlDate.windSpeedOne || this.CraftControlDate.windSpeedTwo || this.CraftControlDate.windSpeedThree || this.CraftControlDate.windSpeedFour || this.CraftControlDate.windSpeedFive
      let blendTemp = this.CraftControlDate.blendTempOne || this.CraftControlDate.blendTempTwo || this.CraftControlDate.blendTempThree || this.CraftControlDate.blendTempFour || this.CraftControlDate.blendTempFive
      let outTemp = this.CraftControlDate.outTempOne || this.CraftControlDate.outTempTwo || this.CraftControlDate.outTempThree || this.CraftControlDate.outTempFour || this.CraftControlDate.outTempFive
      if (windSpeed && blendTemp && outTemp && this.CraftControlDate.operator && this.CraftControlDate.outStartTime && this.CraftControlDate.outEndTime && this.CraftControlDate.kojoMakingTime !== 'NaN' && this.CraftControlDate.saltWaterTemp && this.CraftControlDate.saltWaterNd) {} else {
        ty = false
        this.$message.error('工艺控制必填项未填')
      }
      return ty
    },
    // 操作人下拉
    selectUser (prolineId) {
      this.$http(`${SYSTEMSETUP_API.USERLIST_API}`, 'POST', {
        deptId: prolineId,
        param: '',
        currPage: '1',
        pageSize: '1000'
      }).then(({data}) => {
        if (data.code === 0) {
          this.userlist = data.page.list
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  },
  computed: {
    kojoMakingTime: function () {
      let time = 0
      if (this.formHeader.inEndTime) {
        time = (toDate(this.CraftControlDate.outStartTime) - toDate(this.formHeader.inEndTime)) / 60000
      } else {
        time = 'NaN'
      }
      return time
    }
  },
  components: {}
}
</script>

<style lang="scss">
.techitem{
  .el-form-item__content{
    border-bottom: none!important;
  }
}
</style>
