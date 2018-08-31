<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生管审核</el-breadcrumb-item>
        <el-breadcrumb-item>生产发料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-card>
        <el-row type="flex">
          <el-col>
            <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="80px" class="topforms">
              <el-form-item label="工厂">
                <el-select v-model="plantList.factory" placeholder="请选择">
                  <el-option label=""  value=""></el-option>
                  <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车间">
                <el-select v-model="plantList.workshop" placeholder="请选择">
                  <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产线">
                <el-select v-model="plantList.productline" placeholder="产线">
                  <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单号">
                <el-input v-model="plantList.orderNo" placeholder="订单号"></el-input>
              </el-form-item>
              <el-form-item label="生产日期">
                <el-date-picker type="date" placeholder="选择" value-format="yyyy.MM.dd HH:mm:ss" v-model="plantList.prodDate"></el-date-picker>
              </el-form-item>
              <el-form-item label="过账日期">
                <el-date-picker type="date" placeholder="选择" value-format="yyyy.MM.dd HH:mm:ss" v-model="plantList.pstngDate"></el-date-picker>
              </el-form-item>
              <el-row>
                <el-form-item label="抬头文本" class="formtextarea">
                  <el-input type="textarea" v-model="plantList.headerTxt"></el-input>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>
          <el-col style="width: 300px">
            <el-row style="margin-bottom: 13px">
              <el-button type="primary" size="small" @click="GetAuditList()">查询</el-button>
            </el-row>
            <el-row>
              <el-button type="primary" size="small">审核通过</el-button>
              <el-button type="danger" size="small">审核不通过</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0">
      <el-card>
        <el-table
          ref="table1"
          header-row-class-name="tableHead"
          :data="AuditList"
          @selection-change="handleSelectionChange"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom: 20px">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop=""
            label="生产订单号"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="生产物料"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="计划生产数量"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="组件物料"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="发料组件数量"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单位"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="物料批次"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="出库库位"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="接口回写"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核意见"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核人"
            width="95">
          </el-table-column>
          <el-table-column
            prop="name"
            label="审核时间"
            width="95">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="190">
            <template slot-scope="scope">
              <el-button @click="remove(scope.$index,tableData3)" type="primary">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="plantList.currPage"
            :page-sizes="[10, 15, 20]"
            :page-size="plantList.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="plantList.totalCount">
          </el-pagination>
        </el-row>
      </el-card>
    </div>
    <el-dialog
      title="审核拒绝"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <p style="line-height: 42px">请填写不通过原因</p>
      <el-input type="textarea" v-model="Text" :rows="6" class="textarea" style="width: 100%;height: 200px"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="repulseAutio()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {BASICDATA_API, AUDIT_API} from '@/api/api'
export default {
  name: 'index',
  data () {
    return {
      visible: false,
      factory: [],
      workshop: [],
      productline: [],
      Text: '',
      plantList: {
        orderNo: '',
        factory: '',
        workshop: '',
        productline: '',
        prodDate: '',
        pstngDate: '',
        headerTxt: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      AuditList: [],
      multipleSelection: []
    }
  },
  watch: {
    'plantList.factory' (n, o) {
      this.Getdeptbyid(n)
    },
    'plantList.workshop' (n, o) {
      if (n) {
        this.GetParentline(n)
      }
    }
  },
  mounted () {
    this.GetAuditList()
    this.Getdeptcode()
  },
  methods: {
    // 获取列表
    GetAuditList () {
      this.$http(`${AUDIT_API.AUDITLIST_API}`, 'POST', this.plantList).then(({data}) => {
        if (data.code === 0) {
          this.AuditList = data.page.list
          this.plantList.currPage = data.page.currPage
          this.plantList.pageSize = data.page.pageSize
          this.plantList.totalCount = data.page.totalCount
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取工厂
    Getdeptcode () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.factory = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取车间
    Getdeptbyid (id) {
      this.plantList.workshop = ''
      this.plantList.productline = ''
      this.$http(`${BASICDATA_API.FINDORGBYID_API}/${id}`, 'GET').then(({data}) => {
        if (data.code === 0) {
          this.workshop = data.typeList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取产线
    GetParentline (id) {
      this.plantList.productline = ''
      this.$http(`${BASICDATA_API.FINDORGBYPARENTID_API}`, 'POST', {parentId: id}).then(({data}) => {
        if (data.code === 0) {
          this.productline = data.childList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item)
      })
    },
    // 审核拒绝
    repulseAutios () {
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请选择订单')
      } else {
        this.visible = true
      }
    },
    repulseAutio () {
      if (this.Text.length <= 0) {
        this.$message.error('请填写不通过原因')
      } else {
        this.$confirm('确认审核不通过, 是否继续?', '审核不通过', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((item) => {
            item.status = 'noPass'
            item.memo = this.Text
          })
          this.$http(`${AUDIT_API.LTKAUDIT_API}`, 'POST', this.multipleSelection).then(({data}) => {
            if (data.code === 0) {
              this.visible = false
              this.$message.success('操作成功')
              this.GetAuditList()
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    },
    // 审核通过
    subAutio () {
      if (this.multipleSelection.length <= 0) {
        this.$message.error('请选择订单')
      } else {
        this.$confirm('确认审核通过, 是否继续?', '审核通过', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach((item) => {
            item.status = 'chekced'
            item.memo = '审核通过'
          })
          this.$http(`${AUDIT_API.LTKAUDIT_API}`, 'POST', this.multipleSelection).then(({data}) => {
            if (data.code === 0) {
              this.$message.success('操作成功')
              this.GetAuditList()
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.plantList.pageSize = val
      this.GetAuditList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.plantList.currPage = val
      this.GetAuditList()
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss">
  .topforms{
    .el-date-editor.el-input{
      width: auto;
    }
    input{
      width: 200px!important;
    }
    .formtextarea{
      .el-form-item__content{
        width: 500px;
      }
    }
  }
</style>
