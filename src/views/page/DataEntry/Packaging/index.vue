<template>
    <div>
      <h1>包装首页</h1>
      <el-button @click="goPro">数据录入</el-button>
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
    goPro () {
      this.$router.push({ path: 'DataEntry-Packaging-ProDataIn' })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
