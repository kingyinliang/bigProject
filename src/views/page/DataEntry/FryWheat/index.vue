<template>
  <div>
    <el-button @click="go()">数据录入</el-button>
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
    go () {
      this.$router.push({ name: `DataEntry-FryWheat-EnterData-dataEntryIndex` })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
