<template>
  <div class="header_main">
    <el-tabs v-model="activeName" class="NewDaatTtabs" type="border-card">
      <el-tab-pane name="1">
        <span slot="label" class="spanview">原汁库存汇总</span>
        <div class="titleLeft">
          <i class="iconfont factory-kucun" style="color:#666666; margin-right:10px"></i>原汁总库存（单位:方）
          <el-button type="primary" size="small" @click="ExportExcelA(true)"  v-if="isAuth('juice:pot:juiceStockItemExport')" style="background-color:#1890FF; color:#FFFFFF; float:right">导出</el-button>
        </div>
        <el-table header-row-class-name="tableHead" :data="formLeftData" border tooltip-effect="dark" >
          <el-table-column label="六月鲜" :show-overflow-tooltip="true" prop="liuyuexian"></el-table-column>
          <el-table-column label="味极鲜" :show-overflow-tooltip="true" prop="weijixian"></el-table-column>
          <el-table-column label="F0" :show-overflow-tooltip="true" prop="f0"></el-table-column>
          <el-table-column label="JY" :show-overflow-tooltip="true" prop="jy"></el-table-column>
          <el-table-column label="TB" :show-overflow-tooltip="true" prop="tb"></el-table-column>
          <el-table-column label="JBS" :show-overflow-tooltip="true" prop="jbs"></el-table-column>
          <el-table-column label="JYTB" :show-overflow-tooltip="true" prop="jytb"></el-table-column>
          <el-table-column label="原汁总库存量" :show-overflow-tooltip="true" prop="sum" ></el-table-column>
        </el-table>
        <div class="titleLeft"><i class="iconfont factory-icon_function_keyongkucun" style="color:#666666; margin-right:10px"></i>原汁总库存列表（单位:方）</div>
        <el-table header-row-class-name="tableHead" :data="dataLeftListOrder" border tooltip-effect="dark" >
          <el-table-column type="index" label="序号" width="55" :index="indexOrderMethod"></el-table-column>
          <el-table-column label="原汁罐号" :show-overflow-tooltip="true" prop="holderName" width="120"></el-table-column>
          <el-table-column label="状态" :show-overflow-tooltip="true" width="75">
            <template slot-scope="scope">
              {{scope.row.holderStatus === '6' ? '空罐' : scope.row.holderStatus === '7' ? '入料中' : scope.row.holderStatus === '8' ? '沉淀中' : scope.row.holderStatus === '9' ? '领用中' : scope.row.holderStatus === '10' ? '待清洗' : ''}}
            </template>
          </el-table-column>
          <el-table-column label="罐内总量" :show-overflow-tooltip="true" prop="amount" width="100"></el-table-column>
          <el-table-column label="满罐日期" :show-overflow-tooltip="true" prop="fullDate" width="160"></el-table-column>
          <el-table-column label="车间" :show-overflow-tooltip="true" prop="workShop" width="70"></el-table-column>
          <el-table-column label="物料" :show-overflow-tooltip="true" width="160">
            <template slot-scope="scope">
              {{scope.row.materialCode}}{{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="类别" :show-overflow-tooltip="true" prop="type" width="70"></el-table-column>
          <el-table-column label="是否F0/原汁JBS" :show-overflow-tooltip="true" width="80">
            <template slot-scope="scope">
              {{scope.row.isF === '1' ? 'F0' : scope.row.isF === '2' ? 'JBS' : ''}}
            </template>
          </el-table-column>
          <el-table-column label="沉淀期" :show-overflow-tooltip="true" prop="days" width="70"></el-table-column>
          <el-table-column label="入库批次" :show-overflow-tooltip="true" prop="batch" width="110"></el-table-column>
          <el-table-column label="入库订单号" :show-overflow-tooltip="true" prop="orderNo" width="120"></el-table-column>
        </el-table>
        <el-row>
          <el-pagination
            @size-change="handleDataSizeChange"
            @current-change="handleDataCurrentChange"
            :current-page="dataLeftCurrPage"
            :page-sizes="[10, 20, 50]"
            :page-size="dataPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataLeftTotalCount">
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label" class="spanview">可用原汁汇总</span>
        <div class="titleLeft">
          <i class="iconfont factory-kucun" style="color:#666666; margin-right:10px"></i>原汁总库存（单位:方）
          <el-button type="primary" size="small" @click="ExportExcelB(true)"  v-if="isAuth('juice:pot:juiceStockItemExport')" style="background-color:#1890FF; color:#FFFFFF; float:right">导出</el-button>
        </div>
        <el-table header-row-class-name="tableHead" :data="formRightData" border tooltip-effect="dark" >
          <el-table-column label="六月鲜" :show-overflow-tooltip="true" prop="liuyuexian"></el-table-column>
          <el-table-column label="味极鲜" :show-overflow-tooltip="true" prop="weijixian"></el-table-column>
          <el-table-column label="F0" :show-overflow-tooltip="true" prop="f0"></el-table-column>
          <el-table-column label="JY" :show-overflow-tooltip="true" prop="jy"></el-table-column>
          <el-table-column label="TB" :show-overflow-tooltip="true" prop="tb"></el-table-column>
          <el-table-column label="JBS" :show-overflow-tooltip="true" prop="jbs"></el-table-column>
          <el-table-column label="JYTB" :show-overflow-tooltip="true" prop="jytb"></el-table-column>
          <el-table-column label="原汁总库存量" :show-overflow-tooltip="true" prop="sum" ></el-table-column>
        </el-table>
        <div class="titleLeft"><i class="iconfont factory-icon_function_keyongkucun" style="color:#666666; margin-right:10px"></i>可用原汁列表（单位:方）</div>
        <el-table header-row-class-name="tableHead" :data="dataRightListOrder" border tooltip-effect="dark" >
          <el-table-column type="index" label="序号" width="55" :index="indexOrderMethodRight"></el-table-column>
          <el-table-column label="原汁罐号" :show-overflow-tooltip="true" prop="holderName" width="120"></el-table-column>
          <el-table-column label="状态" :show-overflow-tooltip="true" width="75">
            <template slot-scope="scope">
              {{scope.row.holderStatus === '6' ? '空罐' : scope.row.holderStatus === '7' ? '入料中' : scope.row.holderStatus === '8' ? '沉淀中' : scope.row.holderStatus === '9' ? '领用中' : scope.row.holderStatus === '10' ? '待清洗' : ''}}
            </template>
          </el-table-column>
          <el-table-column label="罐内总量" :show-overflow-tooltip="true" prop="amount" width="100"></el-table-column>
          <el-table-column label="满罐日期" :show-overflow-tooltip="true" prop="fullDate" width="160"></el-table-column>
          <el-table-column label="车间" :show-overflow-tooltip="true" prop="workShop" width="70"></el-table-column>
          <el-table-column label="物料" :show-overflow-tooltip="true" width="160">
            <template slot-scope="scope">
              {{scope.row.materialCode}}{{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="类别" :show-overflow-tooltip="true" prop="type" width="70"></el-table-column>
          <el-table-column label="是否F0" :show-overflow-tooltip="true" width="80">
            <template slot-scope="scope">
              {{scope.row.isF === '1' ? 'F0' : scope.row.isF === '2' ? 'JBS' : ''}}
            </template>
          </el-table-column>
          <el-table-column label="沉淀期" :show-overflow-tooltip="true" prop="days" width="70"></el-table-column>
          <el-table-column label="入库批次" :show-overflow-tooltip="true" prop="batch" width="110"></el-table-column>
          <el-table-column label="入库订单号" :show-overflow-tooltip="true" prop="orderNo" width="120"></el-table-column>
        </el-table>
        <el-row>
          <el-pagination
            @size-change="handleDataSizeChangeRight"
            @current-change="handleDataCurrentChangeRight"
            :current-page="dataRightCurrPage"
            :page-sizes="[10, 20, 50]"
            :page-size="dataPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="dataRightTotalCount">
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {JUICE_API} from '@/api/api'
import { exportFile } from '@/net/validate'
export default {
  name: 'summarys',
  data () {
    return {
      activeName: '1',
      formLeftData: [],
      dataLeftListOrderTotal: [],
      dataLeftListOrder: [],
      dataPageSize: 10,
      dataLeftCurrPage: 1,
      dataLeftTotalCount: 0,
      formRightData: [],
      dataRightListOrderTotal: [],
      dataRightListOrder: [],
      dataPageSizeRight: 10,
      dataRightCurrPage: 1,
      dataRightTotalCount: 0,
      plantList: {}
    }
  },
  mounted () {
    this.GetInfo()
  },
  methods: {
    GetInfo () {
      this.$http(`${JUICE_API.JUICE_JUICE_STOCKITEM}`, 'POST', {TYPE: 'all'}).then(({data}) => {
        if (data.code === 0) {
          this.formLeftData = [data.juiceStockItem.juiceStockItemHead]
          this.dataLeftTotalCount = data.juiceStockItem.juiceStockItemPot.length
          this.dataLeftListOrderTotal = data.juiceStockItem.juiceStockItemPot
          this.changeLeftDataList()
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
      this.$http(`${JUICE_API.JUICE_JUICE_STOCKITEM}`, 'POST', {TYPE: 'alls'}).then(({data}) => {
        if (data.code === 0) {
          this.formRightData = [data.juiceStockItem.juiceStockItemHead]
          this.dataRightTotalCount = data.juiceStockItem.juiceStockItemPot.length
          this.dataRightListOrderTotal = data.juiceStockItem.juiceStockItemPot
          this.changeRightDataList()
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 序号
    indexOrderMethod (index) {
      return index + 1 + (this.dataLeftCurrPage * 1 - 1) * (this.dataPageSize * 1)
    },
    handleDataSizeChange (val) {
      this.dataPageSize = val
      this.dataLeftCurrPage = 1
      this.changeLeftDataList()
    },
    handleDataCurrentChange (val) {
      this.dataLeftCurrPage = val
      this.changeLeftDataList()
    },
    changeLeftDataList () {
      this.dataLeftListOrder = this.dataLeftListOrderTotal.slice((this.dataLeftCurrPage - 1) * this.dataPageSize, (this.dataLeftCurrPage - 1) * this.dataPageSize + this.dataPageSize)
    },
    // 序号
    indexOrderMethodRight (index) {
      return index + 1 + (this.dataLeftCurrPage * 1 - 1) * (this.dataPageSize * 1)
    },
    handleDataSizeChangeRight (val) {
      this.dataPageSizeRight = val
      this.dataRightCurrPage = 1
      this.changeRightDataList()
    },
    handleDataCurrentChangeRight (val) {
      this.dataRightCurrPage = val
      this.changeRightDataList()
    },
    changeRightDataList () {
      this.dataRightListOrder = this.dataRightListOrderTotal.slice((this.dataRightCurrPage - 1) * this.dataPageSizeRight, (this.dataRightCurrPage - 1) * this.dataPageSizeRight + this.dataPageSizeRight)
    },
    // 导出
    ExportExcelA () {
      this.plantList.TYPE = 'all'
      exportFile(`${JUICE_API.JUICE_STOCKITEM_KUCUN}`, '原汁库存汇总', this)
    },
    ExportExcelB () {
      this.plantList.TYPE = 'alls'
      exportFile(`${JUICE_API.JUICE_STOCKITEM_KUCUN}`, '可用原汁汇总', this)
    }
  }
}
</script>

<style lang="scss" scoped>
.titleLeft {font-weight:bold; margin:15px 0; line-height:32px;}
</style>
