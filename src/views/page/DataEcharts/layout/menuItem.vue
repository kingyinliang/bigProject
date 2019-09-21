<template>
  <div>
    <el-menu-item  v-for="(item, index) in container" :key="index" :index="item.holderId">
      <i :class="page.icon || ''" class="site-sidebar__menu-icon iconfont"></i>
      <span slot="title">{{item.holderNo}}</span>
    </el-menu-item>
  </div>
</template>

<script>
import { MAIN_API } from '@/api/api'
export default {
  name: 'menuItem',
  data () {
    return {
      container: []
    }
  },
  props: {
    deptId: {},
    page: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.getContainer()
  },
  methods: {
    getContainer () {
      this.$http(`${MAIN_API.CONTAINER_API}`, 'POST', {
        workShop: this.deptId
      }, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.container = data.list
        } else {
          this.$error_SHINHO(data.msg)
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
