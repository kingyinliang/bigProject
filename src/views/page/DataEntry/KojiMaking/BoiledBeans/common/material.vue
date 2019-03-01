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
            <el-date-picker v-model="scope.row.id" type="date" placeholder="选择日期" size="small" format="yyyy-MM-dd" style="width:185px"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column label="种曲 *">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="生产批次">
          <template slot-scope="scope">
            <el-input v-model="scope.row.pici" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="数量 *">
          <template slot-scope="scope">
            <el-input v-model="scope.row.num" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="单位 *">
          <template slot-scope="scope">
            <el-input v-model="scope.row.dw" size="small"></el-input>
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
        <el-col class="box">
          <div class="boxTitle">1# 麦粉罐</div>
          <div class="boxContent">
            <el-progress type="circle" :percentage="25" stroke-width="10" width="135"></el-progress>
            <div class="boxText">
              <div>批次:1234567890<span>2450KG</span></div>
              <el-progress :percentage="70" :text-inside="true" :stroke-width="8"></el-progress>
              <div>批次:1234567890<span>2450KG</span></div>
              <el-progress :percentage="70" :text-inside="true" :stroke-width="8"></el-progress>
            </div>
          </div>
          <div class="boxButton" @click="addwheat" style="margin:15px auto; width:88px; float:initial;">立即领用</div>
        </el-col>
      </el-row>
      <el-table border header-row-class-name="tableHead" :data="wheatList" style="margin-top:10px" @row-dblclick="editwheat">
        <el-table-column label="日期" prop="id"></el-table-column>
        <el-table-column label="物料"></el-table-column>
        <el-table-column label="麦粉罐"></el-table-column>
        <el-table-column label="批次"></el-table-column>
        <el-table-column label="起始" prop="starnum"></el-table-column>
        <el-table-column label="结束"></el-table-column>
        <el-table-column label="领用数"></el-table-column>
        <el-table-column label="单位"></el-table-column>
        <el-table-column label="操作人员"></el-table-column>
        <el-table-column label="操作时间"></el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <div class="solecontent">
        <p class="lh32px">豆粕用量：</p><p class="input_bommom">123</p><p class="lh32px" style="margin-left:20px">豆粕：</p><p class="input_bommom">描述</p>
      </div>
      <el-row style="margin-top:10px">
        <el-col class="box">
          <div class="boxTitle">1# 麦粉罐</div>
          <div class="boxContent">
            <el-progress type="circle" :percentage="25" stroke-width="10" width="135"></el-progress>
            <div class="boxText">
              <div>批次:1234567890<span>2450KG</span></div>
              <el-progress :percentage="70" :text-inside="true" :stroke-width="8"></el-progress>
              <div>批次:1234567890<span>2450KG</span></div>
              <el-progress :percentage="70" :text-inside="true" :stroke-width="8"></el-progress>
            </div>
          </div>
          <div style="text-align:center; width:140px; margin:5px auto; overflow:hidden;">
            <div class="boxButton" @click="addrusoy">入罐</div><div class="boxButton" @click="dialogFormVisibleDouRu=true">出罐</div>
          </div>
        </el-col>
      </el-row>
      <el-table border header-row-class-name="tableHead" :data="soyList" style="margin-top:10px">
        <el-table-column label="日期" prop="id"></el-table-column>
        <el-table-column label="领用粮仓"></el-table-column>
        <el-table-column label="豆粕仓"></el-table-column>
        <el-table-column label="批次"></el-table-column>
        <el-table-column label="起始"></el-table-column>
        <el-table-column label="结束"></el-table-column>
        <el-table-column label="数量"></el-table-column>
        <el-table-column label="单位"></el-table-column>
        <el-table-column label="入罐/出罐"></el-table-column>
        <el-table-column label="操作人员"></el-table-column>
        <el-table-column label="操作时间"></el-table-column>
      </el-table>
    </el-card>
    <el-card>
      <audit-log></audit-log>
    </el-card>
    <el-dialog title="1#麦粉罐领用" :visible.sync="dialogFormVisibleMai" width="450px">
      <el-form :model="wheat" size="small" :rules="wheatrules" ref="wheat">
        <el-form-item label="起始数" :label-width="formLabelWidth" prop="starnum">
          <el-input type="number" v-model.number="wheat.starnum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束数" :label-width="formLabelWidth" prop="endnum">
          <el-input type="number" v-model.number="wheat.endnum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领用数量" :label-width="formLabelWidth">{{lnum}}</el-form-item>
        <el-form-item label="麦粉批次" :label-width="formLabelWidth" prop="pici">
          <el-select v-model="wheat.pici">
            <el-option label="123" value="123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">{{wheat.creatime}}</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">{{wheat.creator}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleMai = false">取 消</el-button>
        <el-button type="primary" @click="savewheat('wheat')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="2#豆粕罐出罐" :visible.sync="dialogFormVisibleDouChu" width="450px">
      <el-form :model="chusoy" size="small" :rules="chusoyrules" ref="chusoy">
        <el-form-item label="起始数" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束数" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领用数量" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批次" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">123</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">16080029</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleDouChu = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleDouChu = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="2#豆粕罐入罐" :visible.sync="dialogFormVisibleDouRu" width="450px">
      <el-form :model="rusoy" size="small" :rules="rusoyrules" ref="rusoy">
        <el-form-item label="领用粮仓" :label-width="formLabelWidth">
          <el-input v-model="rusoy.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="批次" :label-width="formLabelWidth">
          <el-input v-model="rusoy.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="起始数" :label-width="formLabelWidth">
          <el-input v-model="rusoy.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="结束数" :label-width="formLabelWidth">
          <el-input v-model="rusoy.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="领用数量" :label-width="formLabelWidth">
          <el-input v-model="rusoy.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="操作时间" :label-width="formLabelWidth">{{rusoy.creatime}}</el-form-item>
        <el-form-item label="操作人" :label-width="formLabelWidth">{{rusoy.creator}}</el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleDouRu = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleDouRu = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { dateFormat } from '@/net/validate'
