<template>
  <div>
    <el-button @click="go(1)">数据录入</el-button>
    <el-button @click="go(2)">pw小麦</el-button>
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
    go (flag) {
      if (flag === 1) {
        this.$router.push({ name: `DataEntry-FryWheat-EnterData-dataEntryIndex` })
      } else {
        this.$router.push({ name: `DataEntry-FryWheat-PwWheat-dataEntryIndex` })
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
