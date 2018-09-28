<template>
  <div>
<!--     <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>生管审核</el-breadcrumb-item>
        <el-breadcrumb-item>生产入库</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class="main">
      <el-card class="searchCard">
        <el-row type="flex">
          <el-col>
            <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="85px" class="topforms">
              <el-form-item label="工厂：">
                <el-select v-model="plantList.factory" placeholder="请选择">
                  <el-option label="请选择"  value=""></el-option>
                  <el-option :label="item.deptName" v-for="(item, index) in factory" :key="index" :value="item.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车间：">
                <el-select v-model="plantList.workShop" placeholder="请选择">
                  <el-option label="请选择"  value=""></el-option>
                  <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产线：">
                <el-select v-model="plantList.productLine" placeholder="产线">
                  <el-option label="请选择"  value=""></el-option>
                  <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="订单号：">
                <el-input v-model="plantList.orderNo" placeholder="订单号"></el-input>
              </el-form-item>
              <el-form-item label="生产日期：">
                <el-date-picker type="date" placeholder="选择" value-format="yyyy-MM-dd" v-model="plantList.prodDate"></el-date-picker>
              </el-form-item>
              <el-form-item label="订单状态：">
                <el-select v-model="plantList.status" placeholder="请选择">
                  <el-option label="请选择"  value=""></el-option>
                  <el-option label="未审核"  value="submit"></el-option>
                  <el-option label="审核通过"  value="checked"></el-option>
                  <el-option label="审核不通过"  value="noPass"></el-option>
                </el-select>
              </el-form-item>
              <el-row>
                <el-form-item label="过账日期：">
                  <el-date-picker type="date" placeholder="选择" value-format="yyyy-MM-dd" v-model="plantList.pstngDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="抬头文本：">
                  <el-input v-model="plantList.headerTxt" placeholder="抬头文本"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 67px;">
                  <el-button type="primary" size="small" @click="GetAuditList()" v-if="isAuth('sys:verifyInStorage:list')">查询</el-button>
                  <el-button type="primary" size="small" @click="subAutio()" v-if="isAuth('sys:verifyInStorage:auditing')">审核通过</el-button>
                  <el-button type="danger" size="small" @click="repulseAutios()" v-if="isAuth('sys:verifyInStorage:auditing')">审核不通过</el-button>
                </el-form-item>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <div class="toggleSearchBottom">
            <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0px">
      <el-card class="tableCard">
        <div class="toggleSearchTop">
            <i class="el-icon-caret-bottom"></i>
        </div>
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
            :selectable='checkboxT'
            width="34">
          </el-table-column>
          <el-table-column
            label="审核状态"
            width="100">
            <template slot-scope="scope">
              {{scope.row.status === 'submit'? '未审核': scope.row.status === 'checked'? (scope.row.interfaceReturnStatus === '0'? '接口失败': '审核通过'): scope.row.status === 'noPass'? '审核不通过':''}}
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="生产订单号"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            label="生产物料"
            :show-overflow-tooltip="true"
            width="360">
            <template slot-scope="scope">
              {{ scope.row.materialName + ' ' + scope.row.materialCode}}
            </template>
          </el-table-column>
          <el-table-column
            prop="planOutput"
            label="计划生产数量"
            width="105">
          </el-table-column>
          <el-table-column
            prop="outputUnit"
            label="单位"
            width="50">
          </el-table-column>
          <el-table-column
            prop="entryQnt"
            label="入库数量"
            width="78">
          </el-table-column>
          <el-table-column
            prop="entryUom"
            label="单位"
            width="50">
          </el-table-column>
          <el-table-column
            label="是否样品"
            width="78">
            <template slot-scope="scope">
              {{scope.row.isSample === '0'? '否':'是'}}
            </template>
          </el-table-column>
          <el-table-column
            prop="batch"
            label="物料批次"
            width="105">
          </el-table-column>
          <el-table-column
            label="生产日期"
            width="105">
            <template slot-scope="scope">
              {{scope.row.prodDate | SetDate}}
            </template>
          </el-table-column>
          <el-table-column
            label="入库库位"
            width="78">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.stgeLoc" placeholder="手工录入" size="small" v-if="scope.row.redact"></el-input>
              <span v-if="!scope.row.redact">{{ scope.row.stgeLoc }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="移动类型"
            width="78">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.moveType" placeholder="手工录入" size="small" v-if="scope.row.redact"></el-input>
              <span v-if="!scope.row.redact">{{ scope.row.moveType }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="库存类型"
            width="78">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.stckType" placeholder="手工录入" size="small" v-if="scope.row.redact"></el-input>
              <span v-if="!scope.row.redact">{{ scope.row.stckType }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="交货已完成标识"
            width="120">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.noMoreGr" placeholder="手工录入" size="small" v-if="scope.row.redact"></el-input>
              <span v-if="!scope.row.redact">{{ scope.row.noMoreGr }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="货架寿命到期日"
            width="120">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.expirydate" placeholder="手工录入" size="small" v-if="scope.row.redact"></el-input>
              <span v-if="!scope.row.redact">{{ scope.row.expirydate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="interfaceReturn"
            label="接口回写"
            :show-overflow-tooltip="true"
            width="150">
          </el-table-column>
          <el-table-column
            prop="memo"
            label="审核意见"
            :show-overflow-tooltip="true"
            width="150">
          </el-table-column>
          <el-table-column
            prop="verifyMan"
            label="审核人"
            width="160">
          </el-table-column>
          <el-table-column
            prop="verifyDate"
            label="审核时间"
            width="160">
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            label="备注">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.remark" placeholder="手工录入" size="small" v-if="scope.row.redact"></el-input>
              <span v-if="!scope.row.redact">{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="65">
            <template slot-scope="scope">
              <el-button style="padding: 0;" @click="redact(scope.row)" type="text" v-if="!((scope.row.status === 'checked' && scope.row.interfaceReturnStatus === '1') || scope.row.status === 'noPass') && isAuth('sys:verifyInStorage:auditing')">{{ scope.row.redact? '保存' : '编辑'}}</el-button>
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
        workShop: '',
        productLine: '',
        prodDate: new Date(new Date() - 24 * 60 * 60 * 1000).getFullYear().toString() + '-' + ((new Date(new Date() - 24 * 60 * 60 * 1000).getMonth() + 1) >= 10 ? (new Date(new Date() - 24 * 60 * 60 * 1000).getMonth() + 1).toString() : '0' + (new Date(new Date() - 24 * 60 * 60 * 1000).getMonth() + 1)) + '-' + (new Date(new Date() - 24 * 60 * 60 * 1000).getDate() >= 10 ? new Date(new Date() - 24 * 60 * 60 * 1000).getDate().toString() : ('0' + new Date(new Date() - 24 * 60 * 60 * 1000).getDate())),
        pstngDate: '',
        headerTxt: '',
        status: '',
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
    'plantList.workShop' (n, o) {
      this.GetParentline(n)
    }
  },
  filters: {
    SetDate: function (value) {
      return value.slice(0, value.indexOf(' '))
    }
  },
  mounted () {
    // this.GetAuditList()
    this.plantList.pstngDate = new Date().getFullYear().toString() + '-' + ((new Date().getMonth() + 1) >= 10 ? (new Date().getMonth() + 1).toString() : '0' + (new Date().getMonth() + 1)) + '-' + (new Date().getDate() >= 10 ? new Date().getDate().toString() : ('0' + new Date().getDate()))
    this.Getdeptcode()
    let $ = this.$

    // 搜索切换显隐
    $('.toggleSearchBottom').click(function () {
      $('.searchCard').animate({height: 0}, 300, function () {
        $('.searchCard').parent('.main').css('padding-bottom', 0)
      })
      $(this).hide()
      $('.toggleSearchTop').show()
    })
    $('.toggleSearchTop').click(function () {
      $('.searchCard').animate({height: '190px'}, 300, function () {
        $('.searchCard').parent('.main').css('padding-bottom', '15px')
      })
      $(this).hide()
      $('.toggleSearchBottom').show()
    })
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
      this.plantList.workShop = ''
      this.plantList.productLine = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}/${id}`, 'GET').then(({data}) => {
          if (data.code === 0) {
            this.workshop = data.typeList
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.workshop = []
      }
    },
    // 获取产线
    GetParentline (id) {
      this.plantList.productLine = ''
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYPARENTID_API}`, 'POST', {parentId: id}).then(({data}) => {
          if (data.code === 0) {
            this.productline = data.childList
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.productline = []
      }
    },
    // 表格选中
    handleSelectionChange (val) {
      this.multipleSelection = []
      val.forEach((item, index) => {
        this.multipleSelection.push(item)
      })
    },
    // 审核通过禁用
    checkboxT (row) {
      if ((row.status === 'checked' && row.interfaceReturnStatus === '1') || row.status === 'noPass') {
        return 0
      } else {
        return 1
      }
    },
    // 编辑
    redact (row) {
      if (!row.redact) {
        row.redact = true
        this.AuditList.splice(this.AuditList.length, 0, {})
        this.AuditList.splice(this.AuditList.length - 1, 1)
      } else {
        row.pstngDate = this.plantList.pstngDate
        row.status = ''
        this.$http(`${AUDIT_API.AUDITHOURSUPDATE_API}`, 'POST', [row]).then(({data}) => {
          if (data.code === 0) {
            this.$message.success('操作成功')
            row.redact = false
            this.AuditList.splice(this.AuditList.length, 0, {})
            this.AuditList.splice(this.AuditList.length - 1, 1)
          } else {
            this.$message.error(data.msg)
          }
          this.GetAuditList()
        })
      }
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
            item.pstngDate = this.plantList.pstngDate
          })
          this.$http(`${AUDIT_API.GOAUDIT_API}`, 'POST', this.multipleSelection).then(({data}) => {
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
            item.status = 'checked'
            item.memo = '审核通过'
            item.pstngDate = this.plantList.pstngDate
          })
          console.log(this.productline.pstngDate)
          console.log(this.multipleSelection)
          this.$http(`${AUDIT_API.GOAUDIT_API}`, 'POST', this.multipleSelection).then(({data}) => {
            if (data.code === 0) {
              this.$message.success('操作成功')
              this.GetAuditList()
            } else {
              this.GetAuditList()
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
  .searchCard { margin-bottom: 0; }
  .searchCard, .tableCard {
    position: relative;
    .toggleSearchTop {
      width: 100%; position: absolute; top: 0; left: 0; text-align: center; cursor: pointer; display: none;
    }
    .toggleSearchBottom {
      width: 100%; position: absolute; bottom: 0; left: 0; text-align: center; cursor: pointer;
    }
    .el-icon-caret-top:before,
    .el-icon-caret-bottom:before {
      color: #dcdfe6;
    }
  }

  .topforms{
    .el-date-editor.el-input{
      width: auto;
    }
    input{
      width: 240px!important;
    }
    .formtextarea{
      .el-form-item__content{
        width: 500px;
      }
    }
  }
</style>
