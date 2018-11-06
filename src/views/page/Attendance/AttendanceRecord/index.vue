<template>
  <el-col v-loading.fullscreen.lock="lodingS" element-loading-text="加载中">
    <div class="main">
      <el-card class="searchCard">
        <el-row type="flex">
          <el-col>
            <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="85px" class="topforms" @keyup.enter.native="GetAuditList()" @submit.native.prevent>
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
                <el-select v-model="plantList.productLine" placeholder="请选择">
                  <el-option label="请选择"  value=""></el-option>
                  <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="日期：">
                <el-date-picker type="date" placeholder="选择" value-format="yyyy-MM-dd" v-model="plantList.setDate" style="width: 200px"></el-date-picker>
              </el-form-item>
              <el-form-item label="考勤大类：">
                <el-select v-model="plantList.kqdl" placeholder="请选择">
                  <el-option label="请选择"  value=""></el-option>
                  <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in ARtype" :key="index"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="width: 150px">
            <el-row style="margin-bottom: 15px">
              <el-button type="primary" size="small" @click="GetList(true)" v-if="isAuth('verify:time:list')">查询</el-button>
              <el-button type="primary" size="small" @click="addAR()" v-if="isAuth('verify:time:update')">新增</el-button>
            </el-row>
            <el-button type="primary" size="small" @click="saveAtt()" v-if="isAuth('verify:time:update')">保存</el-button>
            <el-button type="primary" size="small" @click="subAutio()" v-if="isAuth('verify:time:update')">提交</el-button>
          </el-col>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0">
      <el-card class="tableCard">
        <div class="toggleSearchTop">
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-table
          v-if="clearStatus"
          ref="table1"
          header-row-class-name="tableHead"
          :data="datalist"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom: 20px">
          <el-table-column
            type="selection"
            width="34">
          </el-table-column>
          <el-table-column
            label="状态"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              {{scope.row.status === 'saved'? '已保存': scope.row.status === 'submit'? '已提交': scope.row.status === 'checked'?  '审核通过': scope.row.status === 'noPass'? '审核不通过':''}}
            </template>
          </el-table-column>
          <el-table-column
            prop="reqno"
            label="订单号"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            prop="workShopName"
            label="车间"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            prop="kqdlName"
            label="考勤大类"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            prop="kqlxName"
            label="考勤类型"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            prop="productLineName"
            label="产线/工序"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            prop="deptIdName"
            label="班组"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            prop="userType"
            label="人员属性"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="姓名（工号）"
            :show-overflow-tooltip="true"
            width="120">
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="白/中/夜班"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-if="redactStatus">
                <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
              </el-select>
              <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-else disabled>
                <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="工作内容"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" v-if="redactStatus" size="small" placeholder="手工录入"></el-input>
              <span v-else>{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="计时时数（小时）"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.timedTime" v-if="redactStatus" size="small" placeholder="手工录入"></el-input>
              <span v-else>{{scope.row.timedTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="pieceTime"
            label="计件时数（小时）"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pieceTime" v-if="redactStatus" size="small" placeholder="手工录入"></el-input>
              <span>{{scope.row.pieceTime}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="出勤时数（小时）"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              {{scope.row.workTime = scope.row.timedTime + scope.row.pieceTime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="审批意见"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="auditLog(scope.row)">审核日志</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" v-if="redactStatus" size="small" placeholder="手工录入"></el-input>
              <span v-else>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="80">
            <template slot-scope="scope">
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="!clearStatus"
          ref="table1"
          header-row-class-name="tableHead"
          :data="datalist"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom: 20px">
          <el-table-column
            label="车间"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.workShop" placeholder="请选择" size="small" disabled>
                <el-option :label="item.deptName" v-for="(item, index) in workshop" :key="index" :value="item.deptId"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="考勤大类"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.kqdl" placeholder="请选择" size="small" @change="GetARpro(scope.row)">
                <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in ARtype" :key="index"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="考勤类型"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.kqlx" placeholder="请选择" size="small">
                <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in ARpro" :key="index"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="产线/工序"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.productLine" placeholder="请选择" size="small">
                <el-option :label="item.deptName" v-for="(item, index) in productline" :key="index" :value="item.deptId"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="deptId"
            label="班组"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.deptId" placeholder="请选择" size="small">
                <el-option :label="iteam.deptName" :value="iteam.deptId" v-for="(iteam, index) in Team" :key="index"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="人员属性"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.userType" placeholder="请选择" size="small">
                <el-option label="正式" value="正式"></el-option>
                <el-option label="借调" value="借调"></el-option>
                <el-option label="临时工" value="临时工"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="姓名（工号）"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <span style="cursor: pointer" @click="selectUser(scope.row)" v-if="redactStatus && scope.row.userType!=='临时工'">
                <i v-for="(item,index) in scope.row.userId" :key="index">{{item}}，</i>
                <i>点击选择人员</i>
              </span>
              <span style="cursor: pointer" @click="dayLaborer(scope.row)" v-if="redactStatus && scope.row.userType=='临时工'">
                <i v-for="(item,index) in scope.row.userId" :key="index">{{item}}，</i>
                <i>点击输入临时工</i>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="白/中/夜班"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.classType" placeholder="请选择" size="small">
                <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="工作内容"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.content" v-if="redactStatus" size="small" placeholder="手工录入"></el-input>
              <span v-else>{{scope.row.content}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="计时时数（小时）"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.timedTime" size="small" placeholder="手工录入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="计件时数（小时）"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.pieceTime" size="small" placeholder="手工录入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="出勤时数（小时）"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              {{scope.row.workTime = scope.row.timedTime * 1 + scope.row.pieceTime * 1}}
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            :show-overflow-tooltip="true"
            width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" size="small" placeholder="手工录入"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="80">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delUser(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row v-if="clearStatus">
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
      title="人员分配"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-row>
        <el-col style="width: 500px">
          <el-transfer
            filterable
            :titles="['未分配人员', '已分配人员']"
            :filter-method="filterMethod"
            filter-placeholder="请输入用户名称"
            v-model="selctId"
            :data="userlist">
          </el-transfer>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="updatauser(row)">确定</el-button>
        </span>
    </el-dialog>
    <el-dialog
      width="450px"
      ref="dayLaborer"
      title="新增临时工"
      :close-on-click-modal="false"
      :visible.sync="visible1">
      <el-form :model="form" size="small" label-width="120px" class="dialogform">
        <el-row>
          <el-button type="primary" @click="addDayLaborer(selctId2)" size="small" style="float: right;margin-bottom: 10px">新增</el-button>
        </el-row>
        <el-form-item label="临时工姓名：" v-for="(item, index) in selctId2" :key="index">
          <el-col :span="20">
            <el-input v-model="selctId2[index]"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="danger" icon="el-icon-delete" circle @click="delselctId2(item)"></el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="visible1 = false">取消</el-button>
          <el-button type="primary" @click="close(row)">确定</el-button>
        </span>
    </el-dialog>
    <el-dialog
      width="850px"
      title="借调人员"
      :close-on-click-modal="false"
      :visible.sync="visible2">
      <el-row>
        <el-col style="width: 250px">
          <el-card style="height: 303px;overflow-y: scroll">
            <h3 style="font-size: 16px;color: black;margin-bottom: 10px">组织架构</h3>
            <el-tree :data="OrgTree" node-key="deptId" :default-expanded-keys="arrList" @node-click="setdetail" ref="tree2" :expand-on-click-node="false"></el-tree>
          </el-card>
        </el-col>
        <el-col style="width: 250px">
          <el-card style="height: 303px;overflow-y: scroll">
            <el-input v-model="filterText" size="small" placeholder="搜索人员"></el-input>
            <el-tree ref="userlistTree" :filter-node-method="filterNode" node-key="userId" @node-click="treeNodeClick" :data="userlist" show-checkbox :props="userListTreeProps"  :expand-on-click-node="false" @check-change="userTree"></el-tree>
          </el-card>
        </el-col>
        <el-col style="width: 50px;padding: 70px 5px">
          <el-button type="primary" icon="el-icon-arrow-left" circle style="margin-bottom: 50px" @click="delSelcted()" v-if="tree2Status"></el-button>
          <el-button type="primary" icon="el-icon-arrow-left" circle style="margin-bottom: 50px" @click="delSelcted()" v-else disabled></el-button>
          <el-button type="primary" icon="el-icon-arrow-right" circle style="margin-left: 0" @click="addSelcted()" v-if="tree1Status"></el-button>
          <el-button type="primary" icon="el-icon-arrow-right" circle style="margin-left: 0" @click="addSelcted()" v-else disabled></el-button>
        </el-col>
        <el-col style="width: 250px">
          <el-card style="height: 303px;overflow-y: scroll">
            <el-input v-model="filterText1" size="small" placeholder="搜索人员"></el-input>
            <el-tree ref="userlistTree1" :filter-node-method="filterNode1" :data="selctId" show-checkbox :props="selctListTreeProps"  :expand-on-click-node="false" @check-change="userTree1"></el-tree>
          </el-card>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible2 = false">取消</el-button>
        <el-button type="primary" @click="saveduser(row)">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="审核日志"
      :close-on-click-modal="false"
      :visible.sync="visible3">
      <el-table
        :data="auditLogList"
        header-row-class-name="tableHead"
        border
        tooltip-effect="dark">
        <el-table-column
          prop=""
          label="审核人">
        </el-table-column>
        <el-table-column
          prop=""
          label="审核意见">
        </el-table-column>
        <el-table-column
          prop=""
          label="审核时间">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible3 = false">关闭</el-button>
      </span>
    </el-dialog>
  </el-col>
</template>

<script>
import {BASICDATA_API, SYSTEMSETUP_API, AR_API} from '@/api/api'
import { setUserList } from '@/net/validate'
export default {
  name: 'index',
  data () {
    return {
      form: {},
      visible: false,
      visible1: false,
      visible2: false,
      visible3: false,
      clearStatus: false,
      lodingS: false,
      redactStatus: false,
      factory: [],
      workshop: [],
      productline: [],
      datalist: [],
      auditLogList: [],
      ARtype: [],
      ARpro: [],
      OrgTree: [],
      arrList: [],
      filterText: '',
      filterText1: '',
      tree1Status: false,
      tree2Status: false,
      userListTreeProps: {
        label: function (data, node) {
          return data.realName + '（' + ((data.workNum !== null && data.workNum !== '') ? data.workNum : data.workNumTemp) + '）'
        },
        children: ''
      },
      selctListTreeProps: {
        label: function (data, node) {
          return data.label
        },
        children: ''
      },
      productShift: [],
      proline: [],
      Team: [],
      row: {},
      plantList: {
        factory: '',
        workShop: '',
        productLine: '',
        setDate: new Date(new Date() - 24 * 60 * 60 * 1000).getFullYear().toString() + '-' + ((new Date(new Date() - 24 * 60 * 60 * 1000).getMonth() + 1) >= 10 ? (new Date(new Date() - 24 * 60 * 60 * 1000).getMonth() + 1).toString() : '0' + (new Date(new Date() - 24 * 60 * 60 * 1000).getMonth() + 1)) + '-' + (new Date(new Date() - 24 * 60 * 60 * 1000).getDate() >= 10 ? new Date(new Date() - 24 * 60 * 60 * 1000).getDate().toString() : ('0' + new Date(new Date() - 24 * 60 * 60 * 1000).getDate())),
        kqdl: '',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      saveData: [],
      userlist: [],
      selctId: [],
      selctId2: [],
      filterMethod (query, item) {
        return item.screncon.indexOf(query) > -1
      }
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
  mounted () {
    this.Getdeptcode()
    this.GetProductShift()
    this.GetTeam()
    this.GetARtype()
    this.GetARpro()
    this.GetList()
    this.getTree()
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
    // 获取生产班次
    GetProductShift () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=product_shift`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.productShift = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取产线下班组
    GetTeam () {
      this.$http(`${BASICDATA_API.FINDTEAM_API}`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.Team = data.teamList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取考勤属性
    GetARpro (row) {
      // row.kqlx = ''
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=${row.kqdl}`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.ARpro = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取考勤类型
    GetARtype () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=KQ_type`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.ARtype = data.dicList
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
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {deptId: id}).then(({data}) => {
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
    // 获取组织结构树
    getTree () {
      this.$http(`${BASICDATA_API.ORGSTRUCTURE_API}`, 'GET', {}).then(({data}) => {
        if (data.code === 0) {
          this.OrgTree = data.deptList
          this.arrList = [this.OrgTree[0].children[0].deptId]
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 审核日志
    auditLog () {
      this.auditLogList = []
      this.visible3 = true
    },
    // 新增
    addAR () {
      if (this.plantList.workShop === '') {
        this.$message.error('请选择车间后新增')
      } else {
        this.redactStatus = true
        if (this.clearStatus) {
          this.datalist = []
          this.clearStatus = false
        }
        this.datalist.push(
          {
            workShop: this.plantList.workShop,
            userType: '',
            deptId: '',
            userId: [],
            timedTime: 0,
            pieceTime: 0
          }
        )
      }
    },
    // 人员删除
    delUser (row) {
      this.datalist.splice(this.datalist.indexOf(row), 1)
    },
    // 获取列表
    GetList (st) {
      this.clearStatus = true
      if (st) {
        this.plantList.currPage = 1
      }
      this.lodingS = true
      this.$http(`${AR_API.ARLIST_API}`, 'POST', this.plantList).then(({data}) => {
        if (data.code === 0) {
          this.datalist = data.page.list
          this.plantList.currPage = data.page.currPage
          this.plantList.pageSize = data.page.pageSize
          this.plantList.totalCount = data.page.totalCount
        } else {
          this.$message.error(data.msg)
        }
        this.lodingS = false
      })
    },
    // 选择人员
    selectUser (row) {
      this.row = row
      if (row.userType === '借调') {
        this.SetSelecd()
      } else if (row.userType === '正式') {
        if (row.deptId) {
          this.GetUserforteam(row.deptId)
        } else {
          this.$message.error('请选择班组')
        }
      } else {
        this.$message.error('请选择人员属性')
      }
    },
    // 反写选中人
    SetSelecd () {
      this.selctId = []
      this.userlist = []
      this.tree1Status = false
      this.tree2Status = false
      this.row.userId.forEach((item, index) => {
        this.selctId.push({label: item})
      })
      this.visible2 = true
    },
    // 根据部门id查人
    GetUserforteam (id) {
      this.$http(`${SYSTEMSETUP_API.USERALL_API}`, 'POST', id ? {dept_id: id} : {}).then(({data}) => {
        if (data.code === 0) {
          this.userlist = setUserList(data.listUser)
          this.selctId = this.row.userId
          this.visible = true
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 确定人员
    updatauser (row) {
      row.userId = this.selctId
      this.visible = false
    },
    // 搜索人员
    filterNode (value, data) {
      if (!value) return true
      return data.realName.indexOf(value) !== -1 || data.workNum.indexOf(value) !== -1
    },
    filterNode1 (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 根据组织架构查人
    setdetail (data) {
      this.$http(`${SYSTEMSETUP_API.USERLIST_API}`, 'POST', {
        deptId: data.deptId,
        param: '',
        currPage: '1',
        pageSize: '1000'
      }).then(({data}) => {
        if (data.code === 0) {
          this.userlist = data.page.list
          this.tree1Status = false
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 树节点点击
    treeNodeClick (data) {
      if (JSON.stringify(this.$refs.userlistTree.getCheckedNodes()).indexOf(JSON.stringify(data)) === -1) {
        let arr = this.$refs.userlistTree.getCheckedNodes()
        arr.push(data)
        this.$refs.userlistTree.setCheckedNodes(arr)
      }
    },
    // 往左
    delSelcted () {
      this.$refs.userlistTree1.getCheckedNodes().forEach((item, index) => {
        this.selctId.splice(this.selctId.indexOf(item), 1)
      })
      this.tree2Status = false
    },
    // 往右
    addSelcted () {
      this.$refs.userlistTree.getCheckedNodes().forEach((item, index) => {
        let obj = {}
        obj.label = item.realName + '（' + ((item.workNum !== null && item.workNum !== '') ? item.workNum : item.workNumTemp) + '）'
        if (JSON.stringify(this.selctId).indexOf(JSON.stringify(obj)) === -1) {
          this.selctId.push(obj)
        }
      })
    },
    userTree () {
      if (this.$refs.userlistTree.getCheckedNodes().length > 0) {
        this.tree1Status = true
      } else {
        this.tree1Status = false
      }
    },
    userTree1 () {
      if (this.$refs.userlistTree1.getCheckedNodes().length > 0) {
        this.tree2Status = true
      } else {
        this.tree2Status = false
      }
    },
    // 借调人员确定
    saveduser (row) {
      row.userId = []
      this.selctId.forEach((item) => {
        row.userId.push(item.label)
      })
      this.visible2 = false
    },
    // 选择输入临时工
    dayLaborer (row) {
      this.row = row
      this.visible1 = true
      this.selctId2 = []
      this.row.userId.forEach((item) => {
        this.selctId2.push(item)
      })
    },
    // 临时工添加
    addDayLaborer (row) {
      row.push('')
    },
    // 临时工确定
    close (row) {
      row.userId = this.selctId2
      this.visible1 = false
    },
    // 临时工删除
    delselctId2 (item) {
      this.selctId2.splice(this.selctId2.indexOf(item), 1)
    },
    /**
     * 保存
     */
    // 校验
    datarul () {
      // let st = true
      this.datalist.forEach((item, index) => {
        // if (item.kqdl === '' || item.) {
        //
        // }
      })
    },
    // 保存
    saveAtt () {
      if (!this.clearStatus) {
        this.disData()
        this.lodingS = true
        this.$http(`${AR_API.ARADD_API}`, 'POST', this.saveData).then(({data}) => {
          if (data.code === 0) {
            this.$message.success('保存成功')
          } else {
            this.$message.error(data.msg)
          }
          this.lodingS = false
        })
      }
    },
    disData () {
      this.saveData = []
      for (var j = 0; j < this.datalist.length; j++) {
        for (var i = 0; i < this.datalist[j].userId.length; i++) {
          this.saveData.push(JSON.parse(JSON.stringify(this.datalist[j])))
          this.saveData[i].userId = this.datalist[j].userId[i]
          this.saveData[i].factory = this.plantList.factory
          this.saveData[i].kqrq = this.plantList.setDate
          this.saveData[i].status = 'saved'
        }
      }
    },
    // 改变每页条数
    handleSizeChange (val) {
      this.plantList.pageSize = val
      this.GetList()
    },
    // 跳转页数
    handleCurrentChange (val) {
      this.plantList.currPage = val
      this.GetList()
    }
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" scoped>
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
</style>
