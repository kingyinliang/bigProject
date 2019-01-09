<template>
  <el-form :inline="true" :model="formHeader" size="small" label-width="82px" class="topform">
    <el-form-item label="生产车间：">
      <p class="el-input">{{formHeader.workShopName || ''}}</p>
    </el-form-item>
    <el-form-item label="产线：">
      <p class="el-input">{{formHeader.productLineName || ''}}</p>
    </el-form-item>
    <el-form-item label="订单号：">
      <p class="el-input">{{formHeader.orderNo || ''}}</p>
    </el-form-item>
    <el-form-item label="生产品项：">
      <el-tooltip class="item" effect="dark" :content="(formHeader.materialCode || '') + ' ' + (formHeader.materialName || '')" placement="top">
        <p class="el-input" style="text-overflow: ellipsis;" >{{(formHeader.materialCode || '') + ' ' + (formHeader.materialName || '')}}</p>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="订单日期：">
      <p class="el-input">{{'TODO'}}</p>
    </el-form-item>
    <el-form-item label="计划产量：">
      <p class="el-input">{{(formHeader.planOutput || '') + ' ' + (formHeader.outputUnit || '')}}</p>
    </el-form-item>
    <el-form-item label="生产日期：">
      <el-date-picker type="date" @change="updateProductDate" :disabled="!isRedact" value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="formHeader.productDate" ></el-date-picker>
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
  name: 'formHeader',
  data () {
    return {}
  },
  props: {
    formHeader: {},
    isRedact: Boolean,
    updateProductDateCallback: Function
  },
  mounted () {
  },
  methods: {
    updateProductDate: function (val) {
      this.$emit('updateProductDateCallback', val)
    }
  },
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
