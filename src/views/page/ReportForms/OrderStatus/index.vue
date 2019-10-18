<template>
  <div class="header_main">
    <el-card class="searchCard" style="margin-bottom: 5px">
      <el-form :inline="true" size="small" :model="formHeader" label-width="70px" class="topform multi_row">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 170px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
          <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 170px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产产线：">
          <el-select v-model="formHeader.productline" placeholder="产线" style="width: 170px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产订单：">
          <el-input type="text" v-model="formHeader.orderNo" clearable style="width: 170px"></el-input>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select v-model="formHeader.orderStatus" placeholder="请选择" style="width: 170px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Status" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报工状态：">
          <el-select v-model="formHeader.timeStatus" placeholder="请选择" style="width: 170px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Status" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库状态：">
          <el-select v-model="formHeader.inStatus" placeholder="请选择" style="width: 170px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Status" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发料状态：">
          <el-select v-model="formHeader.matStatus" placeholder="请选择" style="width: 170px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Status" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatr">
          <el-button type="primary" size="small" @click="GetDataList(true)" v-if="isAuth('report:formh:getAllStatusList')">查询</el-button>
          <el-button type="primary" size="small" @click="ExportExcel(true)" v-if="isAuth('report:formh:getAllStatusList')">导出</el-button>
        </el-form-item>
        </el-form>
    </el-card>
    <el-card class="tableCard">
      <el-table :data="dataList" border tooltip-effect="dark" header-row-class-name="tableHead" style="width: 100%;margin-bottom: 20px">
        <el-table-column prop="factoryName" label="工厂" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="workShopName" label="车间" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productLineName" label="产线" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productDate" label="生产日期" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="orderNo" label="生产订单" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="timeStatus" label="报工审核状态" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="inStatus" label="入库审核状态" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="matStatus" label="发料审核状态" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <el-row >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formHeader.currPage"
          :page-sizes="[10, 20, 50]"
          :page-size="formHeader.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="formHeader.totalCount">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getFactory, getWorkshop, getParentline, getStatus, exportFile} from '@/net/validate'
import { REP_API } from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        productline: '',
        orderNo: '',
        orderStatus: '',
        inStatus: '',
        matStatus: '',
        timeStatus: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factory: [],
      workshop: [],
      productline: [],
      Status: [],
      dataList: []
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.formHeader.workShop = ''
      getWorkshop(this, n, '')
    },
    'formHeader.workShop' (n, o) {
      this.formHeader.productline = ''
      getParentline(this, n)
    }
  },
  mounted () {
    getFactory(this)
    getStatus(this)
  },
  methods: {
    GetDataList (st) {
      if (st) {
        this.formHeader.currPage = 1
      }
      this.$http(`${REP_API.ORDER_STATUS_LIST_API}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.dataList = data.page.list
          this.formHeader.currPage = data.page.currPage
          this.formHeader.pageSize = data.page.pageSize
          this.formHeader.totalCount = data.page.totalCount
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    ExportExcel () {
      let that = this
      exportFile(`${REP_API.ORDER_STATUS_OUT_API}`, '订单状态报表数据导出', that)
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.formHeader.pageSize = val
      this.GetDataList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.formHeader.currPage = val
      this.GetDataList()
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
