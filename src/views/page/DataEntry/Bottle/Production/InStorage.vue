<template>
  <div>
    <el-button type="primary" @click="AddIn" size="small" :disabled="!(isRedact)" style="float: right;margin-bottom: 5px">新增</el-button>
    <el-table header-row-class-name="tableHead" :row-class-name="RowDelFlag" :data="InDataList" border tooltip-effect="dark" >
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column label="白/中/夜班" :show-overflow-tooltip="true" prop="kjmWorkShopName">
        <template slot-scope="scope">
          <el-select style="width: 100%" size="mini" v-model="scope.row.classes" placeholder="请选择" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" @change="ChangeProductShift(scope.row)">
            <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="生产批次" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="190">
        <template slot="header"><i class="reqI">*</i><span>生产批次</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.batch" placeholder="手工录入" size="mini" maxlength='10' :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="本班生产 " :show-overflow-tooltip="true" prop="production" width="190">
        <template slot="header"><i class="reqI">*</i><span>本班生产</span></template>
        <template slot-scope="scope">
          <el-input v-model="scope.row.production" @change="ChangeNum()" placeholder="手工录入" size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="单位" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="60">
        <template slot-scope="scope">{{scope.row.unitName = '个'}}</template>
      </el-table-column>
      <el-table-column label="备注" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="190">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="手工录入" size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" :show-overflow-tooltip="true" prop="kjmWorkShopName" width="60" fixed="right">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="mini" :disabled="!(isRedact && (scope.row.status !== 'submit' && scope.row.status !== 'checked'))" @click="delIn(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <p style="font-size: 14px;line-height: 32px">产量数合计：{{sumNum}}个</p>
    <auditLog :tableData="InAudit"></auditLog>
  </div>
</template>

<script>
import { BOTTLE_API } from '@/api/api'
import { GetStatus } from '@/net/validate'
export default {
  name: 'InStorage',
  data () {
    return {
      InDataList: [],
      InAudit: []
    }
  },
  props: {
    isRedact: {
      type: Boolean,
      default () { return false }
    },
    productShift: {
      type: Array
    }
  },
  mounted () {
  },
  methods: {
    // 获取生产入库
    getDataList () {
      let status = ''
      this.$http(`${BOTTLE_API.BOTTLE_PRO_IN_LIST}`, 'POST', {
        orderId: this.$store.state.common.bottle.ProOrderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.InDataList = data.list
          this.InAudit = data.vrList
          status = GetStatus(this.InDataList)
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      }).finally(() => {
        this.$emit('setInStorageState', status)
      })
    },
    // 生产班次下拉
    ChangeProductShift (row) {
      row.classesName = this.productShift.filter(item => item.code === row.classes)[0].value
    },
    // 保存提交
    SaveOrSubmitData (str, resolve, reject) {
      this.InDataList.forEach((item) => {
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.$http(`${str === 'saved' ? BOTTLE_API.BOTTLE_PRO_IN_SAVE : BOTTLE_API.BOTTLE_PRO_IN_SUBMIT}`, 'POST', this.InDataList).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          if (reject) {
            reject('生产入库' + data.msg)
          }
        }
      })
    },
    // 校验
    dataRul () {
      let ty = true
      this.InDataList.forEach((item) => {
        if (!(item.production && item.batch)) {
          ty = false
          this.$notify.error({title: '错误', message: '生产入库必填项未填'})
          return false
        }
        if (item.batch.length !== 10) {
          ty = false
          this.$notify.error({title: '错误', message: '生产入库批次十位'})
          return false
        }
      })
      return ty
    },
    AddIn () {
      this.InDataList.splice(0, 0, {
        id: '',
        orderId: this.$store.state.common.bottle.ProOrderId,
        serialNumber: '',
        status: '',
        classes: '',
        batch: '',
        production: '',
        unit: 'EA',
        remark: '',
        delFlag: '0',
        changed: '',
        changer: '',
        classesName: '',
        unitName: '个'
      })
    },
    delIn (row) {
      row.delFlag = '1'
    },
    //  RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    },
    ChangeNum () {
      this.$emit('SetMeaterielNum', this.sumNum)
    }
  },
  computed: {
    sumNum: function () {
      let num = 0
      this.InDataList.forEach(item => {
        if (item.delFlag !== '1') {
          num += item.production * 1
        }
      })
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

<style scoped>

</style>
