<template>
<div>
  <div class="topTitle">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>数据录入</el-breadcrumb-item>
      <el-breadcrumb-item>机维组</el-breadcrumb-item>
    </el-breadcrumb>
    <h3>机维组</h3>
  </div>
  <div class="main">
    <el-card>
      <el-row type="flex">
        <el-col>
        <el-form :model="plantList" size="small" :inline="true" label-position="left" label-width="55px" class="maintain">
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
          <el-form-item label="产线">
            <el-select v-model="plantList.name" placeholder="白班/夜班">
              <el-option label="白班" value="yes"></el-option>
              <el-option label="夜班" value="no"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker type="date" placeholder="选择" v-model="plantList.connect"></el-date-picker>
          </el-form-item>
        </el-form>
        </el-col>
        <el-col style="width: 320px">
          <el-row>
            <el-button>查询</el-button>
            <el-button type="primary">保存</el-button>
            <el-button type="primary">提交</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <div class="main" style="padding-top: 0">
    <el-card>
      <el-table
        ref="maintain"
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
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="生产订单号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="品项">
        </el-table-column>
        <el-table-column
          prop="name"
          label="生产批次">
        </el-table-column>
        <el-table-column
          prop="name"
          label="自动上架数-立体库（B）">
        </el-table-column>
        <el-table-column
          prop="name"
          label="单位">
        </el-table-column>
        <el-table-column
          label="车间确认人"
          width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          label="机维组确认整板数">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" v-if="scope.row.redact"></el-input>
            <span v-if="!scope.row.redact">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="机维组确认半板数">
        </el-table-column>
        <el-table-column
          prop="name"
          label="机维组确认数">
        </el-table-column>
        <el-table-column
          prop="name"
          label="差异数量">
        </el-table-column>
        <el-table-column
          prop="name"
          label="单位">
        </el-table-column>
        <el-table-column
          prop="address"
          label="差异说明"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="机维组确认人">
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注">
        </el-table-column>
        <el-table-column
          fixed="right"
          prop="address"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="redact(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.$index,tableData3)">删除</el-button>
          </template>
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
      plantList: {},
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
  methods: {
    redact (row) {
      if (!row.redact) {
        row.redact = true
      }
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
.maintain{
  .el-date-editor.el-input,input{
    width: 180px!important;
  }
}
</style>
