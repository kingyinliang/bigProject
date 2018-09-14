<template>
  <el-dialog
    title="修改密码"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div>
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
        <el-form-item label="原密码：" prop="password">
          <el-input v-model="dataForm.password" placeholder="手动输入" minlength="8" maxlength="12" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input v-model="dataForm.newPassword" placeholder="手动输入" minlength="8" maxlength="12" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="conPassword">
          <el-input v-model="dataForm.conPassword" placeholder="手动输入" minlength="8" maxlength="12" type="password"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" icon="el-icon-close">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {MAIN_API} from '@/api/api'
export default {
  name: 'updatePass',
  data () {
    return {
      dataRule: {
        password: [
          { required: true, message: '原密码必填', trigger: 'blur' },
          { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '原密码必填', trigger: 'blur' },
          { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'blur' }
        ],
        conPassword: [
          { required: true, message: '原密码必填', trigger: 'blur' },
          { min: 8, max: 12, message: '长度在 8 到 12 个字符', trigger: 'blur' }
        ]
      },
      visible: false,
      dataForm: {
        password: '',
        newPassword: '',
        conPassword: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    init () {
      this.visible = true
    },
    dataFormSubmit () {
      this.$http(`${MAIN_API.UPPASS_API}`, 'POST', this.dataForm).then(({data}) => {
        if (data.code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
            }
          })
        } else {
          this.$message.error(data.msg)
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
