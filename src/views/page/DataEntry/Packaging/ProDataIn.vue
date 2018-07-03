<template>
<div>
  <el-form :inline="true" :model="form" size="small" label-width="80px" class="topform">
    <el-form-item label="车间">
      <el-select v-model="form.region" placeholder="车间">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="产线">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="订单号">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="品项">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="计划产量">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="日期">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" >查询</el-button>
    </el-form-item>
  </el-form>
  <el-tabs v-model="activeName" id="tabs">
    <el-tab-pane name="1">
      <span slot="label">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <el-button>准备时间</el-button>
        </el-tooltip>
      </span>
      <div class="times">
        <el-form :inline="true" :model="form" size="small" label-width="110px">
          <div class="clearfix">
            <h3>录入数据单位：MIN</h3>
            <el-form-item label="是否停线交接班" style="float: right">
              <el-select v-model="form.connect" placeholder="是否停线交接班">
                <el-option label="是" value="yes"></el-option>
                <el-option label="否" value="no"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>白班录入</span>
            </div>
            <div>
              <el-form-item label="工作开始时间" >
                <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
              </el-form-item>
              <el-form-item label="开线时间" >
                <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
              </el-form-item>
              <el-form-item label="切换时间" >
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="工作结束时间" >
                <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
              </el-form-item>
              <el-form-item label="停线时间" >
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="用餐时间" >
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>夜班录入</span>
            </div>
            <div>
              <el-form-item label="工作开始时间" >
                <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
              </el-form-item>
              <el-form-item label="开线时间" >
                <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
              </el-form-item>
              <el-form-item label="切换时间" >
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="工作结束时间" >
                <el-date-picker type="date" placeholder="选择" v-model="form.date1"></el-date-picker>
              </el-form-item>
              <el-form-item label="停线时间" >
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="用餐时间" >
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </div>
          </el-card>
          <div style="padding: 20px">
            <el-form-item label="交接班">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="班前会">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="生产前准备">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="生产后清场">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
          <div class="audit"><i class="iconfont factory-shouqicaidan"></i><span>审核日志</span></div>
          <el-table
            :data="tableData"
            header-row-class-name="tableHead"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="审核动作"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核意见">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核人">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核时间">
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane name="2">
      <span slot="label">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <el-button>人员</el-button>
        </el-tooltip>
      </span>
      <div class="staff">
        <div class="clearfix">
          <h3>录入数据单位：MIN</h3>
          <div class="btn">
            <el-button type="primary" @click="addformrow">新增</el-button>
          </div>
        </div>
        <div>
          <div class="message">
            <i class="el-icon-info"></i>
            <span>已选择 <span class="num">{{multipleSelection.length}}</span> 项 <span>是否删除</span></span><span class="num" @click="cleararr">清空</span>
          </div>
          <el-table
            ref="table1"
            header-row-class-name="tableHead"
            :data="tableData3"
            border
            tooltip-effect="dark"
            style="width: 100%;margin-bottom: 20px"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="日期"
              width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="地址">
              <template slot-scope="scope">
                <el-select v-model="scope.row.crew" placeholder="车间">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="地址">
              <template slot-scope="scope">
                <el-dropdown @command="handleCommand">
                  <span class="el-dropdown-link">
                    {{ scope.row.crew }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
                    <el-dropdown-item command="狮子头">狮子头</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            border
            :data="tableData3"
            header-row-class-name="tableHead"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <el-form :inline="true" size="small" label-width="110px" style="margin: 20px 0">
            <el-form-item label="实际作业人数">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
          <div class="audit"><i class="iconfont factory-shouqicaidan"></i><span>审核日志</span></div>
          <el-table
            :data="tableData"
            header-row-class-name="tableHead"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="审核动作"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核意见">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核人">
            </el-table-column>
            <el-table-column
              prop="address"
              label="审核时间">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane name="3">
      <span slot="label">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <el-button>异常记录</el-button>
        </el-tooltip>
      </span>
      异常记录
    </el-tab-pane>
    <el-tab-pane name="4">
      <span slot="label">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <el-button>生产入库</el-button>
        </el-tooltip>
      </span>
      生产入库
    </el-tab-pane>
    <el-tab-pane name="5">
      <span slot="label">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <el-button>物料领用</el-button>
        </el-tooltip>
      </span>
      物料领用
    </el-tab-pane>
    <el-tab-pane name="6">
      <span slot="label">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <el-button>待杀菌数量</el-button>
        </el-tooltip>
      </span>
      待杀菌数量
    </el-tab-pane>
    <el-tab-pane name="7">
      <span slot="label">
        <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
          <el-button>文本记录</el-button>
        </el-tooltip>
      </span>
      文本记录
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
export default {
  name: 'ProDataIn',
  data () {
    return {
      form: {
        connect: 'yes'
      },
      activeName: '1',
      tableData: [],
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
      }],
      multipleSelection: []
    }
  },
  mounted () {
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
    },
    addformrow () {
      this.tableData3.push({
        date: '',
        name: '',
        address: '',
        crew: ''
      })
    },
    cleararr () {
      this.$refs.table1.clearSelection()
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
#tabs{
  h3{
    font-size: 16px;
    font-weight: bold;
    float: left;
  }
  border-top: 1px solid #e8e8e8;
  span{
    .el-button{
      background-color: white!important;
      font-size: 16px;
      padding: 0;
      border: none;
    }
  }
}
.times .el-input{
  width: 180px;
}
.audit{
  line-height: 40px;
  i{
    font-size: 22px;
    float: left;
  }
  span{
    margin-left: 12px;
    font-size: 16px;
    font-weight: bold;
  }
}
.staff{
  .btn{
    float: right;
  }
  .message{
    background-color: #e5f7ff;
    border-radius: 4px;
    border: solid 1px #b9e7ff;
    i{
      color:#1890ff;
      margin-left: 10px;
    }
    span{
      line-height: 40px;
      font-size: 14px;
      color: #606266;
      margin-left: 5px;
    }
    .num{
      cursor: pointer;
      color: #1890ff;
      margin: 0 5px;
    }
  }
}
</style>
<style>
#tabs .el-tabs__item{
  height: 50px;
  line-height: 50px;
}
.el-card__header{
  font-size: 14px;
  padding: 13px 20px;
  background-color: #f9f9f9;
  color: black;
  font-weight: bold;
}
.topform .el-input{
  width: 180px;
}
.el-card{
  margin-bottom: 20px;
}
</style>
