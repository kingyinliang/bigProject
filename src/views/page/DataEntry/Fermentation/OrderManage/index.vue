<template>
  <div>
    <div class="main">
      <el-card class="searchCard newCard">
        <el-row type="flex">
          <el-col>
            <el-form :model="params" size="small" :inline="true" label-position="right" label-width="50px">
              <el-form-item label="工厂：" label-width="80px">
                <el-select v-model="params.factoryId" class="selectwpx" style="width: 140px" @change="changeOptions('factory')">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in factoryList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车间：" @change="changeOptions('workshop')">
                <el-select v-model="params.workshopId" class="selectwpx" style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in workshopList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="罐号：" @change="changeOptions('pot')">
                <el-select v-model="params.potId" class="selectwpx" style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in potList" :key="sole.holderId" :label="sole.holderName" :value="sole.holderId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="物料：" @change="changeOptions('material')">
                <el-select v-model="params.materialCode" class="selectwpx" style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in materialList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单日期：" label-width="80px">
                <el-date-picker type="date" v-model="params.startDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
                - <el-date-picker type="date" v-model="params.endDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="width: 80px">
            <el-button type="primary" size="small" @click="getOrderList()" style="float: right">查询</el-button>
          </el-col>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0px" >
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-tabs ref='tabs'  v-model="activeName" id="DaatTtabs" class="NewDaatTtabs" type="border-card" style="border-radius: 15px;overflow: hidden">
          <el-tab-pane name="1">
            <span slot="label" class="spanview">
              <el-button>未申请</el-button>
            </span>
            <el-row>
              <el-col>
                <el-button type='primary' size='small' style='float:right; margin-bottom:10px;'>申请订单</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column type="index" label="序号" width="55"></el-table-column>
                <el-table-column label="容器" :show-overflow-tooltip="true" width="100">
                  <template slot-scope="scope">
                    {{scope.row.holdName}}
                  </template>
                </el-table-column>
                <el-table-column label="物料" :show-overflow-tooltip="true" width="140">
                  <template slot-scope="scope">
                    {{scope.row.ferMaterialCode + ' ' + scope.row.ferMaterialName}}
                  </template>
                </el-table-column>
                <el-table-column label="订单量" width="100">
                  <template slot-scope="scope">
                    {{scope.row.ferAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="60">
                  <template slot-scope="scope">
                    {{scope.row.ferUnit}}
                  </template>
                </el-table-column>
                <el-table-column label="开始日期" width="100">
                  <template slot-scope="scope">
                    {{scope.row.startDate}}
                  </template>
                </el-table-column>
                <el-table-column label="结束日期" width="100">
                  <template slot-scope="scope">
                    {{scope.row.endDate}}
                  </template>
                </el-table-column>
                <el-table-column label="制曲工单" width="120">
                  <template slot-scope="scope">
                    {{scope.row.kjmOrderNo}}
                  </template>
                </el-table-column>
                <el-table-column label="制曲物料" :show-overflow-tooltip="true" width="140">
                  <template slot-scope="scope">
                    {{scope.row.kjmMaterialCode + ' ' + scope.row.kjmMaterialName}}
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="100">
                  <template slot-scope="scope">
                    {{scope.row.kjmAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="60">
                  <template slot-scope="scope">
                    {{scope.row.kjmUnit}}
                  </template>
                </el-table-column>
                <el-table-column label="批次" width="120">
                  <template slot-scope="scope">
                    {{scope.row.batch}}
                  </template>
                </el-table-column>
                <el-table-column label="申请人员" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="申请时间" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="订单号" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <!-- <el-pagination
                @size-change="handleDataSizeChange"
                @current-change="handleDataCurrentChange"
                :current-page="dataCurrPage"
                :page-sizes="[10, 15, 20]"
                :page-size="dataPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="dataTotalCount">
              </el-pagination> -->
            </el-row>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label"  class="spanview">
              <el-button>已申请</el-button>
            </span>
            <el-row>
              <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
                <el-table-column type="index" label="序号" width="55"></el-table-column>
                <el-table-column label="容器" :show-overflow-tooltip="true" width="100" >
                  <template slot-scope="scope">
                    {{scope.row.holdName}}
                  </template>
                </el-table-column>
                <el-table-column label="状态" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="物料" :show-overflow-tooltip="true" width="140">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="订单量" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="60">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="开始日期" width="100">
                  <template slot-scope="scope">
                    {{scope.row.adjustTime}}
                  </template>
                </el-table-column>
                <el-table-column label="结束日期" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="制曲工单" width="120">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="制曲物料" :show-overflow-tooltip="true" width="140">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="100">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="单位" width="60">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="批次" width="120">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="申请人员" width="120">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="申请时间" width="120">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
                <el-table-column label="订单号" width="120">
                  <template slot-scope="scope">
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <!-- <el-pagination
                @size-change="handleAdjustSizeChange"
                @current-change="handleAdjustCurrentChange"
                :current-page="adjustCurrPage"
                :page-sizes="[10, 15, 20]"
                :page-size="adjustPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="adjustTotalCount">
              </el-pagination> -->
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {BASICDATA_API, FERMENTATION_API, SQU_API} from '@/api/api'
import {Vue, Component, Watch} from 'vue-property-decorator'
import {dateFormat, headanimation} from '@/net/validate'
@Component({
  components: {
  }
})

export default class Index extends Vue {
  // 将common中的参数复制一份到本地
  params = JSON.parse(JSON.stringify(this.$store.state.common.FerOrderManage))
  factoryList = []
  workshopList = []
  potList = []
  materialList = []
  dataList = []
  activeName = '1'
  searched: boolean = false
  mounted () {
    headanimation(Vue.prototype.$)
    const now = dateFormat(new Date(), 'yyyy-MM-dd')
    this.params.startDate = now
    this.params.endDate = now
    this.getFactory()
    this.getWorkshop(this.params.factoryId)
    this.getFermentPot(this.params.factoryId)
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
      let item = this.potList.find(ele => ele.holderId === this.params.potId)
      this.params.potName = item ? item.holderName : ''
    }
  }
  // 获取工厂
  getFactory () {
    this.factoryList = []
    Vue.prototype.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`, {}, false, false, false).then((res) => {
      if (res.data.code === 0) {
        this.factoryList = res.data.typeList
      } else {
        this.$message.error(res.data.msg)
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
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
  // 发酵罐
  getFermentPot (fid: string) {
    this.potList = []
    if (fid) {
      Vue.prototype.$http(`${SQU_API.MATERIAL_APPLY_POT_LIST_API}`, 'POST', {factory: fid}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.potList = res.data.num
          // if (!this.params.factoryId && res.data.num.length > 0) {
          //   this.params.workshopId = res.data.num[0].holderId
          // }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
  setStore (params) {
    this.$store.commit('common/updateFerOrderManage', params)
  }
  getOrderList () {
    // if (this.params.factoryId === '') {
    //   this.$message.error('请选择工厂')
    //   return
    // }
    // if (this.params.workshopId === '') {
    //   this.$message.error('请选择车间')
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
    let queryParams = {
      factory: this.params.factoryId,
      workShop: this.params.workshopId,
      startDateFrom: this.params.startDate,
      startDateTo: this.params.endDate,
      holderId: this.params.potId,
      kjmMaterialCode: this.params.materialCode,
      turnFlag: '0'
    }
    this.retrieveOrderList(queryParams)
  }
  retrieveOrderList (params) {
    this.dataList = []
    Vue.prototype.$http(`${FERMENTATION_API.ORDER_LIST_API}`, `POST`, params).then((res) => {
      if (res.data.code === 0) {
        this.dataList = res.data.orderPage.list
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }
  @Watch('params', {deep: true})
  onChangeValue (newVal: string, oldVal: string) {
    this.searched = false
  }
  @Watch('params.factoryId')
  onFactoryValue (newVal: string, oldVal: string) {
    this.params.workshopId = ''
    this.params.workshopName = ''
    this.params.potId = ''
    this.params.potName = ''
    this.params.materialCode = ''
    this.params.materialName = ''
    this.getWorkshop(newVal)
    this.getFermentPot(newVal)
  }
}
</script>

<style lang="scss">
</style>
