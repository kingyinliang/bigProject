<template>
  <div>
    <el-card>
      <div>
        <span class="lh32px">种曲</span>
        <el-button type="text" class="readyshiftBtn" name="zhongar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
        <el-button type="primary" size="small" @click="addmaterial" :disabled="!isRedact" style="float: right"> + 新增</el-button>
      </div>
        <div class="zhongarBox">
        <el-table border style="margin-top:10px" header-row-class-name="tableHead" :data="materialList" :row-class-name="rowDelFlag">
          <el-input type="index"></el-input>
          <el-table-column label="日期" width="160px">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.materialDate" type="date" :disabled="true" placeholder="选择日期" size="small" format="yyyy-MM-dd" style="width:140px"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="* 种曲" width="180px">
            <template slot-scope="scope">
              <el-select v-model.trim="scope.row.materialCode" placeholder="请选择" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status !== 'checked')" size="small">
                <el-option :label="item.code +' '+ item.value" v-for="(item, index) in materialShort" :key="index" :value="item.code +' '+ item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="* 生产批次" width="130px">
            <template slot-scope="scope">
              <el-input maxlength="10" v-model="scope.row.productBatch" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status !== 'checked')" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="物料批次" width="130px">
            <template slot-scope="scope">
              <el-input maxlength="10" v-model="scope.row.materialBatch" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status !== 'checked')" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="* 数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status !== 'checked')" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="* 单位" width="80px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.unit" :disabled="true" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作人" prop="changer" width="140px"></el-table-column>
          <el-table-column label="操作时间" prop="changed" width="160px"></el-table-column>
          <el-table-column label="操作" width="50" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status !== 'checked')" circle size="small" @click="delrow(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card>
      <div class="solecontent">
        <p class="lh32px">小麦粉用量：</p><p class="input_bommom">{{this.wheatUseNum}}</p>
        <p class="lh32px" style="margin-left:20px">小麦：</p>
        <p>
          <el-select v-model="wheatliang" placeholder="请选择" :disabled="!isRedact" size="small">
            <el-option :label="item.code +' '+ item.value" v-for="(item, index) in wheatShort" :key="index" :value="item.code +' '+ item.value"></el-option>
          </el-select>
        </p>
        <el-button type="text" class="readyshiftBtn" name="wheatar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
      </div>
      <div class="wheatarBox">
        <el-row style="margin-top:10px">
          <el-col class="box" v-for="sole in MaiHoldList" :key="sole.holderid">
            <div class="boxTitle">{{sole.holderName}}</div>
            <div class="boxContent">
              <el-progress type="circle" :percentage="25" :stroke-width="10" :width="135"></el-progress>
                <div class="boxText">
                  <div v-for="(soles, index) in wheatListPici" :key="index">
                    <div v-if="piciTrue(sole, soles.holderId)">
                      <div>批次:{{soles.batch}}<span>{{soles.amount}}KG</span></div>
                      <el-progress :percentage="100" :show-text="false" :text-inside="true" :stroke-width="8"></el-progress>
                    </div>
                  </div>
                </div>
            </div>
            <div style="width:100%; text-align:center">
              <el-button class="boxButton" @click="addwheat(sole)" :disabled="!isRedact" style="margin:15px auto; width:88px; float:initial;">立即领用</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table border header-row-class-name="tableHead" :data="wheatList" style="margin-top:10px" @row-dblclick="editwheat" :row-class-name="rowDelFlag">
          <el-table-column label="日期" prop="useDate" width="100"></el-table-column>
          <el-table-column label="物料" prop="materialCode" width="160">
            <template slot-scope="scope">
              {{scope.row.materialCode}} {{scope.row.materialName}}
            </template>
          </el-table-column>
          <el-table-column label="麦粉罐" prop="holderName" width="140"></el-table-column>
          <el-table-column label="批次" prop="whtBatch"></el-table-column>
          <el-table-column label="起始" prop="startWeight"></el-table-column>
          <el-table-column label="结束" prop="endWeight"></el-table-column>
          <el-table-column label="领用数" prop="userWeight" width="70"></el-table-column>
          <el-table-column label="单位" prop="unit" width="60"></el-table-column>
          <el-table-column label="操作人员" prop="changer" width="140"></el-table-column>
          <el-table-column label="操作时间" prop="changed" width="160"></el-table-column>
          <el-table-column label="操作" width="50" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status !== 'checked')" circle size="small" @click="delsoyRow(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card>
      <div class="solecontent">
        <p class="lh32px">豆粕用量：</p><p class="input_bommom">{{soyUseNum}}</p>
        <p class="lh32px" style="margin-left:20px">豆粕：</p>
        <p>
          <el-select v-model="soyliang" placeholder="请选择" :disabled="!isRedact" size="small">
            <el-option :label="item.code +' '+ item.value" v-for="(item, index) in soyShort" :key="index" :value="item.code +' '+ item.value"></el-option>
          </el-select>
        </p>
        <el-button type="text" class="readyshiftBtn" name="soyar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
      </div>
      <div class="soyarBox">
        <el-row style="margin-top:10px">
          <el-col class="box" v-for="sole in DouHoldList" :key="sole.holderid">
            <div class="boxTitle">{{sole.holderName}}</div>
            <div class="boxContent">
              <el-progress type="circle" :percentage="25" :stroke-width="10" :width="135"></el-progress>
              <div class="boxText">
                <div v-for="(soles, index) in pulpListPici" :key="index">
                  <div v-if="piciTrue(sole, soles.holderId)">
                    <div>批次:{{soles.batch}}<span>{{soles.amount}}KG</span></div>
                    <el-progress :percentage="100" :show-text="false" :text-inside="true" :stroke-width="8"></el-progress>
                  </div>
                </div>
              </div>
            </div>
            <div style="text-align:center; width:140px; margin:5px auto; overflow:hidden;">
              <el-button type="button" class="boxButton" @click="rusoyM(sole)" :disabled="!isRedact">入罐</el-button><el-button class="boxButton" @click="chusoyM(sole)" :disabled="!isRedact">出罐</el-button>
            </div>
          </el-col>
        </el-row>
        <el-table border header-row-class-name="tableHead" :data="soyList" @row-dblclick="editsoy" :row-class-name="rowDelFlag" style="margin-top:10px">
          <el-table-column label="日期" prop="pulpDate" width="110"></el-table-column>
          <el-table-column label="领用粮仓" prop="foodHolderName" width="100"></el-table-column>
          <el-table-column label="豆粕仓" prop="pulpHolderName" width="130"></el-table-column>
          <el-table-column label="批次" prop="batch" width="110"></el-table-column>
          <el-table-column label="起始" prop="startWeight" width="60"></el-table-column>
          <el-table-column label="结束" prop="endWeight" width="60"></el-table-column>
          <el-table-column label="数量" prop="useWeight" width="60"></el-table-column>
          <el-table-column label="单位" prop="unit" width="60"></el-table-column>
          <el-table-column label="入罐/出罐" prop="useType" width="90"></el-table-column>
          <el-table-column label="操作人员" prop="changer" width="140"></el-table-column>
          <el-table-column label="操作时间" prop="changed" width="160"></el-table-column>
          <el-table-column label="操作" width="50" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status !== 'checked')" circle size="small" @click="delwheatRow(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card>
      <audit-log></audit-log>
    </el-card>
    <el-dialog :title="MTitle" :visible.sync="dialogFormVisibleMai" width="450px">
      <el-form :model="wheat" size="small" :rules="wheatrules" ref="wheat">
        <el-form-item label="起始数" :label-width="formLabelWidth" prop="startWeight">
          <el-input type="number" v-model.number="wheat.startWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束数" :label-width="formLabelWidth" prop="endWeight">
          <el-input type="number" v-model.number="wheat.endWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领用数量" :label-width="formLabelWidth" prop="wheatuseprop">{{lnum}}</el-form-item>
        <el-form-item label="麦粉批次" :label-width="formLabelWidth" prop="whtBatch">
          <el-select v-model="wheat.whtBatch" placeholder="请选择">
            <el-option v-for='sole in wheatPiArray' :key="sole.batch" :value="sole.batch" :label="sole.batch"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">{{wheat.changed}}</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">{{wheat.changer}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleMai = false">取 消</el-button>
        <el-button type="primary" @click="savewheat('wheat')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="DRTitle" :visible.sync="dialogFormVisibleDouRu" width="450px">
      <el-form :model="rusoy" size="small" :rules="rusoyrules" ref="rusoy">
        <el-form-item label="领用粮仓" :label-width="formLabelWidth" prop="foodHolderId">
          <el-select v-model="rusoy.foodHolderId">
            <el-option v-for='sole in DouCangList' :key="sole.holderId" :value="sole.holderId" :label="sole.holderName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次" :label-width="formLabelWidth" prop="batch">
          <el-input v-model="rusoy.batch" autocomplete="off" maxlength='10'></el-input>
        </el-form-item>
        <el-form-item label="起始数" :label-width="formLabelWidth">
          <el-input type="number" v-model.number="rusoy.startWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束数" :label-width="formLabelWidth" prop="endWeight">
          <el-input type="number" v-model.number="rusoy.endWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领用数量" :label-width="formLabelWidth">{{rusoylnum}}</el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">{{rusoy.changed}}</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">{{rusoy.changer}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleDouRu = false">取 消</el-button>
        <el-button type="primary" @click="soydialogrusave('rusoy')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="DCTitle" :visible.sync="dialogFormVisibleDouChu" width="450px">
      <el-form :model="chusoy" size="small" :rules="chusoyrules" ref="chusoy">
        <el-form-item label="起始数" :label-width="formLabelWidth">
          <el-input type="number" v-model.number="chusoy.startWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束数" :label-width="formLabelWidth" prop="endWeight">
          <el-input type="number" v-model.number="chusoy.endWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领用数量" :label-width="formLabelWidth">{{chusoylnum}}</el-form-item>
        <el-form-item label="批次" :label-width="formLabelWidth" prop="batch">
          <!-- <el-input v-model="chusoy.batch" autocomplete="off" maxlength="10"></el-input> -->
          <el-select v-model="chusoy.batch" placeholder="请选择">
            <el-option v-for='sole in pulpPiArray' :key="sole.batch" :value="sole.batch" :label="sole.batch"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">{{chusoy.changed}}</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">{{chusoy.changer}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleDouChu = false">取 消</el-button>
        <el-button type="primary" @click="soydialogchusave('chusoy')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { dateFormat, Readyanimation } from '@/net/validate'
import { BASICDATA_API, SYSTEMSETUP_API, KJM_API } from '@/api/api'
export default {
  name: 'material',
  data () {
    return {
      topstatus: '',
      dialogFormVisibleMai: false,
      dialogFormVisibleDouChu: false,
      dialogFormVisibleDouRu: false,
      formLabelWidth: '100px',
      materialList: [],
      wheatList: [],
      soyList: [],
      GstartTime: '',
      GystartTime: '',
      GendTime: '',
      GychaTime: '',
      form: {
        name: ''
      },
      wheat: {},
      wheatrules: {
        startWeight: [
          {required: true, message: '必选', trigger: 'blur'},
          {type: 'number', message: '必须为数字'}
        ],
        endWeight: [
          {required: true, message: '必选', trigger: 'blur'},
          {type: 'number', message: '必须为数字'}
        ],
        whtBatch: [
          {required: true, message: '必选', trigger: 'change'}
        ]
      },
      chusoy: {},
      chusoyrules: {
        batch: [
          { required: true, message: '必选', trigger: 'blur' },
          { min: 10, max: 10, message: '长度为10位', trigger: 'blur' }
        ],
        endWeight: [
          { required: true, message: '必选', trigger: 'blur' }
        ]
      },
      MaiHoldList: '',
      DouHoldList: '',
      DCTitle: '', // 豆粕弹框 出罐 title
      DRTitle: '', // 豆粕弹框 入罐 title
      MTitle: '', // 麦弹框 title
      DouCangList: '', // 豆粕粮仓list
      rusoy: {},
      rusoyrules: {
        batch: [
          { required: true, message: '必选', trigger: 'blur' },
          { min: 10, max: 10, message: '长度为10位', trigger: 'blur' }
        ],
        foodHolderId: [
          { required: true, message: '请选择粮仓', trigger: 'change' }
        ],
        endWeight: [
          { required: true, message: '必选', trigger: 'change' }
        ]
      },
      materialShort: '',
      wheatliang: '',
      wheatShort: '',
      soyliang: '',
      soyShort: '',
      pulpListPici: '',
      wheatListPici: '',
      wheatPiArray: [],
      pulpPiArray: []
    }
  },
  mounted () {
    Readyanimation(this.$)
  },
  props: ['isRedact', 'formHeader'],
  watch: {
    'formHeader.workShopName' () {
      this.getMaiholdList()
      this.getDouholdList()
      this.getDouCangList()
      this.GetmaterialZhong()
      this.GetwheatZhong()
      this.GetsoyZhong()
    },
    'wheatliang' () {
      this.wheatList.map((item) => {
        item.materialCode = this.wheatliang
      })
    },
    'soyliang' () {
      this.soyList.map((item) => {
        item.materialCode = this.soyliang
      })
    }
  },
  methods: {
    GetrealTime (formHeader) {
      this.$http(`${KJM_API.DOUMATERREALTIME_API}`, 'POST', {workShop: formHeader.workShop}).then(({data}) => {
        if (data.code === 0) {
          this.pulpListPici = data.listInfo
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    GetrealWheatTime (formHeader) {
      this.$http(`${KJM_API.DOUMATERREALWHEATIME_API}`, 'POST', {workShop: formHeader.workShop}).then(({data}) => {
        if (data.code === 0) {
          this.wheatListPici = data.listInfo
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    GetmaterialZhong () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=ZQ_MATERIAL_QULIAO`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.materialShort = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    GetwheatZhong () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=ZQ_MATERIAL_MAIFEN`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.wheatShort = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    GetsoyZhong () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=ZQ_MATERIAL_DOULEI`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.soyShort = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    mainrules () {
      let ty = true
      if (this.materialList.length === 0) {
        ty = false
        this.$message.error('请填写种曲')
        return false
      }
      this.materialList.forEach((item) => {
        if (!item.materialCode || item.materialCode === '' || !item.amount || item.amount === '' || !item.productBatch || item.productBatch === '') {
          ty = false
          return false
        }
      })
      if (!ty) {
        this.$message.error('种曲必填项未填')
        return false
      }
      if (!this.wheatliang || this.wheatliang === 0) {
        this.$message.error('请选择小麦粉批次')
        return false
      }
      if (this.wheatList.length === 0) {
        ty = false
        this.$message.error('请填写小麦粉数据')
        return false
      }
      if (!this.soyliang || this.soyliang === 0) {
        this.$message.error('请选择豆粕批次')
        return false
      }
      if (this.soyList.length === 0) {
        ty = false
        this.$message.error('请填写豆粕数据')
        return false
      }
      return ty
    },
    // 麦粉罐
    getMaiholdList () {
      let replacestr = this.formHeader.workShopName.replace(/制曲/g, '炒麦')
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, `POST`, {currPage: 1, holder_type: '009', pageSize: 100, type: 'holder_type', workShopName: replacestr}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.MaiHoldList = res.data.page.list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 豆粕罐
    getDouholdList () {
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, `POST`, {currPage: 1, holder_type: '010', pageSize: 100, type: 'holder_type', workShopName: this.formHeader.workShopName}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.DouHoldList = res.data.page.list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 豆粕粮仓 012
    getDouCangList () {
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, `POST`, {currPage: 1, holder_type: '012', pageSize: 100, type: 'holder_type', workShopName: this.formHeader.workShopName}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.DouCangList = res.data.page.list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addmaterial () {
      this.materialList.push({
        id: '',
        orderHouseId: this.formHeader.orderHouseId,
        status: '',
        materialDate: this.formHeader.inKjmDate,
        materialBatch: '',
        amount: '',
        unit: 'box',
        materialCode: '',
        materialName: '',
        productBatch: '',
        remark: '',
        delFlag: '0',
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`,
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
      })
    },
    delmaterial (row) {
      this.materialList.splice(this.materialList.indexOf(row), 1)
    },
    // 小麦领用
    addwheat (row) {
      this.MTitle = row.holderName
      // 批次下拉
      this.wheatPiArray = []
      this.wheatListPici.map((item) => {
        if (item.holderId === row.holderId) {
          this.wheatPiArray.push(item)
        }
      })
      this.wheat = {
        uid: this.uuid(),
        id: '',
        orderHouseId: this.formHeader.orderHouseId,
        status: this.formHeader.submitStatus,
        useDate: this.formHeader.inKjmDate,
        materialCode: this.wheatliang,
        materialName: '',
        holderId: row.holderId,
        holderName: row.holderName,
        whtBatch: '',
        startWeight: '',
        endWeight: '',
        remark: '',
        delFlag: '0',
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`,
        unit: 'KG'
      }
      this.dialogFormVisibleMai = true
    },
    // 小麦领用修改
    editwheat (row) {
      if (!this.isRedact || row.status === 'submit' || row.status === 'checked') {
        return
      }
      this.dialogFormVisibleMai = true
      this.wheat = row
    },
    // 小麦领用保存
    savewheat (formName) {
      if (this.lnum < 0) {
        this.$message.error('领用数不能为负数')
      } else {
        this.$set(this.wheat, 'userWeight', this.lnum)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogFormVisibleMai = false
            let currentRecord = []
            if (this.wheat.hasOwnProperty('uid')) {
              // 新增行
              currentRecord = this.wheatList.filter(data => data.uid === this.wheat.uid)
            } else {
              // 原有行
              currentRecord = this.wheatList.filter(data => data.id === this.wheat.id)
            }
            if (currentRecord && currentRecord.length > 0) {
              Object.assign(currentRecord[0], this.wheat)
            } else {
              this.wheatList.push(this.wheat)
            }
          } else {
            return false
          }
        })
      }
    },
    // 豆 入罐
    rusoyM (row) {
      this.dialogFormVisibleDouRu = true
      this.DRTitle = row.holderName + '入罐'
      this.rusoy = {
        uid: this.uuid(),
        id: '',
        foodHolderId: '',
        foodHolderName: '',
        pulpHolderId: row.holderId,
        pulpHolderName: row.holderName,
        batch: '',
        startWeight: '',
        endWeight: '',
        useWeight: '',
        remark: '',
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
      }
    },
    editsoy (row) {
      if (!this.isRedact || row.status === 'submit' || row.status === 'checked') {
        return
      }
      if (row.useType === '入罐') {
        this.dialogFormVisibleDouRu = true
        this.rusoy = row
      } else {
        this.dialogFormVisibleDouChu = true
        this.chusoy = row
      }
    },
    // 豆 入罐 弹框 保存
    soydialogrusave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.rusoylnum < 0) {
            this.$message.error('领用数不能为负数')
          } else {
            this.dialogFormVisibleDouRu = false
            var obj = {}
            obj = this.DouCangList.find((item) => {
              return item.holderId === this.rusoy.foodHolderId
            })
            let currentRecord = []
            if (this.rusoy.hasOwnProperty('uid')) {
              // 新增行
              currentRecord = this.soyList.filter(data => data.uid === this.rusoy.uid)
            } else {
              // 原有行
              currentRecord = this.soyList.filter(data => data.id === this.rusoy.id)
            }
            if (currentRecord && currentRecord.length > 0) {
              Object.assign(currentRecord[0], {
                foodHolderId: this.rusoy.foodHolderId,
                foodHolderName: obj.holderName,
                batch: this.rusoy.batch,
                startWeight: this.rusoy.startWeight,
                endWeight: this.rusoy.endWeight,
                useWeight: this.rusoy.endWeight - this.rusoy.startWeight,
                useType: '入罐',
                unit: 'KG',
                pulpHolderId: this.rusoy.pulpHolderId,
                pulpHolderName: this.rusoy.pulpHolderName
              })
            } else {
              this.soyList.push({
                foodHolderId: this.rusoy.foodHolderId,
                foodHolderName: obj.holderName,
                batch: this.rusoy.batch,
                startWeight: this.rusoy.startWeight,
                endWeight: this.rusoy.endWeight,
                useWeight: this.rusoy.endWeight - this.rusoy.startWeight,
                useType: '入罐',
                unit: 'KG',
                pulpHolderId: this.rusoy.pulpHolderId,
                pulpHolderName: this.rusoy.pulpHolderName,
                uid: this.rusoy.uid,
                id: '',
                orderHouseId: this.formHeader.orderHouseId,
                status: this.formHeader.submitStatus,
                pulpDate: this.formHeader.inKjmDate,
                remark: '',
                delFlag: '0',
                changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
              })
            }
          }
        } else {
          return false
        }
      })
    },
    // 豆粕 出罐
    chusoyM (row) {
      this.dialogFormVisibleDouChu = true
      this.DCTitle = row.holderName + '出罐'
      this.pulpPiArray = []
      this.pulpListPici.map((item) => {
        if (row.holderId === item.holderId) {
          this.pulpPiArray.push(item)
        }
      })
      this.chusoy = {
        uid: this.uuid(),
        id: '',
        pulpHolderId: row.holderId,
        pulpHolderName: row.holderName,
        foodHolderId: '',
        foodHolderName: '',
        startWeight: '',
        endWeight: '',
        useWeight: '',
        batch: '',
        changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
      }
    },
    // 豆粕 出罐 保存
    soydialogchusave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisibleDouChu = false
          let currentRecord = []
          if (this.chusoy.hasOwnProperty('uid')) {
            // 新增行
            currentRecord = this.soyList.filter(data => data.uid === this.chusoy.uid)
          } else {
            // 原有行
            currentRecord = this.soyList.filter(data => data.id === this.chusoy.id)
          }
          if (currentRecord && currentRecord.length > 0) {
            Object.assign(currentRecord[0], {
              batch: this.chusoy.batch,
              startWeight: this.chusoy.startWeight,
              endWeight: this.chusoy.endWeight,
              useWeight: this.chusoy.endWeight - this.chusoy.startWeight,
              useType: '出罐',
              unit: 'KG',
              pulpHolderId: this.chusoy.pulpHolderId,
              pulpHolderName: this.chusoy.pulpHolderName
            })
          } else {
            this.soyList.push({
              uid: this.chusoy.id,
              id: '',
              orderHouseId: this.formHeader.orderHouseId,
              status: this.formHeader.submitStatus,
              pulpDate: this.formHeader.inKjmDate,
              foodHolderId: '',
              foodHolderName: '',
              pulpHolderId: this.chusoy.pulpHolderId,
              pulpHolderName: this.chusoy.pulpHolderName,
              batch: this.chusoy.batch,
              startWeight: this.chusoy.startWeight,
              endWeight: this.chusoy.endWeight,
              useWeight: this.chusoy.endWeight - this.chusoy.startWeight,
              useType: '出罐',
              unit: 'KG',
              remark: '',
              delFlag: '0',
              changed: dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
              changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
            })
          }
        } else {
          return false
        }
      })
    },
    savemains (resolve, reject) {
      this.materialList.map((item) => {
        if (item.materialCode !== undefined) {
          let materstrchai = []
          materstrchai = item.materialCode.split(' ')
          let materstrName = materstrchai[1] === undefined ? '' : materstrchai[1]
          this.$set(item, 'materialCode', materstrchai[0])
          this.$set(item, 'materialName', materstrName)
        }
        if (item.status === '' || item.status === 'saved' || item.status === 'noPass') {
          this.$set(item, 'status', this.formHeader.submitStatus)
        }
      })
      if (this.formHeader.submitStatus === 'submit') {
        this.$http(`${KJM_API.DOUMATERSUBMITZHONG_API}`, 'POST', this.materialList).then(({data}) => {
          if (data.code === 0) {
          } else {
            this.$message.error(data.msg)
          }
        })
      }
      this.$http(`${KJM_API.DOUMATERZHONG_API}`, 'POST', this.materialList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    savewheats (resolve, reject) {
      this.wheatList.map((item) => {
        if (item.materialCode !== undefined) {
          let materstrchai = []
          materstrchai = this.wheatliang.split(' ')
          let materstrName = materstrchai[1] === undefined ? '' : materstrchai[1]
          this.$set(item, 'materialCode', materstrchai[0])
          this.$set(item, 'materialName', materstrName)
        }
        if (item.status === '' || item.status === undefined || item.status === 'saved' || item.status === 'noPass') {
          this.$set(item, 'status', this.formHeader.submitStatus)
        }
      })
      if (this.formHeader.submitStatus === 'submit') {
        this.$http(`${KJM_API.DOUMATERSUBMITWHEAT_API}`, 'POST', this.wheatList).then(({data}) => {
          if (data.code === 0) {
          } else {
            this.$message.error(data.msg)
          }
        })
      }
      this.$http(`${KJM_API.DOUMATERWHEAT_API}`, 'POST', this.wheatList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    savepulps (resolve, reject) {
      this.soyList.map((item) => {
        if (this.soyliang !== undefined) {
          let materstrchai = []
          materstrchai = this.soyliang.split(' ')
          let materstrName = materstrchai[1] === undefined ? '' : materstrchai[1]
          this.$set(item, 'materialCode', materstrchai[0])
          this.$set(item, 'materialName', materstrName)
        }
        if (item.status === '' || item.status === undefined || item.status === 'saved' || item.status === 'noPass') {
          this.$set(item, 'status', this.formHeader.submitStatus)
        }
      })
      if (this.formHeader.submitStatus === 'submit') {
        this.$http(`${KJM_API.DOUMATERSUBMITSOY_API}`, 'POST', this.soyList).then(({data}) => {
          if (data.code === 0) {
          } else {
            this.$message.error(data.msg)
          }
        })
      }
      this.$http(`${KJM_API.DOUMATERPULP_API}`, 'POST', this.soyList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    savestauts (resolve, reject) {
      this.$http(`${KJM_API.DOUMATERSTATUS_API}`, 'POST', {status: this.formHeader.submitStatus, orderHouseId: this.formHeader.orderHouseId}).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    getList (formHeader) {
      let inState = ''
      this.$http(`${KJM_API.DOUMATERLIST_API}`, 'POST', {orderHouseId: formHeader.orderHouseId}).then(({data}) => {
        if (data.code === 0) {
          let no = 0
          let sub = 0
          let che = 0
          let sav = 0
          this.materialList = data.materialList
          this.wheatList = data.wheatList
          this.soyList = data.pulpList
          if (this.wheatList.length !== 0) {
            this.wheatliang = this.wheatList[0].materialCode + ' ' + this.wheatList[0].materialName
          }
          if (this.soyList.length !== 0) {
            this.soyliang = this.soyList[0].materialCode + ' ' + this.soyList[0].materialName
          }
          this.materialList.map((item) => {
            this.$set(item, 'materialCode', item.materialCode + ' ' + item.materialName)
            if (item.status === 'noPass') {
              no = no + 1
            } else if (item.status === 'submit') {
              sub = sub + 1
            } else if (item.status === 'checked') {
              che = che + 1
            } else if (item.status === 'saved') {
              sav = sav + 1
            }
          })
          this.wheatList.forEach((item) => {
            if (item.status === 'noPass') {
              no = no + 1
            } else if (item.status === 'submit') {
              sub = sub + 1
            } else if (item.status === 'checked') {
              che = che + 1
            } else if (item.status === 'saved') {
              sav = sav + 1
            }
          })
          this.soyList.forEach((item) => {
            if (item.status === 'noPass') {
              no = no + 1
            } else if (item.status === 'submit') {
              sub = sub + 1
            } else if (item.status === 'checked') {
              che = che + 1
            } else if (item.status === 'saved') {
              sav = sav + 1
            }
          })
          if (no > 0) {
            inState = 'noPass'
          } else if (sub > 0) {
            inState = 'submit'
          } else if (sav > 0) {
            inState = 'saved'
          } else if (che > 0) {
            inState = 'checked'
          }
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        this.$message.error(error)
      }).finally(() => {
        this.$emit('setApplyMaterielState', inState)
      })
    },
    delrow (row) {
      row.delFlag = '1'
    },
    rowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    },
    delwheatRow (row) {
      if (row.id === '') {
        this.wheatList.splice(this.wheatList.indexOf(row), 1)
      } else {
        row.delFlag = '1'
      }
    },
    delsoyRow (row) {
      if (row.id === '') {
        this.soyList.splice(this.soyList.indexOf(row), 1)
      } else {
        row.delFlag = '1'
      }
    },
    piciTrue (sole, holderid) {
      if (holderid === sole.holderId) {
        return true
      }
    }
  },
  computed: {
    lnum: function () {
      return this.wheat.startWeight - this.wheat.endWeight
    },
    rusoylnum: function () {
      return this.rusoy.endWeight - this.rusoy.startWeight
    },
    chusoylnum: function () {
      return this.chusoy.endWeight - this.chusoy.startWeight
    },
    wheatUseNum: function () {
      let num = 0
      if (this.wheatList) {
        this.wheatList.map((item) => {
          num += item.userWeight
        })
      }
      return num
    },
    soyUseNum: function () {
      let num = 0
      if (this.soyList) {
        this.soyList.map((item) => {
          if (item.useType === '出罐') {
            num += item.useWeight
          }
        })
      }
      return num
    }
  },
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
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
.lh32px{
  line-height: 32px;
}
.solecontent {
  overflow: hidden;
  p{ float: left;}
}
.box{
  border:1px solid #E8E8E8;
  width: 207px;
  margin: 0px 4px 10px 4px;
  .boxTitle{
    line-height: 32px;
    background: #E9E9E9;
    padding-left: 10px;
    font-weight: bold;
  }
  .boxContent{
    font-size: 12px;
    text-align: center;
    padding: 12px 10px 0 10px;
    .boxText{
      margin-top: 9px;
      text-align: left;
      padding-left: 2px;
      color: rgb(32, 16, 16);
      line-height: 22px;
      height: 90px;
      overflow: hidden;
      span{
        float: right;
      }
      .el-progress-bar__innerText {
        display: none;
      }
    }
  }
  .boxButton {
    margin: 10px;
    margin-top: 11px;
    height: 26px;
    width: 50px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    border-radius: 4px;
    font-weight:400;
    float: left;
    background: #1890FF;
    color: #fff;
    cursor: pointer;
    padding: 0
  }
  .boxButton.is-disabled, .boxButton.is-disabled:focus, .boxButton.is-disabled:hover{
    cursor: not-allowed;
    background-color: #a0cfff;
    border-color: #a0cfff;
  }
}
</style>
