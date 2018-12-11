<template>
  <el-form :inline="true" :model="formHeader" size="small" label-width="82px" class="topform">
    <el-form-item label="车间：">
      <p class="el-input">{{formHeader.workShopName}}</p>
    </el-form-item>
    <el-form-item label="产线：">
      <p class="el-input">{{formHeader.productLineName}}</p>
    </el-form-item>
    <el-form-item label="订单号：">
      <p class="el-input">{{formHeader.orderNo}}</p>
    </el-form-item>
    <el-form-item label="品项：">
      <p class="el-input" style="width: 457px;">{{formHeader.materialCode + ' ' + formHeader.materialName}}</p>
    </el-form-item>
    <el-form-item label="计划产量：">
      <p class="el-input">{{formHeader.planOutput + ' ' + formHeader.outputUnit}}</p>
    </el-form-item>
    <el-form-item label="日期：">
      <p class="el-input">{{formHeader.productDate.indexOf(' ')!==-1?formHeader.productDate.substring(0, formHeader.productDate.indexOf(' ')):formHeader.productDate}}</p>
    </el-form-item>
    <el-form-item label="提交人员：">
      <p class="el-input">{{formHeader.operator}}</p>
    </el-form-item>
    <el-form-item label="提交时间：">
      <p class="el-input">{{formHeader.operDate? (formHeader.operDate.indexOf('.')!==-1?formHeader.operDate.substring(0, formHeader.operDate.indexOf('.')):formHeader.operDate):''}}</p>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'formHeader',
  data () {
    return {}
  },
  props: {
    formHeader: {}
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped>
.el-input{
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
}
</style>
