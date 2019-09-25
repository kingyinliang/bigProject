<template>
    <el-dialog
      title="新增库位"
      :close-on-click-modal="false"
      :visible.sync="visible"
      class="locationdialog1">
      <div style="width: 400px;margin: auto">
        <el-form ref="addLo" :model="formatDate" :rules="dataRule" size="small" label-width="110px" @keyup.enter.native="dataFormSubmit()" @submit.native.prevent>
          <el-form-item label="工厂：" prop="factory">
            <el-select v-model="formatDate.factory" @change="ChangeFactory">
              <el-option label=""  value="">请选择</el-option>
              <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车间：" prop="deptId">
            <el-select v-model="formatDate.deptId">
              <el-option label=""  value="">请选择</el-option>
              <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物料类型：" prop="materialTypeCode">
            <el-select v-model="formatDate.materialTypeCode">
              <el-option label=""  value="">请选择</el-option>
              <el-option :label="item.code + ' ' + item.value" v-for="(item, index) in sapList" :key="index" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物料编码：">
            <el-input v-model="formatDate.materialCode" placeholder="手工录入" maxlength="10"></el-input>
            <!--<el-select v-model="formatDate.material" filterable placeholder="请选择">-->
              <!--<el-option-->
                <!--v-for="item in SerchSapList"-->
                <!--:key="item.materialCode+' '+item.materialName"-->
                <!--:label="item.materialCode+' '+item.materialName"-->
                <!--:value="item.materialCode+' '+item.materialName">-->
              <!--</el-option>-->
            <!--</el-select>-->
          </el-form-item>
          <el-form-item label="库位：" prop="storageLocation">
            <el-input v-model="formatDate.storageLocation" placeholder="手工录入"></el-input>
          </el-form-item>
          <el-form-item label="是否样品库：">
            <el-select v-model="formatDate.isSample" placeholder="请选择">
              <el-option label="是"  value="1"></el-option>
              <el-option label="否"  value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发料/入库：" prop="materialOperation">
            <el-select v-model="formatDate.materialOperation" placeholder="请选择">
              <el-option label="发料"  value="发料"></el-option>
              <el-option label="入库"  value="入库"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import {BASICDATA_API, SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'LocationAdd',
  data () {
    return {
      visible: false,
      sapList: [],
      factory: [],
      workshop: [],
      formatDate: {
        factory: '',
        deptId: '',
        storageLocation: '',
        materialType: '',
        materialCode: '',
        isSample: '0',
        materialOperation: ''
      },
      submitType: true,
      dataRule: {
        factory: [
          { required: true, message: '工厂不能为空', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '车间不能为空', trigger: 'blur' }
        ],
        materialTypeCode: [
          { required: true, message: '物料类型不能为空', trigger: 'blur' }
        ],
        storageLocation: [
          { required: true, message: '库位不能为空', trigger: 'blur' }
        ],
        materialOperation: [
          { required: true, message: '发料/入库不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    // 'formatDate.factory' (n, o) {
    //   this.Getdeptbyid(n)
    //   this.spa(n)
    // }
  },
  props: {
    // SerchSapList: {}
  },
  mounted () {
    this.Getdeptcode()
  },
  methods: {
    init () {
      this.Getdeptbyid()
      this.formatDate = {
        factory: '',
        deptId: '',
        storageLocation: '',
        materialType: '',
        materialCode: '',
        isSample: '0',
        materialOperation: ''
      }
      this.visible = true
    },
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.formatDate.deptId = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    // 物料
    spa (factory) {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {type: 'material_type'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.sapList = data.dicList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 保存
    dataFormSubmit () {
      if (this.formatDate.materialCode && this.formatDate.materialCode.length !== 10) {
        this.$warning_SHINHO('物料编码为10位非必填')
        return false
      }
      if (this.submitType) {
        this.submitType = false
        this.$refs.addLo.validate((valid) => {
          if (valid) {
            this.formatDate.materialTypeCode = this.formatDate.materialTypeCode
            this.formatDate.materialTypeName = this.sapList.find(item => item.code === this.formatDate.materialTypeCode).value
            let url = `${BASICDATA_API.LOCATIONADD_API}`
            if (this.formatDate.id) {
              url = `${BASICDATA_API.LOCATIONEDIT_API}`
            }
            this.$http(url, 'POST', this.formatDate).then(({data}) => {
              if (data.code === 0) {
                this.submitType = true
                this.visible = false
                this.$success_SHINHO('操作成功')
                this.$emit('refreshDataList')
              } else {
                this.submitType = true
                this.$notify.error({title: '错误', message: data.msg})
              }
            })
          } else {
            this.submitType = true
            return false
          }
        })
      }
    },
    ChangeFactory (n) {
      this.Getdeptbyid(n)
      this.spa(n)
    },
    EditRowInfo (row) {
      this.Getdeptbyid(row.factory)
      this.spa(row.factory)
      this.formatDate = JSON.parse(JSON.stringify(row))
      this.visible = true
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss">
  .locationdialog1{
    .el-select,input{
      width: 100%!important;
    }
    .el-dialog{
      min-width: 450px;
    }
  }
</style>
<style scoped>

</style>
