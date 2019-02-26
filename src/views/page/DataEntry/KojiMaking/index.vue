<template>
  <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
    <div class="main">
      <el-card class="newCard" style="min-height: 480px">
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
              <el-form-item label="制曲日期：" label-width="70px">
                <el-date-picker type="date" v-model="params.zqDate" value-format="yyyy-MM-dd" style="width: 140px"></el-date-picker>
              </el-form-item>
              <el-form-item label="生产状态：" label-width="70px">
                <el-select v-model="params.productStatus" class="selectwpx" style="width: 140px">
                  <el-option label="正常生产" value="normal"></el-option>
                  <el-option label="无生产" value="abnormal" v-if="isAuth('wht:user:listUser')"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="width: 340px">
            <el-row class="rowButton">
              <el-button type="primary" size="small" @click="getOrderList(true)" style="float: right">查询</el-button>
              <template v-if="params.productStatus === 'abnormal'">
                <el-button v-if="searched && disabled && isAuth('wht:user:updateUser')" type="primary" size="small" @click="setDisabled(false)" style="float: right">编辑</el-button>
                <el-button v-if="!disabled" type="primary" size="small" @click="setDisabled(true)" style="float: right">返回</el-button>
              </template>
              <template v-if="params.productStatus === 'abnormal' && !disabled">
                <el-button type="primary" size="small" @click="addPeople" style="float: right">新增</el-button>
                <el-button type="primary" size="small" @click="save" style="float: right">保存</el-button>
              </template>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-if="params.productStatus === 'normal' && searched" :gutter="20">
          <!-- <el-col v-for="(item, index) in FryWheatList" :key="index" id="normal" :span="12">
            <div class="title_left" style="font-size: 16px;font-weight: bold;margin-bottom: 8px;">工序： <font style="color:red">{{item.productLineName}}</font></div>
            <div class="sole_cont">
              <el-form size="small" :inline="true" label-position="right" label-width="90px">
                <div class="itemImg">
                  <img :src="'data:image/gif;base64,' + item.img" alt="" style="width:100%; min-height:181px">
                </div>
                <div class="title_left">
                  <div style="float: left;font-size: 14px;font-weight: normal;line-height: 60px">
                    <span class="points" :style="{'background': item.orderStatus === 'noPass'? 'red': item.orderStatus === 'checked'? '#67C23A' : item.orderStatus === 'submit'? '#1890ff' : item.orderStatus === 'saved'? '#1890ff' : '#7ED321'}"></span>订单状态：<i :style="{'color': item.orderStatus === 'noPass'? 'red': item.orderStatus === 'checked'? '#67C23A' : ''}">{{item.orderStatus === 'submit'? '已提交' : item.orderStatus === 'checked' ? '审核通过' : item.orderStatus === 'noPass'?  '审核不通过' : item.orderStatus === 'saved'? '已保存' : item.orderStatus === '已同步' ? '未录入' : item.orderStatus}}</i>
                  </div>
                  <el-button @click="go(item)" type="primary" size="small" style="float: right; margin-top: 14px;background-color: #1890FF;color: white" v-if="isAuth('wht:order:list') || isAuth('sys:whtPwMaterial:list')">数据录入</el-button>
                </div>
                <div class="normal_bottom">
                    <el-form-item label="订单号：" class="width50b">
                      <el-select v-model="item.orderNo" placeholder="请选择" :change="orderchange(item)" style="width:150px">
                        <el-option label=""  value=""></el-option>
                        <el-option :label="item" v-for="(item, index) in item.order_arr" :key="index" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="计划产量：" class="width50b">
                      <div style="width:152px; border-bottom:1px solid #ccc">&nbsp;{{item.planOutput + ' ' + item.outputUnit}}</div>
                    </el-form-item>
                    <el-form-item label="品项：" class="width50b">
                      <div style="width:150px; border-bottom:1px solid #ccc">&nbsp;{{item.materialCode + ' ' + item.materialName}}</div>
                    </el-form-item>
                    <el-form-item label="实际产量：" class="width50b">
                      <div style="width:152px; border-bottom:1px solid #ccc">&nbsp;{{item.realOutput + ' ' + item.outputUnit}}</div>
                    </el-form-item>
                </div>
              </el-form>
            </div>
          </el-col> -->
        </el-row>
        <el-row v-show="params.productStatus === 'abnormal' && searched">
          <div style="min-height: 340px">
          <el-table border  header-row-class-name="tableHead" :data="datalist">
            <el-table-column label="序号" width="50" prop="id" type="index"></el-table-column>
            <el-table-column label="中/白/夜班" prop="classType" width="100">
              <template slot-scope="scope">
                <el-select v-model="scope.row.classType" placeholder="请选择" size="small" :disabled="disabled">
                  <el-option v-for="sole in DayTypeList" :key="sole" :value="sole" :label="sole"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="工序"  width="120">
              <template slot-scope="scope">
                <el-select v-model="scope.row.deptId" placeholder="请选择" size="small" @change="changeProcType(scope.row)" :disabled="disabled">
                  <el-option v-for="sole in processesList" :key="sole.deptId" :value="sole.deptId" :label="sole.deptName"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="人员属性" prop="userType" width="110">
              <template slot-scope="scope">
                <el-select v-model="scope.row.userType" placeholder="请选择" size="small" @change="changeProcType(scope.row)" :disabled="disabled">
                  <el-option v-for="sole in EmployeeTypeList" :key="sole" :value="sole" :label="sole"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="姓名（工号）" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-col>
                  <span v-if="!disabled" style="cursor: pointer" @click="selectUser(scope.row)">
                    <i v-if="scope.row.userId!== undefined">{{scope.row.userId.join(",")}}</i>
                    <span>
                      <i v-if="scope.row.userType == '临时工'">点击输入临时工</i>
                      <i v-else>点击选择人员</i>
                    </span>
                  </span>
                  <span v-else style="cursor: pointer">
                    <i v-if="scope.row.userId!== undefined">{{scope.row.userId.join(",")}}</i>
                    <span>
                      <i v-if="scope.row.userType == '临时工'">点击输入临时工</i>
                      <i v-else>点击选择人员</i>
                    </span>
                  </span>
                </el-col>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" prop="startDate">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.startDate" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" placeholder="选择时间" size="small" style="width:175px" :disabled="disabled"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="用餐时间" prop="dinner" width="80">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.dinner" :disabled="disabled"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" prop="endDate">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.endDate" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" placeholder="选择时间" size="small" style="width:175px" :disabled="disabled"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" width="100px">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.remark" :disabled="disabled"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="50">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delUser(scope.row)" :disabled="disabled" v-if="isAuth('wht:user:delUser')"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="font-size:14px; line-height:30px; margin-top:10px">
            实际作业人数: {{countMan}}
          </el-row>
          </div>
          <el-row v-if="addRowStatus!=1">
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
        </el-row>
      </el-card>
    </div>
    <temporary-worker ref="temporaryWorker" @changeUser="changeUser"></temporary-worker>
    <loaned-personnel ref="loanedPersonnel" @changeUser="changeUser" :OrgTree="OrgTree" :arrList="arrList"></loaned-personnel>
    <official-worker ref="officialWorker" @changeUser="changeUser"></official-worker>
  </el-col>
