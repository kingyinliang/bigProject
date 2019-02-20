<template>
  <el-submenu
    v-if="menu.list && menu.list.length >= 1"
    :index="menu.menuId + ''"
    :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
    <template slot="title">
      <div @click="gotoRouteHandle(menu)">
        <i :class="menu.icon || ''" class="site-sidebar__menu-icon iconfont"></i>
        <span>{{ menu.name }}</span>
      </div>
    </template>
    <sub-menu
      v-for="item in menu.list"
      :key="item.menuId"
      :menu="item"
      v-if="item.type != '3'&& item.type != '2'"
      :dynamicMenuRoutes="dynamicMenuRoutes">
    </sub-menu>
  </el-submenu>
  <el-menu-item v-else :index="menu.menuId + ''" @click="gotoRouteHandle(menu)">
    <i :class="menu.icon || ''" class="site-sidebar__menu-icon iconfont"></i>
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'main_leftbar_menu',
  data () {
    return {}
  },
  props: {
    menu: {
      type: Object,
      required: true
    },
    dynamicMenuRoutes: {
      type: Array,
      required: true
    }
  },
  mounted () {
  },
  methods: {
    // 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
    gotoRouteHandle (menu) {
      var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === menu.menuId)
      if (route.length >= 1) {
        this.$router.push({ path: route[0].path })
      }
    }
  },
  computed: {
    sidebarLayoutSkin: {
      get () { return this.$store.state.common.sidebarLayoutSkin }
    }
  },
  components: {
    SubMenu: resolve => {
      require(['@/views/main_leftbar_menu'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
