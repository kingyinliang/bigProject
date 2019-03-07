<template>
  <div>
    <el-table header-row-class-name="tableHead" :data="InStock" :row-class-name="RowDelFlag" border tooltip-effect="dark">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column width="115" label="豆粕量（KG）" prop="pulpWeight">
        <template slot-scope="scope">
          {{scope.row.pulpWeight = ThreeNum.allP}}
        </template>
      </el-table-column>
      <el-table-column width="115" label="麦粉量（KG）" prop="wheatWeight">
        <template slot-scope="scope">
          {{scope.row.pulpWeight = ThreeNum.allM}}
        </template>
      </el-table-column>
      <el-table-column width="115" label="盐水量（L）" prop="saltWaterWeight">
        <template slot-scope="scope">
          {{scope.row.pulpWeight = ThreeNum.allS}}
        </template>
      </el-table-column>
      <el-table-column width="115" label="入库物料">
        <template slot-scope="scope">
          {{scope.row.materialCode + ' ' + scope.row.materialName}}
        </template>
      </el-table-column>
      <el-table-column width="115" label="入库酱醪量" prop="sauceWeight">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sauceWeight" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status == 'checked')" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="115" label="入库批次">
        <template slot-scope="scope">
          <el-input v-model="scope.row.batch" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status == 'checked')" size="small" placeholder="手工录入"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="115" label="入罐罐号" prop="houseNo"></el-table-column>
      <el-table-column width="50" label="单位" prop="unit"></el-table-column>
      <el-table-column width="" label="操作人" prop="changer" show-overflow-tooltip></el-table-column>
      <el-table-column width="" label="操作时间" prop="changed" show-overflow-tooltip></el-table-column>
      <el-table-column width="70" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-delete" circle size="small" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status == 'checked')" @click="delInStock(scope.row)" v-if="scope.row.isSplit === '1' ">删除</el-button>
          <el-button type="text" :disabled="!(isRedact && scope.row.status !== 'submit' && scope.row.status == 'checked')" @click="addInStock(scope.row, scope.$index)" v-if="scope.row.isSplit === '0' "><i class="icons iconfont factory-chaifen"></i>拆分</el-button>
        </template>
      </el-table-column>
    </el-table>
    <audit-log :tableData="InStockAuditlog"></audit-log>
  </div>
</template>

<script>
import {KJM_API} from '@/api/api'
export default {
  name: 'inStock',
  data () {
    return {
      InStock: [],
      InStockAuditlog: [],
      InStockstatus: '',
      ThreeNum: {}
    }
  },
  props: {
    isRedact: {},
    formHeader: {}
  },
  mounted () {
  },
  methods: {
    GetThreeNum (formHeader) {
      this.$http(`${KJM_API.OUTINNUMLIST_API}`, 'POST', {
        orderHouseId: formHeader.id
      }).then(({data}) => {
        if (data.code === 0) {
          this.ThreeNum = data.list[0]
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 列表
    GetOutInStorage (formHeader) {
      this.$http(`${KJM_API.OUTINLIST_API}`, 'POST', {
        orderId: formHeader.orderId,
        orderNo: formHeader.orderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.InStock = data.list
          this.InStockAuditlog = data.vrlist
          let sub = 0
          let che = 0
          let no = 0
          let sav = 0
          this.InStock.forEach((item) => {
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
            this.InStockstatus = 'noPass'
          } else if (sub > 0) {
            this.InStockstatus = 'submit'
          } else if (sav > 0) {
            this.InStockstatus = 'saved'
          } else if (che > 0) {
            this.InStockstatus = 'checked'
          }
          this.$emit('GetInStockStatus', this.InStockstatus)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 保存 or 提交
    SaveOrSubmitInStock (str, resolve, reject) {
      this.InStock.forEach((item) => {
        item.orderHouseId = this.formHeader.id
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.$http(`${str === 'submit' ? KJM_API.OUTINSUBMIT_API : KJM_API.OUTINSAVE_API}`, 'POST', this.InStock).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          this.$message.error(data.msg)
          if (reject) {
            reject('生产入库' + data.msg)
          }
        }
      })
    },
    // 提交
    // 拆分
    addInStock (row, index) {
      this.InStock.splice(index + 1, 0, {
        pulpWeight: row.pulpWeight,
        wheatWeight: row.wheatWeight,
        saltWaterWeight: row.saltWaterWeight,
        materialCode: row.materialCode,
        materialName: row.materialName,
        houseNo: row.houseNo,
        unit: row.unit,
        isSplit: '1',
        delFlag: '0'
      })
    },
    // 删除
    delInStock (row) {
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

<style lang="scss" scoped>
.icons{
  display: block;
  float: left;
  height:14px;
  width:14px;
  margin-right: 5px;
}
</style>
