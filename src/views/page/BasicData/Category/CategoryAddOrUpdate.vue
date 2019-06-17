<template>
  <el-dialog
    width="450px"
    class="shinhodialog"
    :title="id?'修改类别':'新增类别'"
    @close="closeDialog"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" @submit.native.prevent label-width="155px"  size="small">
      <el-form-item label="生产工厂：">
        <el-select v-model="dataForm.factory" placeholder="请选择" style="width: 100%">
          <el-option label="请选择"  value=""></el-option>
          <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发料物料：" prop="holderId">
        <el-select v-model="dataForm.material" placeholder="请选择" filterable style="width: 100%">
          <el-option v-for="(sole, index) in this.guanList" :key="index" :value="sole.holderId" :label="sole.holderName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="半成品类别：">
        <el-input v-model="dataForm.orderNo" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="发酵成熟天数（天）：">
        <el-input v-model="dataForm.orderNo" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="发酵超期天数（天）：">
        <el-input v-model="dataForm.orderNo" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'CategoryAddOrUpdate',
  data () {
    return {
      id: '',
      visible: false,
      dataForm: {}
    }
  },
  props: {
    factory: []
  },
  mounted () {
  },
  methods: {
    init (id) {
      this.visible = true
    },
    closeDialog () {
      this.visible = false
      this.$refs['dataForm'].resetFields()
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss">
.shinhodialog{
  .el-dialog{
    border-radius: 10px 10px 0 0;
  }
  .el-dialog__header{
    border-radius: 10px 10px 0 0;
    background: #3a8ee6;
    span,button,i{
      color: white!important;
    }
  }
}
</style>
