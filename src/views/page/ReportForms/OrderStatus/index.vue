<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard" style="margin-bottom: 5px">
      <el-form :inline="true" size="small" :model="formHeader" label-width="70px" class="topform marbottom">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
          <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产产线：">
          <el-select v-model="formHeader.productline" placeholder="产线" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产订单：">
          <el-input type="text" v-model="formHeader.orderNo" clearable style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item label="订单状态：">
          <el-select v-model="formHeader.orderStatus" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Status" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报工状态：">
          <el-select v-model="formHeader.orderStatus" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Status" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库状态：">
          <el-select v-model="formHeader.orderStatus" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Status" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发料状态：">
          <el-select v-model="formHeader.orderStatus" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in Status" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" size="small" @click="GetDataList(true)" style="float: right" v-if="isAuth('ste:order:list')">查询</el-button>
      </el-form>
    </el-card>
    <el-card class="tableCard">
      <el-table :data="dataList" border tooltip-effect="dark" header-row-class-name="tableHead" style="width: 100%;margin-bottom: 20px">
        <el-table-column prop="factoryName" label="工厂" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="workShopName" label="车间" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productLineName" label="产线" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productLineName" label="生产日期" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productLineName" label="生产订单" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productLineName" label="订单状态" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productLineName" label="报工审核状态" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productLineName" label="入库审核状态" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="productLineName" label="发料审核状态" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {getFactory, getWorkshop, getParentline, getStatus} from '@/net/validate'
export default {
  name: 'index',
  data () {
    return {
      formHeader: {
        factory: '',
        workShop: '',
        productline: '',
        orderNo: ''
      },
      factory: [],
      workshop: [],
      productline: [],
      Status: []
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
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
