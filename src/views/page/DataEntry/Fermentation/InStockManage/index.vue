<template>
  <div>
    <div class="header_main">
      <el-card class="searchCard">
        <el-row type="flex">
          <el-col>
            <el-form :model="params" size="small" :inline="true" label-position="right" label-width="70px" class="multi_row">
              <el-form-item label="生产工厂：">
                <el-select v-model="params.factoryId" class="selectwpx" style="width: 140px" @change="changeOptions('factory')">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in factoryList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产车间：" >
                <el-select v-model="params.workshopId" class="selectwpx" style="width: 140px" @change="changeOptions('workshop')">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in workshopList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="罐号：">
                <el-select v-model="params.holderList" class="selectwpx" style="width: 140px" filterable multiple @change="changeOptions('pot')">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in potList" :key="sole.holderId" :label="sole.holderName" :value="sole.holderId"></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="物料：" @change="changeOptions('material')">
                <el-select v-model="params.materialCode" class="selectwpx" style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in materialList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="订单日期：">
                <el-date-picker type="date" v-model="params.startDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
                - <el-date-picker type="date" v-model="params.endDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
              </el-form-item>
              <el-form-item label="订单号：" >
                <el-select v-model="params.orderList" class="selectwpx" style="width: 140px" filterable multiple allow-create @change="changeOptions('order')">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in orderDataList" :key="sole.orderNo" :label="sole.orderNo" :value="sole.orderNo"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态：" >
                <el-select v-model="params.status" class="selectwpx" style="width: 140px" @change="changeOptions('status')">
                  <el-option label="请选择" value=''></el-option>
                  <el-option label="未录入" value='未录入'></el-option>
                  <el-option label="已保存" value="saved"></el-option>
                  <el-option label="已提交" value="submit"></el-option>
                  <el-option label="审核不通过" value="noPass"></el-option>
                  <el-option label="已审核" value="checked"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单类型：">
                <el-select v-model="params.orderType" placeholder="请选择" style="width: 140px" @change="changeOptions('orderType')">
                  <el-option label="请选择"  value=""></el-option>
                  <el-option v-for="(item, index) in orderTypeList" :label="item.value"  :value="item.code" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row style="text-align:right;right: 8px;text-align: right;position: absolute;top: 49px;">
          <template style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" v-if="isAuth('fer:inStore:list')" @click="getOrderList()">查询</el-button>
            <el-button type="primary" class="button" size="small" v-if="isAuth('fer:inStore:mySaveOrUpdate') || isAuth('fer:inStore:submit')" @click="isEdit = !isEdit">{{isEdit?'取消':'编辑'}}</el-button>
          </template>
          <template v-if="isEdit" style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" v-if="isAuth('fer:inStore:mySaveOrUpdate')" @click="save()">保存</el-button>
            <el-button type="primary" size="small" v-if="isAuth('fer:inStore:submit')" @click="submit()">提交</el-button>
          </template>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-card>
          <el-row>
             <div style="line-height: 40px;" ><i style="font-size: 22px;float:left;" class="iconfont factory-shouqicaidan"></i><span style="font-size:16px;font-weight:bold;margin-left:12px;">入库列表</span></div>
          </el-row>
          <el-row>
            <el-table @selection-change="handleChange" @row-dblclick="showDetail" header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
              <el-table-column
                type="selection"
                :selectable="selectable"
                width="55">
              </el-table-column>
              <el-table-column type="index" label="序号" width="55"></el-table-column>
              <el-table-column label="状态" :show-overflow-tooltip="true" width="100">
                <template slot-scope="scope">
                  <label :style="{'color': scope.row.status === 'noPass'? 'red' : scope.row.status === 'checked'? '#7ED321' : '' }">{{scope.row.status === 'checked' ? '已审核' : scope.row.status == 'noPass' ? '审核不通过' : scope.row.status === 'submit' ? '已提交' : scope.row.status === 'saved' ? '已保存' : '未录入'}}</label>
                </template>
              </el-table-column>
              <el-table-column label="订单号" :show-overflow-tooltip="true" width="120">
                <template slot-scope="scope">
                  {{scope.row.orderNo}}
                </template>
              </el-table-column>
              <el-table-column label="容器" :show-overflow-tooltip="true" width="100">
                <template slot-scope="scope">
                  {{scope.row.holderName}}
                </template>
              </el-table-column>
              <el-table-column label="物料" :show-overflow-tooltip="true" width="120">
                <template slot-scope="scope">
                  {{scope.row.materialCode + ' ' + scope.row.materialName}}
                </template>
              </el-table-column>
              <el-table-column label="订单量" width="100">
                <template slot-scope="scope">
                  {{scope.row.orderAmount}}
                </template>
              </el-table-column>
              <el-table-column label="单位" width="60">
                <template slot-scope="scope">
                  {{scope.row.orderUnit}}
                </template>
              </el-table-column>
              <el-table-column label="入库数量" width="160">
                <template slot-scope="scope">
                  <div class="required">
                    <i class="reqI">*</i>
                    <el-input type="number"  v-model.number="scope.row.inAmount"  :disabled="!isEdit || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入" style="display:inline-block"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="单位" width="60">
                <template slot-scope="scope">
                  {{scope.row.inUnit}}
                </template>
              </el-table-column>
              <el-table-column label="批次" width="160">
                <template slot-scope="scope">
                  <div class="required">
                    <i class="reqI">*</i>
                    <el-input type="text"  v-model.trim="scope.row.batch"  :disabled="!isEdit || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="备注" width="180">
                <template slot-scope="scope">
                  <el-input type="text"  v-model.trim="scope.row.remark"  :disabled="!isEdit || scope.row.status === 'submit' || scope.row.status === 'checked'" size="small"  placeholder="手工录入"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="提交人员" width="140">
                <template slot-scope="scope">
                  {{scope.row.changer}}
                </template>
              </el-table-column>
              <el-table-column label="提交时间" width="160">
                <template slot-scope="scope">
                  {{scope.row.changed}}
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currPage"
              :page-sizes="[10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </el-row>
        </el-card>
      </div>
    </div>
    <div class="main" style="padding-top: 0px">
      <div class="tableCard">
        <el-card>
        <!-- <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div> -->
          <el-row>
            <el-col :span="24">
              <auditLog :tableData="readAudit"></auditLog>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {BASICDATA_API, FERMENTATION_API, SYSTEMSETUP_API} from '@/api/api'
