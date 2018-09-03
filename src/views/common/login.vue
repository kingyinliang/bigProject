<template>
  <div>
    <!--<video-player  class="video-player vjs-custom-skin"-->
                   <!--ref="videoPlayer"-->
                   <!--:playsinline="true"-->
                   <!--:options="playerOptions"-->
    <!--&gt;</video-player>-->
    <video width="100%" height="100%" autoplay>
      <source src="../../assets/video/video1.mp4" type="video/mp4">
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
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: '',
          src: '../../assets/video/video1.mp4'// url地址
          // src: 'http://www.html5videoplayer.net/videos/madagascar3.mp4'//url地址
          // src: "" //url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      curr: 0,
      videoSrc: '../../assets/video/video1.mp4',
      videoList: ['../../assets/video/video1.mp4', '../../assets/video/video2.mp4', '../../assets/video/video3.mp4', '../../../assets/video/video4.mp4'],
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
    // this.$refs.videos.src = this.videoSrc
    // this.$refs.videos.addEventListener('end', this.play())
  },
  methods: {
    play (e) {
      this.$refs.videos.src = this.videoList[this.curr]
      this.$refs.videos.load()
      this.$refs.videos.play()
      this.curr++
      if (this.curr >= this.curr.length) this.curr = 0
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
.loginForm{
  width: 400px;
  height: 180px;
  position: fixed;
  top: 200px;
  right: 100px;
}
</style>
