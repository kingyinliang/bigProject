<template>
<div>
  <el-form :inline="true" :model="form" size="small" label-width="80px" class="topforms">
    <el-form-item label="工厂">
      <el-select v-model="form.region" placeholder="车间">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="车间">
      <el-select v-model="form.region" placeholder="车间">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="产线">
      <el-select v-model="form.region" placeholder="车间">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
      <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
    </el-form-item>
    <el-form-item label="订单">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      form: {}
    }
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style scoped>

</style>
<style lang="scss">
  .topforms{
    .el-date-editor.el-input{
      width: auto;
    }
    input{
      width: 200px!important;
    }
  }
</style>
