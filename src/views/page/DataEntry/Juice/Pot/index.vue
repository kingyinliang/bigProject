<template>
<div class="header_main">
  <el-card class="searchCard  newCard ferCard">
    <el-form :inline="true" :model="formHeader" size="small" label-width="70px" class="multi_row">
      <el-form-item label="生产工厂：">
        <el-select v-model="formHeader.factory" placeholder="请选择" style="width: 140px">
          <el-option label="请选择"  value=""></el-option>
          <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生产车间：">
        <el-select v-model="formHeader.workShop" placeholder="请选择" style="width: 140px">
          <el-option label="请选择"  value=""></el-option>
          <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="罐类型：" label-width="60px">
        <el-select v-model="formHeader.potType" placeholder="请选择" @change="ChangeSearch()" style="width: 140px">
          <el-option label="请选择"  value=""></el-option>
          <el-option v-for="(sole, index) in this.potTypeList" :key="index" :value="sole.value" :label="sole.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="罐号：" label-width="50px">
        <el-select v-model="formHeader.potNo" placeholder="请选择" multiple @change="ChangeSearch()" filterable allow-create default-first-op style="width: 140px">
          <el-option v-for="(sole, index) in this.guanList" :key="index" :value="sole.holderNo" :label="sole.holderName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类别：" label-width="50px">
        <el-select v-model="formHeader.type" placeholder="请选择" @change="ChangeSearch()" style="width: 140px">
          <el-option label="请选择"  value=""></el-option>
          <el-option :label="item.halfType" v-for="(item, index) in typeList" :key="index" :value="item.halfType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select v-model="formHeader.status" placeholder="请选择" @change="ChangeSearch()" style="width: 140px">
          <el-option label="请选择"  value=""></el-option>
          <el-option :label="item.value" v-for="(item, index) in holderStatusList" :key="index" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="待转储：">
        <el-select v-model="formHeader.dump" placeholder="请选择" @change="ChangeSearch()" style="width: 140px">
          <el-option label="请选择"  value=""></el-option>
          <el-option :label="item.name" v-for="(item, index) in dumpList" :key="index" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" size="small" @click="GetDataList(true)" style="float: right" v-if="isAuth('juice:pot:List')">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="searchCard newCard ferCard" style="margin-top:5px" v-show="fastS">
    <h3 class="cardTit">
      <i class="iconfont factory-shujuzonglan" style="color: #666666;margin-right: 10px"></i>原汁情况总览
      <i class="gotop" @click="gotop"><span>收起</span><i class="el-icon-caret-top"></i></i>
    </h3>
    <div class="sumbox">
    <div class="topBox clearfix">
      <div class="clearfix" v-for="(item, index) in topBox" :key="index" style="float: left">
        <div class="topBox_boxItem" @click="topClick(item)">
          <div class="topBox_boxItem_bar">
            <div class="topBox_boxItem_bar_box" :style="{'background': `linear-gradient(to right,${item.startColor} 0%,${item.startColor} 10%,${item.endColor})`}"></div>
          </div>
          <p class="topBox_boxItem_tit">{{item.ptext}}</p>
          <p class="topBox_boxItem_detail">
            总计: <span>{{item.num}}</span> 罐
          </p>
          <div class="topBox_boxItem_popover" v-if="item.content !== 0">
            <p v-for="(i, ins) in Object.keys(item.content)" :key="ins">
              <i class="dot" :style="{'background': ins === 0 ? '#1890FF' : ins === 1 ? '#FFBF00' : '#1890FF'}"></i>{{i}} <span style="float: right">{{item.content[i]}} 方</span>
            </p>
            <i class="topBox_boxItem_popover_ar"></i>
          </div>
        </div>
        <div class="topBox_circle" :style="{'background': item.color}" v-if="item.color">{{item.text}}</div>
      </div>
    </div>
    </div>
  </el-card>
  <el-card class="searchCard newCard ferCard" style="margin-top:5px;"  v-show="fastS">
    <h3 style="color: black;margin-bottom: 8px">
      <i class="iconfont factory-liebiao" style="color: #666666;margin-right: 10px"></i>原汁罐列表
      <i class="gotop" v-if="isAuth('juice:pot:juiceStockItem')"><a href="#/DataEntry-Juice-Pot-summary">原汁库存情况>></a></i>
    </h3>
    <el-row class="dataList" :gutter="10" style="min-height: 150px">
      <el-col :span="4" v-for="(item, index) in dataList" :key="index">
        <el-card class="dataList_item" style="padding:0!important;">
          <h3 class="dataList_item_tit">
            {{item.HOLDER_NO}}
            <span style="color: #333333;font-weight: normal;font-size: 14px">
              -{{item.HOLDER_STATUS === '6' ? '空罐' : item.HOLDER_STATUS === '7' ? '入料中' : item.HOLDER_STATUS === '8' ? '沉淀中' : item.HOLDER_STATUS === '9' ? '领用中' : item.HOLDER_STATUS === '10' ? '待清洗' : ''}}
            </span>
            <span class="dataList_item_a" @click="godetails(item)" style="font-size: 14px" v-if="isAuth('juice:pot:juiceItem')">详情>></span>
          </h3>
          <div class="dataList_item_pot clearfix" style="position:relative;">
            <img src="@/assets/img/F0.png" alt="" v-if="item.IS_F === '1'" style="position:absolute; left:10px; top:10px;">
            <img src="@/assets/img/RD.png" alt="" v-if="item.isRd === 1" style="position:absolute; left:10px; top:10px;">
            <div class="dataList_item_pot_box">
              <div class="dataList_item_pot_box1">
                <div class="dataList_item_pot_box_item1" :style="`height:${item.AMOUNT? (item.AMOUNT*1000 / item.HOLDER_HOLD) * 100 : 0}%`" v-if="item.HOLDER_STATUS !== '6'"></div>
                <div class="dataList_item_pot_box_detail" v-if="item.HOLDER_STATUS !== '6' && item.HOLDER_STATUS !== '10'">
                  <p>{{item.BATCH}}</p>
                  <p v-if="item.IS_F === '2'">JBS</p>
                  <p>{{item.TYPE}}</p>
                  <p v-if="item.HOLDER_STATUS !== '7'">{{item.days}}天</p>
                  <p>{{item.AMOUNT}}方</p>
                </div>
              </div>
            </div>
          </div>
          <el-row class="dataList_item_btn">
            <el-col :span="4" class="dataList_item_btn_item"><p @click="TransferProp(item)">转储</p></el-col>
            <el-col :span="4" class="dataList_item_btn_item"><p @click="JuiceJudgeProp(item)">判定</p></el-col>
            <el-col :span="4" class="dataList_item_btn_item"><p @click="ClearProp(item)">清洗</p></el-col>
            <el-col :span="4" class="dataList_item_btn_item"><p @click="AddProp(item)">HD</p></el-col>
            <el-col :span="4" class="dataList_item_btn_item"><p @click="BringOutProp(item)">调拨</p></el-col>
          </el-row>
          <!-- 转储:沉淀中 领用中 可以。  添加:领用中可添加  判定:空罐，领用中，待清洗不能判定   调拨:空罐跟领用中 不能调拨 -->
        </el-card>
      </el-col>
    </el-row>
    <el-row >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pages.currentPage"
        :page-size="42"
        layout="total, prev, pager, next"
        :total="pages.total">
      </el-pagination>
    </el-row>
  </el-card>
  <el-dialog :visible.sync="TransferDialogTableVisible" :close-on-click-modal="false" width="500px" custom-class='dialog__class'>
    <div slot="title" style="line-hight:59px">转储</div>
    <div>
      <el-form size="small" :model="formTransfer" :rules="Transferulestar" ref="Transferstar" label-width="150px">
        <el-form-item label="领用罐号：">{{formTransfer.holderName}}</el-form-item>
        <el-form-item label="物料：">{{formTransfer.materialCode}} {{formTransfer.materialName}}</el-form-item>
        <el-form-item label="类别：">{{formTransfer.type}}</el-form-item>
        <el-form-item label="批次：">{{formTransfer.batch}}</el-form-item>
        <el-form-item label="领用量（L）：" prop="receiveAmount">
          <el-input type="number" @mousewheel.native.prevent v-model="formTransfer.receiveAmount" style="width:200px" placeholder="大于0"></el-input>
        </el-form-item>
        <el-form-item label="打入罐类别：" prop="inHolderType">
          <el-select v-model="formTransfer.inHolderType" placeholder="请选择" clearable>
            <el-option label="请选择"  value=""></el-option>
            <el-option v-for="(sole, index) in this.potTypeList" :key="index" :value="sole.value" :label="sole.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-radio v-model="formTransfer.isF" label="1">F0标识</el-radio>
          <el-radio v-model="formTransfer.isF" label="2">原汁JBS</el-radio>
        </el-form-item>
        <el-form-item label="打入罐号：" prop="inHolderId">
          <el-select v-model="formTransfer.inHolderId">
            <el-option v-for="(item, index) in thrwHolderList" :key="index" :value="item.HOLDER_ID" :label="item.HOLDER_NAME"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料：">{{formTransfer.materialCode}} {{formTransfer.materialName}}</el-form-item>
        <el-form-item label="类别：">{{formTransfer.type}}</el-form-item>
        <el-form-item label="打入批次：" prop="inBatch">
          <el-input v-model="formTransfer.inBatch" maxlength="10" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="是否满灌：">
          <el-select filterable v-model="formTransfer.isFull">
            <el-option v-for="(item, index) in isFullList" :key="index" :value="item.value" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满灌时间：">
          <el-date-picker v-model="formTransfer.fullDate" type="datetime" placeholder="请选择" style="width:200px" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="TransferDialogTableVisible = false" size="small">取消</el-button>
      <el-button type="primary" @click="FormTransferSave('Transferstar')" size="small">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog :visible.sync="AddDialogTableVisible" :close-on-click-modal="false" width="500px" custom-class='dialog__class'>
    <div slot="title" style="line-hight:59px">HD</div>
    <div>
      <el-form size="small" :model="formAdd" :rules="Addrulestar" ref="Addstar" label-width="150px">
        <el-form-item label="领用罐号：">{{formAdd.holderName}}</el-form-item>
        <el-form-item label="物料：">{{formAdd.materialCode}} {{formAdd.materialName}}</el-form-item>
        <el-form-item label="类别：">{{formAdd.type}}</el-form-item>
        <el-form-item label="批次：">{{formAdd.batch}}</el-form-item>
        <el-form-item label="领用量（L）：" prop="amount">
          <el-input v-model="formAdd.amount" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="打入罐类别：" prop="inHolderType">
          <el-select v-model="formAdd.inHolderType" placeholder="请选择" clearable>
            <el-option label="请选择"  value=""></el-option>
            <el-option v-for="(sole, index) in this.potTypeList" v-if="sole.name === '发酵罐'" :key="index" :value="sole.value" :label="sole.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打入罐号：" prop="inHolderId">
          <el-select v-model="formAdd.inHolderId">
            <el-option v-for="(item, index) in AddPotList" :key="index" :value="item.holderId" :label="item.HOLDER_NAME"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料：">{{formAdd.materialCode}} {{formAdd.materialName}}</el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="AddDialogTableVisible = false" size="small">取消</el-button>
      <el-button type="primary" @click="FormAddSave('Addstar')" size="small">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog :visible.sync="JudgeDialogTableVisible" width="400px" custom-class='dialog__class'>
    <div slot="title" style="line-hight:59px">类别判定</div>
    <el-form :model="judge" size="small" label-width="130px" :rules="judgerules" ref="judge">
      <el-form-item label="物料：">{{this.judge.materialCode}}{{this.judge.materialName}}</el-form-item>
      <el-form-item label="发酵天数：">{{this.judge.ferDays}} 天</el-form-item>
      <el-form-item label="半成品类别：">
        <el-select v-model="judge.type" placeholder="请选择" style="width: 140px">
          <el-option :label="item.halfType" v-for="(item, index) in typeList" :key="index" :value="item.halfType"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态：">
        <el-radio v-model="judge.frozenStatus" label="1">正常</el-radio>
        <el-radio v-model="judge.frozenStatus" label="0">冻结</el-radio>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="JudgeDialogTableVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="FormJudgeSave('judge')" size="small">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog width="450px" class="ShinHoDialog" :title="dialogData.HOLDER_NAME+'清洗'" :close-on-click-modal="false" :visible.sync="visible">
    <div style="display: flex">
      <el-form :model="dialogData" label-width="100px" class="topform marbottom" style="margin: auto">
        <el-form-item label="罐号：">
          <p>{{dialogData.HOLDER_NAME}}</p>
        </el-form-item>
        <el-form-item label="状态：">
          <p>待清洗</p>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="a">
            <el-checkbox label="清洗完成" name="type" :disabled="true"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="dialogData.remark" size="small" placeholder="手工录入" style="width: 260px"></el-input>
        </el-form-item>
        <el-form-item label="录入人员：">
          {{$store.state.user.realName + '（' + this.$store.state.user.name + '）'}}
        </el-form-item>
        <el-form-item label="录入时间：">
          {{newData}}
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" @click="ClearSave(item)" size="small">确定</el-button>
    </span>
  </el-dialog>
  <el-dialog :visible.sync="BringOutDialogTableVisible" :close-on-click-modal="false" width="500px" custom-class='dialog__class'>
    <div slot="title" style="line-hight:59px">调拨</div>
    <div>
      <el-form size="small" :model="formBringOut" :rules="BringOutrulestar" ref="BringOutstar" label-width="150px">
        <el-form-item label="领用罐号：">{{formBringOut.holderName}}</el-form-item>
        <el-form-item label="物料：">{{formBringOut.materialCode}} {{formAdd.materialName}}</el-form-item>
        <el-form-item label="类别：">{{formBringOut.type}}</el-form-item>
        <el-form-item label="批次：">{{formBringOut.batch}}</el-form-item>
        <el-form-item label="领用量（L）：" prop="amount">
          <el-input v-model="formBringOut.amount" style="width:200px"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="BringOutDialogTableVisible = false" size="small">取消</el-button>
      <el-button type="primary" @click="FormBringOutSave('BringOutstar')" size="small">确定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { dateFormat } from '@/net/validate'
