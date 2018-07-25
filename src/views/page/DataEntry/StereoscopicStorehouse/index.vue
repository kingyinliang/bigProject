<template>
<div>
  <div class="topTitle">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>数据录入</el-breadcrumb-item>
      <el-breadcrumb-item>立体库</el-breadcrumb-item>
    </el-breadcrumb>
    <h3>立体库</h3>
  </div>
  <div class="main">
    <el-card>
      <el-form :inline="true" :model="form" size="small" label-width="40px" class="topforms">
        <el-row>
          <el-form-item style="float: right">
            <el-button>保存</el-button>
            <el-button>编辑</el-button>
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
          label="生产订单号"
          width="95">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="生产批次"
          width="95">
        </el-table-column>
        <el-table-column
          prop="address"
          label="人工码垛数-立体库（CAR）"
          width="95">
        </el-table-column>
        <el-table-column
          prop="name"
          label="自动码垛-立体库（CAR）"
          width="95">
        </el-table-column>
        <el-table-column
          prop="name"
          label="自动上架入库数-立体库（CAR）"
          width="95">
        </el-table-column>
        <el-table-column
          prop="name"
          label="白班产出数(BOT)"
          width="95">
        </el-table-column>
        <el-table-column
          label="立体库确认整板数(CAR)*"
          width="95">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="立体库确认半板数(CAR) *"
          width="95">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="立体库确认数(CAR)"
          width="95">
        </el-table-column>
        <el-table-column
          prop="name"
          label="差异数量(CAR)"
          width="95">
        </el-table-column>
        <el-table-column
          prop="name"
          label="差异说明"
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
