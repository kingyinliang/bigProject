<template>
  <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
    <div class="main">
      <el-card>
        <el-row>
          <el-col :span="21">
            <el-form :model="plantList" size="small" :inline="true" label-position="right" label-width="95px">
              <el-form-item label="工厂：">
                <el-select v-model="plantList.factoryid">
                  <el-option label="不限" value="">不限</el-option>
                  <el-option v-for="sole in factory" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车间：">
                <el-select v-model="plantList.workshopid">
                  <el-option label="不限" value="">不限</el-option>
                  <el-option v-for="sole in workshop" :key="sole.deptId" :label="sole.deptName" :value="sole.deptId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="生产日期：">
                <el-date-picker type="date" v-model="plantList.productDate" value-format="yyyyMMdd"></el-date-picker>
              </el-form-item>
              <el-form-item label="生产状态：">
                <el-select v-model="plantList.status">
                  <el-option label="正常生产" value="normal"></el-option>
                  <el-option label="无生产" value="abnormal"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="3">
            <el-row>
              <el-button type="primary" size="small" @click="GetOrderList(true)">查询</el-button>
              <el-button v-if="type === 'abnormal'" type="primary" size="small" @click="isdisabledFn()">编辑</el-button>
            </el-row>
            <el-row v-if="type === 'abnormal'" style="margin-top:20px">
              <el-button type="primary" size="small" @click="AddPeople()">新增</el-button>
              <el-button type="primary" size="small">保存</el-button>
            </el-row>
          </el-col>
        </el-row>
        <el-row v-if="type === 'normal'"  :gutter="10">
          <el-col :span="12" v-for="(item, index) in FryWheatList" :key="index" style="margin-bottom: 10px">
            <el-card class="box-card">
              <el-form  size="small" label-position="right" label-width="85px">
                <div class="clearfix pro-line">
                  <el-form-item label="工序：">
                    <p>
                      炒麦
                      <el-button @click="go(item)" type="primary" size="small" style="float: right">数据录入</el-button>
                      <span style="float: right;color: #8a979e;font-size: 14px;min-width: 150px">订单状态：</span>
                    </p>
                  </el-form-item>
                </div>
                <div class="clearfix item">
                  <img :src="'data:image/gif;base64,' + item.img" alt="">
                  <div class="itemForm">
                      <el-form-item label="订单号：" class="margb20px">
                        <el-select v-model="item.orderNo" placeholder="请选择" :change="orderchange(item)">
                          <el-option label=""  value=""></el-option>
                          <el-option :label="item" v-for="(item, index) in item.order_arr" :key="index" :value="item"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="品项：" class="margb20px">
                        <p class="hiddenP">{{item.materialCode + ' ' + item.materialName}}</p>
                      </el-form-item>
                      <el-form-item label="计划产量：" class="margb20px">
                        <p>{{item.planOutput + ' ' + item.outputUnit}}</p>
                      </el-form-item>
                      <el-form-item label="实时产量：" class="margb20px">
                        <p>{{item.realOutput? item.realOutput + item.outputUnit: '0' + ' ' + item.outputUnit}}</p>
                      </el-form-item>
                  </div>
                </div>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="12" style="margin-bottom: 10px">
            <el-card class="box-card">
              <el-form size="small" label-position="right" label-width="85px">
                <div class="clearfix pro-line">
                  <el-form-item label="工序：">
                    <p>
                      PW小麦
                      <el-button @click="go2()" type="primary" size="small" style="float: right">数据录入</el-button>
                      <span style="float: right;color: #8a979e;font-size: 14px;min-width: 150px">订单状态：</span>
                    </p>
                  </el-form-item>
                </div>
                <div class="clearfix item">
                  <img :src="'data:image/gif;base64,'" alt="">
                  <div class="itemForm">
                      <el-form-item label="订单号：" style="margin-bottom: 10px;">
                        <el-select placeholder="请选择">
                        </el-select>
                      </el-form-item>
                      <el-form-item label="品项：" style="margin-bottom: 10px;">
                        <p class="hiddenP"></p>
                      </el-form-item>
                      <el-form-item label="计划产量：" style="margin-bottom: 10px;">
                        <p></p>
                      </el-form-item>
                      <el-form-item label="实时产量：" style="margin-bottom: 10px;">
                        <p></p>
                      </el-form-item>
                  </div>
                </div>
              </el-form>
            </el-card>
          </el-col>
        </el-row>
        <el-row v-else-if="type === 'abnormal'">
          <el-table border  header-row-class-name="tableHead" :data="datalist">
            <el-table-column label="序号" width="50" prop="id" type="index"></el-table-column>
            <el-table-column label="中/白/夜班" prop="dayType" width="120">
              <template slot-scope="scope">
                <el-select v-model="scope.row.dayType" placeholder="请选择" size="small" :disabled="isdisabled">
                  <el-option v-for="sole in dayTypeList" :key="sole.value" :value="sole.value" :label="sole.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="工序" prop="processes" width="120">
              <template slot-scope="scope">
                <el-select v-model="scope.row.processes" placeholder="请选择" size="small" @change="changeProcType(scope.row)" :disabled="isdisabled">
                  <el-option v-for="sole in processesList" :key="sole.deptId" :value="sole.deptId" :label="sole.deptName"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="人员属性" prop="userType" width="120">
              <template slot-scope="scope">
                <el-select v-model="scope.row.userType" placeholder="请选择" size="small" @change="changeProcType(scope.row)" :disabled="isdisabled">
                  <el-option v-for="sole in userTypeList" :key="sole.value" :value="sole.value" :label="sole.value"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="userId" label="姓名（工号）" :show-overflow-tooltip="true" width="170">
              <template slot-scope="scope">
                <el-col v-if="!isdisabled">
                  <span style="cursor: pointer" @click="selectUser(scope.row)" v-if="scope.row.userType!=='临时工'">
                    <i v-if="scope.row.userId!== undefined">{{scope.row.userId.join(",")}}</i>
                    <i>点击选择人员</i>
                  </span>
                  <span style="cursor: pointer" @click="dayLaborer(scope.row)" v-if="scope.row.userType=='临时工'">
                    <i v-if="scope.row.userId!== undefined">{{scope.row.userId.join(",")}}</i>
                    <i>点击输入临时工</i>
                  </span>
                </el-col>
                <el-col v-else>
                  <span style="cursor: pointer" v-if="scope.row.userType!=='临时工'">
                    <i v-if="scope.row.userId!== undefined">{{scope.row.userId.join(",")}}</i>
                    <i>点击选择人员</i>
                  </span>
                  <span style="cursor: pointer" v-if="scope.row.userType=='临时工'">
                    <i v-if="scope.row.userId!== undefined">{{scope.row.userId.join(",")}}</i>
                    <i>点击输入临时工</i>
                  </span>
                </el-col>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" prop="starTime" width="195">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.starTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" size="small" style="width:175px" :disabled="isdisabled"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="用餐时间(MIN)" prop="eaTime" width="90">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.eaTime" :disabled="isdisabled"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" prop="endTime" width="195">
              <template slot-scope="scope">
                <el-date-picker v-model="scope.row.endTime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择时间" size="small" style="width:175px" :disabled="isdisabled"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="备注" prop="remark" width="100">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.remark" :disabled="isdisabled"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="50">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete" circle size="small" @click="delUser(scope.row)" :disabled="isdisabled"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row v-if="addRowStatus!=1">
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
    <temporary-worker ref="temporaryWorker" @changeUser="changeUser"></temporary-worker>
  </el-col>
