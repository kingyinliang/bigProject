<template>
  <el-dialog
    :title="SpecificationId?'修改规格信息':'新增规格'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="dataForm" status-icon :rules="dataRule" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="100px">
        <el-form-item label="物料：">
          <el-select v-model="dataForm.material" filterable placeholder="请选择" style="width: 100%">
            <el-option
              v-for="item in SerchSapList"
              :key="item.materialCode+' '+item.materialName"
              :label="item.materialCode+' '+item.materialName"
              :value="item.materialCode+' '+item.materialName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌：">
          <el-input v-model="dataForm.workNumTemp" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="大类：">
          <el-input v-model="dataForm.workNumTemp" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="箱规格：">
          <el-input v-model="dataForm.workNumTemp" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="瓶规格：">
          <el-input v-model="dataForm.workNumTemp" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="维护人：">
          <el-input v-model="dataForm.workNumTemp" placeholder="手动输入"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {BASICDATA_API} from '@/api/api'
export default {
  name: 'SpecificationAddOrUpdate',
  data () {
    return {
      visible: false,
      SpecificationId: '',
      dataForm: {},
      dataRule: {}
    }
  },
  props: {
    SerchSapList: {}
  },
  mounted () {
  },
  methods: {
    init (data) {
      if (data) {}
      this.visible = true
    },
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$http(`${BASICDATA_API.CAPAADDORUPDATE_API}`, 'POST', this.dataForm).then(({data}) => {
            if (data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.submitType = true
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.submitType = true
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
