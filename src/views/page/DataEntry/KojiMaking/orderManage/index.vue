<template>
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
              <el-button type="primary" size="small" @click="getOrderList()" style="float: right">查询</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <el-row>
      </el-row>
    </div>
  </el-col>
</template>

<script lang="ts">
import {BASICDATA_API, WHT_API} from '@/api/api'
// import {dateFormat, orderList} from '@/net/validate'
import {Vue, Component, Watch} from 'vue-property-decorator'
import {Employee, EMPTypeList, DayTypeList} from '../Employee.ts'

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
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
