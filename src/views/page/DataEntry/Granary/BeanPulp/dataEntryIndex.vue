<template>
  <el-row>
    <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
      <div class="main">
        <el-card class="searchCard newCard" style="margin: 0">
          <el-row type="flex" class="header">
            <el-col class="header-pot">
              <div class='header-pot__label'>层豆粕罐号：{{formData.holderName ? formData.holderName : ''}}</div>
              <div class="header-pot__image">
                <div class="header-pot__image_box">
                  <div class="header-pot__image_content" :style="{height: `${(formData.current*1)/(formData.capacity)}%`}">
                </div>
                </div>
              </div>
            </el-col>
            <el-col class="header-form">
              <el-form :inline="true" size="small" label-width="100px" class="topform">
                <el-form-item label="生产工厂：">
                  <p class="header-form_input">{{formData.factoryName ? formData.factoryName : ''}}</p>
                </el-form-item>
                <el-form-item label="物理区域：">
                  <p class="header-form_input">{{formData.area ? formData.area : ''}}</p>
                </el-form-item>
                <el-form-item label="容器号：">
                  <p class="header-form_input">{{formData.holderName ? formData.holderName : ''}}</p>
                </el-form-item>
                <el-form-item label="罐体容量：">
                  <p class="header-form_input">{{formData.capacity ? formData.capacity : ''}}KG</p>
                </el-form-item>
                <el-form-item label="物料编码：">
                  <p class="header-form_input">{{formData.materialNo ? formData.materialNo : '' + ' ' + formData.materialName ? formData.materialName : ''}}</p>
                </el-form-item>
                <el-form-item label="当前总量：">
                  <p class="header-form_input">{{formData.current ? formData.current : ''}}KG</p>
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
              <el-row>
                <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
                  <el-table-column type="selection" width="35"></el-table-column>
                  <el-table-column type="index" label="序号" width="55"></el-table-column>
                  <el-table-column label="物料" :show-overflow-tooltip="true">
                    <template slot-scope="scope" width="120">
                      {{scope.row.materialCode + ' ' + scope.row.materialName}}
                    </template>
                  </el-table-column>
                  <el-table-column label="批次" :show-overflow-tooltip="true" width="120">
                    <template slot-scope="scope">
                      {{scope.row.batch}}
                    </template>
                  </el-table-column>
                  <el-table-column label="入库日期" :show-overflow-tooltip="true" width="120">
                    <template slot-scope="scope">
                      {{scope.row.postingDate}}
                    </template>
                  </el-table-column>
                  <el-table-column label="入库数量(t)" :show-overflow-tooltip="true" width="120" >
                    <template slot-scope="scope">
                      {{scope.row.quantity}}
                    </template>
                  </el-table-column>
                  <el-table-column label="当前数量(t)" width="120">
                    <template slot-scope="scope">
                      {{scope.row.currentQuantity}}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="showLog(scope.row)">查看</el-button>
                      <el-button type="primary" size="small" @click="makeAdjust">调整</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <el-row>
                <el-pagination
                  @size-change="handleSizeChangeBatch"
                  @current-change="handleCurrentChangeBatch"
                  :current-page="dataParms.currPage"
                  :page-sizes="[10, 15, 20]"
                  :page-size="dataParms.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="dataParms.totalCount">
                </el-pagination>
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
              <el-row>
                <el-pagination
                  @size-change="handleSizeChangeAdj"
                  @current-change="handleCurrentChangeAdj"
                  :current-page="adjParms.currPage"
                  :page-sizes="[10, 15, 20]"
                  :page-size="adjParms.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="adjParms.totalCount">
                </el-pagination>
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
                {{scope.row.materialCode + ' ' + scope.row.materialName}}
              </template>
            </el-table-column>
            <el-table-column label="批次" :show-overflow-tooltip="true" width="160">
              <template slot-scope="scope">
                {{scope.row.batch}}
              </template>
            </el-table-column>
            <el-table-column label="领用量(KG)" :show-overflow-tooltip="true" width="100">
              <template slot-scope="scope">
                {{scope.row.useWeight}}
              </template>
            </el-table-column>
            <el-table-column label="领用订单" :show-overflow-tooltip="true" width="120" >
              <template slot-scope="scope">
                {{scope.row.orderNo}}
              </template>
            </el-table-column>
            <el-table-column label="领用时间">
              <template slot-scope="scope">
                {{scope.row.created}}
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-pagination
              @size-change="handleSizeChangeApply"
              @current-change="handleCurrentChangeApply"
              :current-page="applyParms.currPage"
              :page-sizes="[10, 15, 20]"
              :page-size="applyParms.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="applyParms.totalCount">
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
          <el-form :model="adjustForm" label-width="100px" size="small" ref="modifyForm">
            <el-form-item label="物料：">
              <p>{{adjustForm.MATERIAL_CODE + ' ' + adjustForm.MATERIAL_NAME}}</p>
            </el-form-item>
            <el-form-item label="批次：" >
              <p>{{adjustForm.BATCH}}</p>
            </el-form-item>
            <el-form-item label="调整类型：" required>
              <el-select  placeholder="请选择"  v-model="adjustForm.ADJUST_TYPE" style="width:220px" >
                <el-option label="盘亏" value="1" ></el-option>
                <el-option label="盘赢" value="0" ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="调整量：" required>
              <el-input  type='number'  v-model.number="adjustForm.QUANTITY"  style='width:220px'/>
            </el-form-item>
            <el-form-item label="说明：">
              <el-input  type='text'  v-model.trim="adjustForm.REMARK" style='width:220px'/>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" style="color: #000000;background-color: #FFFFFF;border-color: #D9D9D9;" @click="dialogFormVisible2 = false">取消</el-button>
          <el-button type="primary" size="small" style="background-color: #1890FF;color: #FFFFFF;border-color: #1890FF;" @click="saveAdjust()">确定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {GRA_API, GRANARY_API} from '@/api/api'
