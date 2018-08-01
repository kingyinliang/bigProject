<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据录入</el-breadcrumb-item>
        <el-breadcrumb-item>包装车间</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>包装车间</h3>
    </div>
    <div class="main">
      <el-card>
        <el-form :model="plantList" size="small" :inline="true" label-position="left" label-width="40px" ref="">
          <el-form-item label="工厂">
            <el-select v-model="plantList.name" placeholder="请选择">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车间">
            <el-select v-model="plantList.name" placeholder="请选择">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker type="date" placeholder="选择" v-model="plantList.connect"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" >查询</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
        <el-row :gutter="10">
          <el-col :span="12" v-for="item in 4" :key="item" style="margin-bottom: 10px">
            <el-card class="box-card">
              <div class="clearfix">
                <b>六月鲜特级酱油/160ml</b>
                <el-button @click="goPro" type="primary" size="small" style="float: right">数据录入</el-button>
              </div>
              <div class="clearfix item">
                <img src="assets/img/avatar.png" alt="">
                <div class="itemForm">
                  <el-form :model="plantList" size="small" label-position="right" label-width="68px">
                    <el-form-item label="产线">
                     <p>{{plantList.name}}</p>
                    </el-form-item>
                    <el-form-item label="订单号">
                      <p>{{plantList.name}}</p>
                    </el-form-item>
                    <el-form-item label="品项">
                      <p>{{plantList.name}}</p>
                    </el-form-item>
                    <el-form-item label="计划产量">
                      <p>{{plantList.name}}</p>
                    </el-form-item>
                    <el-form-item label="实时产量">
                      <p>{{plantList.name}}</p>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
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
      plantList: {}
    }
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

<style lang="scss" scoped>
.box-card{
  b{
    font-size: 16px;
    line-height: 32px;
    float: left;
  }
  .item{
    margin-top: 20px;
    display: flex;
    img{
      float: left;
      width: 200px;
      height: 240px;
      margin-right: 50px;
    }
    .itemForm{
      flex: 1;
      p{
        color: #8a979e;
      }
    }
  }
}
</style>
