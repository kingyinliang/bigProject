<template>
<div>
  <div class="clearfix">
    <el-button type="primary" @click="AddInDate(InDate)" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ===''))" style="float: right">新增</el-button>
  </div>
  <div v-if="order.properties && order.properties !== '二合一&礼盒产线'">
  <el-table ref="table1" header-row-class-name="tableHead" :data="InDate" :row-class-name="RowDelFlag" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px" v-if="order.properties && order.properties !== '二合一&礼盒产线'">
    <el-table-column type="index" width="55" label="序号"></el-table-column>
    <el-table-column label="白/中/夜班" width="120">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-select v-model="scope.row.classType" placeholder="请选择" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" size="small">
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="生产批次" width="150">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" maxlength="10"></el-input>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="人工码垛-包材库" width="140">
      <template slot-scope="scope">
        <el-input v-model="scope.row.manPacking" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60">
      <template slot-scope="scope">
        <span>{{ scope.row.manPackingUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="自动码垛-包材库" width="140" v-if="order.workShopName === '包装三车间'">
      <template slot-scope="scope">
        <el-input v-model="scope.row.aiPacking" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60" v-if="order.workShopName === '包装三车间'">
      <template slot-scope="scope">
        <span>{{scope.row.aiPackingUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="人工码垛-立体库" width="140">
      <template slot-scope="scope">
        <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60">
      <template slot-scope="scope">
        <span>{{scope.row.manSolidUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="自动码垛-立体库" width="120" v-if="order.workShopName === '包装三车间'">
      <template slot-scope="scope">
        <el-input v-model="scope.row.aiSolid" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60" v-if="order.workShopName === '包装三车间'">
      <template slot-scope="scope">
        <span>{{scope.row.aiSolidUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="自动上架-立体库" width="140" v-if="order.workShopName !== '包装三车间'">
      <template slot-scope="scope">
        <el-input type="number" min="0" v-model="scope.row.aiShelves" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60" v-if="order.workShopName !== '包装三车间'">
      <template slot-scope="scope">
        <span>{{scope.row.aiShelvesUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="不良品" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60">
      <template slot-scope="scope">
        <span>{{scope.row.badUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="样品" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60">
      <template slot-scope="scope">
        <span>{{scope.row.sampleUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="产出数" width="120">
      <template slot-scope="scope">
        <span  v-if="order.workShopName === '包装三车间'">sss{{ scope.row.output = (scope.row.manPacking*1 + scope.row.aiPacking*1 + scope.row.manSolid*1*(ratio.ratio*1) + scope.row.aiSolid*1*(ratio.ratio*1) + scope.row.sample*1) }}</span>
        <span v-else>111{{scope.row.ratio}}{{ scope.row.output = (scope.row.manPacking*1 + scope.row.manSolid*1*(ratio.ratio*1) + scope.row.aiShelves*1*(ratio.ratio*1) + scope.row.sample*1) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60">
      <template slot-scope="scope">
        <span>{{scope.row.outputUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="备注" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="60">
      <template slot-scope="scope">
        <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" @click="dellistbomS(scope.row, delFlagnum.innum)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div v-if="order.properties && order.properties === '二合一&礼盒产线'">
  <el-table ref="table1" header-row-class-name="tableHead" :data="InDate" :row-class-name="RowDelFlag" border tooltip-effect="dark" style="width: 100%;margin-bottom: 20px" v-if="order.properties && order.properties === '二合一&礼盒产线'">
    <el-table-column type="index" width="55" label="序号"></el-table-column>
    <el-table-column label="白/中/夜班" width="120">
      <template slot-scope="scope">
        <div class="required">
          <i class="reqI">*</i>
          <el-select v-model="scope.row.classType" placeholder="请选择" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" size="small">
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
          </el-select>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="生产批次" width="150">
      <template slot-scope="scope">
        <el-input v-model="scope.row.batch" maxlength="10" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
        <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" v-else disabled></el-input>
      </template>
    </el-table-column>
    <el-table-column label="人工码垛-立体库" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60">
      <template slot-scope="scope">
        <span>{{order.workShopName === '组装车间2（礼盒）'? (scope.row.manSolidUnitName = ratio.basicUnitName):(ratio.productUnitName? scope.row.manSolidUnitName = ratio.productUnitName : scope.row.manSolidUnitName = ratio.basicUnitName)}}</span>
      </template>
    </el-table-column>
    <el-table-column label="不良品" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="120">
      <template slot-scope="scope">
        <span>{{scope.row.badUnitName = ratio.basicUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="样品" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位" width="60">
      <template slot-scope="scope">
        <span>{{scope.row.sampleUnitName = ratio.basicUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="产出数" width="120">
      <template slot-scope="scope">{{ order.workShopName === '组装车间2（礼盒）'?(scope.row.output = (scope.row.manSolid*1 + scope.row.sample*1)):(scope.row.output = (scope.row.manSolid*1*(ratio.ratio*1) + scope.row.sample*1)) }}</template>
    </el-table-column>
    <el-table-column label="单位" width="60">
      <template slot-scope="scope">
        <span>{{scope.row.outputUnitName = ratio.basicUnitName}}</span>
      </template>
    </el-table-column>
    <el-table-column label="主产品批次" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.mainBatch" maxlength="10" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="赠品批次" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.attachBatch" maxlength="10" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="备注" width="120">
      <template slot-scope="scope">
        <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="60">
      <template slot-scope="scope">
        <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!(isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" @click="dellistbomS(scope.row, delFlagnum.innum)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <div><p style="line-height: 52px;font-size: 14px">产出数合计：{{countOutputNum}}</p></div>
  <div class="clearfix" v-if="order.properties !== '二合一&礼盒产线' && order.workShopName !== '包装三车间'">
    <span style="font-size: 14px;font-weight: 700;line-height: 40px;">机维组数量确认</span>
    <el-button type="primary" size="small" @click="GetMaintain()" style="float: right">刷新</el-button>
  </div>
  <el-table
    v-if="order.properties !== '二合一&礼盒产线' && order.workShopName !== '包装三车间'"
    ref="table1"
    header-row-class-name="tableHead"
    :data="InVlist"
    border
    tooltip-effect="dark"
    style="width: 100%;margin-bottom: 20px">
    <el-table-column
      type="index"
      width="55"
      label="序号">
    </el-table-column>
    <el-table-column
      prop="orderNo"
      label="生产订单号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="batch"
      label="生产批次"
      width="120">
    </el-table-column>
    <el-table-column
      prop="aiShelves"
      label="自动上架数-立体库"
      width="120">
    </el-table-column>
    <el-table-column
      prop="aiShelvesUnitName"
      label="单位"
      width="60">
    </el-table-column>
    <el-table-column
      prop="jwzAcount"
      label="机维组确认数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="differentUnitName"
      label="单位"
      width="60">
    </el-table-column>
    <el-table-column
      prop="orgnDifferent"
      label="原差异数量"
      width="120">
    </el-table-column>
    <el-table-column
      prop="differentUnitName"
      label="单位"
      width="60">
    </el-table-column>
    <el-table-column
      prop="differentInfo"
      label="差异说明"
      width="120">
    </el-table-column>
    <el-table-column
      prop="jwzMan"
      label="机维组确认人">
    </el-table-column>
  </el-table>
  <auditLog :tableData="InAudit"></auditLog>
</div>
</template>

<script>
import {PACKAGING_API, SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'inStorage',
  data () {
    return {
      Instatus: '',
      productShift: [],
      InDate: [],
      InVlist: [],
      InAudit: []
    }
  },
  props: {
    isRedact: {},
    order: {},
    ratio: {}
  },
  mounted () {
    this.GetProductShift()
    let that = this
    setTimeout(() => {
      console.log(that.InDate)
    }, 10000)
  },
  methods: {
    // 修改生产入库
    UpdateIn (id, str, resolve) {
      if (this.InDate.length > 0) {
        let types = ''
        if (this.order.properties === '二合一&礼盒产线') {
          types = 'twoAndOne'
        } else if (this.order.workShopName === '包装三车间') {
          types = 'isPkgThree'
        }
        this.InDate.forEach((item) => {
          item.orderId = id
          if (item.status) {
            if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
          } else {
            item.status = str
          }
          item.isPkgThree = types
          if (this.order.properties === '二合一&礼盒产线') {
            this.ratio.productUnit ? item.manSolidUnit = this.ratio.productUnit : item.manSolidUnit = this.ratio.basicUnit
            item.badUnit = this.ratio.basicUnit
            item.sampleUnit = this.ratio.basicUnit
            item.outputUnit = this.ratio.basicUnit
          }
        })
        this.$http(`${PACKAGING_API.PKGINUPDATE_API}`, 'POST', this.InDate).then(({data}) => {
          if (data.code === 0) {
          } else {
            this.$message.error('生产入库' + data.msg)
          }
          if (resolve) {
            resolve('resolve')
          }
        })
      } else {
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 入库提交
    submitIn (resolve) {
      this.$http(`${PACKAGING_API.PKGSAVEFORMIN_API}`, 'POST', this.InDate).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      })
    },
    // 入库校验
    inrul () {
      let ty = true
      this.instatus = 0
      let obj = {}
      this.InDate.forEach((item) => {
        if (item.delFlag !== '1') {
          item.aiShelves = item.aiShelves + ''
          if (!item.output) {
            ty = false
            this.$message.error('生产入库产出数不能为空或0')
            return false
          }
          if (!item.classType) {
            ty = false
            this.$message.error('生产入库班次不能为空')
            return false
          }
          if (item.batch) {
            if (item.batch.length !== 10) {
              ty = false
              this.$message.error('生产入库请录入10位批次号')
              return false
            }
          } else {
            ty = false
            this.$message.error('生产入库批次项未填')
            return false
          }
          if (item.aiShelves !== '' && item.aiShelves !== '0') {
            this.instatus = 1
            if (obj[item.batch]) {
              obj[item.batch] = obj[item.batch] * 1 + item.aiShelves * 1
            } else {
              obj[item.batch] = item.aiShelves * 1
            }
          }
        }
      })
      let that = this
      Object.keys(obj).forEach(function (key) {
        let tmp = true
        that.InVlist.forEach((item) => {
          if (item.batch === key && item.aiShelves === obj[key]) {
            tmp = false
          }
        })
        if (tmp) {
          ty = false
          that.$message.error('机维组未确认，请保存后等待机维组确认后提交')
          return false
        }
      })
      return ty
    },
    // 获取生产班次
    GetProductShift () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=product_shift`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.productShift = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间生产入库列表
    Getpkgin (order) {
      this.$http(`${PACKAGING_API.PKGINLIST_API}`, 'POST', {
        orderId: order.orderId,
        isPkgThree: order.properties === '二合一&礼盒产线' ? 'twoAndOne' : order.workShopName === '包装三车间' ? 'isPkgThree' : ''
      }).then(({data}) => {
        if (data.code === 0) {
          this.InDate = data.plist
          this.InVlist = data.vlist
          this.InAudit = data.vrlist
          if (this.InDate.length === 0) {
            this.AddInDate(this.InDate)
          }
          if (order.orderStatus !== '已同步') {
            if (order.orderStatus === 'checked') {
              this.Instatus = 'checked'
            } else if (order.orderStatus === 'submit') {
              this.Instatus = 'submit'
            } else if (order.orderStatus === 'saved') {
              this.Instatus = 'saved'
            }
          }
          let sub = 0
          let che = 0
          let no = 0
          let sav = 0
          this.InDate.forEach((item) => {
            if (item.status === 'noPass') {
              no = no + 1
            } else if (item.status === 'submit') {
              sub = sub + 1
            } else if (item.status === 'checked') {
              che = che + 1
            } else if (item.status === 'saved') {
              sav = sav + 1
            }
          })
          if (no > 0) {
            this.Instatus = 'noPass'
          } else if (sub > 0) {
            this.Instatus = 'submit'
          } else if (sav > 0) {
            this.Instatus = 'saved'
          } else if (che > 0) {
            this.Instatus = 'checked'
          }
          console.log(this.Instatus)
          this.$emit('GetinstorageState', this.Instatus)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 机维组刷新
    GetMaintain () {
      this.$http(`${PACKAGING_API.PKGINLIST_API}`, 'POST', {
        orderId: this.order.orderId,
        isPkgThree: this.order.properties === '二合一&礼盒产线' ? 'twoAndOne' : this.order.workShopName === '包装三车间' ? 'isPkgThree' : ''
      }).then(({data}) => {
        if (data.code === 0) {
          this.InVlist = data.vlist
          this.$message.success('刷新成功')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增入库
    AddInDate (form) {
      form.push({
        status: '',
        isPkgThree: '',
        orderId: '',
        classType: '',
        batch: '',
        manPacking: '',
        manPackingUnit: 'BOT',
        manPackingUnitName: '瓶',
        aiPacking: '',
        aiPackingUnit: 'BOT',
        aiPackingUnitName: '瓶',
        aiShelves: '',
        aiShelvesUnit: 'CAR',
        aiShelvesUnitName: '箱',
        aiSolid: '',
        aiSolidUnit: 'CAR',
        aiSolidUnitName: '箱',
        manSolid: '',
        manSolidUnit: 'CAR',
        manSolidUnitName: '箱',
        bad: '',
        badUnit: 'BOT',
        badUnitName: '瓶',
        sample: 0,
        sampleUnit: 'BOT',
        sampleUnitName: '瓶',
        output: '',
        outputUnit: 'BOT',
        outputUnitName: '瓶',
        mainBatch: '',
        attachBatch: '',
        delFlag: '0'
      })
    },
    // 删除半成品
    dellistbomS (row) {
      row.delFlag = '1'
    },
    //  RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    }
  },
  computed: {
    countOutputNum: function () {
      let num = 0
      this.InDate.forEach((item) => {
        num = num + (item.delFlag === '0' ? item.output : 0)
      })
      return num
    }
  },
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