@Component({
  components: {
  }
})
export default class Index extends Vue {
  holderId = this.$store.state.common.BeanPulp.holderId
  activeName = '1'
  formData = {}
  // 批次数据
  dataList = []
  dataParms = {
    holderId: this.holderId,
    currPage: 1,
    pageSize: 10,
    totalCount: 0
  }
  // 调整数据
  adjustList = []
  adjParms = {
    holderId: this.holderId,
    currPage: 1,
    pageSize: 10,
    totalCount: 0
  }
  // 领用分页数据
  applyList = []
  applyParms = {
    batch: '',
    currPage: 1,
    pageSize: 10,
    totalCount: 0
  }
  dialogFormVisible : boolean = false
  dialogFormVisible2 : boolean = false
  adjustForm = {
    MATERIAL_CODE: '',
    MATERIAL_NAME: '',
    BATCH: '',
    MATERIAL_TYPE_NAME: '',
    LOCATION: '',
    MOVE_TYPE: '',
    MATERIAL_TYPE_CODE: '',
    POSTING_DATE: '',
    CURRENT_QUANTITY: 0,
    FACTORY: '',
    HOLDER_ID: '',
    ADJUST_TYPE: '0',
    QUANTITY: 0,
    UNIT: 'KG',
    REMARK: ''
  }
  mounted () {
    this.GetBatch()
    this.adjust()
    this.GetBasic()
  }
  GetBasic () {
    Vue.prototype.$http(`${GRA_API.BASIC_API}/${this.$store.state.common.BeanPulp.factory}/${this.$store.state.common.BeanPulp.holderId}`, `POST`, {}).then(({data}) => {
      if (data.code === 0) {
        this.formData = data.data
      } else {
        this.$message.error(data.msg)
      }
    })
  }
  GetBatch () {
    Vue.prototype.$http(`${GRA_API.BATCH_API}`, `POST`, {
      holderId: this.holderId,
      currPage: this.dataParms.currPage + '',
      pageSize: this.dataParms.pageSize + '',
      totalCount: this.dataParms.totalCount + ''
    }).then(({data}) => {
      if (data.code === 0) {
        this.dataList = data.page.list
        this.dataParms.currPage = data.page.currPage
        this.dataParms.pageSize = data.page.pageSize
        this.dataParms.totalCount = data.page.totalCount
      } else {
        this.$message.error(data.msg)
      }
    })
  }
  adjust () {
    Vue.prototype.$http(`${GRA_API.BATCHADJUST_API}`, `POST`, {
      holderId: this.holderId,
      currPage: this.adjParms.currPage + '',
      pageSize: this.adjParms.pageSize + '',
      totalCount: this.adjParms.totalCount + ''
    }).then(({data}) => {
      if (data.code === 0) {
        this.adjustList = data.adjustInfo.list
        this.adjParms.currPage = data.adjustInfo.currPage
        this.adjParms.pageSize = data.adjustInfo.pageSize
        this.adjParms.totalCount = data.adjustInfo.totalCount
      } else {
        this.$message.error(data.msg)
      }
    })
  }
  showLog (row) {
    if (row) {
      this.applyParms.batch = row.batch
    }
    Vue.prototype.$http(`${GRA_API.BATCHCOLLARUSE_API}`, `POST`, {
      materielType: 'Soybean',
      batch: this.applyParms.batch,
      currPage: this.applyParms.currPage + '',
      pageSize: this.applyParms.pageSize + '',
      totalCount: this.applyParms.totalCount + ''
    }).then(({data}) => {
      if (data.code === 0) {
        this.applyList = data.collarUseInfo.list
        this.applyParms.currPage = data.collarUseInfo.currPage
        this.applyParms.pageSize = data.collarUseInfo.pageSize
        this.applyParms.totalCount = data.collarUseInfo.totalCount
        this.dialogFormVisible = true
      } else {
        this.$message.error(data.msg)
      }
    })
  }
  makeAdjust (row) {
    this.adjustForm = {
      MATERIAL_CODE: row.materialCode,
      MATERIAL_NAME: row.materialName,
      BATCH: row.batch,
      MATERIAL_TYPE_NAME: row.materialTypeName,
      LOCATION: row.location,
      MOVE_TYPE: row.moveType,
      MATERIAL_TYPE_CODE: row.materialTypeCode,
      POSTING_DATE: row.postingDate,
      CURRENT_QUANTITY: row.currentQuantity,
      FACTORY: row.factory,
      HOLDER_ID: row.holderId,
      ADJUST_TYPE: '0',
      QUANTITY: 0,
      UNIT: 'KG',
      REMARK: ''
    }
    this.dialogFormVisible2 = true
    this.dialogFormVisible2 = true
  }
  saveAdjust () {
    if (this.adjustForm.QUANTITY.toString() === '') {
      this.$message.error('调整数量不能为空')
      return false
    }
    Vue.prototype.$http(`${GRANARY_API.WHEAT_ADJUST}`, `POST`, this.adjustForm).then((res) => {
      if (res.data.code === 0) {
        this.$message.success('保存成功')
        this.GetBatch()
        this.adjust()
      } else {
        this.$message.error(res.data.msg)
      }
    })
    this.dialogFormVisible2 = false
  }
  // 改变每页条数
  handleSizeChangeBatch (val: number) {
    this.dataParms.pageSize = val
    this.GetBatch()
  }
  // 跳转页数
  handleCurrentChangeBatch (val: number) {
    this.dataParms.currPage = val
    this.GetBatch()
  }
  // 改变每页条数
  handleSizeChangeApply (val: number) {
    this.applyParms.pageSize = val
    this.showLog('')
  }
  // 跳转页数
  handleCurrentChangeApply (val: number) {
    this.applyParms.currPage = val
    this.showLog('')
  }
  // 改变每页条数
  handleSizeChangeAdj (val: number) {
    this.adjParms.pageSize = val
    this.adjust()
  }
  // 跳转页数
  handleCurrentChangeAdj (val: number) {
    this.adjParms.currPage = val
    this.adjust()
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
        .header-pot__image_box{
          position: absolute;
          bottom: 61px;
          right: 40px;
          height: 82px;
          width: 46px;
        }
        .header-pot__image_content {
          height: 65px;
          width: 46px;
          position: absolute;
          bottom: 0px;
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