import {Vue, Component, Watch} from 'vue-property-decorator'
import {headanimation} from '@/net/validate'
import AuditLog from '@/views/components/AuditLog.vue'
@Component({
  components: {
    AuditLog
  }
})

export default class Index extends Vue {
  // 将common中的参数复制一份到本地
  params = JSON.parse(JSON.stringify(this.$store.state.common.FerInStockManage))
  factoryList = []
  workshopList = []
  potList = []
  orderDataList = []
  orderTypeList = []
  materialList = []
  dataList = []
  selectedList = []
  currPage = 0
  pageSize = 10
  totalCount = 0
  readAudit = []
  searched: boolean = false
  isEdit: boolean = false
  mounted () {
    headanimation(Vue.prototype.$)
    // const now = dateFormat(new Date(), 'yyyy-MM-dd')
    // this.params.startDate = now
    // this.params.endDate = now
    this.getFactory()
    this.getWorkshop(this.params.factoryId)
    this.getFermentPot(this.params.factoryId, this.params.workshopId)
    this.getOrderDataList(this.params.factoryId, this.params.workshopId)
    if (this.params.factoryId) {
      this.getOrderList()
      this.getDictList(this.params.factoryId)
    }
  }
  isAuth (key) {
    return Vue.prototype.isAuth(key)
  }
  get mainTabs () {
    return this.$store.state.common.mainTabs
  }
  set mainTabs (val) {
    this.$store.commit('common/updateMainTabs', val)
  }
  changeOptions (flag: string) {
    if (flag === 'factory') {
      let item = this.factoryList.find(ele => ele.deptId === this.params.factoryId)
      this.params.factoryName = item ? item.deptName : ''
    } else if (flag === 'workshop') {
      let item = this.workshopList.find(ele => ele.deptId === this.params.workshopId)
      this.params.workshopName = item ? item.deptName : ''
    } else if (flag === 'pot') {
      // let item = this.potList.find(ele => ele.holderId === this.params.potId)
      // this.params.potName = item ? item.holderName : ''
    } else if (flag === 'order') {
      // let item = this.potList.find(ele => ele.holderId === this.params.potId)
      // this.params.potName = item ? item.holderName : ''
    }
  }
  // 获取工厂
  getFactory () {
    this.factoryList = []
    Vue.prototype.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`, {}, false, false, false).then((res) => {
      if (res.data.code === 0) {
        this.factoryList = res.data.typeList
        if (!this.params.factoryId && res.data.typeList.length > 0) {
          this.params.factoryId = res.data.typeList[0].deptId
          this.params.factoryName = res.data.typeList[0].deptName
        }
      } else {
        this.$notify.error({title: '错误', message: res.data.msg})
      }
    })
  }
  // 根据工厂获车间
  getWorkshop (fid: string) {
    this.workshopList = []
    if (fid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: fid, deptName: '发酵'}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.workshopList = res.data.typeList
          if (!this.params.workshopId && res.data.typeList.length > 0) {
            this.params.workshopId = res.data.typeList[0].deptId
            this.params.workshopName = res.data.typeList[0].deptName
          }
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    }
  }
  getDictList (factory) {
    this.params.orderType = ''
    // CM_material 发料物料 CM_material_prd 生产物料 PW_FEVOR  生产调度员
    let params = {types: ['order_type'], factory}
    Vue.prototype.$http(`${SYSTEMSETUP_API.PARAMETERSLIST_API}`, 'POST', params).then(({data}) => {
      if (data.code === 0) {
        this.orderTypeList = data.dicList[0].prolist
      } else {
        this.$notify.error({title: '错误', message: data.msg})
      }
    }).catch((error) => {
      console.log('catch data::', error)
    })
  }
  // 发酵罐
  getFermentPot (fid: string, wid: string) {
    this.potList = []
    if (fid && wid) {
      Vue.prototype.$http(`${BASICDATA_API.BASEHOLDERLIST_API}`, 'POST', {factory: fid, workShop: wid}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.potList = res.data.holderList
          // if (!this.params.factoryId && res.data.num.length > 0) {
          //   this.params.workshopId = res.data.num[0].holderId
          // }
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    }
  }
  // 全部的订单数据
  getOrderDataList (fid: string, wid: string) {
    this.orderDataList = []
    if (fid && wid) {
      Vue.prototype.$http(`${FERMENTATION_API.ORDER_SELECT_LIST_API}`, 'POST', {factory: fid, workShop: wid}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.orderDataList = res.data.orderList
          // if (!this.params.factoryId && res.data.num.length > 0) {
          //   this.params.workshopId = res.data.num[0].holderId
          // }
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    }
  }
  setStore (params) {
    this.$store.commit('common/updateFerInStockManage', params)
  }
  getOrderList () {
    if (this.params.factoryId === '') {
      Vue.prototype.$warning_SHINHO('请选择工厂')
      return
    }
    // if (this.params.workshopId === '') {
    //   this.$notify.error({title: '错误', message: '请选择车间'})
    //   return
    // }
    // if (this.params.potId === '') {
    //   this.$message.error('请选择罐号')
    //   return
    // }
    // if (this.params.materialCode === '') {
    //   this.$message.error('请选择物料')
    //   return
    // }
    // if (this.params.startDate === '') {
    //   this.$message.error('请选择开始日期')
    //   return
    // }
    // if (this.params.endDate === '') {
    //   this.$message.error('请选择结束日期')
    //   return
    // }
    this.searched = true
    // 保存选项值到common store
    this.setStore(this.params)
    this.retrieveOrderList()
  }
  retrieveOrderList () {
    this.dataList = []
    let params = {
      factory: this.params.factoryId,
      workShop: this.params.workshopId,
      commitDateOne: this.params.startDate,
      commitDateTwo: this.params.endDate,
      orderList: this.params.orderList,
      holderList: this.params.holderList,
      status: this.params.status,
      orderType: this.params.orderType,
      pageSize: this.pageSize + '',
      currPage: this.currPage + ''
    }
    Vue.prototype.$http(`${FERMENTATION_API.ORDER_IN_STOCK_LIST_API}`, `POST`, params).then((res) => {
      if (res.data.code === 0) {
        this.dataList = res.data.page.list
        this.dataList.forEach(e => {
          // 未录入的入库数默认等于订单数/ 不带出批次
          if (e.status !== 'checked' && e.status !== 'submit' && e.status !== 'saved' && e.status !== 'noPass') {
            e.inAmount = e.orderAmount
            // e.batch = ''
          }
        })
        this.totalCount = res.data.page.totalCount
      } else {
        this.$notify.error({title: '错误', message: res.data.msg})
      }
    })
  }
  // 改变每页条数
  handleSizeChange (val: number) {
    this.pageSize = val
    this.currPage = 1
    this.retrieveOrderList()
  }
  // 跳转页数
  handleCurrentChange (val: number) {
    this.currPage = val
    this.retrieveOrderList()
  }
  save () {
    if (this.validate()) {
      this.selectedList.forEach((item) => {
        if (item.status !== 'submit' && item.status !== 'checked') {
          item.status = 'saved'
        }
      })
      Vue.prototype.$http(`${FERMENTATION_API.ORDER_IN_STOCK_SAVE_API}`, `POST`, this.selectedList).then((res) => {
        if (res.data.code === 0) {
          this.retrieveOrderList()
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    }
  }
  submit () {
    if (this.validate()) {
      this.$confirm('确认数据提交，是否继续?', '提交确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectedList.forEach((item) => {
          if (item.status !== 'checked') {
            item.status = 'submit'
          }
        })
        Vue.prototype.$http(`${FERMENTATION_API.ORDER_IN_STOCK_SUBMIT_API}`, `POST`, this.selectedList).then((res) => {
          if (res.data.code === 0) {
            this.retrieveOrderList()
          } else {
            this.$notify.error({title: '错误', message: res.data.msg})
          }
        })
      })
    }
  }
  validate () {
    if (!this.selectedList || this.selectedList.length === 0) {
      Vue.prototype.$warning_SHINHO('请选择要入库的订单')
      return false
    }
    for (let item of this.selectedList) {
      if (!item.inAmount || item.inAmount === '') {
        Vue.prototype.$warning_SHINHO('请选择要入库的订单')
        return false
      }
      if (item.batch === null || item.batch === '') {
        Vue.prototype.$warning_SHINHO('批次不能为空')
        return false
      }
      if (item.batch.length !== 10) {
        Vue.prototype.$warning_SHINHO('批次长度为10')
        return false
      }
    }
    return true
  }
  showDetail (row) {
    this.readAudit = []
    Vue.prototype.$http(`${FERMENTATION_API.ORDER_IN_STOCK_AUDIT_API}`, `POST`, {orderNo: row.orderNo}).then((res) => {
      if (res.data.code === 0) {
        this.readAudit = res.data.list
      } else {
        this.$notify.error({title: '错误', message: res.data.msg})
      }
    })
  }
  // 多选
  handleChange (selections) {
    this.selectedList = selections
  }
  selectable (row, index) {
    return !(row.status && (row.status === 'checked' || row.status === 'submit'))
  }
  @Watch('params', {deep: true})
  onChangeValue (newVal: string, oldVal: string) {
    this.searched = false
    this.isEdit = false
    this.selectedList = []
    this.dataList = []
    this.readAudit = []
    this.pageSize = 10
    this.totalCount = 0
    this.currPage = 1
  }
  @Watch('params.factoryId')
  onFactoryValue (newVal: string, oldVal: string) {
    this.params.workshopId = ''
    this.params.workshopName = ''
    this.params.holderList = []
    this.params.orderList = []
    this.getWorkshop(newVal)
    this.getFermentPot(newVal, this.params.workshopId)
    this.getOrderDataList(newVal, this.params.workshopId)
    this.getDictList(newVal)
  }
  @Watch('params.workshopId')
  onWorkshopValue (newVal: string, oldVal: string) {
    this.params.holderList = []
    this.params.orderList = []
    this.getFermentPot(this.params.factoryId, newVal)
    this.getOrderDataList(this.params.factoryId, newVal)
  }
}
</script>

<style lang="scss" scoped>
.required{
  position: relative;
  padding-left: 15px;
  .reqI{
    color: red;
    position: absolute;
    left: 0;
    line-height: 32px;
  }
}
</style>
