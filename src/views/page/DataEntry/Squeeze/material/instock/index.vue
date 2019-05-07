<template>
  <el-row>
    <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
      <div class="main">
        <el-card class="newCard">
          <el-row type="flex">
            <el-col>
              <el-form :model="params" size="small" :inline="true" label-position="right" >
                <el-form-item label="生产工厂：" >
                  <el-select v-model="params.factoryId" style="width:150px" @change="changeOptions('factory')" >
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in factoryList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="生产车间：">
                  <el-select v-model="params.workshopId"  style="width:150px" @change="changeOptions('workshop')">
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in workshopList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="布浆线：">
                  <el-select v-model="params.productLineId" style="width:150px" @change="changeOptions('productline')" >
                    <el-option label="请选择" value=""></el-option>
                    <el-option v-for="sole in productlineList" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="领用日期：" >
                  <el-date-picker type="date" v-model="params.applyDate" value-format="yyyy-MM-dd" style="width:150px"></el-date-picker>
                </el-form-item>
              </el-form>
            </el-col>
            <!-- <el-col style='width:180px'>
              <div style="float:right; line-height:31px;font-size: 14px">
                <div style="float:left">
                  <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
                </div>
                <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
              </div>
            </el-col> -->
          </el-row>
          <el-row class="rowButton" style="display:flex; justify-content:flex-end;">
            <el-button type="primary" size="small"  @click="getOrderList()"  v-if="isMyAuth">查询</el-button>
            <el-button type="primary" size="small"  @click="setDisabled(!disabled)"  v-if="isMyAuth && searched">{{disabled?'编辑':'返回'}}</el-button>
            <el-button type="primary" size="small"  @click="getOrderList()"  v-if="isMyAuth && !disabled">保存</el-button>
            <el-button type="primary" size="small"  @click="getOrderList()"  v-if="isMyAuth && !disabled">提交</el-button>
          </el-row>
        </el-card>
        <el-row v-if="searched" style="margin-top:10px;background-color:#fff;padding-bottom:10px;">
          <el-col :span="5" style="">
            <el-row type="flex" justify="center" style="margin-top:20px">
              <div  class="pot-box">
                <div class="pot-box-header">
                  <span class="pot-box-title" style="margin-left:5px;">1#暂存罐</span>
                  <span class="pot-box-title" style="float:right;margin-right:5px;">领用中</span>
                </div>
                <div class='pot-box-container img'>
                </div>
                <div class="pot-box-footer" >
                  <div class="pot-box-button" @click="inPotStart()">
                    <span class="pot-box-button-title" >入罐开始</span>
                  </div>
                  <div class="pot-box-button" @click="inPotEnd()">
                    <span class="pot-box-button-title" >入罐结束</span>
                  </div>
                </div>
              </div>
            </el-row>
          </el-col>
          <el-col :span="19">
            <el-row  style="margin-top:20px">
              <el-table header-row-class-name="tableHead" :data="dataList" border tooltip-effect="dark" >
                <el-table-column label="日期" >
                  <template slot-scope="scope">
                    {{scope.row.productLineName}}
                  </template>
                </el-table-column>
                <el-table-column label="原汁罐号" :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    {{scope.row.storagePotName}}
                  </template>
                </el-table-column>
                <el-table-column label="原汁批次" >
                  <template slot-scope="scope">
                    {{scope.row.fermentPotName}}
                  </template>
                </el-table-column>
                <el-table-column label="起始数"  >
                  <template slot-scope="scope">
                    {{scope.row.batch}}
                  </template>
                </el-table-column>
                <el-table-column label="结束数">
                  <template slot-scope="scope">
                    {{scope.row.remainAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="入罐数量" >
                  <template slot-scope="scope">
                    {{scope.row.startAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="满罐数量" >
                  <template slot-scope="scope">
                    {{scope.row.endAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="单位" >
                  <template slot-scope="scope">
                    {{scope.row.amount}}
                  </template>
                </el-table-column>
                <el-table-column label="混合罐类型" width="130">
                  <template slot-scope="scope">
                    {{scope.row.storageAmount}}
                  </template>
                </el-table-column>
                <el-table-column label="是否满罐" >
                  <template slot-scope="scope">
                    {{scope.row.unit}}
                  </template>
                </el-table-column>
                <el-table-column label="满罐日期" >
                  <template slot-scope="scope">
                    {{scope.row.remark}}
                  </template>
                </el-table-column>
                <el-table-column label="生产操作人" width='140' >
                  <template slot-scope="scope">
                    {{scope.row.changed}}
                  </template>
                </el-table-column>
                <el-table-column label="备注" >
                  <template slot-scope="scope">
                    {{scope.row.changer}}
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-dialog :visible.sync="dialogFormVisible" width="500px" custom-class='dialog__class'>
        <div slot="title" class='title'>
          <span>1#入罐开始</span>
        </div>
        <div >
          <el-form :model="startForm"  :label-width="formLabelWidth" size="small" ref="startForm">
            <el-form-item label="原汁罐号：" prop="fermentPotNo">
              <el-input  v-model.trim="startForm.fermentPotNo" style='width:220px'/>
            </el-form-item>
            <el-form-item label="批次：" prop="batch">
              <el-input v-model.trim="startForm.batch" style='width:220px'/>
            </el-form-item>
            <el-form-item label="起始数：" prop="startAmount">
              <el-input  type='number' v-model.number="startForm.startAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="混合罐类型：">
              <el-input v-model.trim="startForm.batch" style='width:220px'/>
            </el-form-item>
            <el-form-item label="操作时间：">
              <label>{{startForm.changed}}</label>
            </el-form-item>
            <el-form-item label="操作人：">
              <label>{{startForm.changer}}</label>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" style="color: #000000;background-color: #FFFFFF;border-color: #D9D9D9;" @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" size="small" style="background-color: #1890FF;color: #FFFFFF;border-color: #1890FF;" @click="saveStart('1')">保存</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormVisible2" width="500px" custom-class='dialog__class'>
        <div slot="title" class='title'>
          <span>1#入罐结束</span>
        </div>
        <div>
          <el-form :model="endForm"  :label-width="formLabelWidth" size="small" ref="endForm">
            <el-form-item label="原汁罐号：" prop="fermentPotNo">
              <el-input  v-model="endForm.fermentPotNo" style='width:220px'/>
            </el-form-item>
            <el-form-item label="批次：" prop="batch">
              <el-input v-model="endForm.batch" style='width:220px'/>
            </el-form-item>
            <el-form-item label="结束数：" prop="endAmount">
              <el-input  type='number' v-model.number="endForm.endAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="是否满罐：">
              <label></label>
            </el-form-item>
            <el-form-item label="满罐数量：" prop="endAmount">
              <el-input  type='number' v-model.number="endForm.endAmount" style='width:220px'/>
            </el-form-item>
            <el-form-item label="满罐日期：" prop="endAmount">
              <el-date-picker type="date"  value-format="yyyy-MM-dd" style="width:220px"></el-date-picker>
            </el-form-item>
            <el-form-item label="备注：" >
              <el-input v-model="endForm.remark" style='width:220px'/>
            </el-form-item>
            <el-form-item label="操作时间：" >
              <label>{{endForm.changed}}</label>
            </el-form-item>
            <el-form-item label="操作人：" >
              <label>{{endForm.changer}}</label>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" style="color: #000000;background-color: #FFFFFF;border-color: #D9D9D9;" @click="dialogFormVisible2 = false">取消</el-button>
          <el-button type="primary" size="small" style="background-color: #1890FF;color: #FFFFFF;border-color: #1890FF;" @click="dialogFormVisible2 = false">保存</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import {BASICDATA_API, SQU_API} from '@/api/api'
import {dateFormat} from '@/net/validate'
import {Vue, Component, Watch} from 'vue-property-decorator'

@Component({
  components: {
  }
})

export default class Index extends Vue {
  // 将common中的参数复制一份到本地
  params = JSON.parse(JSON.stringify(this.$store.state.common.SqueezeWorkshop))
  factoryList = []
  workshopList = []
  productlineList = []
  dataList = []
  searched: boolean = false
  disabled: boolean = true
  dialogFormVisible:boolean = false
  dialogFormVisible2:boolean = false
  formLabelWidth: string = '130px'
  startForm = {
    fermentPotNo: '',
    fermentPotName: '',
    batch: '',
    remainAmount: 0,
    startAmount: 0,
    storageAmount: 0,
    productLine: '',
    productLineName: '',
    changed: '',
    changer: ''
  }
  endForm = {
    fermentPotNo: '',
    fermentPotName: '',
    batch: '',
    remainAmount: 0,
    endAmount: 0,
    productLine: '',
    productLineName: '',
    remark: '',
    changed: '',
    changer: ''
  }
  dataRule = {
    fermentPotNo: [
      {required: true, message: '必填', trigger: 'blur'}
    ],
    batch: [
      {required: true, message: '必填', trigger: 'blur'},
      {max: 10, message: '长度不能超过10', trigger: 'blur'}
    ],
    startAmount: [
      {required: true, message: '必填', trigger: 'blur'}
    ]
  }
  dataRule2 = {
    fermentPotNo: [
      {required: true, message: '必填', trigger: 'blur'}
    ],
    batch: [
      {required: true, message: '必填', trigger: 'blur'},
      {max: 10, message: '长度不能超过10', trigger: 'blur'}
    ],
    endAmount: [
      {required: true, message: '必填', trigger: 'blur'}
    ]
  }
  mounted () {
    this.params.applyDate = dateFormat(new Date(), 'yyyy-MM-dd')
    this.getFactory()
    this.getWorkshop(this.params.factoryId)
    this.getProductLine(this.params.workshopId)
  }
  isAuth (key) {
    return Vue.prototype.isAuth(key)
  }
  get isMyAuth () {
    return true
  }
  get mainTabs () {
    return this.$store.state.common.mainTabs
  }
  set mainTabs (val) {
    this.$store.commit('common/updateMainTabs', val)
  }
  // get orderStatus () {
  //   if (this.dataList && this.dataList.length > 0) {
  //     return this.dataList[0].status
  //   }
  //   return ''
  // }
  inPotStart () {
    this.startForm = {
      fermentPotNo: '',
      fermentPotName: '',
      batch: '',
      remainAmount: 0,
      startAmount: 0,
      storageAmount: 0,
      productLine: this.params.productLineName,
      productLineName: this.params.productLineName,
      changed: '',
      changer: ''
    }
    this.dialogFormVisible = true
  }
  saveStart (potNo: string) {
    if (this.startValidate()) {
      this.dataList.push(this.startForm)
      this.dialogFormVisible = false
    }
  }
  inPotEnd () {
    this.dialogFormVisible2 = true
    this.endForm = {
      fermentPotNo: '',
      fermentPotName: '',
      batch: '',
      remainAmount: 0,
      endAmount: 0,
      productLine: this.params.productLineId,
      productLineName: this.params.productLineName,
      remark: '',
      changed: '',
      changer: ''
    }
  }
  saveEnd (potNo) {
    Object.assign(this.dataList[this.dataList.length - 1], this.endForm)
  }
  startValidate () {
    if (this.startForm.fermentPotNo === '') {
      this.$message.error('领用发酵罐不能为空')
      return false
    } else if (this.startForm.batch === '') {
      this.$message.error('批次不能为空')
      return false
    } else if (this.startForm.startAmount.toString() === '') {
      this.$message.error('起始数不能为空')
      return false
    }
    return true
  }
  changeOptions (flag: string) {
    if (flag === 'factory') {
      let item = this.factoryList.find(ele => ele.deptId === this.params.factoryId)
      this.params.factoryName = item ? item.deptName : ''
    } else if (flag === 'workshop') {
      let item = this.workshopList.find(ele => ele.deptId === this.params.workshopId)
      this.params.workshopName = item ? item.deptName : ''
    } else if (flag === 'productline') {
      let item = this.productlineList.find(ele => ele.deptId === this.params.productlineId)
      this.params.productlineName = item ? item.deptName : ''
    }
  }
  // 获取工厂
  getFactory () {
    this.factoryList = []
    Vue.prototype.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`, {}, false, false, false).then((res) => {
      if (res.data.code === 0) {
        this.factoryList = res.data.typeList
        if (!this.params.factoryId) {
          this.params.factoryId = res.data.typeList[0].deptId
        }
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }
  // 根据工厂获车间
  getWorkshop (fid: string) {
    this.workshopList = []
    if (fid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: fid, deptName: '压榨'}, false, false, false).then(res => {
        if (res.data.code === 0) {
          this.workshopList = res.data.typeList
          if (!this.params.factoryId) {
            this.params.workshopId = res.data.typeList[0].deptId
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
  // 产线
  getProductLine (wid: string) {
    this.productlineList = []
    if (wid) {
      Vue.prototype.$http(`${BASICDATA_API.FINDORGBYPARENTID_API}`, 'POST', {parentId: wid}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.productlineList = data.childList
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
    this.$store.commit('common/updateSqueezeWorkshop', params)
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
    if (this.params.productLineId === '') {
      this.$message.error('请选择布浆线')
      return
    }
    if (this.params.applyDate === null || this.params.applyDate === '') {
      this.$message.error('请选择领用日期')
      return
    }
    // 保存选项值到common store
    this.setStore(this.params)
    this.searched = true
    // let params = {
    //   factory: this.params.factoryId,
    //   workShop: this.params.workshopId,
    //   productLine: this.params.productLineId,
    //   created: this.params.applyDate,
    //   changer: '',
    //   changed: ''
    // }
    let params = {
      factory: '1',
      workShop: '',
      productLine: '',
      created: '',
      changer: '',
      changed: ''
    }
    this.retrieveOrderList(params)
  }
  retrieveOrderList (params) {
    Vue.prototype.$http(`${SQU_API.MATERIAL_LIST_API}`, `POST`, params, false, false, false).then((res) => {
      if (res.data.code === 0) {
        this.dataList = res.data.list
      } else {
        this.$message.error(res.data.msg)
      }
    })
  }
  @Watch('params', {deep: true})
  onChangeValue (newVal: string, oldVal: string) {
    this.searched = false
    this.disabled = true
  }
  @Watch('params.factoryId')
  onFactoryValue (newVal: string, oldVal: string) {
    this.params.workshopId = ''
    this.params.workshopName = ''
    this.getWorkshop(newVal)
  }
  @Watch('params.workshopId')
  onChangeWorkshop (newVal: string, oldVal: string) {
    this.params.productlineId = ''
    this.params.productlineName = ''
    this.getProductLine(newVal)
  }
}
</script>
<style lang="scss" >
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
  .reqI{
    color: red;
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/_common.scss';
.pot-box {
  width:217px;
  height:250px;
  border-radius:2px;
  border:1px solid rgba(232,232,232,1);
  .pot-box-header {
    height:40px;
    line-height:40px;
    background:rgba(235,235,235,1);
    border-radius:4px 4px 0px 0px;
    .pot-box-title {
      font-size:14px;
      font-family:PingFangSC-Medium;
      font-weight:500;color:rgba(0,0,0,0.65);
    }
  }
  .pot-box-container {
    width:120px;
    height:120px;
    margin:auto;
    margin-top:16px;
  }
  .img {
    background: url('~@/assets/img/sq_G1.png')
  }
  .pot-box-footer {
    margin-top:20px;
    display:flex;
    justify-content:center;
    .pot-box-button {
      width:72px;
      height:24px;
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.25);
      text-align:center;
      cursor:pointer;
      margin-left: 4px;
      margin-right: 4px;
      &:hover{
        background:rgba(24,144,255,1);
      }
    }
    .pot-box-button-sel {
      background:rgba(24,144,255,1);
    }
    .pot-box-button-title {
      line-height:24px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:#000;
      &:hover{
        color:#fff;
      }
    }
    .pot-box-button-title-sel {
      color:#fff;
    }
  }
}
.rowButton{
  button{
    margin: 0px 3px!important;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
