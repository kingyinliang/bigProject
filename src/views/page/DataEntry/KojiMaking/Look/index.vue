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
            <el-form-item label="工序：">
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
    <div class="tableCard">
      <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-tabs type="border-card" class="NewDaatTtabs" id="DaatTtabs" style="margin-top:15px">
        <el-tab-pane>
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
              <el-button>工艺控制</el-button>
            </el-tooltip>
          </span>
          <Craft></Craft>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="spanview">
            <el-button>异常记录</el-button>
          </span>
          <err-record></err-record>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="spanview">
            <el-button>文本记录</el-button>
          </span>
          <text-record ref="textrecord" :isRedact="isRedact"></text-record>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
//import ErrRecord from './common/errRecord'
//import Craft from './common/craft'
export default {
  name: 'look',
  components: {
    TextRecord: resolve => {
      require(['@/views/components/textRecord'], resolve)
    },
    ErrRecord,
    Craft
  }
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
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 8px
}
.searchCard {
  .el-button--primary,.el-button--primary:focus{
    color: #000000;
    background-color: #FFFFFF;
    border-color: #D9D9D9;
  }
  .el-button--primary:hover{
    background-color: #1890FF;
    color: #FFFFFF
  }
  .el-button--primary:first-child{
    background-color: #1890FF;
    color: #FFFFFF;
    border-color: #1890FF;
  }
}
#DaatTtabs{
  border-radius: 15px;
  overflow: hidden;
}
.htitle {
  margin: 0 0 10px 0;
}
</style>