</template>

<script lang="ts">
import {BASICDATA_API, WHT_API} from '@/api/api'
// import {dateFormat, orderList} from '@/net/validate'
import {Vue, Component, Watch} from 'vue-property-decorator'
import TemporaryWorker from '@/views/components/temporaryWorker.vue'
import LoanedPersonnel from '@/views/components/loanedPersonnel.vue'
import officialWorker from '@/views/components/officialWorker.vue'
import {Employee, EMPTypeList, DayTypeList} from './Employee.ts'

@Component({
  components: {
    TemporaryWorker,
    LoanedPersonnel,
    officialWorker
  }
})

export default class Index extends Vue {
  // $refs: {
  //   temporaryWorker: TemporaryWorker,
  //   loanedPersonnel: LoanedPersonnel,
  //   officialWorker: officialWorker
  // }
  // 将common中的参数复制一份到本地
  // params = JSON.parse(JSON.stringify(this.$store.state.common.ZQWorkshop))
  params = {
    factoryId: '2812A6620E204D0FBAFB40ECA8AD58FF',
    factoryName: '烟台欣和企业食品有限公司工厂',
    workshopId: 'DA8DB9D19B4043B8A600B52D9FEF93E3',
    workshopName: '炒麦一车间',
    // 制曲日期
    zqDate: '2019-02-24',
    // normal/abnormal 正常生产/无生产
    productStatus: 'normal'
  }
  factoryList = []
  workshopList = []
  processesList = []
  searched: boolean = false
  disabled: boolean = true
  // lodingStatus: boolean = false
  datalist: Array<Employee> = []
  totalList: Array<Employee> = []
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

  get countMan (): number {
    let num: number = 0
    if (this.datalist) {
      this.datalist.forEach((item) => {
        if (item.userId) {
          num += item.userId.length
        }
      })
    }
    return num
  }
  get DayTypeList () {
    return DayTypeList
  }

