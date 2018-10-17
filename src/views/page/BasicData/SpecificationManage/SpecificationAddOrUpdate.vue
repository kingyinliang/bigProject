<template>
  <el-dialog
    :title="SpecificationId?'修改规格信息':'新增规格'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="dataForm" status-icon :rules="dataRule" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="100px">
        <el-form-item label="物料：">
          <el-select v-model="dataForm.material" filterable placeholder="请选择">
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
  mounted () {
    this.$http(`${BASICDATA_API.SERCHSAPLIST_API}`, 'POST', {params: ''}).then(({data}) => {
      if (data.code === 0) {
        this.SerchSapList = data.allList
      } else {
        this.$message.error(data.msg)
      }
    })
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
