<template>
  <div>
    <div v-for="item in 10" :key="item">
      <el-button type="primary" @click="toRouter('1')">半成品领用</el-button>
      <el-button type="primary" @click="toRouter('2')">辅料添加</el-button>
      <el-button type="primary" @click="toRouter('3')">工艺控制</el-button>
      <el-button type="primary" @click="toRouter('4')">杀菌入库</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    toRouter (str) {
      let url
      if (str === '1') {
        url = 'DataEntry-Sterilized-SterilizedIndex-semiReceive-index'
      } else if (str === '2') {
        url = 'DataEntry-Sterilized-SterilizedIndex-acceAdd-index'
      } else if (str === '3') {
        url = 'DataEntry-Sterilized-SterilizedIndex-craftControl-index'
      } else if (str === '4') {
        url = 'DataEntry-Sterilized-SterilizedIndex-inStock-index'
      }
      this.mainTabs = this.mainTabs.filter(item => item.name !== url)
      setTimeout(() => {
        this.$router.push({ name: url })
      }, 100)
    }
  },
  computed: {
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    }
  },
  components: {}
}
</script>

<style scoped>

</style>
