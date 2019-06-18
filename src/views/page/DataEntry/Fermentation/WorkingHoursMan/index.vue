<template>
  <div class="main">
    <el-card>
      <el-row>
        <el-col>
          <el-form :inline="true" :model="form" label-width="85px">
            <el-form-item label="生产工厂："></el-form-item>
            <el-form-item label="生产车间："></el-form-item>
            <el-form-item label="罐号："></el-form-item>
            <el-form-item label="状态："></el-form-item>
            <el-form-item label="订单编号："></el-form-item>
            <el-form-item label="订单日期："></el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'working',
  data () {
    return {
      form: {
      }
    }
  }
}
</script>
