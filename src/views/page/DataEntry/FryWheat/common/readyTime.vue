<template>
  <div>
    <el-card class="box-card" style="margin-bottom: 20px">
      <div class="clearfix" style="margin-bottom: 20px">
        <h3 style="font-size: 14px;">准备工时 (单位:min)</h3>
        <el-button type="text" class="readyshiftBtn" name="ready">收起<i class="el-icon-caret-top"></i></el-button>
      </div>
      <div class="readyBox" style="overflow: hidden">
        <el-form :inline="true" :model="readyTimeDate" ref="timesForm" size="small" label-width="125px">
          <el-row>
            <el-form-item label="班次：">
              <el-select v-model="readyTimeDate.classes" placeholder="请选择" :disabled="!isRedact">
                <el-option label="单班" value="单班"></el-option>
                <el-option label="多班" value="多班"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="交接班（白班）：">
              <el-input v-model="readyTimeDate.dayShift" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="班前会：">
              <el-input v-model="readyTimeDate.dayPeeting" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="生产前准备：">
              <el-input v-model="readyTimeDate.dayPrepared" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="生产后清场：">
              <el-input v-model="readyTimeDate.dayClear" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="交接班（中班）：">
              <el-input v-model="readyTimeDate.midShift" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="班前会：">
              <el-input v-model="readyTimeDate.midPeeting" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="生产前准备：">
              <el-input v-model="readyTimeDate.midPrepared" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="生产后清场：">
              <el-input v-model="readyTimeDate.midClear" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="交接班（夜班）：">
              <el-input v-model="readyTimeDate.nightShift" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="班前会：">
              <el-input v-model="readyTimeDate.nightPeeting" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="生产前准备：">
              <el-input v-model="readyTimeDate.nightPrepared" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
            <el-form-item label="生产后清场：">
              <el-input v-model="readyTimeDate.nightClear" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="clearfix" style="margin-bottom: 20px">
        <h3 style="font-size: 14px;">机器工时 (单位:min)</h3>
        <el-button type="text" class="readyshiftBtn" name="machine">收起<i class="el-icon-caret-top"></i></el-button>
      </div>
      <div class="machineBox" style="overflow: hidden">
        <el-row :gutter="10">
          <el-col :span="8" style="margin-bottom: 15px">
            <el-card class="box-card">
              <div class="clearfix machinediv">
                <img src="@/assets/img/machineicon.png" alt="">
                <div style="margin-left: 15px">
                  <p class="machineTit">1#炒麦机</p>
                  <p class="machineTxt">这台酱油炒麦机是2018年在日本进口的。</p>
                </div>
              </div>
              <el-row>
                <el-col :span="8"><el-button class="machineBtn" @click="machineStartOrEnd(true, '1#炒麦机')" :disabled="!isRedact">开始</el-button></el-col>
                <el-col :span="8"><el-button class="machineBtn" @click="machineStartOrEnd(false, '1#炒麦机')" :disabled="!isRedact">结束</el-button></el-col>
                <el-col :span="8"><el-button class="machineBtn" @click="machineTest('1#炒麦机')" :disabled="!isRedact">检测</el-button></el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" style="margin-bottom: 15px">
            <el-card class="box-card">
              <div class="clearfix machinediv">
                <img src="@/assets/img/machineicon.png" alt="">
                <div style="margin-left: 15px">
                  <p class="machineTit">2#炒麦机</p>
                  <p class="machineTxt">这台酱油炒麦机是2018年在日本进口的。</p>
                </div>
              </div>
              <el-row>
                <el-col :span="8"><el-button class="machineBtn" @click="machineStartOrEnd(true, '2#炒麦机')" :disabled="!isRedact">开始</el-button></el-col>
                <el-col :span="8"><el-button class="machineBtn" @click="machineStartOrEnd(false, '2#炒麦机')" :disabled="!isRedact">结束</el-button></el-col>
                <el-col :span="8"><el-button class="machineBtn" :disabled="!isRedact">检测</el-button></el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <el-table :data="machineTimeData" header-row-class-name="tableHead" border tooltip-effect="dark">
          <el-table-column label="日期" width="120" prop="riqi"></el-table-column>
          <el-table-column label="炒麦机" width="120" prop="machine"></el-table-column>
          <el-table-column label="开始时间" prop="startDate"></el-table-column>
          <el-table-column label="开始人" width="140" prop="opener"></el-table-column>
          <el-table-column label="结束时间" prop="endDate"></el-table-column>
          <el-table-column label="结束人" width="140" prop="endMan"></el-table-column>
        </el-table>
      </div>
    </el-card>
    <audit-log></audit-log>
    <machine-time v-if="visible" ref="machinetime" @changeMachineTime="changeMachineTime"></machine-time>
    <machine-test v-if="visible1" ref="machinetest"></machine-test>
  </div>
</template>

<script>
import { Readyanimation } from '@/net/validate'
import MachineTime from './machineTime'
import MachineTest from './machineTest'
export default {
  name: 'readyTime',
  data () {
    return {
      visible: false,
      visible1: false,
      readyTimeDate: {},
      machineTimeData: []
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
    Readyanimation(this.$)
  },
  methods: {
    // 开始结束按钮
    machineStartOrEnd (st, me) {
      let tmp = st
      this.machineTimeData.forEach((item, index) => {
        if (item.machine === me && item.startDate && !item.endDate) {
          if (st) {
            tmp = false
            this.$message.error('请结束后开始')
          } else {
            tmp = true
          }
        }
      })
      if (tmp) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs.machinetime.init(me, st)
        })
      } else if (!st && !tmp) {
        this.$message.error('请开始后结束')
      }
    },
    machineTest (str) {
      this.visible1 = true
      this.$nextTick(() => {
        this.$refs.machinetest.init(str)
      })
    },
    // 更新机器工时
    changeMachineTime (date) {
      this.visible = false
      if (date.endDate) {
        this.machineTimeData.forEach((item, index) => {
          if (item.machine === date.machine && !item.endDate) {
            item.endDate = date.endDate
            item.endMan = date.changer
          }
        })
      } else if (date.startDate) {
        this.machineTimeData.push({
          machine: date.machine,
          startDate: date.startDate,
          opener: date.changer,
          endDate: '',
          endMan: ''
        })
      }
    }
  },
  computed: {},
  components: {
    MachineTime,
    MachineTest,
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style lang="scss">
.readyBox{
  input{
    width: 184px;
  }
}
.readyshiftBtn{
  padding: 0;
  float: right;
}
.machineBox{
  .box-card{
    padding: 0;
    .el-card__body{
      padding: 0;
    }
  }
  .machinediv{
    display: flex;
    padding: 20px;
    img{
      width: 48px;
      height: 48px;
    }
    .machineTit{
      font-weight: bold;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .machineTxt{
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px
    }
  }
  .machineBtn{
    width: 100%;
    height: 40px;
  }
}

</style>
