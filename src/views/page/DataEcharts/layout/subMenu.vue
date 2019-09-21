<template>
  <div>
    <el-submenu
      v-for="(deptId, index) in workshop"
      :key="index"
      :index="deptId.deptId">
      <template slot="title">
        <div>
          <i :class="page.icon || ''" class="site-sidebar__menu-icon iconfont"></i>
          <span>{{ deptId.deptName.replace(/车间/g, '') }}</span>
        </div>
      </template>
      <menu-item :deptId="deptId.deptId" :page="page"></menu-item>
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
  computed: {},
  components: {
    MenuItem: resolve => {
      require(['./menuItem'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
