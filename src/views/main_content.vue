<template>
  <main class="site-content" :class="{ 'site-content--tabs': $route.meta.isTab }">
    <!-- 主入口标签页 s -->
    <el-tabs
      v-if="$route.meta.isTab"
      v-model="mainTabsActiveName"
      :closable="true"
      @tab-click="selectedTabHandle"
      @tab-remove="removeTabHandle">
      <el-dropdown class="site-tabs__tools" :show-timeout="0">
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
          <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签页</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-tab-pane
        v-for="item in mainTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name">
        <!--<el-card :body-style="siteContentViewHeight">-->
          <iframe
            v-if="item.type === 'iframe'"
            :src="item.iframeUrl"
            width="100%" height="100%" frameborder="0" scrolling="yes">
          </iframe>
        <transition
          v-else
          name="custom-classes-transition"
          enter-active-class="animated rollIn"
          leave-active-class="animated rollOut"
        >
            <keep-alive>
              <router-view v-if="item.name === mainTabsActiveName"/>
            </keep-alive>
          </transition>
        <!--</el-card>-->
      </el-tab-pane>
    </el-tabs>
    <!-- 主入口标签页 e -->
    <!--<el-card v-else :body-style="siteContentViewHeight">-->
    <transition
      v-else
      name="custom-classes-transition"
      enter-active-class="animated rollIn"
      leave-active-class="animated rollOut"
    >
      <keep-alive>
        <div :body-style="siteContentViewHeight">
            <router-view/>
        </div>
      </keep-alive>
    </transition>
    <!--</el-card>-->
    <div class="footer">
      <p>Copyright @ 2018 烟台欣和企业食品有限公司版权所有</p>
    </div>
  </main>
</template>

<script>
import {isURL} from '@/net/validate'

export default {
  data () {
    return {}
  },
  computed: {
    documentClientHeight: {
      get () {
        return this.$store.state.common.documentClientHeight
      }
    },
    menuActiveName: {
      get () {
        return this.$store.state.common.menuActiveName
      },
      set (val) {
        this.$store.commit('common/updateMenuActiveName', val)
      }
    },
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    },
    mainTabsActiveName: {
      get () {
        return this.$store.state.common.mainTabsActiveName
      },
      set (val) {
        this.$store.commit('common/updateMainTabsActiveName', val)
      }
    },
    siteContentViewHeight () {
      var height = this.documentClientHeight - 50 - 30 - 2
      if (this.$route.meta.isTab) {
        height -= 40
        return isURL(this.$route.meta.iframeUrl) ? {height: height + 'px'} : {minHeight: height + 'px'}
      }
      return {minHeight: height + 'px'}
    }
  },
  methods: {
    // tabs, 选中tab
    selectedTabHandle (tab) {
      tab = this.mainTabs.filter(item => item.name === tab.name)
      if (tab.length >= 1) {
        this.$router.push({name: tab[0].name})
      }
    },
    // tabs, 删除tab
    removeTabHandle (tabName, add) {
      if (/录入/g.test(this.mainTabs.filter(item => item.name === tabName)[0].title)) {
        this.$confirm('为防止数据丢失请保存后关闭, 是否继续?', '关闭', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
          if (this.mainTabs.length >= 1) {
            // 当前选中tab被删除
            if (tabName === this.mainTabsActiveName) {
              this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].name}, () => {
                this.mainTabsActiveName = this.$route.name
              })
            }
          } else {
            this.menuActiveName = ''
            this.$router.push({name: 'home'})
          }
          if (add) {
            this.$nextTick(() => {
              this.$router.push({name: tabName})
            })
          }
        })
      } else {
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            this.$router.push({name: this.mainTabs[this.mainTabs.length - 1].name}, () => {
              this.mainTabsActiveName = this.$route.name
            })
          }
        } else {
          this.menuActiveName = ''
          this.$router.push({name: 'home'})
        }
      }
    },
    // tabs, 关闭当前
    tabsCloseCurrentHandle () {
      this.removeTabHandle(this.mainTabsActiveName)
    },
    // tabs, 关闭其它
    tabsCloseOtherHandle () {
      this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
    },
    // tabs, 关闭全部
    tabsCloseAllHandle () {
      this.mainTabs = []
      this.menuActiveName = ''
      this.$router.push({name: 'home'})
    },
    // tabs, 刷新当前
    tabsRefreshCurrentHandle () {
      var tempTabName = this.mainTabsActiveName
      this.removeTabHandle(tempTabName, true)
      this.$nextTick(() => {
        this.$router.push({name: tempTabName})
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .footer{
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 14px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 20px;
    font-size: 12px;
    a{
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      margin: 0 10px;
    }
  }

  @keyframes rollIn {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0) rotate(-0deg);
      transform: translate3d(-100%, 0, 0) rotate(-0deg)
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none
    }
  }

  .rollIn {
    -webkit-animation-name: rollIn;
    animation-name: rollIn
  }
  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
  }

  .animated.infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite
  }

  .animated.hinge {
    -webkit-animation-duration: 2s;
    animation-duration: 2s
  }

  .animated.bounceIn, .animated.bounceOut, .animated.flipOutX, .animated.flipOutY {
    -webkit-animation-duration: .75s;
    animation-duration: .75s
  }
</style>
