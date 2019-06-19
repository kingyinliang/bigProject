<template>
  <el-dialog
    width="450px"
    class="shinhodialog"
    :title="id?'修改类别':'新增类别'"
    @close="closeDialog"
    :close-on-click-modal="closeDialog"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" @submit.native.prevent label-width="155px"  size="small">
      <el-form-item label="生产工厂：">
        <el-select v-model="dataForm.factory" placeholder="请选择" style="width: 100%">
          <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发料物料：" prop="holderId">
        <el-select v-model="dataForm.materialCode" placeholder="请选择" filterable style="width: 100%">
          <el-option v-for="(sole, index) in this.material" :key="index" :value="sole.materialCode" :label="sole.materialCode+ ' ' + sole.materialName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="半成品类别：">
        <el-input v-model="dataForm.halfType" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="订单天数：">
        <el-input v-model="dataForm.orderDays" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="发酵成熟天数：">
        <el-input v-model="dataForm.matureDays" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="发酵超期天数：">
        <el-input v-model="dataForm.outDays" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'CategoryAddOrUpdate',
  data () {
    return {
      id: '',
      visible: false,
      material: [],
      dataForm: {}
    }
  },
  props: {
    factory: []
  },
  watch: {
    'dataForm.factory' (n, o) {
      this.GetMaterial(n)
    }
  },
  mounted () {
  },
  methods: {
    // 初始化
    init (data) {
      if (data) {
        this.dataForm = JSON.parse(JSON.stringify(data))
        this.id = this.dataForm.id
      } else {
        this.dataForm = {}
        this.id = ''
      }
      this.visible = true
    },
    // 新增和修改
    dataFormSubmit () {
      this.dataForm.materialName = this.material.find((item) => item.materialCode === this.dataForm.materialCode).materialName
      this.$http(`${this.id ? BASICDATA_API.CATEGORY_UPDATE : BASICDATA_API.CATEGORY_SAVE}`, 'POST', this.dataForm).then(({data}) => {
        if (data.code === 0) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取物料
    GetMaterial (n) {
      this.$http(`${BASICDATA_API.MATERIAL_LIST}`, 'POST', {factory: n, materialTypeCode: 'ZHAL'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.material = data.list
        } else {
          this.$message.error(data.msg)
        }
      })
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
