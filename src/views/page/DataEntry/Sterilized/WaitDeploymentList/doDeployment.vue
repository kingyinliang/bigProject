<template>
  <div>
    <div class="main">
      <el-card class="newCard searchCard searchCards">
        <el-form :model="formHeader" :inline="true" size="small" label-width="85px">
          <el-row>
            <el-col>
                <el-form-item label="生产工厂：">
                  <p class="input_bottom">{{this.$store.state.common.Sterilized.factory}}</p>
                </el-form-item>
                <el-form-item label="生产车间：">
                  <p class="input_bottom">{{this.$store.state.common.Sterilized.workshop}}</p>
                </el-form-item>
                <el-form-item label="调配单号：">
                  <p class="input_bottom">&nbsp;</p>
                </el-form-item>
                <el-form-item label="调配罐号：">
                  <p class="input_bottom">&nbsp;</p>
                </el-form-item>
                <el-form-item label="提交人员：">
                  <p class="input_bottom">&nbsp;</p>
                </el-form-item>
                <el-form-item label="提交日期：">
                  <p class="input_bottom">&nbsp;</p>
                </el-form-item>
                <el-form-item label="调配日期：">
                  <p class="input_bottom">&nbsp;</p>
                </el-form-item>
                <el-form-item label="杀菌物料：">
                  <p class="input_bottom">{{this.$store.state.common.Sterilized.materialCode}}{{this.$store.state.common.Sterilized.materialName}}</p>
                </el-form-item>
                <el-form-item label="订单状态：">
                  <p class="input_bottom">&nbsp;</p>
                </el-form-item>
                <el-form-item>
                  <span style="color:#606266; width:162px; float:left; margin-left:15px;">计划BL原汁总量（L）：</span>
                  <p style="float:left" class="input_bottom">{{this.$store.state.common.Sterilized.planOutputTotal}}</p>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="备注：">
              <textarea :disabled="!isRedact" style="width:941px; height:51px; background:rgba(255,255,255,1); border-radius:4px; border:1px solid rgba(217,217,217,1);"></textarea>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col style="text-align:right">
              <template>
                <el-button type="primary" size="small" @click="isRedact = !isRedact">{{isRedact === false? '编辑' : '取消'}}</el-button>
              </template>
              <template v-if="isRedact">
                <el-button type="primary" size="small" @click="GetList(true)">保存</el-button>
                <el-button type="primary" size="small" @click="GetList(true)">生成</el-button>
              </template>
            </el-col>
          </el-row>
        </el-form>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-card>
        <el-row>
          <el-col style="text-align:right">
            <el-button type="primary" @click="AddOrderNo" size="small" :disabled="!isRedact">新增</el-button>
          </el-col>
        </el-row>
        <el-table :data="orderList" border header-row-class-name="tableHead" style="margin-top:10px">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="订单号" prop="orderNo"></el-table-column>
          <el-table-column label="物料" :show-overflow-tooltip="true" width="180">
            <template slot-scope="scope">
              {{scope.row.materialCode}}{{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="订单数量" prop="planOutput" width="80"></el-table-column>
          <el-table-column label="订单单位" prop="outputUnit" width="80"></el-table-column>
          <el-table-column label="订单开始日期" prop="productDate"></el-table-column>
          <el-table-column label="订单结束日期"></el-table-column>
          <el-table-column label="生产调度员" prop="dispatchMan"></el-table-column>
          <el-table-column label="订单备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="1000px" custom-class='dialog__class'>
      <div slot="title" style="line-hight:59px">订单分配</div>
      <el-table :data="orderPropList" border header-row-class-name="tableHead">
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column label="订单号" prop="orderNo" width="120"></el-table-column>
        <el-table-column label="物料" :show-overflow-tooltip="true" width="180">
          <template slot-scope="scope">
            {{scope.row.materialCode}} {{scope.row.materialName}}
          </template>
        </el-table-column>
        <el-table-column label="订单数量" prop="planOutput" width="80"></el-table-column>
        <el-table-column label="订单单位" prop="outputUnit" width="80"></el-table-column>
        <el-table-column label="订单开始日期" prop="productDate" width="120"></el-table-column>
        <el-table-column label="订单结束日期" width="120"></el-table-column>
        <el-table-column label="生产调度员" prop="dispatchMan" width="120"></el-table-column>
        <el-table-column label="订单备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagesForm.currPage"
        :page-sizes="[1, 20, 30, 40]"
        :page-size="pagesForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagesForm.totalCount">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import {headanimation} from '@/net/validate'
import {STERILIZED_API} from '@/api/api'
export default {
  name: 'doDeployment',
  data () {
    return {
      formHeader: {},
      isRedact: false,
      dialogTableVisible: false,
      orderList: [],
      orderPropAllList: [],
      orderPropList: [],
      pagesForm: {
        currPage: 1,
        pageSize: 1,
        totalCount: 0
      }
    }
  },
  mounted () {
    headanimation(this.$)
    this.GetorderNo()
  },
  methods: {
    // 拉取订单
    GetorderNo () {
      let params = {
        factory: this.$store.state.common.Sterilized.factoryId,
        workShop: this.$store.state.common.Sterilized.workshopId,
        materialCode: this.$store.state.common.Sterilized.materialCode,
        orderNo: this.$store.state.common.Sterilized.orderNo,
        currPage: '1',
        pageSize: '9000'
      }
      this.$http(`${STERILIZED_API.WAITDEPLOYMENTLIST_API}`, 'POST', params).then(({data}) => {
        this.orderList = data.orderInfo.list
      })
    },
    // 新增订单
    AddOrderNo () {
      let params = {
        factory: this.$store.state.common.Sterilized.factoryId,
        workShop: this.$store.state.common.Sterilized.workshopId,
        materialCode: this.$store.state.common.Sterilized.materialCode,
        orderNo: this.$store.state.common.Sterilized.orderNo
      }
      this.$http(`${STERILIZED_API.DODEPLOYMENTORDERLIST_API}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          this.orderPropAllList = data.orderAddInfo
          this.orderPropList = this.DataProcessing()
          this.pagesForm.totalCount = this.orderPropAllList.length
        } else {
          this.$message.error(data.msg)
        }
      })
      this.dialogTableVisible = true
    },
    handleSizeChange (val) {
      this.pagesForm.pageSize = val
      this.orderPropList = this.DataProcessing()
    },
    handleCurrentChange (val) {
      this.pagesForm.currPage = val
      this.orderPropList = this.DataProcessing()
    },
    DataProcessing () {
      return this.orderPropAllList.slice((this.pagesForm.currPage - 1) * this.pagesForm.pageSize, Number((this.pagesForm.currPage - 1) * this.pagesForm.pageSize) + Number(this.pagesForm.pageSize))
    }
  }
}
</script>

<style lang="less">
.input_bottom {
  width:160px;
  border-bottom: 1px solid rgba(216,216,216,1);
  overflow: hidden;
  height: 33px;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.dialog__class{
  border-radius:6px 6px 6px 6px !important;
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
