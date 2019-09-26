<template>
  <div class="pageMain">
    <echarts-head>欣和企业制曲车间数据展示中心</echarts-head>
    <div class="Container">
      <div class="Container_box">
        <div class="Container_box_table">
          <p class="Container_box_table_title">曲房状态汇总</p>
          <el-table class="KojiMakingTable"  :data="KojiMakingData" stripe row-class-name="KojiMakingTable_row">
            <el-table-column prop="holderNo" label="曲房" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="罐号" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="产品" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="温度(℃)" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="入曲时间" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="holderNo" label="阶段" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </div>
        <div class="Container_box_echarts"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      KojiMakingData: [{holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}, {holderNo: '0'}]
    }
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {
    EchartsHead: resolve => {
      require(['../../layout/EchartsHead'], resolve)
    }
  }
}
</script>

<style lang="scss">
  .KojiMakingTable{
    &.el-table::before{
      height: 0px!important;
    }
    &.el-table, .el-table__expanded-cell{
      background-color: rgba(0, 0, 0, 0);
    }
    th{
      text-align: center;
      border-bottom: none!important;
      background: rgba(0, 104, 190, 0.1)!important;
    }
    &_row,tr,&_row:hover,tr:hover{
      background: rgba(0, 0, 0, 0)!important;
      td{
        text-align: center;
        border-bottom: none!important;
        background: rgba(0,181,246, 0.1)!important;
      }
    }
    &_row.el-table__row--striped{
      background: rgba(0, 0, 0, 0)!important;
      td{
        text-align: center;
        border-bottom: none!important;
        background: rgba(0, 104, 190, 0.1)!important;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .pageMain{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .Container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 120px;
      &_box {
        width: 1153px;
        height: 480px;
        display: flex;
        justify-content: left;
        &_table{
          /*width: 60%;*/
          width: 655px;
          height: 100%;
          background: url('~@/assets/img/echartsItemBg.png') no-repeat;
          background-size:100% 100%;
          &_title{
            text-align: center;
            color: white;
            font-size: 20px;
            line-height: 32px;
          }
        }
        &_echarts{
          /*width: 40%;*/
          width: 498px;
          height: 100%;
        }
      }
    }
  }
</style>
