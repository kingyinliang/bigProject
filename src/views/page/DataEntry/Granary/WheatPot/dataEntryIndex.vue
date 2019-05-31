<template>
  <el-row>
    <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
      <div class="main">
        <el-card class="searchCard newCard" style="margin: 0">
          <el-row type="flex" class="header">
            <el-col class="header-pot">
              <div class='header-pot__label'>小麦仓罐号：4#罐</div>
              <div class="header-pot__image">
                <div class="header-pot__image_content">
                </div>
              </div>
            </el-col>
            <el-col class="header-form">
              <el-form :inline="true" size="small" label-width="100px" class="topform">
                <el-form-item label="生产工厂：">
                  <p class="header-form_input">烟台欣和企业食品有限公司</p>
                </el-form-item>
                <el-form-item label="物理区域：">
                  <p class="header-form_input">物理一区</p>
                </el-form-item>
                <el-form-item label="容器号：">
                  <p class="header-form_input">004 4#罐</p>
                </el-form-item>
                <el-form-item label="罐体容量：">
                  <p class="header-form_input">10000KG</p>
                </el-form-item>
                <el-form-item label="物料编码：">
                  <p class="header-form_input">M011111200301 小麦</p>
                </el-form-item>
                <el-form-item label="当前总量：">
                  <p class="header-form_input">778KG</p>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </div>
      <div class="main" style="padding-top: 0px">
        <div class="tableCard">
          <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-tabs ref='tabs' v-model="activeName" id="DaatTtabs" class="NewDaatTtabs" type="border-card" style="border-radius: 15px;overflow: hidden">
            <el-tab-pane name="1">
              <span slot="label" class="spanview">
                <el-button>当前库存信息</el-button>
              </span>
              <el-row style="margin-bottom:10px;">
                <el-col>
                  <el-button type="primary" size="small" style="float:right;">数据处理</el-button>
                </el-col>
              </el-row>
              <el-row>
                <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column type="index" label="序号" width="55"></el-table-column>
                  <el-table-column label="物料" :show-overflow-tooltip="true"  width="200">
                    <template slot-scope="scope" width="120">
                      M397232090 小麦
                    </template>
                  </el-table-column>
                  <el-table-column label="批次" :show-overflow-tooltip="true" width="180">
                    <template slot-scope="scope">
                      830030009030203
                    </template>
                  </el-table-column>
                  <el-table-column label="入库日期" :show-overflow-tooltip="true" width="170">
                    <template slot-scope="scope">
                      2018-09-12
                    </template>
                  </el-table-column>
                  <el-table-column label="入库数量(t)" :show-overflow-tooltip="true" width="170" >
                    <template slot-scope="scope">
                      2000
                    </template>
                  </el-table-column>
                  <el-table-column label="当前数量(t)" width="170">
                    <template slot-scope="scope">
                      100KG
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" >
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="showLog">查看</el-button>
                      <el-button type="primary" size="small" @click="makeAdjust">调整</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label"  class="spanview">
                <el-button>调整信息记录</el-button>
              </span>
              <el-row>
                <el-table header-row-class-name="tableHead" :data="adjustList" border tooltip-effect="dark" >
                  <el-table-column type="index" label="序号" width="55"></el-table-column>
                  <el-table-column label="物料" :show-overflow-tooltip="true"  width="200">
                    <template slot-scope="scope">
                      M397232090 小麦
                    </template>
                  </el-table-column>
                  <el-table-column label="批次" :show-overflow-tooltip="true" width="180">
                    <template slot-scope="scope">
                      830030009030203
                    </template>
                  </el-table-column>
                  <el-table-column label="调整类型" :show-overflow-tooltip="true" width="100">
                    <template slot-scope="scope">
                      盘赢
                    </template>
                  </el-table-column>
                  <el-table-column label="数量(t)" :show-overflow-tooltip="true" width="120" >
                    <template slot-scope="scope">
                      2000
                    </template>
                  </el-table-column>
                  <el-table-column label="说明" width="170">
                    <template slot-scope="scope">
                      手机打开数据丢失看
                    </template>
                  </el-table-column>
                  <el-table-column label="调整时间" >
                    <template slot-scope="scope">
                      2019-09-01 21:00:00
                    </template>
                  </el-table-column>
                  <el-table-column label="调整人" >
                    <template slot-scope="scope">
                      张三(198290010)
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog :visible.sync="dialogFormVisible" width="900px" custom-class='dialog__class'>
        <div slot="title" class='title'>
          <span>领用明细</span>
        </div>
        <div>
          <el-table header-row-class-name="tableHead" :data="applyList" border tooltip-effect="dark" >
            <el-table-column type="index" label="序号" width="55"></el-table-column>
            <el-table-column label="物料" :show-overflow-tooltip="true"  width="180">
              <template slot-scope="scope">
                M397232090 小麦
              </template>
            </el-table-column>
            <el-table-column label="批次" :show-overflow-tooltip="true" width="160">
              <template slot-scope="scope">
                830030009030203
              </template>
            </el-table-column>
            <el-table-column label="领用量(KG)" :show-overflow-tooltip="true" width="100">
              <template slot-scope="scope">
                900
              </template>
            </el-table-column>
            <el-table-column label="领用订单" :show-overflow-tooltip="true" width="120" >
              <template slot-scope="scope">
                4793402402
              </template>
            </el-table-column>
            <el-table-column label="领用时间">
              <template slot-scope="scope">
                2019-08-10 20:09:11
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currPage"
              :page-sizes="[10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" style="color: #000000;background-color: #FFFFFF;border-color: #D9D9D9;" @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" size="small" style="background-color: #1890FF;color: #FFFFFF;border-color: #1890FF;" @click="dialogFormVisible = false">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormVisible2" width="400px" custom-class='dialog__class'>
        <div slot="title" class='title'>
          <span>盘点调整</span>
        </div>
        <div>
           <el-form label-width="100px" size="small" ref="modifyForm">
            <el-form-item label="物料：" >
              <p>M89030200 小麦</p>
            </el-form-item>
            <el-form-item label="批次：" >
              <p>7439483040</p>
            </el-form-item>
            <el-form-item label="调整类型：">
              <el-select  placeholder="请选择"  style="width:220px" >
                <el-option label="盘亏" value="0" ></el-option>
                <el-option label="盘赢" value="1" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="调整量：">
              <el-input  type='number'  value="0" style='width:220px'/>
            </el-form-item>
            <el-form-item label="说明：">
              <el-input  type='text'  style='width:220px'/>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" style="color: #000000;background-color: #FFFFFF;border-color: #D9D9D9;" @click="dialogFormVisible2 = false">取消</el-button>
          <el-button type="primary" size="small" style="background-color: #1890FF;color: #FFFFFF;border-color: #1890FF;" @click="dialogFormVisible2 = false">确定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component({
  components: {
  }
})
export default class Index extends Vue {
  activeName = '1'
  // 批次数据
  dataList = []
  // 调整数据
  adjustList = []
  // 领用总数据
  totalList = []
  // 领用分页数据
  applyList = []
  dialogFormVisible : boolean = false
  dialogFormVisible2 : boolean = false
  currPage: number = 1
  pageSize: number = 10
  totalCount: number = 0
  mounted () {
    for (let i = 0; i < 11; i++) {
      this.dataList.push({})
      this.adjustList.push({})
      this.totalList.push({})
    }
    this.totalCount = this.totalList.length
    this.applyList = this.totalList.slice(0, this.pageSize)
  }
  showLog () {
    this.dialogFormVisible = true
  }
  makeAdjust () {
    this.dialogFormVisible2 = true
  }
  // 改变每页条数
  handleSizeChange (val: number) {
    this.pageSize = val
    this.currPage = 1
    this.applyList = this.totalList.slice((this.currPage - 1) * this.pageSize, (this.currPage - 1) * this.pageSize + this.pageSize)
  }
  // 跳转页数
  handleCurrentChange (val: number) {
    this.currPage = val
    this.applyList = this.totalList.slice((this.currPage - 1) * this.pageSize, (val - 1) * this.pageSize + this.pageSize)
  }
}
</script>
<style lang="scss" >
.topform{
  .el-form-item__content{
    height: 32px;
    border-bottom: 1px solid #D8D8D8;
  }
}
.dialog__class{
  border-radius:6px 6px 0px 0px !important;
  .el-dialog__header{
    height:59px;
    background:rgba(24,144,255,1);
    border-radius:6px 6px 0px 0px;
    color: #fff;
    font-size:20px;
    .el-dialog__headerbtn .el-dialog__close{
      color: #fff
    }
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/_common.scss';
.header {
  height: 200px;
  .header-pot {
    width: 250px;
    .header-pot__label {
      font-size: 18px;
      font-weight: 400;
      color: rgba(102,102,102,1);
      line-height:30px;
      height: 30px;
      width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    };
    .header-pot__image {
      position: relative;
      margin-top:10px;
      height:160px;
      width:250px;
      background: url('~@/assets/img/pot.png') no-repeat top right;
      background-size:contain;
      .header-pot__image_content {
        height: 65px;
        width: 46px;
        position: absolute;
        right: 40px;
        bottom: 61px;
        background: linear-gradient(#35C3FF,#1890FF);
      }
    }
  }
  .header-form {
    width: 600px;
    margin-left: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-form_input {
      width:150px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,0.85);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
