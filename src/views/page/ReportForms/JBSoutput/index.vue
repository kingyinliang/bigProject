<template>
<el-row v-loading.fullscreen.lock="lodingS" element-loading-text="加载中">
  <div class="main">
    <el-card class="searchCard">
      <el-row type="flex">
        <el-col>
          <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="70px" class="maintain">
          </el-form>
        </el-col>
        <el-col style="width: 200px">
          <el-button type="primary" size="small" @click="GetList(true)">查询</el-button>
          <el-button type="primary" size="small" @click="ExportExcel(true)">导出Excel</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</el-row>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      lodingS: false,
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
