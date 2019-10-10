<template>
  <div class="header_main">
    <el-card class="searchCard">
      <el-form :inline="true" size="small" :model="formHeader" label-width="70px" class="topform marbottom sole_row">
        <el-form-item label="生产工厂：">
          <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产车间：">
          <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="罐号：">
          <el-select v-model="formHeader.holderId" filterable placeholder="请选择" style="width: 180px">
            <el-option label="请选择"  value=""></el-option>
            <el-option v-for="(sole, index) in PotList" :key="index" :value="sole.holderId" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatr">
          <el-button type="primary" size="small" @click="GetDataList(true)" style="float: right" v-if="isAuth('filter:holder:list')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="searchCard newCard ferCard" style="margin-top:5px" v-show="fastS">
      <h3 style="color: black;margin-bottom: 8px"><i class="iconfont factory-liebiao" style="color: #666666;margin-right: 10px"></i>成品罐区</h3>
      <el-row class="dataList" :gutter="10" style="min-height: 150px">
        <el-col :span="4" v-for="(item, index) in dataList" :key="index">
          <el-card class="dataList_item">
            <h3 class="dataList_item_tit">
              {{item.holderNo}}
              <span style="color: #333333;font-weight: normal;font-size: 14px">
                -{{item.holderStatus === '0' ? '空罐' : item.holderStatus === '1' ? '入库中' : item.holderStatus === '2' ? '满罐' : item.holderStatus === '3' ? '领用中' : item.holderStatus === '4' ? '领用完' : ''}}
              </span>
              <span class="dataList_item_a" @click="godetails(item)" style="font-size: 14px" v-if="isAuth('filter:holder:list')">详情>></span>
            </h3>
            <div class="dataList_item_pot clearfix" style="position: relative">
              <img src="@/assets/img/RD.png" alt="" v-if="item.isRdSign === '1'" style="position:absolute; left:10px; top:10px;">
              <div class="dataList_item_pot_box">
                <div class="dataList_item_pot_box1">
                  <div class="dataList_item_pot_box_item2" :style="`height:${item.holderStatus === '0' ? 0 : item.amount < 0? 0 : ((item.amount * 1) / (item.holderHold * 1)) * 100}%`"></div>
                  <div class="dataList_item_pot_box_detail" v-if="item.holderStatus !== '0'">
                    <p>{{item.batch || ''}}</p>
                    <p>{{(item.materialCode || '') + ' ' + (item.materialName || '')}}</p>
                    <p v-if="item.amount">{{item.amount/1000 || ''}}方</p>
                    <p v-if="item.timeLength">{{item.timeLength || ''}}H</p>
                  </div>
                </div>
              </div>
            </div>
            <el-row class="dataList_item_btn">
              <el-col :span="8" class="dataList_item_btn_item"><p @click="clearPot(item)">清罐</p></el-col>
              <el-col :span="8" class="dataList_item_btn_item"><p @click="JBSdialog(item)"><i class="dataList_item_btn_item_bor"></i>JBS出库</p></el-col>
              <el-col :span="8" class="dataList_item_btn_item"><p @click="TurnSavedialog(item)"><i class="dataList_item_btn_item_bor"></i>转储</p></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog width="400px" title="JBS出库" class="ShinHoDialog" :close-on-click-modal="false" :visible.sync="JBSVisible">
      <el-form :model="JBSdataForm" :rules="JBSdataRule" ref="JBSdataForm" @keyup.enter.native="JBS()" @submit.native.prevent label-width="110px"  size="small" style="width: 300px;margin: auto">
        <el-form-item label="领用罐号：" prop="receiveHolderId">
          <p>{{JBSdataForm.holderName}}</p>
        </el-form-item>
        <el-form-item label="物料：" prop="materialCode">
          <p>{{JBSdataForm.materialCode + ' ' + JBSdataForm.materialName}}</p>
        </el-form-item>
        <el-form-item label="批次：" prop="batch">
          <p>{{JBSdataForm.batch}}</p>
        </el-form-item>
        <el-form-item label="领用量(L)：" prop="receiveAmount">
          <el-input v-model="JBSdataForm.receiveAmount" size="small" placeholder="手工录入"></el-input>
        </el-form-item>
        <el-form-item label="打入罐类别：" prop="inHolderType">
          <el-select v-model="JBSdataForm.inHolderType" filterable placeholder="请选择" @change="GetHolderType(JBSdataForm.inHolderType)">
            <el-option v-for="(sole, index) in InHolderType" :key="index" :value="sole.code" :label="sole.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打入罐号：" prop="inHolderId">
          <el-select v-model="JBSdataForm.inHolderId" filterable placeholder="请选择">
            <el-option v-for="(sole, index) in Holder" :key="index" :value="sole.holderId" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否满罐：">
          <el-select v-model="JBSdataForm.isFull" filterable placeholder="请选择" style="width: 100%">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满罐日期：">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" v-model="JBSdataForm.fullDate" placeholder="请选择日期" style="width: 190px"></el-date-picker>
        </el-form-item>
        <el-form-item label="操作时间：">
          <p>{{JBSdataForm.changed}}</p>
        </el-form-item>
        <el-form-item label="操作人：">
          <p>{{JBSdataForm.changer = $store.state.user.realName + '（' + this.$store.state.user.name + '）'}}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="JBSVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="JBS()" size="small">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="400px" title="转储" class="ShinHoDialog" :close-on-click-modal="false" :visible.sync="TurnSaveVisible">
      <el-form :model="TurnSavedataForm" :rules="TurnSavedataRule" ref="TurnSavedataForm" @keyup.enter.native="TurnSave()" @submit.native.prevent label-width="110px"  size="small" style="width: 300px;margin: auto">
        <el-form-item label="领用罐号：" prop="receiveHolderId">
          <p>{{TurnSavedataForm.holderName}}</p>
        </el-form-item>
        <el-form-item label="物料：" prop="materialCode">
          <p>{{TurnSavedataForm.materialCode + ' ' + TurnSavedataForm.materialName}}</p>
        </el-form-item>
        <el-form-item label="批次：" prop="batch">
          <p>{{TurnSavedataForm.batch}}</p>
        </el-form-item>
        <el-form-item label="领用量(L)：" prop="receiveAmount">
          <el-input v-model="TurnSavedataForm.receiveAmount" size="small" placeholder="手工录入"></el-input>
        </el-form-item>
        <el-form-item label="打入罐类别：" prop="inHolderType">
          <el-select v-model="TurnSavedataForm.inHolderType" filterable placeholder="请选择" @change="GetHolderType1(TurnSavedataForm)">
            <!--<el-option v-for="(sole, index) in InHolderType" :key="index" :value="sole.code" :label="sole.name"></el-option>-->
            <el-option value="007" label="成品罐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打入罐号：" prop="inHolderId">
          <el-select v-model="TurnSavedataForm.inHolderId" filterable placeholder="请选择">
            <el-option v-for="(sole, index) in Holder" :key="index" :value="sole.holderId" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否满罐：">
          <el-select v-model="TurnSavedataForm.isFull" filterable placeholder="请选择" style="width: 100%">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满罐日期：">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm" v-model="TurnSavedataForm.fullDate" placeholder="请选择日期" style="width: 190px"></el-date-picker>
        </el-form-item>
        <el-form-item label="操作时间：">
          <p>{{TurnSavedataForm.changed}}</p>
        </el-form-item>
        <el-form-item label="操作人：">
          <p>{{TurnSavedataForm.changer = $store.state.user.realName + '（' + this.$store.state.user.name + '）'}}</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="TurnSaveVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="TurnSave()" size="small">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getFactory, getWorkshop, dateFormat} from '@/net/validate'