export default {
  name: 'material',
  data () {
    return {
      dialogFormVisibleMai: false,
      dialogFormVisibleDouChu: false,
      dialogFormVisibleDouRu: false,
      dialogVisible: false,
      formLabelWidth: '100px',
      'materialList': [{id: 1, name: '234'}, {id: 2}],
      'wheatList': [{id: 1, starnum: 100}],
      'soyList': [{id: 1}],
      'GstartTime': '',
      'GystartTime': '',
      'GendTime': '',
      'GychaTime': '',
      form: {
        name: ''
      },
      wheat: {},
      wheatrules: {
        starnum: [
          { required: true, message: '必选', trigger: 'blur' }
        ],
        endnum: [
          {required: true, message: '必选', trigger: 'blur'}
        ],
        pici: [
          {required: true, message: '必选', trigger: 'change'}
        ]
      },
      rusoy: {}
    }
  },
  methods: {
    addmaterial () {
      this.materialList.push({dw: 'box'})
    },
    delmaterial (row) {
      this.materialList.splice(this.materialList.indexOf(row), 1)
    },
    // 小麦领用
    addwheat () {
      this.wheat = {
        'id': this.uuid(),
        'starnum': '',
        'endnum': '',
        'creatime': dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
        'creator': this.$store.state.user.realName + `(${this.$store.state.user.name})`
      }
      this.dialogFormVisibleMai = true
    },
    // 小麦领用修改
    editwheat (row) {
      this.dialogFormVisibleMai = true
      this.wheat = {
        'starnum': row.starnum,
        'id': row.id
      }
    },
    // 小麦领用保存
    savewheat (formName) {
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
    // 豆出罐
    addrusoy () {
      this.dialogFormVisibleDouChu = true
    }
  },
  computed: {
    lnum: function () {
      return this.wheat.endnum - this.wheat.starnum
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
  width: 210px;
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
