<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生管审核</el-breadcrumb-item>
        <el-breadcrumb-item>生产入库</el-breadcrumb-item>
      </el-breadcrumb>
      <h3>生产入库</h3>
    </div>
    <div class="main">
      <el-card>
        <el-row type="flex">
          <el-col>
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
              <el-form-item label="订单">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="生产日期">
                <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
              </el-form-item>
              <el-form-item label="过账日期">
                <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
              </el-form-item>
              <el-row>
                <el-form-item label="抬头文本" class="formtextarea">
                  <el-input type="textarea"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>
          <el-col style="width: 300px">
            <el-row style="margin-bottom: 13px">
              <el-button type="primary">查询</el-button>
            </el-row>
            <el-row>
              <el-button>审核通过</el-button>
              <el-button>审核不通过</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0px">
      <el-card>
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
            type="index"
            width="50">
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
            label="入库数量"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="是否样品"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="物料批次"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="生产日期"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="入库库位"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="移动类型"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="库存类型"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="交货已完成标识"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="货架寿命到期日"
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
            label="备注"
            width="95">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="190">
            <template slot-scope="scope">
              <el-button @click="remove(scope.$index,tableData3)" type="primary">编辑</el-button>
              <el-button @click="remove(scope.$index,tableData3)">删除</el-button>
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

<style lang="scss">
  .topforms{
    .el-date-editor.el-input{
      width: auto;
    }
    input{
      width: 200px!important;
    }
    .formtextarea{
      .el-form-item__content{
        width: 500px;
      }
    }
  }
</style>
