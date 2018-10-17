<template>
  <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
    <div class="main">
      <el-card>
        <el-row class="clearfix">
          <el-form :inline="true" :model="capacity" size="small" label-width="68px" class="topforms2">
            <el-form-item>
              <el-input v-model="capacity.capacity" placeholder="物料" suffix-icon="el-icon-search"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="GetList">查询</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-card>
    </div>
  </el-col>
</template>

<script>
export default {
  name: 'UserExport',
  data () {
    return {
      capacity: {}
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
