<template>
  <el-dialog
    :title="CapacityId?'修改产能信息':'新增产能'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="dataForm" status-icon :rules="dataRule" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="100px">
        <el-form-item label="物料：">
          <el-input v-model="dataForm.workNum" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="标准产能：">
          <el-input v-model="dataForm.workNumTemp" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="维护人：" prop="realName">
          <el-input v-model="dataForm.realName" placeholder="手动输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="维护时间：">
          <el-input v-model="dataForm.post" placeholder="手动输入"></el-input>
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
export default {
  name: 'CapacityAddOrUpdate',
  data () {
    return {
      visible: false,
      dataForm: {}
    }
  },
  mounted () {
  },
  methods: {
    init () {},
    dataFormSubmit () {}
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
