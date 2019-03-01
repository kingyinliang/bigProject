<template>
  <div class="main">
    <el-card class="newCard searchCard">
      <el-row>
        <el-col :span="21">
          <el-form :inline="true" size="small" label-width="85px">
            <el-form-item label="生产车间：">
              <p class="input_bommom">炒麦车间</p>
            </el-form-item>
            <el-form-item label="曲房号：">
              <p class="input_bommom">12</p>
            </el-form-item>
            <el-form-item label="生产订单：">
              <p class="input_bommom">7056251343251</p>
            </el-form-item>
            <el-form-item label="生产品项：">
              <p class="input_bommom">炒麦车间</p>
            </el-form-item>
            <el-form-item label="生产日期：">
              <p class="input_bommom">炒麦车间</p>
            </el-form-item>
            <el-form-item label="入罐号：">
              <p class="input_bommom">炒麦车间</p>
            </el-form-item>
            <el-form-item label="连续蒸煮号：">
              <p class="input_bommom">炒麦车间</p>
            </el-form-item>
            <el-form-item label="提交人员：">
              <p class="input_bommom">炒麦车间</p>
            </el-form-item>
            <el-form-item label="提交时间：">
              <p class="input_bommom">炒麦车间</p>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <div style="float:right; line-height:31px;font-size: 14px">
            <div style="float:left">
              <span class="point" :style="{'background': '#7ED321'}"></span>订单状态：
            </div>
            <span>未录入</span>
          </div>
        </el-col>
      </el-row>
      <el-row style="text-align:right;">
        <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry/KojiMaking/index'})">返回</el-button>
        <el-button type="primary" size="small">编辑</el-button>
        <el-button type="primary" size="small" >保存</el-button>
        <el-button type="primary" size="small" >提交</el-button>
      </el-row>
      <div class="toggleSearchBottom">
        <i class="el-icon-caret-top"></i>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'look'
}
</script>

<style lang="less" scoped>
.input_bommom {
  width: 147px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
  border-bottom: solid 1px #D8D8D8;
}
</style>
