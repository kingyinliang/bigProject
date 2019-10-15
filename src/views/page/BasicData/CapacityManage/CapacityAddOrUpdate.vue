<template>
  <el-dialog
    :title="CapacityId?'修改产能信息':'新增产能'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="dataForm" status-icon :rules="dataRule" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="125px" size="small">
        <el-form-item label="物料：" prop="material">
          <el-select v-model="dataForm.material" filterable placeholder="请选择" v-if="!CapacityId">
            <el-option
              v-for="item in SerchSapList"
              :key="item.sapCode+' '+item.itemName"
              :label="item.sapCode+' '+item.itemName"
              :value="item.sapCode+' '+item.itemName">
            </el-option>
          </el-select>
          <el-select v-model="dataForm.material" filterable placeholder="请选择" disabled v-else>
            <el-option
              v-for="item in SerchSapList"
              :key="item.sapCode+' '+item.itemName"
              :label="item.sapCode+' '+item.itemName"
              :value="item.sapCode+' '+item.itemName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标准产能：" prop="basicCapacity">
          <el-input v-model="dataForm.basicCapacity" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="设计产能：" prop="designCapacity">
          <el-input v-model="dataForm.designCapacity" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="有效产能：" prop="effecCapacity">
          <el-input v-model="dataForm.effecCapacity" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="单位：" prop="basicCapacityUnit">
          <el-select v-model="dataForm.basicCapacityUnit" filterable placeholder="请选择">
            <el-option v-for="item in Unit" :key="item.code" :label="item.value" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标配人力：" prop="standardOfMan">
          <el-input v-model="dataForm.standardOfMan" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="有效开始日期：" prop="effecStartDate">
          <el-date-picker type="date"  v-model="dataForm.effecStartDate" value-format="yyyy-MM-dd" placeholder="选择" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效结束日期：" prop="effecEndDate">
          <el-date-picker type="date"  v-model="dataForm.effecEndDate" value-format="yyyy-MM-dd" placeholder="选择" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="维护人：" v-if="CapacityId">
          <el-input v-model="dataForm.changer" placeholder="手动输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="维护时间：" v-if="CapacityId">
          <el-date-picker type="datetime"  v-model="dataForm.changed" placeholder="选择" disabled></el-date-picker>
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
import {BASICDATA_API, SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'CapacityAddOrUpdate',
  data () {
    return {
      Unit: [],
      CapacityId: '',
      deptId: '',
      visible: false,
      dataForm: {
        material: '',
        standardOfMan: '',
        basicCapacity: 0,
        basicCapacityUnit: '',
        effecStartDate: '',
        effecEndDate: '2019-08-21 00:00:00',
        changer: '',
        changed: ''
      },
      dataRule: {
        material: [
          { required: true, message: '物料不能为空', trigger: 'blur' }
        ],
        basicCapacity: [
          { required: true, message: '标准产能不能为空', trigger: 'blur' }
        ],
        effecCapacity: [
          { required: true, message: '有效产能不能为空', trigger: 'blur' }
        ],
        standardOfMan: [
          { required: true, message: '标配人力不能为空', trigger: 'blur' }
        ],
        basicCapacityUnit: [
          { required: true, message: '单位不能为空', trigger: 'blur' }
        ],
        effecStartDate: [
          { required: true, message: '有效开始日期不能为空', trigger: 'blur' }
        ],
        effecEndDate: [
          { required: true, message: '有效结束日期不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    SerchSapList: {}
  },
  mounted () {
    this.GetUnit()
  },
  methods: {
    // 获取单位下拉
    GetUnit () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {type: 'UNIT'}).then(({data}) => {
        if (data.code === 0) {
          this.Unit = data.dicList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    init (deptId, data) {
      this.deptId = deptId
      if (data) {
        this.CapacityId = data.id
        this.dataForm = JSON.parse(JSON.stringify(data))
        this.dataForm.material = data.materialCode + ' ' + data.materialName
      } else {
        this.CapacityId = ''
        this.dataForm = {
          effecEndDate: '9999-12-31'
        }
        this.dataForm.deptId = deptId
      }
      this.visible = true
    },
    dataFormSubmit () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.dataForm.materialCode = this.dataForm.material.substring(0, this.dataForm.material.indexOf(' '))
          this.dataForm.materialName = this.dataForm.material.substring(this.dataForm.material.indexOf(' ') + 1)
          this.$http(`${BASICDATA_API.CAPAADDORUPDATE_API}`, 'POST', this.dataForm).then(({data}) => {
            if (data.code === 0) {
              this.$success_SHINHO('操作成功')
              this.visible = false
              this.$emit('refreshDataList')
            } else {
              this.submitType = true
              this.$notify.error({title: '错误', message: data.msg})
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
  .el-select {
    display: block;
    position: relative;
  }
</style>
