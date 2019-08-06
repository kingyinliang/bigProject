<template>
  <div class="main">
    <el-card class="searchCards">
      <el-row>
        <el-col :span="20">
          <el-form :model="formHeader" :inline="true" size="small" label-width="85px">
            <el-form-item label="工厂：">
              <el-select v-model="formHeader.factory" class="width150px">
                <el-option value=''>请选择</el-option>
                <el-option v-for="(item, index) in factoryList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车间：">
              <el-select v-model="formHeader.workshop" class="width150px">
                <el-option value=''>请选择</el-option>
                <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产线：">
              <el-select v-model="formHeader.workshop" class="width150px">
                <el-option value=''>请选择</el-option>
                <el-option v-for="(item, index) in workshopList" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
              </el-select>
            </el-form-item><br>
            <el-form-item label="订单：">
              <el-input v-model="formHeader.orderNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="品相：">
              <el-input v-model="formHeader.orderNo" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="生产日期：" label-width="85px">
              <el-date-picker type="date" v-model="formHeader.date" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:150px"></el-date-picker> - <el-date-picker type="date" v-model="formHeader.date" value-format="yyyy-MM-dd" placeholder="请选择日期" style="width:150px"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" style="text-align:right; margin-top:50px;">
          <el-button type="primary" size="small">查询</el-button>
          <el-button type="primary" size="small">导出</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="secondcard">
      <el-table :data="dataList" border header-row-class-name="tableHead" style="margin-top:10px">
        <el-table-column label="生产日期" show-overflow-tooltip></el-table-column>
        <el-table-column label="工厂" show-overflow-tooltip></el-table-column>
        <el-table-column label="车间" show-overflow-tooltip></el-table-column>
        <el-table-column label="产线" show-overflow-tooltip></el-table-column>
        <el-table-column label="生产订单" show-overflow-tooltip></el-table-column>
        <el-table-column label="生产物料" show-overflow-tooltip></el-table-column>
        <el-table-column label="生产批次" show-overflow-tooltip></el-table-column>
        <el-table-column label="生产数" show-overflow-tooltip></el-table-column>
        <el-table-column label="单位" show-overflow-tooltip></el-table-column>
        <el-table-column label="主产品批次" show-overflow-tooltip></el-table-column>
        <el-table-column label="赠品批次" show-overflow-tooltip></el-table-column>
        <el-table-column label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TwoOneRetrospect',
  data () {
    return {
      formHeader: {
        factory: '',
        workshop: ''
      },
      factoryList: [],
      workshopList: [],
      dataList: []
    }
  }
}
</script>
