<template>
  <div>
    <echarts-head></echarts-head>
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
  methods: {},
  computed: {},
  components: {
    EchartsHead: resolve => {
      require(['../../layout/EchartsHead'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
