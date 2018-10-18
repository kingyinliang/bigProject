<template>
  <el-dialog
    :title="CapacityId?'修改产能信息':'新增产能'"
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
        <el-form-item label="标准产能：">
          <el-input v-model="dataForm.basicCapacity" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="单位：">
          <el-input v-model="dataForm.basicCapacity" placeholder="手动输入"></el-input>
          <el-select v-model="dataForm.material" filterable placeholder="请选择">
            <el-option v-for="item in SerchSapList" :label="item.materialCode+' '+item.materialName" :value="item.materialCode+' '+item.materialName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维护人：" prop="realName">
          <el-input v-model="dataForm.changer" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="维护时间：">
          <el-date-picker type="datetime"  v-model="dataForm.changed" placeholder="选择"></el-date-picker>
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
  name: 'CapacityAddOrUpdate',
  data () {
    return {
      deptId: '',
      visible: false,
      dataForm: {
        material: '',
        basicCapacity: '',
        changer: '',
        changed: ''
      },
      SerchSapList: [],
      dataRule: {
        realName: [
          { required: true, message: '人员姓名不能为空', trigger: 'blur' }
        ]
      }
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
    init (deptId, data) {
      this.deptId = deptId
      if (data.id) {
        this.dataForm = data
      } else {
        this.dataForm = {}
      }
    },
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {}
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
