<template>
  <div style="padding: 5px 10px">
    <el-card class="searchCard  newCard ferCard">
      <form-head :formHeader="formHeader"></form-head>
    </el-card>
    <el-card class="searchCard  newCard ferCard"></el-card>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      formHeader: {}
    }
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {
    FormHead: resolve => {
      require(['../components/formHead'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
