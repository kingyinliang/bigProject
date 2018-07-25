<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生管审核</el-breadcrumb-item>
        <el-breadcrumb-item>生产报工</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>生产报工</h3>
    </div>
    <div class="main">
      <el-card>
        <el-form :inline="true" :model="form" size="small" label-width="40px" class="topforms">
          <el-row>
            <el-form-item style="float: right">
              <el-button>编辑</el-button>
              <el-button type="primary">保存</el-button>
              <el-button>审核通过</el-button>
              <el-button>审核不通过</el-button>
            </el-form-item>
          </el-row>
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
          <el-form-item label="订单">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
          </el-form-item>
        </el-form>
        <el-table
          ref="table1"
          header-row-class-name="tableHead"
          :data="tableData3"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom: 20px">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="name"
            label="生产订单号"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="生产物料"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="计划生产数量"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="组件物料"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="发料组件数量"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="物料批次"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="出库库位"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="接口回写"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核意见"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核人"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核时间"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            width="95">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      form: {},
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }]
    }
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
  .topforms{
    .el-date-editor.el-input{
      width: auto;
    }
    input{
      width: 200px!important;
    }
  }
</style>
