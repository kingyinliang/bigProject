<template>
  <el-form :inline="true" :model="formHeader" size="small" label-width="82px" class="topform">
    <el-form-item label="生产车间：">
      <p class="el-input">{{formHeader.workShopName || ''}}</p>
    </el-form-item>
    <el-form-item label="制曲房号：">
      <p class="el-input">{{formHeader.workShopName || ''}}</p>
    </el-form-item>
    <el-form-item label="生产订单：">
      <p class="el-input">{{formHeader.orderNo || ''}}</p>
    </el-form-item>
    <el-form-item label="生产品项：">
      <p class="el-input">{{formHeader.workShopName || ''}}</p>
    </el-form-item>
    <el-form-item label="生产日期：">
      <p class="el-input">{{formHeader.workShopName || ''}}</p>
    </el-form-item>
    <el-form-item label="入罐号：">
      <p class="el-input">{{formHeader.workShopName || ''}}</p>
    </el-form-item>
    <el-form-item label="连续蒸煮号：" label-width="85px">
      <p class="el-input">{{formHeader.workShopName || ''}}</p>
    </el-form-item>
    <el-form-item label="提交人员：">
      <p class="el-input">{{formHeader.operator || ''}}</p>
    </el-form-item>
    <el-form-item label="提交时间：">
      <p class="el-input">{{formHeader.operDate? (formHeader.operDate.indexOf('.')!==-1?formHeader.operDate.substring(0, formHeader.operDate.indexOf('.')):formHeader.operDate):''}}</p>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'fromHead',
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
<style lang="scss">
  .topform{
    .el-form-item__content{
      height: 32px;
      border-bottom: 1px solid #D8D8D8;
    }
  }
</style>
<style lang="scss" scoped>
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
