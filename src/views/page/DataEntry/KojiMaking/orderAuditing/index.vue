<template>
  <el-col>
    <div class="main">
      <el-card class="searchCard newCard" style="margin:0">
        <el-row type="flex">
          <el-col :span="21">
            <el-form :inline="true" size="small" label-width="85px">
              <el-form-item label="生产车间：">
                <p class="input_bommom"></p>
              </el-form-item>
              <el-form-item label="曲房号：">
                <p class="input_bommom"></p>
              </el-form-item>
              <el-form-item label="生产订单：">
                <p class="input_bommom"></p>
              </el-form-item>
              <el-form-item label="生产品项：">
                <p class="input_bommom"></p>
              </el-form-item>
              <el-form-item label="生产日期：">
                <p class="input_bommom"></p>
              </el-form-item>
              <el-form-item label="入罐号：">
                <p class="input_bommom"></p>
              </el-form-item>
              <el-form-item label="连续蒸煮号：">
                <p class="input_bommom"></p>
              </el-form-item>
              <el-form-item label="提交人员：">
                <p class="input_bommom"></p>
              </el-form-item>
              <el-form-item label="提交时间：">
                <p class="input_bommom"></p>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3" >
            <div style="float:right;line-height:31px;font-size:14px">
              <div style="float:left">
                <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
              </div>
              <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未提交' : orderStatus }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:right" class="buttonCss">
          <template style="float:right;margin-left:10px;">
            <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-KojiMaking-orderManage-index'})">返回</el-button>
            <el-button type="primary" size="small" @click="submitForm" v-if="isAuth('sys:whtInStorage:submit')">提交</el-button>
          </template>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top:0px">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color:white;margin-bottom:8px;position:relative;border-radius:5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-tabs v-model="activeName" id="DaatTtabs" class="NewDaatTtabs" type="border-card" style="border-radius:15px;overflow:hidden">
          <el-tab-pane name="1">
            <span slot="label" class="spanview">
              <el-tooltip class="item" effect="dark" :content="readyState === 'noPass'? '不通过':readyState === 'saved'? '已保存':readyState === 'submit' ? '已提交' : readyState === 'checked'? '通过':'未提交'" placement="top-start">
                <el-button :style="{'color': readyState === 'noPass'? 'red' : ''}">报工工时</el-button>
              </el-tooltip>
            </span>
            <el-row>
              <el-table header-row-class-name="tableHead" :data="workHourList"  border tooltip-effect="dark" >
                <el-table-column type="index" width="55" label="序号"></el-table-column>
                <el-table-column label="工序" width="100">
                  <template slot-scope="scope">
                    {{scope.row.process}}
                  </template>
                </el-table-column>
                <el-table-column label="曲房" width="100">
                  <template slot-scope="scope">
                    {{scope.row.kojimakingRoom}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="准备工时"
                  width="80">
                  <template slot-scope="scope">
                    {{scope.row.prepareTime}}
                  </template>
                </el-table-column>
                <el-table-column width="60" label="单位">
                  <template slot-scope="scope">
                    {{scope.row.prepareTimeUnit}}
                  </template>
                </el-table-column>
                <el-table-column width="140" label="人工工时">
                  <template slot-scope="scope">
                    <el-input size="small" type="number" v-model.number="scope.row.manualTime"  placeholder="手工录入" :disabled="scope.row.disabled" ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="60">
                  <template slot-scope="scope">
                    <span>{{scope.row.manualTimeUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="机器工时" width="140">
                  <template slot-scope="scope">
                    <el-input size="small" type="number" v-model.number="scope.row.machineTime"  placeholder="手工录入" :disabled="scope.row.disabled"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="60">
                  <template slot-scope="scope">
                    <span>{{scope.row.machineTimeUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="备注" width="140">
                  <template slot-scope="scope">
                    {{scope.row.remark}}
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="145">
                  <template slot-scope="scope">
                    <el-button style='float:left' type="primary" size="small" @click="enbaleEdit(scope.row)">编辑</el-button>
                    <el-button style='float:right' type="primary" size="small">退回</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-col :span="24">
                <auditLog :tableData="workHourAuditList"></auditLog>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label" class="spanview">
              <el-tooltip class="item" effect="dark" :content="inStorageState === 'noPass'? '不通过':inStorageState === 'saved'? '已保存':inStorageState === 'submit' ? '已提交' : inStorageState === 'checked'? '通过':'未提交'" placement="top-start">
                <el-button :style="{'color': inStorageState === 'noPass'? 'red' : ''}">生产入库</el-button>
              </el-tooltip>
            </span>
            <el-row>
              <el-table header-row-class-name="tableHead" :data="inStockList"  border tooltip-effect="dark" >
                <el-table-column type="index" width="55" label="序号"></el-table-column>
                <el-table-column label="曲房" width="100">
                  <template slot-scope="scope">
                    {{scope.row.kojimakingRoom}}
                  </template>
                </el-table-column>
                <el-table-column label="豆粕量(KG)" width="100">
                  <template slot-scope="scope">
                    {{scope.row.beanNumber}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="麦粉量(KG)"
                  width="100">
                  <template slot-scope="scope">
                    {{scope.row.wheatNumber}}
                  </template>
                </el-table-column>
                <el-table-column width="80" label="盐水量">
                  <template slot-scope="scope">
                    {{scope.row.saltNumber}}
                  </template>
                </el-table-column>
                <el-table-column width="120" label="入库物料">
                  <template slot-scope="scope">
                    {{scope.row.inStockMaterial}}
                  </template>
                </el-table-column>
                <el-table-column label="入库量" width="80">
                  <template slot-scope="scope">
                    <span>{{scope.row.inStockNumber}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="入库批次" width="140">
                  <template slot-scope="scope">
                    <span>{{scope.row.inStockBatch}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="60">
                  <template slot-scope="scope">
                    <span>{{scope.row.unit}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作人" width="100">
                  <template slot-scope="scope">
                    {{scope.row.changer}}
                  </template>
                </el-table-column>
                <el-table-column label="操作时间" width="200">
                  <template slot-scope="scope">
                    {{scope.row.changeTime}}
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button style='float:right' type="primary" size="small">退回</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-col :span="24">
                <auditLog :tableData="inStockAuditList"></auditLog>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label" class="spanview">
              <el-tooltip class="item" effect="dark"  :content="applyMaterielState === 'noPass'? '不通过':applyMaterielState === 'saved'? '已保存':applyMaterielState === 'submit' ? '已提交' : applyMaterielState === 'checked'? '通过':'未提交'" placement="top-start">
                <el-button :style="{'color': applyMaterielState === 'noPass'? 'red' : ''}">物料领用</el-button>
              </el-tooltip>
            </span>
            <el-row>
              <el-table header-row-class-name="tableHead" :data="applyMaterieList"  border tooltip-effect="dark" >
                <el-table-column type="index" width="55" label="序号"></el-table-column>
                <el-table-column label="曲房" width="100">
                  <template slot-scope="scope">
                    {{scope.row.kojimakingRoom}}
                  </template>
                </el-table-column>
                <el-table-column label="物料" width="100">
                  <template slot-scope="scope">
                    {{scope.row.material}}
                  </template>
                </el-table-column>
                <el-table-column
                  label="领用容器"
                  width="100">
                  <template slot-scope="scope">
                    {{scope.row.container}}
                  </template>
                </el-table-column>
                <el-table-column width="160" label="批次">
                  <template slot-scope="scope">
                    {{scope.row.materialBatch}}
                  </template>
                </el-table-column>
                <el-table-column width="120" label="数量">
                  <template slot-scope="scope">
                    {{scope.row.materialNumber}}
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="60">
                  <template slot-scope="scope">
                    <span>{{scope.row.unit}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作人" width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.changer}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作时间" width="300">
                  <template slot-scope="scope">
                    <span>{{scope.row.changeTime}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button style='float:right' type="primary" size="small">退回</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-col :span="24">
                <auditLog :tableData="applyMaterieAuditList"></auditLog>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label" class="spanview">
              <el-button>文本记录</el-button>
            </span>
            <text-record ref="textrecord" isRedact="true" ></text-record>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-col>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import FormHeader from '@/views/components/formHeader.vue'
import TextRecord from '@/views/components/textRecord.vue'
import AuditLog from '@/views/components/AuditLog.vue'
import {WorkHour, InStock, Material} from '../entity/WorkHour.ts'
@Component({
  components: {
    FormHeader,
    TextRecord,
    AuditLog
  }
})
export default class Index extends Vue {
  orderStatus = ''
  orderNo = ''
  workHourList: WorkHour[] = []
  workHourAuditList = []
  inStockList: InStock[] = []
  inStockAuditList = []
  applyMaterieList: Material[] = []
  applyMaterieAuditList = []
  activeName = '1'
  // 报工工时状态
  readyState = ''
  // 生产入库状态
  inStorageState = ''
  // 物料申请状态
  applyMaterielState = ''
  mounted () {
    this.getOrderList()
  }
  getOrderList () {
    this.getWorkHourList()
    this.getInStockList()
    this.getMaterialList()
  }
  getWorkHourList () {
    for (let i = 0; i < 5; i++) {
      this.workHourList.push(new WorkHour())
    }
  }
  getInStockList () {
    for (let i = 0; i < 5; i++) {
      this.inStockList.push(new InStock())
    }
  }
  getMaterialList () {
    for (let i = 0; i < 5; i++) {
      this.applyMaterieList.push(new Material())
    }
  }
  enbaleEdit (row) {
    row.disabled = false
  }
  submitForm () {
    this.$confirm('确认提交该订单, 是否继续?', '提交订单', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // TODO
    })
  }
  // 报工工时
  setReadyStatus (status) {
    this.readyState = status
  }
  // 入库状态
  setInStorageState (status) {
    this.inStorageState = status
  }
  // 物料状态
  setApplyMaterielState (status) {
    this.applyMaterielState = status
  }
}
</script>
<style lang="scss">
</style>