import {FILTRATION_API, BASICDATA_API, STERILIZED_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      fastS: false,
      JBSVisible: false,
      TurnSaveVisible: false,
      formHeader: {
        factory: '',
        workShop: '',
        holderId: ''
      },
      factory: [],
      workshop: [],
      PotList: [],
      InHolderType: [],
      Holder: [],
      dataList: [],
      JBSdataForm: {},
      JBSdataRule: {
        receiveHolderId: [
          { required: true, message: '领用罐号不能为空', trigger: 'blur' }
        ],
        materialCode: [
          { required: true, message: '物料不能为空', trigger: 'blur' }
        ],
        batch: [
          { required: true, message: '批次不能为空', trigger: 'blur' }
        ],
        receiveAmount: [
          { required: true, message: '领用量不能为空', trigger: 'blur' }
        ],
        inHolderType: [
          { required: true, message: '打入罐类别不能为空', trigger: 'blur' }
        ],
        inHolderId: [
          { required: true, message: '打入罐号不能为空', trigger: 'blur' }
        ]
      },
      TurnSavedataForm: {},
      TurnSavedataRule: {
        receiveHolderId: [
          { required: true, message: '领用罐号不能为空', trigger: 'blur' }
        ],
        materialCode: [
          { required: true, message: '物料不能为空', trigger: 'blur' }
        ],
        batch: [
          { required: true, message: '批次不能为空', trigger: 'blur' }
        ],
        receiveAmount: [
          { required: true, message: '领用量不能为空', trigger: 'blur' }
        ],
        inHolderType: [
          { required: true, message: '打入罐类别不能为空', trigger: 'blur' }
        ],
        inHolderId: [
          { required: true, message: '打入罐号不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.formHeader.workShop = ''
      getWorkshop(this, n, '过滤')
      this.GetInHolderType(n)
    },
    'formHeader.workShop' (n, o) {
      this.formHeader.holderId = ''
      if (n) {
        this.getPot(n)
      }
    }
  },
  mounted () {
    getFactory(this)
  },
  methods: {
    // 查询
    GetDataList () {
      if (!this.formHeader.factory) {
        this.$warning_SHINHO('工厂必填')
        return false
      }
      this.$http(`${FILTRATION_API.FILTER_POT_LIST_API}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.fastS = true
          this.dataList = data.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 去详情
    godetails (item) {
      this.$store.state.common.filtrationPot = item
      this.mainTabs = this.mainTabs.filter(item => item.name !== 'DataEntry-Filtration-Pot-detail')
      let that = this
      setTimeout(function () {
        that.$router.push({ name: `DataEntry-Filtration-Pot-detail` })
      }, 100)
    },
    // 清罐
    clearPot (item) {
      if (!this.isAuth('filter:holder:cleanProHolder')) {
        this.$warning_SHINHO('无权限操作')
        return false
      }
      if (item.holderStatus === '0') {
        this.$warning_SHINHO('该罐暂不可进行清罐操作')
        return false
      }
      if (item.holderStatus !== '4') {
        this.$warning_SHINHO('未领用完不能清洗')
        return false
      }
      this.$confirm('清罐后，账务将清零，请确认实物已空！', '清罐确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http(`${FILTRATION_API.FILTER_POT_CLEAN_API}`, 'POST', item).then(({data}) => {
          if (data.code === 0) {
            this.$notify({title: '成功', message: '操作成功', type: 'success'})
            this.GetDataList()
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      })
    },
    // JBS弹窗
    JBSdialog (item) {
      if (!this.isAuth('filter:holder:jbsOut')) {
        this.$notify.error({title: '错误', message: '无权限操作'})
        return false
      }
      this.JBSVisible = true
      this.Holder = []
      this.JBSdataForm = {
        factory: this.formHeader.factory,
        workShop: this.formHeader.workShop,
        receiveHolderId: item.holderId,
        holderName: item.holderName,
        materialCode: item.materialCode,
        materialName: item.materialName,
        batch: item.batch,
        receiveAmount: '',
        unit: '',
        inHolderType: '',
        inHolderId: '',
        isFull: '0',
        fullDate: '',
        remark: '',
        changer: '',
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      }
    },
    // 转储弹窗
    TurnSavedialog (item) {
      if (!this.isAuth('filter:holder:dumpMaterial')) {
        this.$notify.error({title: '错误', message: '无权限操作'})
        return false
      }
      this.TurnSaveVisible = true
      this.Holder = []
      this.TurnSavedataForm = {
        receiveHolderId: item.holderId,
        holderName: item.holderName,
        materialCode: item.materialCode,
        materialName: item.materialName,
        batch: item.batch,
        receiveAmount: '',
        unit: '',
        inHolderType: '',
        inHolderId: '',
        isFull: '0',
        fullDate: '',
        remark: '',
        changer: '',
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      }
    },
    // JBS确认
    JBS () {
      if (this.JBSdataForm.isFull === '1') {
        if (!this.JBSdataForm.fullDate) {
          this.$warning_SHINHO('满罐时间必填')
          return
        }
      }
      this.$refs.JBSdataForm.validate((valid) => {
        if (valid) {
          this.$http(`${FILTRATION_API.FILTER_JBS_API}`, 'POST', this.JBSdataForm).then(({data}) => {
            if (data.code === 0) {
              this.JBSVisible = false
              this.$notify({title: '成功', message: '操作成功', type: 'success'})
              this.GetDataList()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        }
      })
    },
    // 转储确认
    TurnSave () {
      if (this.TurnSavedataForm.isFull === '1') {
        if (!this.TurnSavedataForm.fullDate) {
          this.$warning_SHINHO('满罐时间必填')
          return
        }
      }
      this.$refs.TurnSavedataForm.validate((valid) => {
        if (valid) {
          this.$http(`${FILTRATION_API.FILTER_TURNSAVE_API}`, 'POST', this.TurnSavedataForm).then(({data}) => {
            if (data.code === 0) {
              this.TurnSaveVisible = false
              this.$notify({title: '成功', message: '操作成功', type: 'success'})
              this.GetDataList()
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        }
      })
    },
    // 获取罐号
    GetHolderType (holderType) {
      this.$http(`${FILTRATION_API.FILTER_HOLDER_LIST_API}`, 'POST', {factory: this.formHeader.factory, holderType: holderType}, false, false, false).then(({data}) => {
        this.Holder = data.list
      })
    },
    GetHolderType1 (row) {
      this.$http(`${STERILIZED_API.SEMIFINIS_DROPDOWN_LIST}`, 'POST', {factory: this.formHeader.factory, materialCode: row.materialCode, batch: row.batch, code: '007', holderId: row.receiveHolderId}, false, false, false).then(({data}) => {
        this.Holder = data.list
      })
    },
    // 打入罐类别
    GetInHolderType (id) {
      this.$http(`${FILTRATION_API.FILTER_INHOLDERTYPE_LIST_API}`, 'POST', {factory: this.formHeader.factory}, false, false, false).then(({data}) => {
        this.InHolderType = data.list
      })
    },
    // 罐下拉
    getPot () {
      this.$http(`${BASICDATA_API.BASEHOLDERLIST_API}`, 'POST', {factory: this.formHeader.factory, workShop: this.formHeader.workShop}, false, false, false).then(({data}) => {
        this.PotList = data.holderList
      })
    }
  },
  computed: {
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
  .dataList{
    margin-top: 10px;
    &_item{
      margin-bottom: 10px;
      &_tit{
        font-weight: 600;
        color: black;
        font-size: 16px;
        padding: 0 10px;
        line-height: 45px;
        border-bottom: 1px solid #E8E8E8;
      }
      &_a{
        cursor: pointer;
        color: #1890FF;
        float: right;
      }
      &_pot{
        padding: 17px 10px 10px 10px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;
        &_box1{
          position: relative;
          overflow: hidden;
          width: 102px;
          height: 197px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-end;
        }
        &_box{
          overflow: hidden;
          padding: 25px 9px 9px 9px;
          color: white;
          float: left;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-end;
          width: 120px;
          height: 229px;
          min-width: 120px;
          background: url('~@/assets/img/ferPot.png') no-repeat;
          background-size:contain;
          &_detail{
            width: 100%;
            position: absolute;
            font-size: 14px;
            top: 70px;
            color: black;
            left: 3px;
          }
          &_item1,&_item2{
            width: 100%;
            display:flex;
            align-items:center;
            justify-content: center;
            font-size: 14px;
          }
          &_item2,&_item1{
            width: 100%;
            height: 50px;
            background: #69C0FF;
            position: relative;
            overflow: hidden;
            &::before,&::after{
              content: "";
              position: absolute;
              left: 50%;
              min-width: 175px;
              min-height: 165px;
              background: #fff;
              animation: roateTwo 10s linear infinite;
            }
            &::before {
              top: -158px;
              border-radius: 45%;
            }
            &::after {
              top: -152px;
              opacity: 0.5;
              border-radius: 47%;
            }
          }
          &_item2{
            height: 100px;
            background: #1890FF;
          }
          &:hover &_item1::before,&:hover &_item1::after,&:hover &_item2::before,&:hover &_item2::after{
            animation: roateOne 10s linear infinite;
          }
        }
        &_detail{
          max-width: 112px;
          height: auto;
          float: left;
          margin-top: 25px;
          margin-left: 10px;
          color: #333333;
          font-size: 14px;
          line-height: 18px;
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #1890FF;
        }
      }
    }
  }
  @keyframes roateOne {
    0% {
      transform: translate(-50%, -0%) rotateZ(0deg);
    }
    50% {
      transform: translate(-50%, -1%) rotateZ(180deg);
    }
    100% {
      transform: translate(-50%, -0%) rotateZ(360deg);
    }
  }
  @keyframes roateTwo {
    0% {
      transform: translate(-50%, -0%) rotateZ(0deg);
    }
    50% {
      transform: translate(-50%, -0%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -0%) rotateZ(0deg);
    }
  }
</style>
