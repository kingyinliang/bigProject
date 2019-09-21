<template>
  <div>
    <el-menu
      :default-active="menuActiveName || 'home'"
      class="DataEchartsMenu">
      <el-menu-item index="home" @click="menuActiveName='home';$router.push({ path: 'home' })" v-for="(item, index) in menuList.filter(it => it.type === '4')[0].list" :key="index" v-if="/总览/g.test(item.name)">
        <i :class="item.icon || ''" class="site-sidebar__menu-icon iconfont"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <sub-menu v-for="(page, index) in menuList.filter(it => it.type === '4')[0].list" :key="index" :page="page" v-if="!(/总览/g.test(page.name))"></sub-menu>
    </el-menu>
    <div class="DataEchartsContent">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      factory: [],
      workshop: []
    }
  },
  created () {
    this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
    this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
    this.routeHandle(this.$route)
  },
  mounted () {
  },
  methods: {
    // 路由操作
    routeHandle (route) {
      this.menuActiveName = (route.meta.menuId || route.name) + ''
      this.mainTabsActiveName = route.name
    }
  },
  computed: {
    menuList: {
      get () { return this.$store.state.common.menuList },
      set (val) { this.$store.commit('common/updateMenuList', val) }
    },
    menuActiveName: {
      get () { return this.$store.state.common.menuActiveName },
      set (val) { this.$store.commit('common/updateMenuActiveName', val) }
    },
    mainTabsActiveName: {
      get () { return this.$store.state.common.mainTabsActiveName },
      set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
    }
  },
  components: {
    SubMenu: resolve => {
      require(['./subMenu'], resolve)
    }
  }
}
</script>

<style lang="scss">
.DataEchartsMenu{
  border-right: none;
  width: 107px;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 60px;
  background-color: rgba(255,255,255,0);
  .el-menu{
    background-color: rgba(255,255,255,0);
  }
  .el-menu-item * ,.el-submenu__title *{
    vertical-align: inherit;
  }
  .el-submenu .el-menu-item{
    min-width: 0px!important;
  }
  .el-menu-item,.el-submenu__title{
    font-size: 15px;
    color: #59baf2;
    height: 40px;
    line-height: 40px;
    padding-left: 13px!important;
    background-image: linear-gradient(-90deg, #112041 0%, rgba(17, 32, 65, 0.5) 66%, #112041 100%);
    border: 2px solid #2461d1;
    border-left: none;
    border-radius: 0 20px 20px 0;
  }
  .el-submenu .el-menu-item{
    width: 85px;
  }
  .el-menu-item:hover,.el-submenu__title:hover{
    /*background-image: linear-gradient(-90deg, #112041 0%, rgba(17, 32, 65, 0.5) 66%, #112041 100%);*/
    background-color: rgba(255,255,255,0);
    border: 2px solid #ffffff;
    border-left: none;
  }
  li{
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
.DataEchartsContent{
  /*padding-left: 107px;*/
  min-width: 1000px;
  background: #0e0e40;
  /*background: url('~@/assets/img/echartsBg.png') #0e0e40 no-repeat 10px center;*/
  width: 100%;
  height: 100%;
}
</style>
