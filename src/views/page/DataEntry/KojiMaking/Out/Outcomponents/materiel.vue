<template>
  <div>
    <el-button type="primary" @click="AddMateriel(MaterielDate)" size="small" :disabled="!isRedact" style="float: right">新增</el-button>
    <el-table header-row-class-name="tableHead" :data="MaterielDate" :row-class-name="RowDelFlag" border tooltip-effect="dark">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column label="日期">
        <template slot-scope="scope">
          <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.outDate" :disabled="!isRedact" size="small"></el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="盐水" width="110">
        <template slot-scope="scope">
          <el-select v-model="scope.row.materialCode" placeholder="请选择" :disabled="!isRedact"  size="small">
            <el-option :label="item.value" v-for="(item, index) in brine" :key="index" :value="item.code"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="盐水罐号" width="110">
        <template slot-scope="scope">
          <el-select v-model="scope.row.saltWaterHolderId" placeholder="请选择" :disabled="!isRedact"  size="small">
            <el-option :label="item.holderName" v-for="(item, index) in brineTankNo" :key="index" :value="item.holderId"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="起始值" width="103">
        <template slot-scope="scope">
          <el-input v-model="scope.row.startValue" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="结束值" width="103">
        <template slot-scope="scope">
          <el-input v-model="scope.row.endValue" :disabled="!isRedact" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="70" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.amount = scope.row.startValue*1 - scope.row.endValue*1}}
        </template>
      </el-table-column>
      <el-table-column label="单位" width="50" prop="unit" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作人" width="140" prop="creator" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作时间" width="120" prop="created" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" width="50">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle size="small" :disabled="!isRedact" @click="delMateriel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <audit-log :tableData="MaterielAuditlog"></audit-log>
  </div>
</template>

<script>
import {BASICDATA_API, SYSTEMSETUP_API, KJM_API} from '@/api/api'
export default {
  name: 'materiel',
  data () {
    return {
      MaterielDate: [],
      MaterielAuditlog: [],
      brine: [],
      brineTankNo: []
    }
  },
  props: {
    isRedact: {},
    formHeader: {}
  },
  mounted () {
    this.GetBrine()
  },
  methods: {
    // 获取原料领用列表
    GetmaterielDate (formHeader) {
      this.$http(`${KJM_API.OUTMATERIELLIST_API}`, 'POST', {
        orderId: formHeader.orderId,
        orderNo: formHeader.orderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.MaterielDate = data.list
          this.MaterielAuditlog = data.vrlist
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 保存
    SaveOrSubmitMateriel (str, resolve, reject) {
      this.MaterielDate.forEach((item) => {
        item.orderHouseId = this.formHeader.orderHouseId
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.$http(`${str === 'submit' ? KJM_API.OUTMATERIELSUBMIT_API : KJM_API.OUTMATERIELSAVE_API}`, 'POST', this.MaterielDate).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          this.$message.error(data.msg)
          if (reject) {
            reject('原料领用' + data.msg)
          }
        }
      })
    },
    // 获取盐水
    GetBrine () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=ZQ_material`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.brine = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取盐水罐号
    GetBrineTankNo (deptId) {
      this.$http(`${BASICDATA_API.CONTAINERLIST1_API}`, 'POST', {
        factory: deptId.factory,
        deptId: deptId.workShop,
        type: 'holder_type',
        holder_type: '011',
        currPage: 1,
        pageSize: 100
      }).then(({data}) => {
        if (data.code === 0) {
          this.brineTankNo = data.page.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 新增
    AddMateriel () {
      this.MaterielDate.push({
        id: '',
        orderHouseId: '',
        outDate: '',
        materialCode: '',
        saltWaterHolderId: '',
        startValue: '',
        endValue: '',
        amount: '',
        unit: 'L',
        delFlag: '0'
      })
    },
    // 删除
    delMateriel (row) {
      row.delFlag = '1'
    },
    //  RowDelFlag
    RowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    }
  },
  computed: {},
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style scoped>

</style>
