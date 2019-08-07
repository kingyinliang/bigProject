<template>
  <el-form :inline="true" :model="formHeader" size="small" label-width="75px" class="topform marbottom">
    <el-form-item label="生产车间：">
      <p class="el-input">{{formHeader.workShopName || ''}}</p>
    </el-form-item>
    <el-form-item label="产线：">
      <p class="el-input">{{formHeader.panName || ''}}</p>
    </el-form-item>
    <el-form-item label="订单号：">
      <p class="el-input">{{formHeader.orderNo || ''}}</p>
    </el-form-item>
    <el-form-item label="订单日期：">
      <p class="el-input">{{formHeader.panName || ''}}</p>
    </el-form-item>
    <el-form-item label="生产品项：">
      <p class="el-input">{{formHeader.materialCode + ' ' + formHeader.materialName}}</p>
    </el-form-item>
    <el-form-item label="计划产量：">
      <p class="el-input">{{formHeader.planOutput || ''}}</p>
    </el-form-item>
    <el-form-item label="生产日期：">
      <el-date-picker size="small" type="date" :disabled="!isRedact" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="formHeader.productDate" style="width: 145px"></el-date-picker>
    </el-form-item>
    <el-form-item label="提交人员：">
      <p class="el-input">{{formHeader.changer || ''}}</p>
    </el-form-item>
    <el-form-item label="提交时间：">
      <p class="el-input">{{formHeader.changed || ''}}</p>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'formHead',
  data () {
    return {}
  },
  props: {
    isRedact: {
      type: Boolean,
      default () { return false }
    },
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
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 8px!important;
  }
  .el-input{
    width: 145px!important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 32px;
  }
</style>