  get EmployeeTypeList () {
    return EMPTypeList
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
  changeProcType (row) {
    row.userId = []
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
      this.$message.error('请选择制曲时间')
      return
    }
    if (this.params.productStatus === '') {
      this.$message.error('请选择生产状态')
      return
    }
    // 保存选项值到common store
    this.setStore(this.params)
    // his.lodingStatus = true
    this.searched = true
    if (this.params.productStatus === 'normal') { // 正常生产
      // this.GetorderList()
    } else if (this.params.productStatus === 'abnormal') {
      // 无生产
      this.addRowStatus = 0
      this.disabled = true
      Vue.prototype.$http(`${WHT_API.CINDEXLISTUSER}`, 'POST', {deptId: this.params.workshopId, productDate: this.params.zqDate}).then(res => {
        // this.lodingStatus = false
        if (res.data.code === 0) {
          this.datalist = res.data.infoUser
          // if (this.currPage === 1) {
          //   this.totalList = res.data.infoUser
          //   this.datalist = res.data.infoUser.slice(0, 10)
          // }
          this.totalCount = res.data.infoUser.length
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
  // 新增人员
  addPeople () {
    let p = new Employee()
    this.datalist.push(p)
  }
  // 人员删除
  delUser (row) {
    if (typeof row.orderId !== 'undefined') {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Vue.prototype.$http(`${WHT_API.CINDEXDELUSER}`, 'POST', {orderId: row.orderId}).then(({data}) => {
          if (data.code === 0) {
            this.datalist.splice(this.datalist.indexOf(row), 1)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    } else {
      this.datalist.splice(this.datalist.indexOf(row), 1)
    }
  }
  // 选择人员 正式 借调
  selectUser (row) {
    this.row = row
    let loanedPersonnel: any = this.$refs.loanedPersonnel
    let officialWorker: any = this.$refs.officialWorker
    let temporaryWorker: any = this.$refs.temporaryWorker
    if (row.userType === EMPTypeList.TRANSFER) {
      this.$nextTick(() => {
        loanedPersonnel.init(row.userId)
      })
    } else if (row.userType === EMPTypeList.FORMAL) {
      if (row.deptId) {
        this.$nextTick(() => {
          officialWorker.init(row.deptId, row.userId)
        })
      } else {
        this.$message.error('请选择工序')
      }
    } else if (row.userType === EMPTypeList.TEMP) {
      this.$nextTick(() => {
        temporaryWorker.init(row)
      })
    } else {
      this.$message.error('请选择人员属性')
    }
  }
  // 员工确认
  changeUser (userId) {
    this.row.userId = userId
    this.$set(this.row, userId, this.row.userId)
  }
  // 改变每页条数
  handleSizeChange (val: number) {
    this.pageSize = val
    this.getOrderList()
  }
  // 跳转页数
  handleCurrentChange (val: number) {
    this.currPage = val
    // 0,10   10,20    20,30
    this.datalist = this.totalList.slice((val - 1) * this.pageSize, (val - 1) * this.pageSize + this.pageSize)
  }
  save () {
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
  @Watch('params.productStatus')
  onChangeValue (newVal: string, oldVal: string) {
    console.log('params.productStatus')
    this.searched = false
    this.setDisabled(true)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_common.scss';
</style>
<style lang="scss" scoped>
  .itemImg{
    position: relative;
    width:100%;
    min-height:181px;
    overflow: hidden;
    cursor: pointer;
    img{
      transition:All 1s ease-in-out;
    }
  }
  .itemImg:hover{
    img{
      transform:scale(1.2);
    }
  }
  .rowButton{
    button{
      margin: 0px 3px!important;
    }
  }
.box-card{
  .pro-line { border-bottom: 1px solid #dcdfe6; }
  .pro-line p { color: red; font-size: 16px; letter-spacing: .1em; }
  b{
    font-size: 16px;
    line-height: 32px;
    float: left;
  }
  .item{
    margin-top: 20px;
    display: flex;
    img{
      float: left;
      width: 220px;
      height: 220px;
      border-radius: 6px;
      border: 1px solid #dcdfe6;
      margin-right: 20px;
    }
    .itemForm{
      flex: 1;
      p{
        color: #8a979e;
      }
    }
    .margb20px{margin-bottom: 10px}
  }
}
#normal{
  .sole_cont{
    border: #E9E9E9 1px solid;
    .sole_status{
      float: right;color: #565656;font-size: 14px;min-width: 150px; position: absolute; right: 15px;top: 20px;
    }
    .points{width: 5px; height: 5px; border-radius: 50%; display: block; float: left;margin-top: 27px;margin-right: 8px}
    .title_left{border-bottom:#E9E9E9 1px solid; padding:0 15px; font-weight: bold;height: 60px;line-height: 60px;display: block;}
    .el-form-item__content{
      width: 61%;
      border-bottom: #ccc solid 1px;
    }
    .width50b{ width: 49%; margin: 5px 0}
    .normal_bottom{padding: 5px 0}
  }
}
.selectwpx{
  width:120px;
}
</style>
