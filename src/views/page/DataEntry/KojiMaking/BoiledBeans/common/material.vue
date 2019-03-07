<template>
  <div>
    <el-card>
      <div>
        <span class="lh32px">原料领用</span>
        <el-button type="primary" size="small" @click="addmaterial" style="float: right"> + 新增</el-button>
      </div>
      <el-table border style="margin-top:10px" header-row-class-name="tableHead" :data="materialList">
        <el-table-column label="日期">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.materialDate" type="date" placeholder="选择日期" size="small" format="yyyy-MM-dd" style="width:185px"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="* 种曲">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialCode" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="生产批次">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialBatch" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="* 数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.amount" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="* 单位">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delmaterial(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <div class="solecontent">
        <p class="lh32px">小麦粉用量：</p><p class="input_bommom">123</p><p class="lh32px" style="margin-left:20px">小麦：</p><p class="input_bommom">描述</p>
      </div>
      <el-row style="margin-top:10px">
        <el-col class="box" v-for="sole in MaiHoldList" :key="sole.holderid">
          <div class="boxTitle">{{sole.holderName}}</div>
          <div class="boxContent">
            <el-progress type="circle" :percentage="25" :stroke-width="10" :width="135"></el-progress>
            <div class="boxText">
              <div>批次:1234567890<span>2450KG</span></div>
              <el-progress :percentage="70" :show-text="false" :text-inside="true" :stroke-width="8"></el-progress>
              <div>批次:1234567890<span>2450KG</span></div>
              <el-progress :percentage="70" :show-text="false" :text-inside="true" :stroke-width="8"></el-progress>
            </div>
          </div>
          <div class="boxButton" @click="addwheat(sole)" style="margin:15px auto; width:88px; float:initial;">立即领用</div>
        </el-col>
      </el-row>
      <el-table border header-row-class-name="tableHead" :data="wheatList" style="margin-top:10px" @row-dblclick="editwheat">
        <el-table-column label="日期" prop="id" width="160"></el-table-column>
        <el-table-column label="物料" prop="materialCode"></el-table-column>
        <el-table-column label="麦粉罐" prop="holderName" width="140"></el-table-column>
        <el-table-column label="批次" prop="whtBatch"></el-table-column>
        <el-table-column label="起始" prop="startWeight"></el-table-column>
        <el-table-column label="结束" prop="endWeight"></el-table-column>
        <el-table-column label="领用数" prop="userWeight" width="70"></el-table-column>
        <el-table-column label="单位" prop="unit" width="60"></el-table-column>
        <el-table-column label="操作人员" prop="creator" width="140"></el-table-column>
        <el-table-column label="操作时间" prop="created" width="160"></el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <div class="solecontent">
        <p class="lh32px">豆粕用量：</p><p class="input_bommom">123</p><p class="lh32px" style="margin-left:20px">豆粕：</p><p class="input_bommom">描述</p>
      </div>
      <el-row style="margin-top:10px">
        <el-col class="box" v-for="sole in DouHoldList" :key="sole.holderid">
          <div class="boxTitle">{{sole.holderName}}</div>
          <div class="boxContent">
            <el-progress type="circle" :percentage="25" :stroke-width="10" :width="135"></el-progress>
            <div class="boxText">
              <div>批次:1234567890<span>2450KG</span></div>
              <el-progress :percentage="70" :show-text="false" :text-inside="true" :stroke-width="8"></el-progress>
              <div>批次:1234567890<span>2450KG</span></div>
              <el-progress :percentage="70" :show-text="false" :text-inside="true" :stroke-width="8"></el-progress>
            </div>
          </div>
          <div style="text-align:center; width:140px; margin:5px auto; overflow:hidden;">
            <div class="boxButton" @click="rusoyM(sole)">入罐</div><div class="boxButton" @click="chusoyM(sole)">出罐</div>
          </div>
        </el-col>
      </el-row>
      <el-table border header-row-class-name="tableHead" :data="soyList" @row-dblclick="editsoy" style="margin-top:10px">
        <el-table-column label="日期" prop="id" width="160"></el-table-column>
        <el-table-column label="领用粮仓" prop="foodHolderName" width="140"></el-table-column>
        <el-table-column label="豆粕仓" prop="pulpHolderName" width="140"></el-table-column>
        <el-table-column label="批次" prop="batch"></el-table-column>
        <el-table-column label="起始" prop="startWeight"></el-table-column>
        <el-table-column label="结束" prop="endWeight"></el-table-column>
        <el-table-column label="数量" prop="useWeight"></el-table-column>
        <el-table-column label="单位" prop="unit" width="60"></el-table-column>
        <el-table-column label="入罐/出罐" prop="useType" width="90"></el-table-column>
        <el-table-column label="操作人员" prop="creator" width="140"></el-table-column>
        <el-table-column label="操作时间" prop="created" width="160"></el-table-column>
      </el-table>
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
        <el-form-item label="领用数量" :label-width="formLabelWidth">{{lnum}}</el-form-item>
        <el-form-item label="麦粉批次" :label-width="formLabelWidth" prop="whtBatch">
          <el-select v-model="wheat.whtBatch">
            <el-option label="123" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">{{wheat.created}}</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">{{wheat.creator}}</el-form-item>
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
          <el-input v-model="rusoy.batch" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="起始数" :label-width="formLabelWidth">
          <el-input v-model="rusoy.startWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束数" :label-width="formLabelWidth" prop="endWeight">
          <el-input v-model="rusoy.endWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领用数量" :label-width="formLabelWidth">
          <el-input v-model="rusoy.useWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">{{rusoy.created}}</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">{{rusoy.creator}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleDouRu = false">取 消</el-button>
        <el-button type="primary" @click="soydialogrusave('rusoy')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="DCTitle" :visible.sync="dialogFormVisibleDouChu" width="450px">
      <el-form :model="chusoy" size="small" :rules="chusoyrules" ref="chusoy">
        <el-form-item label="起始数" :label-width="formLabelWidth">
          <el-input v-model="chusoy.startWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束数" :label-width="formLabelWidth" prop="endWeight">
          <el-input v-model="chusoy.endWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领用数量" :label-width="formLabelWidth">
          <el-input v-model="chusoy.useWeight" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批次" :label-width="formLabelWidth">
          <el-input v-model="chusoy.batch" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">{{chusoy.created}}</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">{{chusoy.creator}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleDouChu = false">取 消</el-button>
        <el-button type="primary" @click="soydialogchusave('chusoy')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { dateFormat } from '@/net/validate'
import { BASICDATA_API } from '@/api/api'
export default {
  name: 'material',
  data () {
    return {
      dialogFormVisibleMai: false,
      dialogFormVisibleDouChu: false,
      dialogFormVisibleDouRu: false,
      formLabelWidth: '100px',
      'materialList': [],
      'wheatList': [],
      'soyList': [],
      'GstartTime': '',
      'GystartTime': '',
      'GendTime': '',
      'GychaTime': '',
      form: {
        name: ''
      },
      wheat: {},
      wheatrules: {
        startWeight: [
          { required: true, message: '必选', trigger: 'blur' }
        ],
        endWeight: [
          {required: true, message: '必选', trigger: 'blur'}
        ],
        whtBatch: [
          {required: true, message: '必选', trigger: 'change'}
        ]
      },
      chusoy: {},
      chusoyrules: {
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
          { required: true, message: '必选', trigger: 'blur' }
        ],
        foodHolderId: [
          { required: true, message: '请选择粮仓', trigger: 'change' }
        ],
        endWeight: [
          { required: true, message: '必选', trigger: 'change' }
        ]
      }
    }
  },
  props: ['isRedact'],
  mounted () {
    this.getMaiholdList()
    this.getDouholdList()
    this.getDouCangList()
  },
  methods: {
    // 麦粉罐
    getMaiholdList () {
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, `POST`, {currPage: 1, holder_type: '009', pageSize: 100, type: 'holder_type', workShopName: '炒麦一车间'}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.MaiHoldList = res.data.page.list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 豆粕罐
    getDouholdList () {
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, `POST`, {currPage: 1, holder_type: '010', pageSize: 100, type: 'holder_type', workShopName: '制曲一车间'}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.DouHoldList = res.data.page.list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 豆粕粮仓 012
    getDouCangList () {
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, `POST`, {currPage: 1, holder_type: '012', pageSize: 100, type: 'holder_type', workShopName: '制曲一车间'}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.DouCangList = res.data.page.list
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    addmaterial () {
      this.materialList.push({unit: 'box'})
    },
    delmaterial (row) {
      this.materialList.splice(this.materialList.indexOf(row), 1)
    },
    // 小麦领用
    addwheat (row) {
      this.MTitle = row.holderName
      this.wheat = {
        'id': this.uuid(),
        'startWeight': '',
        'endWeight': '',
        'created': dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        'creator': this.$store.state.user.realName + `(${this.$store.state.user.name})`,
        'unit': 'box',
        'holderId': row.holderId,
        'holderName': row.holderName
      }
      this.dialogFormVisibleMai = true
    },
    // 小麦领用修改
    editwheat (row) {
      this.dialogFormVisibleMai = true
      this.wheat = row
    },
    // 小麦领用保存
    savewheat (formName) {
      this.wheat.userWeight = this.lnum
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisibleMai = false
          let currentRecord = []
          currentRecord = this.wheatList.filter(data => data.id === this.wheat.id)
          if (currentRecord && currentRecord.length > 0) {
            Object.assign(currentRecord[0], this.wheat)
          } else {
            this.wheatList.push(this.wheat)
          }
        } else {
          return false
        }
      })
    },
    // 豆 入罐
    rusoyM (row) {
      this.dialogFormVisibleDouRu = true
      this.DRTitle = row.holderName + '入罐'
      this.rusoy = {
        'id': this.uuid(),
        'foodHolderName': '',
        'batch': '',
        'startWeight': '',
        'endWeight': '',
        'useWeight': '',
        'created': dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        'creator': this.$store.state.user.realName + `(${this.$store.state.user.name})`,
        'pulpHolderId': row.holderId,
        'pulpHolderName': row.holderName
      }
    },
    editsoy (row) {
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
          this.dialogFormVisibleDouRu = false
          var obj = {}
          obj = this.DouCangList.find((item) => {
            return item.holderId === this.rusoy.foodHolderId
          })
          let currentRecord = []
          currentRecord = this.soyList.filter(data => data.id === this.rusoy.id)
          if (currentRecord && currentRecord.length > 0) {
            Object.assign(currentRecord[0], {
              foodHolderId: this.rusoy.foodHolderId,
              foodHolderName: obj.holderName,
              batch: this.rusoy.batch,
              startWeight: this.rusoy.startWeight,
              endWeight: this.rusoy.endWeight,
              useWeight: this.rusoy.useWeight,
              creator: this.rusoy.creator,
              created: this.rusoy.created,
              useType: '入罐',
              unit: 'KG',
              pulpHolderId: this.rusoy.pulpHolderId,
              pulpHolderName: this.rusoy.pulpHolderName
            })
          } else {
            this.soyList.push({
              id: this.rusoy.id,
              foodHolderId: this.rusoy.foodHolderId,
              foodHolderName: obj.holderName,
              batch: this.rusoy.batch,
              startWeight: this.rusoy.startWeight,
              endWeight: this.rusoy.endWeight,
              useWeight: this.rusoy.useWeight,
              creator: this.rusoy.creator,
              created: this.rusoy.created,
              useType: '入罐',
              unit: 'KG',
              pulpHolderId: this.rusoy.pulpHolderId,
              pulpHolderName: this.rusoy.pulpHolderName
            })
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
      this.chusoy = {
        'id': this.uuid(),
        'startWeight': '',
        'endWeight': '',
        'useWeight': '',
        'batch': '',
        'created': dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        'creator': this.$store.state.user.realName + `(${this.$store.state.user.name})`,
        'pulpHolderId': row.holderId,
        'pulpHolderName': row.holderName
      }
    },
    // 豆粕 出罐 保存
    soydialogchusave (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogFormVisibleDouChu = false
          let currentRecord = []
          currentRecord = this.soyList.filter(data => data.id === this.chusoy.id)
          if (currentRecord && currentRecord.length > 0) {
            Object.assign(currentRecord[0], {
              batch: this.chusoy.batch,
              startWeight: this.chusoy.startWeight,
              endWeight: this.chusoy.endWeight,
              useWeight: this.chusoy.useWeight,
              creator: this.chusoy.creator,
              created: this.chusoy.created,
              useType: '出罐',
              unit: 'KG',
              pulpHolderId: this.chusoy.pulpHolderId,
              pulpHolderName: this.chusoy.pulpHolderName
            })
          } else {
            this.soyList.push({
              id: this.chusoy.id,
              batch: this.chusoy.batch,
              startWeight: this.chusoy.startWeight,
              endWeight: this.chusoy.endWeight,
              useWeight: this.chusoy.useWeight,
              creator: this.chusoy.creator,
              created: this.chusoy.created,
              useType: '出罐',
              unit: 'KG',
              pulpHolderId: this.chusoy.pulpHolderId,
              pulpHolderName: this.chusoy.pulpHolderName
            })
          }
        } else {
          return false
        }
      })
    }
  },
  computed: {
    lnum: function () {
      return this.wheat.startWeight - this.wheat.endWeight
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
    height: 24px;
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
  }
}
</style>
