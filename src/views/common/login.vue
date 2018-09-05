<template>
  <div>
    <video width="100%" height="100%" autoplay ref="videos" id="videos" muted src="http://10.8.4.153:50080/profile/video.mp4">
      您的浏览器不支持 video 标签。
    </video>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="loginForm" @keyup.enter.native="submitForm('ruleForm2')">
      <el-form-item label="账号" prop="user">
      <el-input v-model="ruleForm2.user" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {MAIN_API} from '@/api/api'

export default {
  name: 'login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        user: '',
        pass: ''
      },
      curr: 0,
      videoList: ['http://10.8.4.153:50080/profile/video.mp4'],
      rules2: {
        user: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    var that = this
    this.$refs.videos.addEventListener('ended', function () {
      that.play()
    })
  },
  methods: {
    play (e) {
      this.curr++
      if (this.curr >= this.videoList.length) this.curr = 0
      this.$refs.videos.src = this.videoList[this.curr]
      this.$refs.videos.load()
      this.$refs.videos.play()
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http(`${MAIN_API.LOGIN_API}`, 'POST', {
            username: this.ruleForm2.user,
            password: this.ruleForm2.pass
          }).then(res => {
            if (res.data.code === 0) {
              this.$cookie.set('token', res.data.token)
              // window.sessionStorage.setItem('menuList', JSON.stringify(res.data.data.menuList))
              this.$router.push({path: '/home'})
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
video{
  object-fit: fill;
}
.loginForm{
  width: 400px;
  height: 180px;
  position: fixed;
  top: 200px;
  right: 100px;
}
</style>
