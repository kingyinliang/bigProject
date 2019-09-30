<template>
  <div class="main">
    <el-card>
      <div class="titleLeft">
        <i class="iconfont factory-kucun" style="color:#666666; margin-right:10px"></i>发酵总库存（单位:方）
      </div>
      <el-table :data="headerInfo" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column label="空罐" show-overflow-tooltip prop="empty"></el-table-column>
        <el-table-column label="投料中" show-overflow-tooltip prop="feeding" ></el-table-column>
        <el-table-column label="发酵中" show-overflow-tooltip prop="fermentation"></el-table-column>
        <el-table-column label="领用中" show-overflow-tooltip prop="collarUse"></el-table-column>
        <el-table-column label="其他占用罐" show-overflow-tooltip prop="other"></el-table-column>
        <el-table-column label="味极鲜罐数" show-overflow-tooltip prop="weijixian"></el-table-column>
        <el-table-column label="六月鲜罐数" show-overflow-tooltip prop="liuyuexian"></el-table-column>
        <el-table-column label="TB罐数" show-overflow-tooltip prop="tb"></el-table-column>
        <el-table-column label="JYTB罐数" show-overflow-tooltip prop="jytb"></el-table-column>
        <el-table-column label="JY罐数" show-overflow-tooltip prop="jy"></el-table-column>
        <el-table-column label="发酵一总罐数" show-overflow-tooltip prop="sum" width="100"></el-table-column>
      </el-table>
      <div class="titleLeft" style="margin-top:15px">
        <i class="iconfont factory-icon_function_keyongkucun" style="color:#666666; margin-right:10px"></i>发酵总库存列表（单位:方）
      </div>
      <el-table :data="dataList" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column label="发酵罐编号" show-overflow-tooltip prop="holderNo" width="110"></el-table-column>
        <el-table-column label="状态" show-overflow-tooltip prop="holderStatus"></el-table-column>
        <el-table-column label="发酵罐容量(M³)" show-overflow-tooltip prop="holderHold"></el-table-column>
        <el-table-column label="投料数量(M³)" show-overflow-tooltip prop="realInAmount" width="120"></el-table-column>
        <el-table-column label="入库数量(M³)" show-overflow-tooltip prop="ferAmount" width="120"></el-table-column>
        <el-table-column label="库存数量(M³)" show-overflow-tooltip prop="stockAmount"></el-table-column>
        <el-table-column label="类别" show-overflow-tooltip width="110">
          <template slot-scope="scope">
            {{scope.row.materialCode}} {{scope.row.materialName}}
          </template>
        </el-table-column>
        <el-table-column label="投料开始时间" show-overflow-tooltip prop="feedingDate" width="120"></el-table-column>
        <el-table-column label="发酵开始时间" show-overflow-tooltip prop="fermentDate" width="120"></el-table-column>
        <el-table-column label="发酵结束时间" show-overflow-tooltip prop="fermentEndDate" width="120"></el-table-column>
        <el-table-column label="发酵期" show-overflow-tooltip prop="fermentTime" width="80"></el-table-column>
        <el-table-column label="发酵时间" show-overflow-tooltip prop="fermentDays"></el-table-column>
        <el-table-column label="压榨时间" show-overflow-tooltip prop="pulpDate"></el-table-column>
        <el-table-column label="领用酱醪数(M³)" show-overflow-tooltip prop="useNums"></el-table-column>
        <el-table-column label="出品数" show-overflow-tooltip prop="outAmount"></el-table-column>
        <el-table-column label="出品率" show-overflow-tooltip prop="yield"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 30, 35]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {FERMENTATION_API} from '@/api/api'
// import { exportFile } from '@/net/validate'
export default {
  name: 'summarys',
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      headerInfo: [],
      dataList: [],
      dataListAll: []
    }
  },
  mounted () {
    this.GetList()
  },
  methods: {
    GetList () {
      this.$http(`${FERMENTATION_API.FER_REPORT_LIST}`, 'POST', {}).then(({data}) => {
        if (data.code === 0) {
          // this.headerInfo = data.returnMap.head
          data.returnMap.head.map((item) => {
            this.headerInfo.push(item)
          })
          this.dataListAll = data.returnMap.info
          this.total = data.returnMap.info.length
          this.changeList()
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.changeList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.changeList()
    },
    changeList () {
      this.dataList = this.dataListAll.slice((this.currentPage - 1) * this.pageSize, (this.currentPage - 1) * this.pageSize + this.pageSize)
    }
    // 导出
    // ExportExcelA () {
    //   this.plantList.TYPE = 'all'
    //   exportFile(`${FERMENTATION_API.JUICE_STOCKITEM_KUCUN}`, '原汁库存汇总', this)
    // }
  }
}
</script>

<style lang="scss" scoped>
.titleLeft {font-weight:bold; margin:0; line-height:32px;}
</style>
