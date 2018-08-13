<template>
  <el-dialog
    :title="conid?'修改容器':'新增容器'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
        <el-form-item label="容器类型">
          <el-select v-model="dataForm.holderType" placeholder="请选择" style="width: 100%">
            <el-option label="HOne" value="HOne"></el-option>
            <el-option label="成品罐" value="成品罐"></el-option>
            <el-option label="半成品罐" value="半成品罐"></el-option>
            <el-option label="连续蒸煮号" value="连续蒸煮号"></el-option>
            <el-option label="曲房" value="曲房"></el-option>
            <el-option label="麦粉计量仓" value="麦粉计量仓"></el-option>
            <el-option label="豆粕计量仓" value="豆粕计量仓"></el-option>
            <el-option label="盐水罐" value="盐水罐"></el-option>
            <el-option label="筛前罐" value="筛前罐"></el-option>
            <el-option label="筛后罐" value="筛后罐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="容器号">
          <el-input v-model="dataForm.holderNo" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="容器描述">
          <el-input v-model="dataForm.holderName" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="容器量">
          <el-input type="number" v-model="dataForm.holderHold" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="批数">
          <el-input type="number" v-model="dataForm.holderPatch" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="物理区域">
          <el-input v-model="dataForm.holderArea" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="归属车间">
          <el-input v-model="dataForm.deptId" placeholder="手动输入"></el-input>
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
  name: 'ContaninerAddorUpdate',
  data () {
    return {
      conid: '',
      visible: false,
      dataForm: {
        holderType: '',
        holderNo: '',
        holderName: '',
        holderHold: 0,
        holderPatch: '',
        holderArea: '',
        deptId: ''
      },
      dataRule: {
        holderType: [
          { required: true, message: '容器类型不能为空', trigger: 'blur' }
        ],
        holderNo: [
          { required: true, message: '容器号不能为空', trigger: 'change' }
        ],
        deptId: [
          { required: true, message: '归属车间不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
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
    dataFormSubmit () {
      if (this.conid) {
        this.$http(`${BASICDATA_API.CONTAINERUPDATE_API}`, 'POST', this.dataForm).then(({data}) => {
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
      } else {
        this.$http(`${BASICDATA_API.CONTAINERADD_API}`, 'POST', this.dataForm).then(({data}) => {
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
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
