<template>
  <div>
    <el-submenu
      v-for="(deptId, index) in workshop"
      :key="index"
      :index="deptId.deptId">
      <template slot="title">
        <div @click="goPage(deptId)">
          <i :class="page.icon || ''" class="site-sidebar__menu-icon iconfont"></i>
          <span>{{ deptId.deptName.replace(/车间/g, '') }}</span>
        </div>
      </template>
      <menu-item :deptId="deptId.deptId" :page="page.list[0]"></menu-item>
    </el-submenu>
  </div>
</template>

<script>
import { BASICDATA_API } from '@/api/api'
export default {
  name: 'subMenu',
  data () {
    return {
      factory: [],
      workshop: []
    }
  },
  inject: ['reload'],
  props: {
    page: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.getFactory()
  },
  methods: {
    goPage (deptId) {
      var route = this.dynamicMenuRoutes.filter(item => item.meta.menuId === this.page.menuId)
      if (route.length >= 1) {
        this.menuActiveName = deptId.deptId
        this.dataEchartDeptId = deptId.deptId
        this.dataEchartDeptName = deptId.deptName
        this.$router.push({ path: route[0].path })
        this.reload()
      }
    },
    getFactory () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          for (let item of this.factory) {
            this.getWorkshop(item.deptId)
          }
        } else {
          this.$error_SHINHO(data.msg)
        }
      })
    },
    getWorkshop (id) {
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {
          deptId: id,
          deptName: this.page.name.replace(/车间/g, '')
        }, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = this.workshop.concat(data.typeList)
          } else {
            this.$error_SHINHO(data.msg)
          }
        })
      }
    }
  },
  computed: {
    dataEchartDeptId: {
      get () { return this.$store.state.echarts.dataEchartDeptId },
      set (val) { this.$store.commit('echarts/updateDataEchartDeptId', val) }
    },
    dataEchartDeptName: {
      get () { return this.$store.state.echarts.dataEchartDeptName },
      set (val) { this.$store.commit('echarts/updateDataEchartDeptName', val) }
    },
    dynamicMenuRoutes: {
      get () { return this.$store.state.common.dynamicMenuRoutes },
      set (val) { this.$store.commit('common/updateDynamicMenuRoutes', val) }
    },
    menuActiveName: {
      get () { return this.$store.state.common.menuActiveName },
      set (val) { this.$store.commit('common/updateMenuActiveName', val) }
    }
  },
  components: {
    MenuItem: resolve => {
      require(['./menuItem'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
