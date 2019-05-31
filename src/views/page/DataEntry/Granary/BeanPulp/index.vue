<template>
  <div>
    <div class="main" style="padding-bottom: 0">
      <el-card class="newCard">
        <el-row type="flex">
          <el-col>
            <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="50px">
              <el-form-item label="工厂：" style="margin-bottom: 0px">
                <el-select v-model="plantList.factoryid" class="selectwpx" style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in factory" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车间：" style="margin-bottom: 0px">
                <el-select v-model="plantList.workshopid" class="selectwpx" style="width: 140px">
                  <el-option label="请选择" value=""></el-option>
                  <el-option v-for="sole in workshop" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="width: 80px">
            <el-button type="primary" size="small" @click="GetOrderList(true)" style="float: right">查询</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="main" style="padding-top: 8px">
      <el-card class="newCard">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card class="Card_item">
              <div slot="header">层豆粕罐号：4#罐</div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      factory: [],
      workshop: [],
      plantList: {}
    }
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style lang="scss">
.Card_item{
  .el-card__header{
    padding: 15px 20px;
    font-size: 16px;
    color: #666;
  }
}
</style>
