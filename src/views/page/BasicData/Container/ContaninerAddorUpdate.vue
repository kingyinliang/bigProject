<template>
  <el-dialog
    :title="conid?'修改容器':'新增容器'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" label-width="100px">
        <el-form-item label="容器类型：" prop="holderType">
          <el-select v-model="dataForm.holderType" placeholder="请选择" style="width: 100%">
            <el-option label=""  value=""></el-option>
            <el-option :label="item.value" v-for="(item, index) in dictList" :key="index" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器号：" prop="holderNo">
          <el-input v-model="dataForm.holderNo" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="容器描述：">
          <el-input v-model="dataForm.holderName" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="容器量：">
          <el-input type="number" v-model="dataForm.holderHold" placeholder="手动输入" min="0"></el-input>
        </el-form-item>
        <el-form-item label="批数：">
          <el-input type="number" v-model="dataForm.holderPatch" placeholder="手动输入" min="0"></el-input>
        </el-form-item>
        <el-form-item label="物理区域：">
          <el-input v-model="dataForm.holderArea" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="归属车间：" prop="deptId">
          <el-select v-model="dataForm.deptId" placeholder="请选择" style="width: 100%">
            <el-option label=""  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
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
  name: 'ContaninerAddorUpdate',
  data () {
    return {
      conid: '',
      visible: false,
      dictList: [],
      dataForm: {
        holderType: '',
        holderNo: '',
        holderName: '',
        holderHold: 0,
        holderPatch: '',
        holderArea: '',
        deptId: ''
      },
      workshop: [],
      submitType: true,
      dataRule: {
        holderType: [
          { required: true, message: '容器类型不能为空', trigger: 'blur' }
        ],
        holderNo: [
          { required: true, message: '容器号不能为空', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '归属车间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getDictList()
    this.Getdeptcode()
  },
  methods: {
    init (id) {
      this.dataForm = {}
      if (id) {
        this.conid = id
        this.$http(`${BASICDATA_API.CONTAINERDETAIL_API}/${id}`, 'POST').then(({data}) => {
          if (data.code === 0) {
            this.dataForm.holderId = data.sysHolder.holderId
            this.dataForm.holderType = data.sysHolder.holderType
            this.dataForm.holderNo = data.sysHolder.holderNo
            this.dataForm.holderName = data.sysHolder.holderName
            this.dataForm.holderHold = data.sysHolder.holderHold
            this.dataForm.holderPatch = data.sysHolder.holderPatch
            this.dataForm.holderArea = data.sysHolder.holderArea
            this.dataForm.deptId = data.sysHolder.deptId
          } else {
            this.$message.error(data.msg)
          }
          this.visible = true
        })
      } else {
        this.conid = 0
        this.visible = true
      }
    },
    // 获取归属车间
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=workshop`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.workshop = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 容器参数下拉
    getDictList () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=holder_type`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.dictList = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    dataFormSubmit () {
      if (this.submitType) {
        this.submitType = false
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            if (this.conid) {
              this.$http(`${BASICDATA_API.CONTAINERUPDATE_API}`, 'POST', this.dataForm).then(({data}) => {
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
            } else {
              this.$http(`${BASICDATA_API.CONTAINERADD_API}`, 'POST', this.dataForm).then(({data}) => {
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
          } else {
            this.submitType = true
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
