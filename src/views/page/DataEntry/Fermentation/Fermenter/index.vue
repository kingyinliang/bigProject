<template>
<div>
  <el-button type="primary" size="small" @click="godetails">详情</el-button>
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
    godetails () {
      this.$router.push({ name: `DataEntry-Fermentation-Fermenter-details` })
    }
  },
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
