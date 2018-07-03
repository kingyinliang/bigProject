<template>
  <div
    class="site-wrapper"
    :class="{ 'site-sidebar--fold': sidebarFold }"
    v-loading.fullscreen.lock="loading"
    element-loading-text="拼命加载中">
    <template v-if="!loading">
      <main-navbar />
      <main-sidebar />
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main-content />
      </div>
    </template>
  </div>
</template>

<script>
import {MAIN_API} from '@/api/api'
export default {
  name: 'mains',
  data () {
    return {
      loading: true
    }
  },
  created () {
    this.getUserInfo()
  },
  mounted () {
    this.resetDocumentClientHeight()
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight () {
      this.documentClientHeight = document.documentElement['clientHeight']
      window.onresize = () => {
        this.documentClientHeight = document.documentElement['clientHeight']
      }
    },
    // 获取当前管理员信息
    getUserInfo () {
      this.$http(`${MAIN_API.USERINFO_API}`, 'GET', {}).then(({data}) => {
        console.log(data)
        if (data && data.code === 0) {
          this.loading = false
          this.userId = data.user.userId
          this.userName = data.user.username
        }
      })
    }
  },
  computed: {
    documentClientHeight: {
      get () { return this.$store.state.common.documentClientHeight },
      set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
    },
    sidebarFold: {
      get () { return this.$store.state.common.sidebarFold }
    },
    userId: {
      get () { return this.$store.state.user.id },
      set (val) { this.$store.commit('user/updateId', val) }
    },
    userName: {
      get () { return this.$store.state.user.name },
      set (val) { this.$store.commit('user/updateName', val) }
    }
  },
  components: {
    MainContent: resolve => {
      require(['@/views/main_content'], resolve)
    },
    MainSidebar: resolve => {
      require(['@/views/main_leftbar'], resolve)
    },
    MainNavbar: resolve => {
      require(['@/views/main_topbar'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
