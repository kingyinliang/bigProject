<template>
  <div class="inStorage_card">
    <div style="width: 158px" class="inStorage_card_left">
      <p>过滤罐</p>
      <div style="text-align: center;padding: 0 20px"><img src="@/assets/img/ferPot.png" alt="" style="width: 92px;height: 190px"></div>
      <el-button type="text" class="inStorage_card_left_btn" size="small" :disabled="!(isRedact)" @click="showDialog()">入罐</el-button>
    </div>
    <div style="flex: 1">
      <el-table header-row-class-name="tableHead" :data="InStorageDate" border tooltip-effect="dark" @row-dblclick="updateRow" >
        <el-table-column type="index" width="50" label="序号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="日期" width="80" prop="date"  :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="成品罐号" width="95" prop="holderName" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="成品批次" width="95" prop="batch" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="入罐数量" width="90" prop="inAmount" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="满罐数量" width="90" prop="fullAmount" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="单位" width="50" prop="unit" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="罐内库存" width="80" prop="inTankAmount" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="备注" prop="remark" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作时间" width="100" prop="changed" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作人" width="80" prop="changer" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </div>
    <el-dialog width="400px" title="入罐开始" class="ShinHoDialog" :close-on-click-modal="false" :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="addIn()" @submit.native.prevent label-width="110px"  size="small" style="width: 300px;margin: auto">
        <el-form-item label="半成品罐号：" prop="holderId">
          <el-select v-model="dataForm.holderId" filterable placeholder="请选择" style="width: 100%">
            <el-option :label="item.holderName" v-for="(item, index) in PotList" :key="index" :value="item.holderId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="批次：" prop="batch">
          <el-input v-model="dataForm.batch" placeholder="请输入" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="入罐数量：">
          <el-input v-model="dataForm.inAmount" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="单位：">
          {{dataForm.unit = 'L'}}
        </el-form-item>
        <el-form-item label="是否满罐：" prop="isFull">
          <el-select v-model="dataForm.isFull" filterable placeholder="请选择" style="width: 100%">
            <el-option label="请选择" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="满罐时间：">
          <el-date-picker type="date" value-format="yyyy-MM-dd" format="yyyy.MM.dd" placeholder="选择" v-model="dataForm.inKjmDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="dataForm.remark" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="操作人：">
          {{$store.state.user.realName + '（' + this.$store.state.user.name + '）'}}
        </el-form-item>
        <el-form-item label="操作时间：">
          {{dataForm.date}}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取消</el-button>
        <el-button type="primary" @click="addIn()" size="small">确定</el-button>
      </span>
    </el-dialog>
    <auditLog :tableData="DataAudit"></auditLog>
  </div>
</template>

<script>
import {FILTRATION_API} from '@/api/api'
export default {
  name: 'inStorage',
  data () {
    return {
      visible: false,
      dataForm: {},
      PotList: [],
      InStorageDate: [],
      DataAudit: [],
      dataRule: {
        holderId: [
          { required: true, message: '半成品罐号不能为空', trigger: 'blur' }
        ],
        batch: [
          { required: true, message: '批次不能为空', trigger: 'blur' },
          { min: 10, max: 10, message: '批次长度为10 个字符', trigger: 'blur' }
        ],
        isFull: [
          { required: true, message: '是否满罐不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    isRedact: ''
  },
  mounted () {
  },
  methods: {
    getList () {
      this.$http(`${FILTRATION_API.FILTER_IN_LIST_API}`, 'POST', {
        orderId: this.$store.state.common.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.InStorageDate = data.list
          this.DataAudit = data.vList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 入库修改
    UpdateIn (str, resolve, reject) {
      this.InStorageDate.forEach((item) => {
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.$http(`${str === 'saved' ? FILTRATION_API.FILTER_IN_UPDATE_API : FILTRATION_API.FILTER_IN_SAVE_API}`, 'POST', this.InStorageDate).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('杀菌入库' + data.msg)
          }
        }
      })
    },
    addIn () {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {}
      })
    },
    showDialog () {
      this.visible = true
    },
    updateRow (row) {}
  },
  computed: {},
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
  .inStorage_card{
    display: flex;
    &_left{
      padding: 0;
      margin-right: 5px;
      width:158px;
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 4px 0px rgba(0,0,0,0.09);
      border-radius:6px;
      border:1px solid rgba(0,0,0,0.09);
      p{
        padding: 10px;
        font-size: 14px;
      }
      &_btn{
        width: 100%;
        margin-top: 10px;
        background: #F7F9FA;
      }
    }
  }
</style>
