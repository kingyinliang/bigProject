<template>
  <el-row>
    <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
      <div class="main">
        <el-card class="newCard">
          <el-row type="flex" style="border-bottom: 1px solid #E9E9E9;margin-bottom: 12px">
            <el-col>
              <el-form :model="params" size="small" :inline="true" label-position="right" label-width="42px">
                <el-form-item label="工厂：">
                  <el-select v-model="params.factoryId" class="selectwpx" style="width: 140px" @change="changeOptions('factory')">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in factoryList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="车间：">
                  <el-select v-model="params.workshopId" class="selectwpx" style="width: 140px">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in workshopList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="计划日期：" label-width="70px">
                  <el-date-picker type="date" v-model="params.zqDate" value-format="yyyy-MM-dd" style="width: 140px"></el-date-picker>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col style="width:340px">
              <el-row class="rowButton">
                <el-button type="primary" size="small" @click="getOrderList()" style="float:right">查询</el-button>
              </el-row>
            </el-col>
          </el-row>
        </el-card>
        <el-row :gutter="12" v-if="searched" style="margin-top:20px;">
          <el-col :span="12">
            <el-card>
              <el-row style="margin-bottom:10px;">
                <el-col>订单管理</el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-table @row-dblclick="showDetail" header-row-class-name="tableHead" :data="orderList"  border tooltip-effect="dark" :row-class-name="rowDelFlag">
                    <el-table-column type="index" width="55" label="序号"></el-table-column>
                    <el-table-column label="订单状态" width="100">
                      <template slot-scope="scope">
                        {{scope.row.status}}
                      </template>
                    </el-table-column>
                    <el-table-column label="订单日期" width="130">
                      <template slot-scope="scope">
                        {{scope.row.orderDate}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="订单号"
                      width="180">
                      <template slot-scope="scope">
                        {{scope.row.orderNo}}
                      </template>
                    </el-table-column>
                    <el-table-column width="200" label="品项">
                      <template slot-scope="scope">
                        {{scope.row.item}}
                      </template>
                    </el-table-column>
                    <el-table-column width="90" label="数量">
                      <template slot-scope="scope">
                        {{scope.row.number}}
                      </template>
                    </el-table-column>
                    <el-table-column label="单位" width="60">
                      <template slot-scope="scope">
                        <span>{{scope.row.unit}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="备注" width="140">
                      <template slot-scope="scope">
                        <span>{{scope.row.remark}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作"
                      fixed="right"
                      width="120">
                      <template slot-scope="scope">
                        <span class="operator" @click="orderSplit(scope.row)">拆分</span>
                        <span class="operator"></span>
                        <span class="operator" @click="orderCheck(scope.row)">核对</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="12" v-if="showdetails">
            <el-card>
              <el-row  style="margin-bottom:10px;">
                <el-col>
                  订单明细
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-table header-row-class-name="tableHead" :data="orderDetailList"  border tooltip-effect="dark" :row-class-name="rowDelFlag">
                    <el-table-column type="index" width="55" label="序号"></el-table-column>
                    <el-table-column label="曲房状态" width="80">
                      <template slot-scope="scope">
                        {{scope.row.status}}
                      </template>
                    </el-table-column>
                    <el-table-column label="订单号" width="180">
                      <template slot-scope="scope">
                        {{scope.row.orderNo}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="入罐号"
                      width="180">
                      <template slot-scope="scope">
                        {{scope.row.inPotNo}}
                      </template>
                    </el-table-column>
                    <el-table-column width="100" label="曲房">
                      <template slot-scope="scope">
                        {{scope.row.kojiMakingRoomNo}}
                      </template>
                    </el-table-column>
                    <el-table-column width="150" label="连续蒸煮">
                      <template slot-scope="scope">
                        {{scope.row.continuityNo}}
                      </template>
                    </el-table-column>
                    <el-table-column label="制曲日期" width="100">
                      <template slot-scope="scope">
                        <span>{{scope.row.kojiMakingDate}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="生产日期" width="100">
                      <template slot-scope="scope">
                        <span>{{scope.row.productDate}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="订单分配" :visible.sync="dialogFormVisible" width="900px">
        <div>
          <el-table header-row-class-name="tableHead" :data="orderDetailList"  border tooltip-effect="dark" :row-class-name="rowDelFlag">
            <el-table-column type="index" width="55" label="序号"></el-table-column>
            <el-table-column label="订单号" width="80">
              <template slot-scope="scope">
                {{scope.row.status}}
              </template>
            </el-table-column>
            <el-table-column label="品项" width="180">
              <template slot-scope="scope">
                {{scope.row.orderNo}}
              </template>
            </el-table-column>
            <el-table-column
              label="订单日期"
              width="180">
              <template slot-scope="scope">
                {{scope.row.inPotNo}}
              </template>
            </el-table-column>
            <el-table-column width="100" label="订单数量">
              <template slot-scope="scope">
                {{scope.row.kojiMakingRoomNo}}
              </template>
            </el-table-column>
            <el-table-column width="150" label="单位">
              <template slot-scope="scope">
                {{scope.row.continuityNo}}
              </template>
            </el-table-column>
            <el-table-column label="订单备注" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.kojiMakingDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="入罐号" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.productDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="曲房" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.productDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="连续蒸煮号" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.productDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="入曲日期" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.productDate}}</span>
              </template>
            </el-table-column>
            <el-table-column label="生产日期" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.productDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="60">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-plus" circle size="small" ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {BASICDATA_API} from '@/api/api'
import {Vue, Component, Watch} from 'vue-property-decorator'
import {Order, OrderDetail} from './Order.ts'

@Component({
  components: {
  }
})

export default class Index extends Vue {
  // $refs: {
  //   temporaryWorker: TemporaryWorker,
  //   loanedPersonnel: LoanedPersonnel,
  //   officialWorker: officialWorker
  // }
  // 将common中的参数复制一份到本地
  params = JSON.parse(JSON.stringify(this.$store.state.common.ZQWorkshop))
  orderList:Order[] = []
  orderDetailList:OrderDetail[] = []
  dialogFormVisible:boolean = false
  factoryList = []
  workshopList = []
  processesList = []
  searched: boolean = false
  showdetails: boolean = false
  disabled: boolean = true
  OrgTree = []
  arrList = []
  row = {
    userId: []
  }
  currPage: number = 0
  pageSize: number = 10
  totalCount: number = 0
  addRowStatus: number = 0

  mounted () {
    console.log('mounted', this.params)
    this.getFactory()
    this.getWorkshop(this.params.factoryId)
    this.getProcess(this.params.workshopId)
    this.getTree()
  }

  showDetail (row) {
    this.showdetails = true
    let detail = new OrderDetail()
    for (let i = 0; i < 5; i++) {
      this.orderDetailList.push(detail)
    }
  }
  changeOptions (flag: string) {
    if (flag === 'factory') {
      let item = this.factoryList.find(ele => ele.deptId === this.params.factoryId)
      this.params.factoryName = item.deptName
    } else if (flag === 'workshop') {
      let item = this.workshopList.find(ele => ele.deptId === this.params.workshopId)
      this.params.workshopName = item.deptName
    }
  }
  // 获取工厂
  getFactory () {
    this.factoryList = []
    Vue.prototype.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`, {}, false, false, false).then((res) => {
      if (res.data.code === 0) {
        this.factoryList = res.data.typeList
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }
  // 根据工厂获车间
  getWorkshop (fid: string) {
    this.workshopList = []
    if (fid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: fid, deptName: '炒麦'}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.workshopList = res.data.typeList
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
  // 根据车间获取工序
  getProcess (wsid: string) {
    this.processesList = []
    if (wsid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYPARENTID_API}`, 'POST', {parentId: wsid}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.processesList = data.childList
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
  setDisabled (flag: boolean) {
    this.disabled = flag
  }
  setStore (params) {
    this.$store.commit('common/updateZQWorkshop', params)
  }
  getOrderList () {
    if (this.params.factoryId === '') {
      this.$message.error('请选择工厂')
      return
    }
    if (this.params.workshopId === '') {
      this.$message.error('请选择车间')
      return
    }
    if (this.params.zqDate === null || this.params.zqDate === '') {
      this.$message.error('请选择计划时间')
      return
    }
    // 保存选项值到common store
    // this.setStore(this.params)
    this.searched = true
    let order = new Order()
    let orderDetail = new OrderDetail()
    for (let i = 0; i < 5; i++) {
      this.orderList.push(order)
      this.orderDetailList.push(orderDetail)
    }
  }
  // 获取组织结构树
  getTree () {
    this.OrgTree = []
    this.arrList = []
    Vue.prototype.$http(`${BASICDATA_API.ORGSTRUCTURE_API}`, 'GET', {}, false, false, false).then(({data}) => {
      if (data.code === 0) {
        this.OrgTree = data.deptList
        this.arrList = [this.OrgTree[0].children[0].deptId]
      } else {
        this.$message.error(data.msg)
      }
    })
  }
  rowDelFlag ({row, rowIndex}) {
    if (row.delFlag === '1') {
      return 'rowDel'
    } else {
      return ''
    }
  }
  orderSplit (row) {
    this.dialogFormVisible = true
  }
  orderCheck (row) {
    this.$router.push({ name: `DataEntry-KojiMaking-orderAuditing-index` })
  }
  @Watch('params.productStatus')
  onChangeValue (newVal: string, oldVal: string) {
    this.searched = false
    this.setDisabled(true)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_common.scss';
</style>
<style lang="scss" scoped>
  .box-item{
    height:220px;
    box-sizing:border-box;
    background:rgba(255,255,255,1);
    border-radius:2px;
    border:1px solid rgba(232,232,232,1);
    .box-item-top{
      height:178px;
      padding:10px 10px;
      padding-bottom:0px;
      border-bottom: 1px solid rgba(232,232,232,1);
      .box-item-title{
        display:flex;
        flex:1;
        justify-content:space-between;
        height:34px;
        .box-item-title-name{
          display:flex;
          flex:1;
          :first-child{
            height:30px;
            width:30px;
            border-radius:15px;
            background:#FFBF00;
            font-size:12px;
            font-weight:500;
            color:#fff;
            line-height:30px;
            text-align:center;
          }
          :nth-child(2){
            font-size:16px;
            font-weight:400;
            color:rgba(0,0,0,0.85);
            line-height:22px;
            margin-top:4px;
            margin-left:5px;
          }
        }
        .box-item-title-state{
          flex:1;
          font-size:14px;
          font-weight:500;
          color:rgba(0,0,0,0.65);
          line-height:20px;
          text-align:right;
          margin-top:4px;
          &:before{
            content:'';
            display: inline-block;
            height:6px;
            width:6px;
            margin-right:10px;
            margin-bottom:2px;
            background:rgba(126,211,33,1)
          }
        }
      }
      .box-item-container{
        display:flex;
        flex:1;
        justify-content:space-between;
        height:129px;
        .box-item-container-left{
          display:flex;
          justify-content:center;
          width:130px;
          padding-top:10px;
          .box-item-container-img{
            width:94px;
            height:86px;
            background: url('~@/assets/img/fajiaoguan.png')
          }
        }
        .box-item-container-right{
          flex:1;
          display:flex;
          flex-direction:column;
          margin-left:10px;
          .box-item-container-item{
            flex:1;
            display:flex;
            justify-content:space-between;
            .name{
              width:60px;
              font-size:12px;
              font-weight:400;
              color:rgba(0,0,0,0.45);
              line-height:20px;
            }
            .detail{
              flex:1;
              font-size:14px;
              font-weight:500;
              color:rgba(0,0,0,0.65);
              line-height:17px;
            }
          }
        }
      }
    }
    .box-item-bottom{
      height:40px;
      box-sizing:border-box;
      display:flex;
      justify-content:space-between;
      background:rgba(247,249,250,1);
      border-radius:0px 0px 2px 2px;
      .box-item-bottom-item{
        flex:1;
        text-align:center;
        line-height:40px;
        font-size:12px;
        font-weight:500;
        color:rgba(0,0,0,0.65);
        &:hover{
          color:#fff;
          background:#1890FF;
          cursor:pointer
        }
      }
      .box-item-bottom-split{
        width:1px;
        height:16px;
        background:rgba(232,232,232,1);
        margin-top:12px;
      }
    }
 }
.rowButton{
  button{
    margin: 0px 3px!important;
  }
}
.operator{
  font-size:14px;
  font-weight:400;
  color:rgba(24,144,255,1);
  line-height:22px;
  &:hover{
    cursor:pointer
  }
}
.operator:nth-child(1){
  &:before{
    content:'';
    display: inline-block;
    height:14px;
    width:14px;
    margin-top:5px;
    background: url('~@/assets/img/chaifen.png');
  }
}
.operator:nth-child(3){
  &:before{
    content:'';
    display: inline-block;
    height:14px;
    width:14px;
    margin-top:5px;
    background: url('~@/assets/img/heshi.png');
  }
}
.operator:nth-child(2){
  &:after{
    content:'';
    display: inline-block;
    height:14px;
    width:1px;
    background:rgba(233,233,233,1);
  }
}
</style>