import {BASICDATA_API, SYSTEMSETUP_API, JUICE_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    var checkreceiveAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写领用量'))
      } else if (value <= 0) {
        return callback(new Error('转储量需大于0'))
      } else {
        callback()
      }
    }
    return {
      formHeader: {
        factory: '',
        workShop: '',
        potType: '',
        potNo: '',
        type: '',
        status: '',
        dump: ''
      },
      potTypeList: [{
        name: '发酵罐',
        value: '001'
      }, {
        name: '原汁罐',
        value: '013'
      }, {
        name: 'JBS',
        value: '016'
      }],
      factory: [],
      workshop: [],
      holderStatusList: [],
      guanList: [],
      typeList: [],
      dumpList: [{
        name: '<=25方',
        value: '<'
      }, {
        name: '>25方',
        value: '>'
      }],
      pages: {
        currentPage: 1,
        pageSize: 42,
        total: 0
      },
      topBox: [
        {
          color: '#999999',
          startColor: '#999999',
          endColor: '#999999',
          text: '空',
          ptext: '空罐',
          holderStatus: '6',
          num: '',
          content: 0
        }, {
          color: '#B58150',
          startColor: '#D6D2C4',
          endColor: '#B58150',
          text: '6',
          ptext: '沉淀 0-6天',
          holderStatus: '',
          days: [0, 6],
          num: '',
          content: 0
        }, {
          color: '#3F2021',
          startColor: '#B58150',
          endColor: '#3F2021',
          text: '20',
          ptext: '沉淀 7-20天',
          holderStatus: '',
          days: [6, 20],
          num: '',
          content: 0
        }, {
          color: '#C70909',
          startColor: '#3F2021',
          endColor: '#C70909',
          text: '40',
          ptext: '沉淀 20-40天',
          holderStatus: '',
          days: [20, 40],
          num: '',
          content: 0
        }, {
          color: '#8BC34A',
          startColor: '#C70909',
          endColor: '#8BC34A',
          text: '领',
          ptext: '领用',
          holderStatus: '9',
          num: '',
          content: 0
        }, {
          color: '',
          startColor: '#C70909',
          endColor: '#8BC34A',
          text: '',
          ptext: '空罐',
          holderStatus: '6',
          num: '',
          content: 0
        }
      ],
      holderStatus: '',
      days: '',
      dataListAll: [],
      dataListAlls: [],
      dataList: [],
      TransferDialogTableVisible: false,
      formTransfer: {},
      Transferulestar: {
        inHolderType: [
          { required: true, message: '请选择打入罐类别', trigger: 'blur' }
        ],
        inHolderId: [
          { required: true, message: '请选择打入罐号', trigger: 'blur' }
        ],
        inBatch: [
          { required: true, message: '请填写打入批次', trigger: 'blur' }
        ],
        receiveAmount: [
          { required: true, message: '请填写领用量', trigger: 'blur' },
          { validator: checkreceiveAmount, trigger: 'blur' }
        ]
      },
      AddDialogTableVisible: false,
      formAdd: {},
      todays: '',
      Addrulestar: {
        amount: [
          { required: true, message: '请填写领用量', trigger: 'blur' }
        ],
        inHolderType: [
          { required: true, message: '请选择打入罐类别', trigger: 'blur' }
        ],
        inHolderId: [
          { required: true, message: '请选择打入罐号', trigger: 'blur' }
        ],
        todays: [
          { required: true, message: '请填写发酵天数', trigger: 'blur' }
        ]
      },
      JudgeDialogTableVisible: false,
      judge: {},
      judgerules: {},
      thrwHolderList: [],
      isFullList: [{
        name: '是',
        value: '1'
      }, {
        name: '否',
        value: '0'
      }],
      AddPotList: [],
      newData: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
      fastS: false,
      visible: false,
      dialogData: {},
      BringOutDialogTableVisible: false,
      BringOutrulestar: {
        amount: [
          { required: true, message: '请填写领用量', trigger: 'blur' }
        ]
      },
      formBringOut: {},
      a: true
    }
  },
  watch: {
    'formHeader.factory' (n, o) {
      this.formHeader.workShop = ''
      this.formHeader.holderStatus = ''
      this.formHeader.potNo = []
      this.Getdeptbyid(n)
      this.ChangeSearch()
    },
    'formHeader.workShop' (n, o) {
      this.formHeader.potNo = []
      this.ChangeSearch()
    },
    'formHeader.potType' (n, o) {
      this.HolderList(n)
    },
    'formTransfer.inHolderType' (n, o) {
      if (n) {
        this.formTransfer.inHolderId = ''
        this.GetRuPotList(n)
      }
    }
  },
  mounted () {
    this.Getdeptcode()
    this.GetTypeList()
    this.GetHolderStatusList()
    this.ani()
  },
  methods: {
    ani () {
      let $ = this.$
      this.$('.topBox_boxItem').hover(function () {
        $(this).find('.topBox_boxItem_popover').stop()
        $(this).find('.topBox_boxItem_bar_box').stop()
        $(this).find('.topBox_boxItem_popover').show(500)
        $(this).find('.topBox_boxItem_bar_box').css({width: 0})
        $(this).find('.topBox_boxItem_tit').css({color: '#1890FF'})
        $(this).find('.topBox_boxItem_bar_box').animate({width: '100%'}, 500)
        $(this).parent().find('.topBox_circle').css({transform: 'scale(1.2)'})
        $(this).parent().prev().find('.topBox_circle').css({transform: 'scale(1.2)'})
      }, function () {
        $(this).find('.topBox_boxItem_tit').css({color: 'black'})
        $(this).find('.topBox_boxItem_popover').hide(500)
        $(this).parent().find('.topBox_circle').css({transform: 'scale(1.0)'})
        $(this).parent().prev().find('.topBox_circle').css({transform: 'scale(1.0)'})
      })
    },
    gotop () {
      let $ = this.$
      $('.sumbox').stop()
      let hei = $('.sumbox .topBox').height()
      if ($('.sumbox').height()) {
        $('.sumbox').css({overflow: 'hidden'})
        $('.gotop span').text('展开')
        $('.gotop i').attr('class', 'el-icon-caret-bottom')
        $('.sumbox').animate({height: 0}, 300, function () {})
      } else {
        $('.gotop span').text('收起')
        $('.gotop i').attr('class', 'el-icon-caret-top')
        $('.sumbox').animate({height: `${hei + 35}px`}, 300, function () {
          $('.sumbox').css({overflow: 'initial'})
        })
      }
    },
    // 总览点击
    topClick (item) {
      this.holderStatus = ''
      this.days = ''
      if (item.holderStatus !== '') {
        this.holderStatus = item.holderStatus
      } else {
        this.days = item.days
      }
      this.GetPageCurrenList(true)
    },
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
          this.formHeader.factory = data.typeList[0].deptId
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id, deptName: '原汁'}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
            if (data.typeList.length) {
              this.formHeader.workShop = data.typeList[0].deptId
            }
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      }
    },
    // 罐号
    HolderList (n) {
      if (n) {
        this.formHeader.potNo = []
        this.$http(`${JUICE_API.JUICE_SEARCH_POT_LIST}`, 'POST', {deptId: this.formHeader.workShop, holderType: n}, false, false, false).then(({data}) => {
          this.guanList = data.holderList
        })
      }
    },
    // 获取类别
    GetTypeList () {
      this.$http(`${JUICE_API.JUICE_TYPE_LIST}`, 'POST', {}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.typeList = data.maintain
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 获取发酵罐状态
    GetHolderStatusList () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}`, 'POST', {type: 'juice_HOLDER_STATUS'}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.holderStatusList = data.dicList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 查询
    GetDataList (ty) {
      if (this.formHeader.factory === '') {
        this.$notify({title: '警告', message: '请选择工厂', type: 'warning'})
        return false
      }
      if (this.formHeader.workShop === '') {
        this.$notify({title: '警告', message: '请选择车间', type: 'warning'})
        return false
      }
      this.$http(`${JUICE_API.JUICE_POT_LIST}`, 'POST', this.formHeader).then(({data}) => {
        if (data.code === 0) {
          this.fastS = true
          this.dataListAll = data.indexList.potList
          this.holderStatus = ''
          this.days = ''
          this.GetPageCurrenList(true)
          this.topBox[0].num = data.indexList.summaryData.kong
          this.topBox[0].content = data.indexList.summaryData.kongMaintain ? data.indexList.summaryData.kongMaintain : 0
          this.topBox[1].num = data.indexList.summaryData.six
          this.topBox[1].content = data.indexList.summaryData.sixMaintain ? data.indexList.summaryData.sixMaintain : 0
          this.topBox[2].num = data.indexList.summaryData.twenty
          this.topBox[2].content = data.indexList.summaryData.twentyMaintain ? data.indexList.summaryData.twentyMaintain : 0
          this.topBox[3].num = data.indexList.summaryData.forty
          this.topBox[3].content = data.indexList.summaryData.fortyMaintain ? data.indexList.summaryData.fortyMaintain : 0
          this.topBox[4].num = data.indexList.summaryData.fortyPlus
          this.topBox[4].content = data.indexList.summaryData.fortyPlusMaintain ? data.indexList.summaryData.fortyPlusMaintain : 0
          this.topBox[5].num = data.indexList.summaryData.kong
          this.topBox[5].content = data.indexList.summaryData.kongMaintain ? data.indexList.summaryData.kongMaintain : 0
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    // 转储弹框
    TransferProp (item) {
      if (this.isAuth('juice:pot:List') !== true) {
        this.$warning_SHINHO('没有权限')
        return false
      }
      if (item.HOLDER_STATUS === '8' || item.HOLDER_STATUS === '9') {
        this.$http(`${JUICE_API.JUICE_TRANSFER_LIST}`, 'POST', {holderId: item.HOLDER_ID}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.formTransfer = {
              holderId: item.HOLDER_ID,
              holderName: item.HOLDER_NAME,
              materialCode: data.transferStorageList.materialCode,
              materialName: data.transferStorageList.materialName,
              type: data.transferStorageList.type,
              batch: data.transferStorageList.batch,
              receiveAmount: '',
              unit: 'L',
              inHolderId: '',
              inHolderType: '',
              isF: '0',
              inBatch: '',
              isFull: '0',
              fullDate: '',
              remark: '',
              factory: this.formHeader.factory,
              workShop: this.formHeader.workShop
            }
            this.TransferDialogTableVisible = true
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      } else {
        this.$notify({title: '警告', message: '该罐当前不允许转储', type: 'warning'})
      }
    },
    // 转储打入罐号下拉
    GetRuPotList (holderType) {
      this.$http(`${JUICE_API.JUICE_TRANSFER_POT_LIST}`, 'POST', {holderType: holderType}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.thrwHolderList = data.transferStoragePotList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    FormTransferSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formTransfer.isFull === '1' && (this.formTransfer.fullDate === '' || !this.formTransfer.fullDate)) {
            this.$warning_SHINHO('满灌时请选择满罐时间')
            return false
          }
          this.$http(`${JUICE_API.JUICE_TRANSFER_SAVE}`, 'POST', this.formTransfer).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '转储成功', type: 'success'})
              this.TransferDialogTableVisible = false
              this.$refs[formName].resetFields()
              this.GetDataList(true)
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        } else {
          return false
        }
      })
    },
    AddProp (item) {
      if (this.isAuth('juice:pot:addJuicePot') !== true) {
        this.$notify({title: '警告', message: '没有权限', type: 'warning'})
        return false
      }
      if (item.HOLDER_STATUS === '9') {
        this.$http(`${JUICE_API.JUICE_ADD_POT_LIST}`, 'POST', {factory: this.formHeader.factory, workShop: this.formHeader.workShop}, false, false, false).then(({data}) => {
          if (data.code === 0) {
            this.AddPotList = data.addPotList
            this.formAdd = {
              holderId: item.HOLDER_ID,
              holderName: item.HOLDER_NAME,
              materialCode: item.MATERIAL_CODE,
              materialName: item.MATERIAL_NAME,
              type: item.TYPE,
              batch: item.BATCH,
              amount: '',
              unit: 'L',
              isF: '0',
              inHolderType: '',
              inHolderId: '',
              inBatch: '',
              isFull: '',
              remark: '',
              factory: this.formHeader.factory,
              workShop: this.formHeader.workShop
            }
            this.AddDialogTableVisible = true
          } else {
            this.$notify.error({title: '错误', message: data.msg})
          }
        })
      } else {
        this.$notify({title: '警告', message: '该罐当前不允许进行HD操作', type: 'warning'})
      }
    },
    FormAddSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http(`${JUICE_API.JUICE_ADD_SAVE}`, 'POST', this.formAdd).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: 'HD操作成功', type: 'success'})
              this.AddDialogTableVisible = false
              this.$refs[formName].resetFields()
              this.GetDataList(true)
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        } else {
          return false
        }
      })
    },
    JuiceJudgeProp (item) {
      if (this.isAuth('juice:pot:juiceJudge') !== true) {
        this.$notify({title: '警告', message: '没有权限', type: 'warning'})
        return false
      }
      if (item.HOLDER_STATUS === '6' || item.HOLDER_STATUS === '9' || item.HOLDER_STATUS === '10') {
        this.$notify({title: '警告', message: '该罐当前不允许判定', type: 'warning'})
        return false
      }
      this.$http(`${JUICE_API.JUICE_JUICEINFO_LIST}`, 'POST', {holderId: item.HOLDER_ID}, false, false, false).then(({data}) => {
        if (data.code === 0) {
          if (data.juiceJudgeList !== null) {
            this.judge = {
              holderId: item.HOLDER_ID,
              materialCode: item.MATERIAL_CODE,
              materialName: item.MATERIAL_NAME,
              oldType: item.TYPE,
              type: data.juiceJudgeList.TYPE,
              ferDays: item.days,
              remark: '',
              frozenStatus: data.juiceJudgeList.FROZEN_STATUS
            }
          } else {
            this.judge = {
              holderId: item.HOLDER_ID,
              materialCode: item.MATERIAL_CODE,
              materialName: item.MATERIAL_NAME,
              oldType: item.TYPE,
              type: '',
              ferDays: item.days,
              remark: '',
              frozenStatus: '1'
            }
          }
          this.JudgeDialogTableVisible = true
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    FormJudgeSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http(`${JUICE_API.JUICE_JUICEJUDGE_SAVE}`, 'POST', this.judge).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '判定成功', type: 'success'})
              this.JudgeDialogTableVisible = false
              this.$refs[formName].resetFields()
              this.GetDataList(true)
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        } else {
          return false
        }
      })
    },
    ClearProp (item) {
      if (this.isAuth('juice:pot:juiceClean') !== true) {
        this.$notify({title: '警告', message: '没有权限', type: 'warning'})
        return false
      }
      if (item.HOLDER_STATUS === '10') {
        this.dialogData = {
          HOLDER_NAME: item.HOLDER_NAME,
          holderId: item.HOLDER_ID,
          remark: '',
          holderType: item.HOLDER_TYPE
        }
        this.visible = true
      } else {
        this.$notify({title: '警告', message: '该罐当前不允许清洗', type: 'warning'})
      }
    },
    ClearSave () {
      this.$http(`${JUICE_API.JUICE_JUICE_CLEAN}`, 'POST', this.dialogData).then(({data}) => {
        if (data.code === 0) {
          this.$notify({title: '成功', message: '清洗成功', type: 'success'})
          this.GetDataList(true)
          this.visible = false
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    BringOutProp (item) {
      if (this.isAuth('juice:pot:juiceBringOut') !== true) {
        this.$notify({title: '警告', message: '没有权限', type: 'warning'})
        return false
      }
      if (item.HOLDER_STATUS === '6' || item.HOLDER_STATUS === '9') {
        this.$notify({title: '警告', message: '该罐当前不允许调拨', type: 'warning'})
      } else {
        this.BringOutDialogTableVisible = true
        this.formBringOut = {
          holderName: item.HOLDER_NAME,
          holderId: item.HOLDER_ID,
          materialCode: item.MATERIAL_CODE,
          materialName: item.MATERIAL_NAME,
          type: item.TYPE,
          batch: item.BATCH,
          amount: '',
          remark: ''
        }
      }
    },
    FormBringOutSave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http(`${JUICE_API.JUICE_JUICE_BRINGOUT_SAVE}`, 'POST', this.formBringOut).then(({data}) => {
            if (data.code === 0) {
              this.$notify({title: '成功', message: '调拨成功', type: 'success'})
              this.BringOutDialogTableVisible = false
              this.$refs[formName].resetFields()
              this.GetDataList(true)
            } else {
              this.$notify.error({title: '错误', message: data.msg})
            }
          })
        } else {
          return false
        }
      })
    },
    // 去详请
    godetails (row) {
      this.$store.state.common.Juice = row
      this.mainTabs = this.mainTabs.filter(item => item.name !== 'DataEntry-Juice-Pot-detail')
      let that = this
      setTimeout(function () {
        that.$router.push({ name: `DataEntry-Juice-Pot-detail` })
      }, 100)
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.GetPageCurrenList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.pages.currentPage = val
      this.GetPageCurrenList()
    },
    GetPageCurrenList (ty) {
      if (ty === true) {
        this.pages.currentPage = 1
      }
      this.dataListAlls = []
      this.dataList = []
      if (this.holderStatus !== '' || this.days !== '') {
        this.dataListAll.map((item) => {
          if (this.holderStatus !== '') {
            if (item.HOLDER_STATUS === this.holderStatus) {
              this.dataListAlls.push(item)
            }
          } else if (this.days !== '') {
            if (this.days[0] <= parseInt(item.days) && parseInt(item.days) < this.days[1]) {
              this.dataListAlls.push(item)
            }
          }
          // if (this.holderStatus !== '' && item.holderStatus === '6') {
          //   this.dataListAlls.push(item)
          // }
          // if (this.days !== '') {
          //   if (this.days[0] <= parseInt(item.days) && parseInt(item.days) < this.days[1]) {
          //     this.dataListAlls.push(item)
          //   }
          // }
        })
      } else {
        this.dataListAlls = this.dataListAll
      }
      this.pages.total = this.dataListAlls.length
      this.dataList = this.dataListAlls.slice((this.pages.currentPage - 1) * this.pages.pageSize, (this.pages.currentPage - 1) * this.pages.pageSize + this.pages.pageSize)
    },
    // 更改头部查询信息
    ChangeSearch () {
      this.fastS = false
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

<style>
.dataList_item .el-card__body{padding:0 !important}
</style>
<style lang="scss" scoped>
.ferCard{
  .el-card__body{
    padding: 7px;
  }
  .cardTit{
    font-size: 16px;
    color: black;
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #E9E9E9;
  }
  .gotop{
    float: right;
    color: #1890FF;
    font-size: 14px;
    cursor: pointer;
    i{
      :before{
        color: #1890FF;
      }
    }
  }
}
.topBox{
  width: 1142px;
  padding: 25px 25px 10px 25px;
  margin: auto;
  &_boxItem{
    position: relative;
    cursor: pointer;
    width: 155px;
    float: left;
    &_bar{
      width: 140px;
      height: 2px;
      margin: 15px 8px 0 8px;
      background: #f2f2f2;
      &_box{
        height: 2px;
      }
    }
    &_tit{
      color: black;
      font-size: 16px;
      margin-top: 10px;
      text-align: center;
      line-height: 32px;
    }
    &_detail{
      font-size: 14px;
      text-align: center;
      color: #666666;
      span{
        color: black;
      }
    }
    &_popover{
      display: none;
      top: -60px;
      min-width: 150px;
      min-height: 52px;
      padding: 10px 10px;
      border-radius: 4px;
      font-size: 13px;
      line-height: 18px;
      position: absolute;
      z-index: 999999;
      background: white;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
      .dot{
        width: 6px;
        height: 6px;
        float: left;
        margin: 4px 5px 0 0;
        border-radius: 50%;
      }
      &_ar{
        position: absolute;
        bottom: -12px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color:#ffffff transparent transparent transparent;
      }
    }
  }
  &_circle{
    width: 32px;
    height: 32px;
    float: left;
    line-height: 32px;
    text-align: center;
    color: white;
    border-radius: 50%;
    background: #999999;
    transition: all .5s;
  }
}
.dataList{
  margin-top: 10px;
  &_item{
    &_btn_item {
      width:20%
    }
    margin-bottom: 10px;
    &_tit{
      font-weight: 600;
      color: black;
      font-size: 14px;
      line-height: 45px;
      border-bottom: 1px solid #E8E8E8;
      padding:0 5px;
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
        &_item2s,&_item1{
          height: 50px;
          background: #69C0FF;
          position: absolute;
          bottom: 0;
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
        &:hover &_item1::before,&:hover &_item1::after,&:hover &_item2s::before,&:hover &_item2s::after{
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