</template>

<script>
import {BASICDATA_API, SYSTEMSETUP_API, PACKAGING_API} from '@/api/api'
import {setUserList, dateFormat, orderList} from '@/net/validate'
import TemporaryWorker from './common/temporaryWorker'
export default {
  name: 'index',
  data () {
    return {
      FryWheatList: [],
      lodingStatus: false,
      isdisabled: true,
      plantList: {
        factoryid: '',
        workshopid: '',
        productDate: '',
        status: 'normal',
        currPage: 1,
        pageSize: 10,
        totalCount: 0
      },
      factory: [],
      workshop: [],
      workShop: '',
      productDate: '',
      factoryid: '',
      type: '', // plantList.status
      datalist: [], // 查询列表
      addRowStatus: 0, // 人员新增 1增
      dayTypeList: [{value: '白班'}, {value: '中班'}, {value: '夜班'}],
      userTypeList: [{value: '正式'}, {value: '借调'}, {value: '临时工'}],
      processesList: [], // 车间工序list
      row: {},
      userlist: [],
      selctId: [],
      selctId2: [],
      tree1Status: false,
      tree2Status: false,
      form: {},
      visible: false,
      visible1: false,
      visible2: false,
      OrgTree: [],
      arrList: [],
      filterText: '',
      filterText1: '',
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
      filterMethod (query, item) {
        return item.screncon.indexOf(query) > -1
      }
    }
  },
  watch: {
    'plantList.factoryid' (n) {
      this.Getworkshop(n)
    },
    'plantList.workshopid' (n) {
      this.GetProcess(n)
    }
  },
  mounted () {
    if (this.plantList.productDate === '') {
      this.plantList.productDate = dateFormat(new Date(), 'yyyy-MM-dd')
    }
    this.GetfactoryList()
    this.getTree()
  },
  methods: {
    go (item) {
      if (item.orderNo && item.properties) {
        this.FWorderNo = item.orderNo
        this.FWproductDate = this.productDate
        this.FWworkShop = this.workShop
        this.mainTabs = this.mainTabs.filter(item => item.name !== 'DataEntry-Packaging-ProDataIn')
        let that = this
        setTimeout(function () {
          that.$router.push({ name: `DataEntry-FryWheat-EnterData-dataEntryIndex` })
        }, 100)
      } else {
        this.$message.error('请选择订单号')
      }
    },
    go2 () {
      this.$router.push({ name: `DataEntry-FryWheat-PwWheat-dataEntryIndex` })
    },
    // 获取工厂
    GetfactoryList () {
      this.$http(`${BASICDATA_API.FINDORG_API}?code=factory`, `POST`).then((res) => {
        if (res.data.code === 0) {
          this.factory = res.data.typeList
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 根据工厂获车间
    Getworkshop (fid) {
      this.plantList.workshopid = ''
      if (fid) {
        this.$http(`${BASICDATA_API.FINDORGBYID_API}`, 'POST', {daptId: fid, deptName: '炒麦 炒麦'}).then(res => {
          if (res.data.code === 0) {
            this.workshop = res.data.typeList
          } else {
            this.$message.error(res.data.msg)
          }
        })
      } else {
        this.workshop = ''
      }
    },
    // 根据车间获取工序
    GetProcess (id) {
      this.processesList = []
      if (id) {
        this.$http(`${BASICDATA_API.FINDORGBYPARENTID_API}`, 'POST', {parentId: id}).then(({data}) => {
          if (data.code === 0) {
            this.processesList = data.childList
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.processesList = []
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
    GetorderList () {
      this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
        workShop: this.plantList.workshopid,
        productDate: this.plantList.productDate,
        orderNo: ''
      }).then(({data}) => {
        if (data.code === 0) {
          this.FryWheatList = orderList(data.list)
          this.workShop = this.plantList.workshopid
          this.productDate = this.plantList.productDate
          this.factoryid = this.plantList.factoryid
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 查询
    GetOrderList (st) {
      if (this.plantList.workshopid === '') {
        this.$message.error('请选择车间')
        return
      }
      if (this.plantList.status === 'normal') { // 正常生产
        if (this.plantList.productDate == null) {
          this.$message.error('请选择生产时间')
          return
        }
        this.GetorderList()
      } else if (this.plantList.status === 'abnormal') {
        // 无生产
        this.addRowStatus = 0
        this.isdisabled = true
        this.datalist = [{
          id: 1,
          dayType: '中班',
          processes: 'A组',
          userType: '正式',
          userList: '1434345,4234354,2313',
          starTime: '2018-12-05 07:59',
          eaTime: '60',
          endTime: '2018-12-05 05:59'
        },
        {
          userType: '临时工'
        }]
      } else {
        this.$message.error('请选择生产状态')
        return
      }
      this.type = this.plantList.status
    },
    // 订单号下拉
    orderchange (row) {
      if (row.orderNo && row.orderNo !== row.orderNo2) {
        this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
          workShop: this.workShop,
          productDate: this.productDate,
          orderNo: row.orderNo
        }).then(({data}) => {
          if (data.code === 0) {
            row.orderNo2 = row.orderNo
            row.materialCode = data.list[0].materialCode
            row.materialName = data.list[0].materialName
            row.planOutput = data.list[0].planOutput
            row.orderStatus = data.list[0].orderStatus
            row.outputUnit = data.list[0].outputUnit
            row.properties = data.list[0].properties
            row.realOutput = data.list[0].realOutput
            row.plan = data.list[0].plan
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    isdisabledFn () {
      this.isdisabled = false
    },
    // 新增人员
    AddPeople () {
      if (this.plantList.workshopid === '') {
        this.$message.error('请选择车间')
        return
      }
      if (this.addRowStatus === 0) {
        this.datalist = []
      }
      this.addRowStatus = 1
      this.isdisabled = false
      this.datalist.push({
        eaTime: '60',
        userId: []
      })
    },
    // 人员删除
    delUser (row) {
      this.datalist.splice(this.datalist.indexOf(row), 1)
    },
    // 选择人员
    selectUser (row) {
      this.row = row
      if (row.userType === '借调') {
        this.SetSelecd()
      } else if (row.userType === '正式') {
        if (row.processes) {
          this.GetUserforteam(row.processes)
        } else {
          this.$message.error('请选择工序')
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
      if (!this.clearStatus) {
        this.row.userId.forEach((item, index) => {
          this.selctId.push({label: item})
        })
      } else {
        this.selctId.push({label: this.row.userId})
      }
      this.visible2 = true
    },
    // 根据部门id查人
    GetUserforteam (id) {
      this.$http(`${SYSTEMSETUP_API.USERALL_API}`, 'POST', id ? {dept_id: id} : {}).then(({data}) => {
        if (data.code === 0) {
          this.userlist = setUserList(data.listUser)
          if (!this.clearStatus) {
            this.selctId = this.row.userId
          } else {
            this.selctId = [this.row.userId]
            let usertemp = 1
            this.userlist.forEach((item, index) => {
              if (item.key === this.row.userId) {
                usertemp++
              }
            })
            if (usertemp === 1) {
              this.selctId = []
            } else {
              this.selctId = [this.row.userId]
            }
          }
          this.visible = true
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 确定人员
    updatauser (row) {
      if (!this.clearStatus) {
        row.userId = this.selctId
      } else {
        row.userId = this.selctId[0]
      }
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
      }).then(re => {
        if (re.data.code === 0) {
          this.userlist = re.data.page.list
          this.tree1Status = false
        } else {
          this.$message.error(re.data.msg)
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
      if (!this.clearStatus) {
        row.userId = []
        this.selctId.forEach((item) => {
          row.userId.push(item.label)
        })
      } else {
        row.userId = this.selctId[0].label
      }
      this.visible2 = false
    },
    // 临时工
    dayLaborer (row) {
      this.row = row
      this.$nextTick(() => {
        this.$refs.temporaryWorker.init(row)
      })
    },
    // 员工确认
    changeUser (userId) {
      this.row.userId = userId
      this.row = JSON.parse(JSON.stringify(this.row))
      this.datalist = JSON.parse(JSON.stringify(this.datalist))
      console.log(this.row)
    },
    changeProcType (row) {
      row.userId = []
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
  computed: {
    mainTabs: {
      get () {
        return this.$store.state.common.mainTabs
      },
      set (val) {
        this.$store.commit('common/updateMainTabs', val)
      }
    },
    mainTabsActiveName: {
      get () {
        return this.$store.state.common.mainTabsActiveName
      },
      set (val) {
        this.$store.commit('common/updateMainTabsActiveName', val)
      }
    },
    FWfactoryid: {
      get () { return this.$store.state.common.Pkgfactoryid },
      set (val) { this.$store.commit('common/updateFWFactoryid', val) }
    },
    FWworkShop: {
      get () { return this.$store.state.common.PkgworkShop },
      set (val) { this.$store.commit('common/updateFWWorkShop', val) }
    },
    FWproductDate: {
      get () { return this.$store.state.common.PkgproductDate },
      set (val) { this.$store.commit('common/updateFWProductDate', val) }
    },
    FWorderNo: {
      get () { return this.$store.state.common.PkgorderNo },
      set (val) { this.$store.commit('common/updateFWOrderNo', val) }
    }
  },
  components: {
    TemporaryWorker
  }
}
</script>

<style lang="scss" scoped>
.box-card{
  .pro-line { border-bottom: 1px solid #dcdfe6; }
  .pro-line p { color: red; font-size: 16px; letter-spacing: .1em; }
  b{
    font-size: 16px;
    line-height: 32px;
    float: left;
  }
  .item{
    margin-top: 20px;
    display: flex;
    img{
      float: left;
      width: 220px;
      height: 220px;
      border-radius: 6px;
      border: 1px solid #dcdfe6;
      margin-right: 20px;
    }
    .itemForm{
      flex: 1;
      p{
        color: #8a979e;
      }
    }
    .margb20px{margin-bottom: 10px}
  }
}
</style>
