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
              <el-form-item label="车间：" >
                <el-select v-model="params.workshopId" class="selectwpx" style="width: 140px" @change="changeOptions('workshop')">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in workshopList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="罐号：" >
                <el-select v-model="params.potList" class="selectwpx" style="width: 140px" filterable multiple @change="changeOptions('pot')">
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
              <el-form-item label="订单日期：" label-width="80px">
                <el-date-picker type="date" v-model="params.startDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
                - <el-date-picker type="date" v-model="params.endDate" value-format="yyyy-MM-dd" style="width:140px"></el-date-picker>
              </el-form-item>
              <el-form-item label="订单号："  filterable multiple allow-create>
                <el-select v-model="params.orderList" class="selectwpx" style="width: 140px" @change="changeOptions('order')">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in materialList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="状态：" >
                <el-select v-model="params.status" class="selectwpx" style="width: 140px" @change="changeOptions('status')">
                  <el-option label="未录入" value=""></el-option>
                  <el-option label="已保存" value="saved"></el-option>
                  <el-option label="已提交" value="submit"></el-option>
                  <el-option label="未通过" value="noPass"></el-option>
                  <el-option label="已通过" value="checked"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <!-- <el-col style="width: 180px">
            <div style="float:right; line-height:31px;font-size: 14px">
              <div style="float:left">
                <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890ff' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
              </div>
              <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
            </div>
          </el-col> -->
        </el-row>
        <el-row style="text-align:right" class="buttonCss">
          <template style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" v-if="isAuth('key')" @click="getOrderList()">查询</el-button>
            <el-button type="primary" class="button" size="small" @click="isEdit = !isEdit" v-if="isAuth('key')">{{isEdit?'取消':'编辑'}}</el-button>
          </template>
          <template v-if="isEdit" style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" v-if="isAuth('key')">保存</el-button>
            <el-button type="primary" size="small" v-if="isAuth('key')">提交</el-button>
          </template>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0px">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-card>
          <el-row>
             <div style="line-height: 40px;" ><i style="font-size: 22px;float:left;" class="iconfont factory-shouqicaidan"></i><span style="font-size:16px;font-weight:bold;margin-left:12px;">入库列表</span></div>
          </el-row>
          <el-row>
            <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
              <el-table-column type="index" label="序号" width="55"></el-table-column>
              <el-table-column label="状态" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="订单号" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="容器" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="物料" :show-overflow-tooltip="true" >
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="订单量">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="单位">
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="入库数量" >
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="单位" >
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="批次" >
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="备注" >
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="提交人员" >
                <template slot-scope="scope">
                </template>
              </el-table-column>
              <el-table-column label="提交时间" >
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
import {BASICDATA_API, GRANARY_API, SQU_API} from '@/api/api'
import {Vue, Component, Watch} from 'vue-property-decorator'
import {dateFormat, headanimation} from '@/net/validate'
import AuditLog from '@/views/components/AuditLog.vue'
@Component({
  components: {
    AuditLog
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
  readAudit = []
  searched: boolean = false
  isEdit: boolean = false
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
    return true
    // return Vue.prototype.isAuth(key)
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
      deptId: this.params.workshopId,
      flag: '002'
    }
    this.retrieveOrderList(queryParams)
  }
  retrieveOrderList (params) {
    this.dataList = []
    Vue.prototype.$http(`${GRANARY_API.WHEAT_POT_LIST}/${params.factory}?deptId=${params.deptId}&flag=${params.flag}`, `GET`).then((res) => {
      if (res.data.code === 0) {
        this.dataList = res.data.data ? res.data.data.holders : []
        this.dataList.forEach((item) => {
          item.total = 0
          item.unit = 'KG'
          if (item.stocks && item.stocks.length > 0) {
            item.total = item.stocks.reduce((prev, next) => { return prev + (next.currentQuantity ? next.currentQuantity : 0) }, 0)
            item.unit = item.stocks[0].unit
          }
        })
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
