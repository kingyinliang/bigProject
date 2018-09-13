<template>
  <el-dialog
    :title="userId?'修改人员信息':'新增人员'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="dataForm" status-icon :rules="dataRule" ref="dataForm"  @keyup.enter.native="dataFormSubmit()" label-width="100px">
        <el-form-item label="人员工号：">
          <el-input v-model="dataForm.workNum" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="虚拟工号：">
          <el-input v-model="dataForm.workNumTemp" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="人员姓名：" prop="realName">
          <el-input v-model="dataForm.realName" placeholder="手动输入" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职务：">
          <el-input v-model="dataForm.post" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="dataForm.email" placeholder="手动输入"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="dataForm.mobile" placeholder="手动输入"></el-input>
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
import {SYSTEMSETUP_API} from '@/api/api'
export default {
  name: 'UserAddOrUpdate',
  data () {
    return {
      deptId: '',
      userId: '',
      visible: false,
      dataForm: {
        name: '',
        realName: '',
        workNum: '',
        workNumTemp: '',
        post: '',
        email: '',
        mobile: ''
      },
      type: true,
      dataRule: {
        realName: [
          { required: true, message: '人员姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    // init
    init (deptId, id) {
      this.deptId = deptId
      if (id) {
        this.userId = id
        this.$http(`${SYSTEMSETUP_API.USERDETAIL_API}/${id}`, 'GET').then(({data}) => {
          console.log(data)
          if (data.code === 0) {
            this.dataForm = data.user
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.userId = ''
        this.dataForm = {}
      }
      this.visible = true
    },
    // 表单提交
    dataFormSubmit () {
      this.dataForm.deptId = this.deptId
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          if (this.type) {
            this.type = false
            if (this.dataForm.workNum || this.dataForm.workNumTemp) {
              if (this.userId) {
                // 修改
                this.$http(`${SYSTEMSETUP_API.USERUPDATE_API}`, 'POST', this.dataForm).then(({data}) => {
                  console.log(data)
                  if (data.code === 0) {
                    this.$message({
                      message: '操作成功',
                      type: 'success',
                      duration: 1500,
                      onClose: () => {
                        this.type = true
                        this.visible = false
                        this.$emit('refreshDataList')
                      }
                    })
                  } else {
                    this.type = true
                    this.$message.error(data.msg)
                  }
                })
              } else {
                // 新增
                this.$http(`${SYSTEMSETUP_API.USERADD_API}`, 'POST', this.dataForm).then(({data}) => {
                  console.log(data)
                  if (data.code === 0) {
                    this.$message({
                      message: '操作成功',
                      type: 'success',
                      duration: 1500,
                      onClose: () => {
                        this.type = true
                        this.visible = false
                        this.$emit('refreshDataList')
                      }
                    })
                  } else {
                    this.type = true
                    this.$message.error(data.msg)
                  }
                })
              }
            } else {
              this.type = true
              this.$message.error('人员工号和虚拟工号必须添加一个')
            }
          }
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
