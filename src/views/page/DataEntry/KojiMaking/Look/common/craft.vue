<template>
  <div>
    <el-card>
      <el-form :inline="true" :model="tech" size="small" label-width="120px">
        <el-form-item label="入曲检查：">
          <el-input style="width:171px" v-model="tech.inCheck" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
        </el-form-item>
        <el-form-item label="检查人：">
          <el-select v-model="tech.inCheckMan" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')">
            <el-option v-for="sole in userList" :key="sole.userId" :value="sole.realName + `(${sole.workNum})`" :label="sole.realName + `（${sole.workNum}）`"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入曲开始时间：">
          <el-date-picker v-model="tech.inStartTime" type="datetime" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
        <el-form-item label="入曲结束时间：">
          <el-date-picker v-model="tech.inEndTime" type="datetime" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div class="htitle">
        看曲记录
        <el-button type="text" class="readyshiftBtn" name="lookar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
      </div>
      <div class="lookarBox">
        <el-row style="line-height: 32px; margin-bottom:10px">
          <el-col :span="4">第（{{guardProcess}}）套程序</el-col>
          <el-col :span="16">
            <el-radio-group v-model="tech.processType">
              <el-radio label="自动" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')">自动</el-radio>
              <el-radio label="半自动" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')">半自动</el-radio>
              <el-radio label="手动" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')">手动</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" :disabled="true" size="small" style="float: right">读取数据</el-button>
            <el-button type="primary" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" @click="addline" size="small" style="float: right; margin-right:10px"> + 新增</el-button>
          </el-col>
        </el-row>
        <el-table border header-row-class-name="tableHead" :data="lookList" :row-class-name="rowDelFlag" tooltip-effect="dark">
          <el-table-column label="序号" type="index" width="50px"></el-table-column>
          <el-table-column label="看曲时间" width="200">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.guardTime" type="datetime" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width:185px"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column label="风温实际">
            <template slot-scope="scope">
              <el-input v-model="scope.row.windTemp" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="品温实际">
            <template slot-scope="scope">
              <el-input v-model="scope.row.productTemp" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="风机风速">
            <template slot-scope="scope">
              <el-input v-model="scope.row.windSpeed" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="风门/进风" width="100">
            <template slot-scope="scope">
              <el-select v-model="scope.row.windInFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small">
                <el-option label="风门" value="风门"></el-option>
                <el-option label="进风" value="进风"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="强排/反风" width="100">
            <template slot-scope="scope">
              <el-select v-model="scope.row.forceOutFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small">
                <el-option label="强排" value="强排"></el-option>
                <el-option label="反风" value="反风"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="加湿情况">
            <template slot-scope="scope">
              <el-input v-model="scope.row.jiashiFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="加热/冷却" width="100">
            <template slot-scope="scope">
              <el-select v-model="scope.row.jiareFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small">
                <el-option label="加热" value="加热"></el-option>
                <el-option label="冷却" value="冷却"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="品温探头温度">
            <el-table-column label="上">
              <template slot-scope="scope">
                <el-input v-model="scope.row.productTempUp" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="中">
              <template slot-scope="scope">
                <el-input v-model="scope.row.productTempMid" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="下">
              <template slot-scope="scope">
                <el-input v-model="scope.row.productTempDown" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="温度计温度">
            <el-table-column label="外">
              <template slot-scope="scope">
                <el-input v-model="scope.row.thermometerOut" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="里">
              <template slot-scope="scope">
                <el-input v-model="scope.row.thermometerInner" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作人" prop="changer" width="150px"></el-table-column>
          <el-table-column width=50>
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" circle size="small" @click="delrow(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card>
      <el-form :inline="true" :model="tech" size="small">
        <div class="htitle">
          加水量记录
          <el-button type="text" class="readyshiftBtn" name="shuiar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
        </div>
        <div class="shuiarBox">
          <div>
            <div style="line-height:32px;">翻曲加水</div>
            <el-form-item label="起始数：">
              <el-input size="small" v-model="tech.overStartWeight" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
            </el-form-item>
            <el-form-item label="结束数：">
              <el-input size="small" v-model="tech.overEndWeight" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
            </el-form-item>
            <el-form-item label="加水量（L）：">
              <el-input size="small" v-model="tech.overWeight" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div>
            <div style="line-height:32px;">出曲加水</div>
            <el-form-item label="起始数：">
              <el-input size="small" v-model="tech.outStartWeight" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
            </el-form-item>
            <el-form-item label="结束数：">
              <el-input size="small" v-model="tech.outEndWeight" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
            </el-form-item>
            <el-form-item label="加水量（L）：">
              <el-input size="small" v-model="tech.outWeight" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-card>
    <el-card>
      <div class="htitle">
        感官评价记录<el-button type="text" class="readyshiftBtn" name="feelar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
      </div>
      <div class="feelarBox">
        <el-table border header-row-class-name="tableHead" :data="assessList">
          <el-table-column prop="feelName"></el-table-column>
          <el-table-column label="U">
            <template slot-scope="scope">
              <el-select v-model="scope.row.codeU" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" placeholder="请选择" size="small" >
                <el-option v-for="item in Ulist" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="S">
            <template slot-scope="scope">
              <el-select v-model="scope.row.codeS" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" placeholder="请选择" size="small">
                <el-option v-for="item in Slist" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="A">
            <template slot-scope="scope">
              <el-select v-model="scope.row.codeA" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" placeholder="请选择" size="small">
                <el-option v-for="item in Alist" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card>
      <el-form :inline="true" :model="tech" size="small">
        <div class="audit">
          <span>异常情况记录</span>
          <el-button type="text" class="readyshiftBtn" name="excar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
        </div>
        <div class="excarBox"><el-input type="textarea" v-model="tech.guardException" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" class="textarea" style="width: 100%;height:90px"></el-input></div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Readyanimation } from '@/net/validate'
import { SYSTEMSETUP_API, KJM_API } from '@/api/api'
export default {
  name: 'craft',
  data () {
    return {
      statuss: 'saved',
      guardProcess: '',
      userList: [],
      tech: {
        id: this.uuid(32, 62),
        orderHouseId: '',
        addOrupdate: '0',
        status: '',
        inCheck: '',
        inCheckMan: '',
        inStartTime: '',
        inEndTime: '',
        guardProcess: '',
        processType: '',
        overStartWeight: '',
        overEndWeight: '',
        overWeight: '',
        outStartWeight: '',
        outEndWeight: '',
        outWeight: '',
        guardException: ''
      },
      lookList: [],
      assessList: [{feelName: '一翻', id: ''}, {feelName: '二翻', id: ''}, {feelName: '出曲', id: ''}],
      Ulist: [
        {value: 'U1', label: 'U1'},
        {value: 'U2', label: 'U2'},
        {value: 'U3', label: 'U3'},
        {value: 'U4', label: 'U4'},
        {value: 'U5', label: 'U5'}
      ],
      Slist: [
        {value: 'S1', label: 'S1'},
        {value: 'S2', label: 'S2'},
        {value: 'S3', label: 'S3'},
        {value: 'S4', label: 'S4'},
        {value: 'S5', label: 'S5'}
      ],
      Alist: [
        {value: 'A1', label: 'A1'},
        {value: 'A2', label: 'A2'},
        {value: 'A3', label: 'A3'},
        {value: 'A4', label: 'A4'},
        {value: 'A5', label: 'A5'}
      ]
    }
  },
  props: ['isRedact', 'formHeader', 'submitStatus'],
  mounted () {
    Readyanimation(this.$)
  },
  watch: {
    'formHeader.workShop' () {
      this.checkList()
    },
    'overcha': function () {
      this.tech.overWeight = this.overcha
    },
    'outcha': function () {
      this.tech.outWeight = this.outcha
    }
  },
  methods: {
    // 检查人
    checkList () {
      this.$http(`${SYSTEMSETUP_API.USERLIST_API}`, 'POST', {
        deptId: this.formHeader.workShop, // this.formHeader.workShop, // 工序id
        currPage: '1',
        pageSize: '100'
      }).then(({data}) => {
        if (data.code === 0) {
          this.userList = data.page.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    Readyrules () {
      let ty = true
      if (this.lookList.length === 0) {
        ty = false
        this.$message.error('看曲记录未填')
        return false
      }
      if (this.tech.overStartWeight.trim() === '' || this.tech.overEndWeight.trim() === '' || this.tech.outStartWeight.trim() === '' || this.tech.outEndWeight.trim() === '') {
        ty = false
        this.$message.error('加水量记录全必填')
        return false
      }
      if (this.tech.overWeight < 0 || this.tech.outWeight < 0) {
        ty = false
        this.$message.error('加水量不能为负数')
        return false
      }
      this.assessList.map((item) => {
        if (item.codeU === undefined || item.codeS === undefined || item.codeA === undefined) {
          ty = false
          this.$message.error('感官评价记录必须全选')
          return false
        }
      })
      return ty
    },
    addline () {
      this.lookList.push({
        id: '',
        guardTechId: this.tech.id,
        guardTime: '',
        windTemp: '',
        productTemp: '',
        windSpeed: '',
        windInFlag: '',
        forceOutFlag: '',
        jiashiFlag: '',
        jiareFlag: '',
        productTempUp: '',
        productTempMid: '',
        productTempDown: '',
        thermometerOut: '',
        thermometerInner: '',
        remark: '',
        delFlag: 0,
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`
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
    savestauts (resolve, reject) {
      if (this.submitStatus === 'submit') {
        this.statuss = 'submit'
      }
      this.$http(`${KJM_API.DOULOOKSTATUS_API}`, 'POST', {status: this.statuss, orderHouseId: this.formHeader.orderHouseId}).then(({data}) => {
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
    savesmain (resolve, reject) {
      if (this.submitStatus === 'submit') {
        this.tech.status = 'submit'
      } else {
        this.tech.status = 'saved'
      }
      this.tech.orderHouseId = this.formHeader.orderHouseId
      this.$http(`${KJM_API.DOULOOKZHUSAVE_API}`, 'POST', this.tech).then(({data}) => {
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
    savesecond (resolve, reject) {
      this.$http(`${KJM_API.DOULOOKKANQUSAVE_API}`, 'POST', this.lookList).then(({data}) => {
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
    savefeel (resolve, reject) {
      this.assessList.map((item) => {
        this.$set(item, 'guardTechId', this.tech.id)
        if (item.codeU === undefined) {
          this.$set(item, 'codeU', '')
        }
        if (item.codeS === undefined) {
          this.$set(item, 'codeS', '')
        }
        if (item.codeA === undefined) {
          this.$set(item, 'codeA', '')
        }
      })
      this.$http(`${KJM_API.DOULOOKGANGUANSAVE_API}`, 'POST', this.assessList).then(({data}) => {
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
      this.$http(`${KJM_API.DOULOOKLIST_API}`, 'POST', {orderHouseId: formHeader.orderHouseId}).then(({data}) => {
        if (data.code === 0) {
          this.tech = data.techList[0]
          this.assessList = data.feelList
          this.lookList = data.recordList
        } else {
          this.$message.error(data.msg)
        }
      }).catch((error) => {
        this.$message.error(error)
      }).finally(() => {
        this.$emit('setApplyCraftState', this.tech.status)
      })
    }
  },
  computed: {
    overcha: function () {
      return this.tech.overEndWeight - this.tech.overStartWeight
    },
    outcha: function () {
      return this.tech.outEndWeight - this.tech.outStartWeight
    }
  },
  components: {
    AbnRecord: resolve => {
      require(['@/views/components/abnRecord'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
.rowDel{
  display: none;
}
.htitle {
  margin: 0 0 10px 0;
  overflow: hidden;
}
.audit{
  line-height: 32px;
  margin: 0 0 10px 0;
  i{
    font-size: 22px;
    float: left;
  }
  span{
    font-size: 16px;
  }
}
</style>
