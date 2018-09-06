<template>
  <div>
    <div class="topTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>数据录入</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/DataEntry-Packaging-index' }">包装车间</el-breadcrumb-item>
        <el-breadcrumb-item>数据录入</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <el-card style="margin: 0">
        <el-row type="flex">
          <el-col>
            <el-form :inline="true" :model="form" size="small" label-width="82px" class="topform">
              <el-form-item label="车间：">
                <p class="el-input">{{order.workShopName}}</p>
              </el-form-item>
              <el-form-item label="产线：">
                <p class="el-input">{{order.productLineName}}</p>
              </el-form-item>
              <el-form-item label="订单号：">
                <p class="el-input">{{order.orderNo}}</p>
              </el-form-item>
              <el-form-item label="品项：">
                <p class="el-input">{{order.materialCode + ' ' + order.materialName}}</p>
              </el-form-item>
              <el-form-item label="计划产量：">
                <p class="el-input">{{order.planOutput + ' ' + order.outputUnit}}</p>
              </el-form-item>
              <el-form-item label="日期：">
                <p class="el-input">{{order.productDate.indexOf(' ')!==-1?order.productDate.substring(0, order.productDate.indexOf(' ')):order.productDate}}</p>
              </el-form-item>
              <el-form-item label="提交人员：">
                <p class="el-input">{{order.operator}}</p>
              </el-form-item>
              <el-form-item label="提交时间：">
                <p class="el-input">{{order.operDate}}</p>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="width: 210px">
            <el-row style="float: right;margin-bottom: 13px">
              <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-Packaging-index'})">返回</el-button>
              <el-button type="primary" size="small" @click="isRedact = !isRedact">{{isRedact?'取消':'编辑'}}</el-button>
            </el-row>
            <el-row style="float: right" v-if="isRedact">
              <el-button type="primary" size="small" @click="SaveForm">保存</el-button>
              <el-button type="primary" size="small" @click="SubmitForm()">提交</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="main" style="padding-top: 0px">
      <el-card>
        <el-tabs v-model="activeName" id="tabs">
          <el-tab-pane name="1">
            <span slot="label">
              <el-tooltip class="item" effect="dark" :content="readyDate.status" placement="top-start">
                <el-button>准备时间</el-button>
              </el-tooltip>
            </span>
            <div class="times">
              <el-form :inline="true" :model="readyDate" size="small" label-width="110px">
                <div class="clearfix">
                  <h3>录入数据单位：MIN</h3>
                  <el-form-item label="是否停线交接班" style="float: right">
                    <el-select v-model="readyDate.isCause" placeholder="是否停线交接班" v-if="isRedact">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                    <el-select v-model="readyDate.isCause" placeholder="是否停线交接班" v-else disabled>
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>白班录入</span>
                  </div>
                  <div>
                    <el-form-item label="工作开始时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.dayStartDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.dayStartDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="开线时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.dayStartLineDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.dayStartLineDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="切换时间" >
                      <el-input v-model="readyDate.dayChange" v-if="isRedact" placeholder="手工录入"></el-input>
                      <el-input v-model="readyDate.dayChange" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工作结束时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.dayEndDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.dayEndDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="停线时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.dayCauseDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.dayCauseDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="用餐时间" >
                      <el-input v-model="readyDate.dayDinner" v-if="isRedact" placeholder="手工录入"></el-input>
                      <el-input v-model="readyDate.dayDinner" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card class="box-card" v-if="readyDate.isCause == '1'">
                  <div slot="header" class="clearfix">
                    <span>中班录入</span>
                  </div>
                  <div>
                    <el-form-item label="工作开始时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.midStartDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.midStartDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="开线时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.midStartLineDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.midStartLineDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="切换时间" >
                      <el-input v-model="readyDate.midChange" placeholder="手工录入" v-if="isRedact"></el-input>
                      <el-input v-model="readyDate.midChange" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工作结束时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.midEndDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.midEndDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="停线时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.midCauseDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.midCauseDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="用餐时间" >
                      <el-input v-model="readyDate.midDinner" placeholder="手工录入" v-if="isRedact"></el-input>
                      <el-input v-model="readyDate.midDinner" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card class="box-card" v-if="readyDate.isCause == '1'">
                  <div slot="header" class="clearfix">
                    <span>夜班录入</span>
                  </div>
                  <div>
                    <el-form-item label="工作开始时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.nightStartDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.nightStartDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="开线时间" >
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.nightStartLineDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.nightStartLineDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="切换时间" >
                      <el-input v-model="readyDate.nightChange" placeholder="手工录入" v-if="isRedact"></el-input>
                      <el-input v-model="readyDate.nightChange" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                    <el-form-item label="工作结束时间">
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.nightEndDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.nightEndDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="停线时间">
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.nightCauseDate" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="readyDate.nightCauseDate" v-else disabled></el-date-picker>
                    </el-form-item>
                    <el-form-item label="用餐时间" >
                      <el-input v-model="readyDate.nightDinner" placeholder="手工录入" v-if="isRedact"></el-input>
                      <el-input v-model="readyDate.nightDinner" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                  </div>
                </el-card>
                <div style="padding: 20px">
                  <el-form-item label="交接班">
                    <el-input v-model="readyDate.shift" placeholder="手工录入" v-if="isRedact"></el-input>
                    <el-input v-model="readyDate.shift" placeholder="手工录入" v-else disabled></el-input>
                  </el-form-item>
                  <el-form-item label="班前会">
                    <el-input v-model="readyDate.meeting" placeholder="手工录入" v-if="isRedact"></el-input>
                    <el-input v-model="readyDate.meeting" placeholder="手工录入" v-else disabled></el-input>
                  </el-form-item>
                  <el-form-item label="生产前准备">
                    <el-input v-model="readyDate.prepared" placeholder="手工录入" v-if="isRedact"></el-input>
                    <el-input v-model="readyDate.prepared" placeholder="手工录入" v-else disabled></el-input>
                  </el-form-item>
                  <el-form-item label="生产后清场">
                    <el-input v-model="readyDate.clear" placeholder="手工录入" v-if="isRedact"></el-input>
                    <el-input v-model="readyDate.clear" placeholder="手工录入" v-else disabled></el-input>
                  </el-form-item>
                </div>
                <auditLog :tableData="ReadAudit"></auditLog>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="人员需讨论" placement="top-start">
                <el-button>人员</el-button>
              </el-tooltip>
            </span>
            <div class="staff">
              <div class="clearfix">
                <h3>录入数据单位：MIN</h3>
                <div class="btn">
                  <el-button type="primary" @click="addUserDate(uerDate)" size="small" v-if="isRedact">新增</el-button>
                  <el-button type="primary" @click="addUserDate(uerDate)" size="small" v-else disabled>新增</el-button>
                </div>
              </div>
              <div>
                <div class="message" v-if="multipleSelectionUser.length > 0">
                  <i class="el-icon-info"></i>
                  <span>已选择 <span class="num">{{multipleSelectionUser.length}}</span> 项 <span>是否删除</span></span><span class="num" @click="delUser()">删除</span>
                </div>
                <el-table
                  ref="table1"
                  header-row-class-name="tableHead"
                  :data="uerDate"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;margin-bottom: 20px"
                  @selection-change="handleSelectionChangeUser">
                  <el-table-column
                    type="selection"
                    v-if="isRedact"
                    width="55">
                  </el-table-column>
                  <el-table-column
                  label="白/中/夜班"
                  width="100">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-if="isRedact">
                        <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                      </el-select>
                      <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-else disabled>
                        <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="班组/工序"
                    width="100">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.deptId" placeholder="请选择" size="small" v-if="isRedact">
                        <el-option :label="iteam.deptName" :value="iteam.deptId" v-for="(iteam, index) in Team" :key="index"></el-option>
                      </el-select>
                      <el-select v-model="scope.row.deptId" placeholder="请选择" size="small" v-else disabled>
                        <el-option :label="iteam.deptName" :value="iteam.deptId" v-for="(iteam, index) in Team" :key="index"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="人员属性"
                    width="110">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.userType" placeholder="请选择" size="small" v-if="isRedact" @change="userTypesele(scope.row)">
                        <el-option label="正式" value="正式"></el-option>
                        <el-option label="借调" value="借调"></el-option>
                        <el-option label="临时工" value="临时工"></el-option>
                      </el-select>
                      <el-select v-model="scope.row.userType" placeholder="请选择" size="small" v-else disabled>
                        <el-option label="正式" value="正式"></el-option>
                        <el-option label="借调" value="借调"></el-option>
                        <el-option label="临时工" value="临时工"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="人员选择"
                    width="220">
                    <template slot-scope="scope">
                      <span>
                        <i v-for="(item,index) in scope.row.userId" :key="index">{{item}}，</i>
                      </span>
                      <el-button type="text" size="small" @click="selectUser(scope.row)" v-if="isRedact && scope.row.userType !=='临时工'">点击选择人员</el-button>
                      <el-button type="text" size="small" @click="dayLaborer(scope.row)" v-if="scope.row.userType=='临时工' && isRedact" v-model="scope.row.userId[0]">点击输入临时工</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="开始时间">
                    <template slot-scope="scope">
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.startDate" size="small" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.startDate" size="small" v-else disabled></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="用餐时间"
                    width="100">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.dinner" size="small" v-if="isRedact" type="number" min="0"></el-input>
                      <el-input v-model="scope.row.dinner" size="small" v-else disabled type="number" min="0"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="结束时间">
                    <template slot-scope="scope">
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.endDate" size="small" v-if="isRedact"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.endDate" size="small" v-else disabled></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    width="100">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.remark" size="small" v-if="isRedact"></el-input>
                      <el-input v-model="scope.row.remark" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                </el-table>
                <el-form :inline="true" size="small" label-width="110px" style="margin: 20px 0">
                  <el-form-item label="实际作业人数">
                    <span>{{countMan}}</span>
                  </el-form-item>
                </el-form>
                <auditLog :tableData="UserAudit"></auditLog>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label">
              <el-button>异常记录</el-button>
            </span>
            <div class="clearfix">
              <h3>录入数据单位：MIN</h3>
              <div class="btn">
                <el-button type="primary" @click="AddExcDate(ExcDate)" size="small" v-if="isRedact">新增</el-button>
                <el-button type="primary" @click="AddExcDate(ExcDate)" size="small" v-else disabled>新增</el-button>
              </div>
            </div>
            <!--<div class="message">-->
              <!--<i class="el-icon-info"></i>-->
              <!--<span>已选择 <span class="num">{{multipleSelection.length}}</span> 项 <span>是否删除</span></span><span class="num" @click="cleararr">清空</span>-->
            <!--</div>-->
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              :data="ExcDate"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="异常情况（下拉选择）"
                width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.expCode" placeholder="请选择"  v-if="!isRedact" size="small" disabled>
                    <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                  </el-select>
                  <el-select v-model="scope.row.expCode" placeholder="请选择" v-else size="small" @change="setnull(scope.row)">
                    <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="异常描述"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.expInfo" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                  <el-input v-model="scope.row.expInfo" v-else size="small" placeholder="手工录入"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="异常开始时间"
                width="120">
                <template slot-scope="scope">
                  <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss.0" placeholder="选择" v-model="scope.row.expStartDate" v-if="!isRedact" disabled size="small"></el-date-picker>
                  <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss.0" placeholder="选择" v-model="scope.row.expStartDate" v-else size="small"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                label="异常结束时间"
                width="120">
                <template slot-scope="scope">
                  <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss.0" placeholder="选择" v-model="scope.row.expEndDate"  v-if="!isRedact" disabled="" size="small"></el-date-picker>
                  <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss.0" placeholder="选择" v-model="scope.row.expEndDate" v-else size="small"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                label="异常时间"
                width="120">
                <template slot-scope="scope">
                  <!--<span>{{scope.row.expContinue = (scope.row.expEndDate-scope.row.expStartDate)/60000}}</span>-->
                  <span>{{ scope.row.expContinue = mistiming(scope.row.expEndDate, scope.row.expStartDate) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                width="60">
                <template slot-scope="scope">
                  <span>{{scope.row.expContinueUnit = 'MIN'}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="设备"
                width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.deviceId" filterable  placeholder="设备" size="small" v-if="isRedact && (scope.row.expCode === '001' || scope.row.expCode === '002')" >
                    <el-option :label="item.deviceName" v-for="(item, index) in equipmentType" :key="index" :value="item.deviceNo"></el-option>
                  </el-select>
                  <el-select v-model="scope.row.deviceId" filterable  placeholder="设备" v-else size="small" disabled>
                    <el-option :label="item.deviceName" v-for="(item, index) in equipmentType" :key="index" :value="item.deviceNo"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="物料分类简称"
                width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.materialShort" filterable placeholder="选择简称" v-if="isRedact && (scope.row.expCode === '003' || scope.row.expCode === '004')" size="small" >
                    <el-option :label="item.value" v-for="(item, index) in materialShort" :key="index" :value="item.code"></el-option>
                  </el-select>
                  <el-select v-model="scope.row.materialShort" filterable placeholder="选择简称" v-else size="small" disabled>
                    <el-option :label="item.value" v-for="(item, index) in materialShort" :key="index" :value="item.code"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="能源"
                width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.energy" placeholder="选择能源" v-if="isRedact && scope.row.expCode === '005'"  size="small">
                    <el-option :label="item.value" v-for="(item, index) in enery" :key="index" :value="item.code"></el-option>
                  </el-select>
                  <el-select v-model="scope.row.energy" placeholder="选择能源" v-else size="small" disabled>
                    <el-option :label="item.value" v-for="(item, index) in enery" :key="index" :value="item.code"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark" v-if="!isRedact" disabled size="small" placeholder="手工录入"></el-input>
                  <el-input v-model="scope.row.remark" v-else size="small" placeholder="手工录入"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <el-form :inline="true" size="small" label-width="110px" style="margin: 20px 0">
              <el-form-item label="总停线时间">
                <el-input v-model="ExcNum" size="small"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="接口没有" placement="top-start">
                <el-button>生产入库</el-button>
              </el-tooltip>
            </span>
            <div class="tab4">
              <div class="tabtit">
                <div class="btn">
                  <el-button type="primary" @click="AddInDate(InDate)" size="small" v-if="isRedact">新增</el-button>
                  <el-button type="primary" @click="AddInDate(InDate)" size="small" v-else disabled>新增</el-button>
                </div>
              </div>
              <el-table
                ref="table1"
                header-row-class-name="tableHead"
                :data="InDate"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px"
                @selection-change="handleSelectionChange"
                v-if="order.properties !== '二合一&礼盒产线'">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="白/中/夜班"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.classType" placeholder="请选择" v-if="isRedact" size="small">
                      <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                    </el-select>
                    <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-else disabled>
                      <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="生产批次"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="人工码垛-包材库"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.manPacking" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.manPacking" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.manPackingUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="自动码垛-包材库"
                  width="120" v-if="order.workShopName === '包装三车间'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.aiPacking" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.aiPacking" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120" v-if="order.workShopName === '包装三车间'">
                  <template slot-scope="scope">
                    <span>{{scope.row.aiPackingUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="人工码垛-立体库"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.manSolidUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="自动码垛-立体库"
                  width="120" v-if="order.workShopName === '包装三车间'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.aiSolid" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.aiSolid" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120" v-if="order.workShopName === '包装三车间'">
                  <template slot-scope="scope">
                    <span>{{scope.row.aiSolidUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="自动上架-立体库"
                  width="120" v-if="order.workShopName !== '包装三车间'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.aiShelves" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.aiShelves" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120" v-if="order.workShopName !== '包装三车间'">
                  <template slot-scope="scope">
                    <span>{{scope.row.aiShelvesUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="不良品"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.badUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="样品"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.sampleUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="产出数"
                  width="120">
                  <template slot-scope="scope">
                    <span  v-if="order.workShopName === '包装三车间'">{{ scope.row.output = (scope.row.manPacking*1 + scope.row.aiPacking*1 + scope.row.manSolid*1*(ratio*1) + scope.row.aiSolid*1*(ratio*1) + scope.row.sample*1) }}</span>
                    <span v-else>{{ scope.row.output = (scope.row.manPacking*1 + scope.row.manSolid*1*(ratio*1) + scope.row.aiShelves*1*(ratio*1) + scope.row.sample*1) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.outputUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                ref="table1"
                header-row-class-name="tableHead"
                :data="InDate"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px"
                @selection-change="handleSelectionChange"
                v-if="order.properties === '二合一&礼盒产线'">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="白/中/夜班"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.classType" placeholder="请选择" v-if="isRedact" size="small">
                      <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                    </el-select>
                    <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-else disabled>
                      <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="生产批次"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="人工码垛-立体库"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.manPackingUnit = basicUnit }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="不良品"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.badUnit = productUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="样品"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.sampleUnit = productUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="产出数"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.output = (scope.row.manSolid*1 + scope.row.sample*1) }}</template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.outputUnit = productUnit}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="主产品批次"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.mainBatch" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.mainBatch" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="赠品批次"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.attachBatch" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.attachBatch" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" v-if="isRedact"></el-input>
                    <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" v-else disabled></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <div>
                <el-form :inline="true" :model="countOutput" size="small" label-width="110px">
                  <el-form-item label="产出数合计">
                    <span>{{countOutputNum}}</span>
                  </el-form-item>
                </el-form>
              </div>
              <div class="tabtit" v-if="order.properties !== '二合一&礼盒产线' && order.workShopName !== '包装三车间'">
                <span>机维组数量确认</span>
                <div class="btn">
                  <el-button type="primary">刷新</el-button>
                </div>
              </div>
              <el-table
                v-if="order.properties !== '二合一&礼盒产线' && order.workShopName !== '包装三车间'"
                ref="table1"
                header-row-class-name="tableHead"
                :data="InVlist"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px">
                <el-table-column
                  prop="orderId"
                  label="生产订单号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="batch"
                  label="生产批次"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="aiShelves"
                  label="自动上架数-立体库"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="aiShelvesUnit"
                  label="单位"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="jwzAcount"
                  label="机维组确认数"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="differentUnit"
                  label="单位"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="different"
                  label="差异数量"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="differentUnit"
                  label="单位"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="differentInfo"
                  label="差异说明"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="jwzMan"
                  label="机维组确认人"
                  width="120">
                </el-table-column>
              </el-table>
              <auditLog :tableData="InAudit"></auditLog>
            </div>
          </el-tab-pane>
          <el-tab-pane name="5">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="" placement="top-start">
                <el-button>物料领用</el-button>
              </el-tooltip>
            </span>
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              :data="listbomP"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px"
              @selection-change="handleSelectionChange">
              <el-table-column
                label="物料（包材）">
                <template slot-scope="scope">{{ scope.row.materialCode + ' ' + scope.row.materialName }}</template>
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                width="60">
              </el-table-column>
              <el-table-column
                label="生产使用"
                width="125">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.productUseNum" placeholder="手工录入" v-if="isRedact" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.productUseNum" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="本班损耗"
                width="125">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.classLoss" placeholder="手工录入" v-if="isRedact" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.classLoss" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="不合格数"
                width="125">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.belowGradeNum" placeholder="手工录入" v-if="isRedact" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.belowGradeNum" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="不良批次"
                width="125">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.badBatch" placeholder="手工录入" v-if="isRedact"></el-input>
                  <el-input v-model="scope.row.badBatch" placeholder="手工录入" v-else disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="厂家（选择）"
                width="125">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.factory" placeholder="手工录入" v-if="isRedact"></el-input>
                  <el-input v-model="scope.row.factory" placeholder="手工录入" v-else disabled></el-input>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              :data="listbomS"
              :row-class-name="RowDelFlag"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px"
              @selection-change="handleSelectionChange">
              <el-table-column
                label="物料（半成品）">
                <template slot-scope="scope">{{ scope.row.materialCode + ' ' + scope.row.materialName }}</template>
              </el-table-column>
              <el-table-column
                prop="unit"
                label="单位"
                width="60">
              </el-table-column>
              <el-table-column
                label="领用罐号">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.potNo" placeholder="请选择" v-if="isRedact" size="small">
                    <el-option :label="iteam.holderName" :value="iteam.holderId" v-for="iteam in finHolder" :key="iteam.holderId"></el-option>
                    <el-option :label="iteam.holderName" :value="iteam.holderId" v-for="iteam in semiHolder" :key="iteam.holderId"></el-option>
                  </el-select>
                  <el-select v-model="scope.row.potNo" placeholder="请选择" v-else disabled size="small">
                    <el-option :label="iteam.holderName" :value="iteam.holderId" v-for="iteam in finHolder" :key="iteam.holderId"></el-option>
                    <el-option :label="iteam.holderName" :value="iteam.holderId" v-for="iteam in semiHolder" :key="iteam.holderId"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="过滤日期">
                <template slot-scope="scope">
                  <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.filterDate" v-if="isRedact"></el-date-picker>
                  <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.filterDate" v-else disabled></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                label="生产使用量">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.productUseNum" v-if="isRedact"></el-input>
                  <el-input v-model="scope.row.productUseNum" v-else disabled></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="换罐时间">
                <template slot-scope="scope">
                  <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.changePotDate" v-if="isRedact"></el-date-picker>
                  <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.changePotDate" v-else disabled></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                label="用完时间">
                <template slot-scope="scope">
                  <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.usePotDate" v-if="isRedact"></el-date-picker>
                  <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm:ss" placeholder="选择" v-model="scope.row.usePotDate" v-else disabled></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                width="50">
                <template slot-scope="scope">
                  <el-button type="primary" icon="el-icon-plus" circle size="small" @click="addSapS(listbomS, scope.row)" v-if="scope.row.isSplit === '0' && isRedact"></el-button>
                  <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="scope.row.isSplit === '1' && isRedact" @click="dellistbomS(scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <auditLog :tableData="SapAudit"></auditLog>
          </el-tab-pane>
          <el-tab-pane name="6">
            <span slot="label">
              <el-button>待杀菌数量</el-button>
            </span>
            <div class="clearfix">
              <div class="btn">
                <el-button type="primary" @click="AddGermsDate(GermsDate)" size="small" v-if="isRedact">新增</el-button>
                <el-button type="primary" @click="AddGermsDate(GermsDate)" size="small" v-else disabled>新增</el-button>
              </div>
            </div>
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              :data="GermsDate"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px"
              @selection-change="handleSelectionChange">
              <el-table-column
                label="白/中/夜班">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.classType" placeholder="请选择" v-if="isRedact" size="small">
                    <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                  </el-select>
                  <el-select v-model="scope.row.classType" placeholder="请选择" v-else disabled size="small">
                    <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="清洗冲顶">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.washing" v-if="isRedact" placeholder="手工录入" size="small" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.washing" v-else disabled placeholder="手工录入" size="small" type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="换产冲顶">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.changeProduct" v-if="isRedact" placeholder="手工录入" size="small" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.changeProduct" v-else disabled placeholder="手工录入" size="small" type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="开机冲顶">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bootHeader" v-if="isRedact" placeholder="手工录入" size="small" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.bootHeader" v-else disabled placeholder="手工录入" size="small" type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="包材不良">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.badMaterial" v-if="isRedact" placeholder="手工录入" size="small" type="number"></el-input>
                  <el-input v-model="scope.row.badMaterial" v-else disabled placeholder="手工录入" size="small" type="number"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="制程不良"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.badProduct" v-if="isRedact" placeholder="手工录入" size="small" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.badProduct" v-else disabled placeholder="手工录入" size="small" type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="半成品物料不合格"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.badSemi" v-if="isRedact" placeholder="手工录入" size="small" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.badSemi" v-else disabled placeholder="手工录入" size="small" type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="设备残留"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.deviceLoss" v-if="isRedact" placeholder="手工录入" size="small" type="number" min="0"></el-input>
                  <el-input v-model="scope.row.deviceLoss" v-else disabled placeholder="手工录入" size="small" type="number" min="0"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark" v-if="isRedact" placeholder="手工录入" size="small"></el-input>
                  <el-input v-model="scope.row.remark" v-else disabled placeholder="手工录入" size="small"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <el-form :inline="true" size="small" label-width="120px" style="margin: 20px 0">
              <el-form-item label="待杀菌数量（L）">
                <el-input v-model="GermsNum"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="7">
            <span slot="label">
              <el-button>文本记录</el-button>
            </span>
            <el-form :model="form">
              <el-input type="textarea" v-model="Text" class="textarea" style="width: 100%;height: 200px" v-if="isRedact"></el-input>
              <el-input type="textarea" v-model="Text" class="textarea" style="width: 100%;height: 200px" v-else disabled></el-input>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-dialog
      title="人员分配"
      :close-on-click-modal="false"
      :visible.sync="visible">
      <el-row>
        <!--<el-col style="width: 250px">-->
          <!--<el-card></el-card>-->
        <!--</el-col>-->
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
  </div>
</template>

<script>
import {SYSTEMSETUP_API, PACKAGING_API, BASICDATA_API} from '@/api/api'
import { setUserList, toDate } from '@/net/validate'
export default {
  name: 'ProDataIn',
  data () {
    return {
      filterMethod (query, item) {
        return item.screncon.indexOf(query) > -1
      },
      isRedact: false,
      visible: false,
      visible1: false,
      form: {
        shiftChange: 'true',
        connect: 'yes'
      },
      activeName: '1',
      tableData: [],
      multipleSelection: [],
      orderId: '',
      orderStatus: '',
      orderNo: '',
      productDate: '',
      workShop: '',
      factoryid: '',
      listbomP: [],
      listbomS: [],
      order: {
        productDate: ''
      },
      countOutput: {},
      readyDate: {
        id: '',
        status: 'saved',
        orderId: '',
        isCause: '1',
        dayStartDate: '',
        dayStartLineDate: '',
        dayChange: '',
        dayDinner: '60',
        dayCauseDate: '',
        dayEndDate: '',
        midCauseDate: '',
        midChange: '',
        midDinner: '60',
        midEndDate: '',
        midStartDate: '',
        midStartLineDate: '',
        nightCauseDate: '',
        nightChange: '',
        nightDinner: '60',
        nightEndDate: '',
        nightStartDate: '',
        nightStartLineDate: '',
        shift: '',
        meeting: '',
        prepared: '',
        clear: ''
      },
      ReadAudit: [],
      uerDate: [],
      UserAudit: [],
      Team: [],
      selctId: [],
      selctId2: [],
      userlist: [],
      row: {},
      equipmentType: [],
      enery: [],
      stoppageType: [],
      ExcDate: [],
      materialShort: [],
      InDate: [],
      InVlist: [],
      basicUnit: '',
      productUnit: '',
      ratio: 0,
      InAudit: [],
      productShift: [],
      SapDateP: [],
      SapDateS: [],
      SapAudit: [],
      finHolder: [],
      semiHolder: [],
      GermsDate: [],
      Text: '',
      textId: '',
      multipleSelectionUser: []
    }
  },
  mounted () {
    this.orderNo = this.$route.query.order_no
    this.productDate = this.$route.query.productDate
    this.workShop = this.$route.query.workShop
    this.factoryid = this.$route.query.factoryid
    this.GetOrderList()
    this.GetmaterialShort()
    this.GetProductShift()
    this.Getenery()
    this.GetstoppageType()
    this.GetTeam()
    this.GetPot()
  },
  methods: {
    // 获取表头
    GetOrderList () {
      this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
        workShop: this.workShop,
        productDate: this.productDate,
        orderNo: this.orderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.order = data.list[0]
          this.orderId = data.list[0].orderId
          this.orderStatus = data.list[0].orderStatus
          this.GetRatio()
          this.GetequipmentType()
          if (this.orderStatus !== '已同步') {
            this.Getpkgready()
            this.Getpkguser()
            this.GetpkgExc()
            this.Getpkgin()
            this.GetpkgSap()
            this.GetpkgGerms()
            this.GetText()
          } else {
            this.listbomP = data.listbomP
            this.listbomS = data.listbomS
            this.listbomS.forEach((item) => {
              item.isSplit = '0'
              item.id = ''
              item.orderId = this.order.orderId
            })
            this.listbomP.forEach((item) => {
              item.id = ''
              item.orderId = this.order.orderId
            })
            this.readyDate.orderId = this.orderId
          }
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
    // 获取物料分类简称
    GetmaterialShort () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=MATERIAL_SHORT`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.materialShort = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取设备类型
    GetequipmentType () {
      this.$http(`${BASICDATA_API.DEVICELIST_API}`, 'POST', {
        param: '',
        deptId: this.order.productLine,
        currPage: '1',
        pageSize: '50'
      }).then(({data}) => {
        if (data.code === 0) {
          this.equipmentType = data.list.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取能源下拉
    Getenery () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=ENERGY`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.enery = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取异常情况
    GetstoppageType () {
      this.$http(`${SYSTEMSETUP_API.PARAMETERLIST_API}?type=stoppage_type`, 'POST').then(({data}) => {
        if (data.code === 0) {
          this.stoppageType = data.dicList
        } else {
          this.$message.error(data.msg)
        }
      })
    },
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
    // 获取比例
    GetRatio () {
      this.$http(`${PACKAGING_API.PKGBILI_API}`, 'POST', {materialCode: this.order.materialCode}).then(({data}) => {
        if (data.code === 0) {
          if (data.sme) {
            this.ratio = data.sme.ratio
            this.basicUnit = data.sme.basicUnit
            this.productUnit = data.sme.productUnit
          } else {
            this.$message.error('比例获取失败')
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取罐
    GetPot () {
      // 成品罐
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, 'POST', {
        type: 'holder_type',
        holder_type: '007',
        pageSize: 100,
        currPage: 1
      }).then(({data}) => {
        if (data.code === 0) {
          this.finHolder = data.page.list
        } else {
          this.$message.error(data.msg)
        }
      })
      // 半成品罐
      this.$http(`${BASICDATA_API.CONTAINERLIST_API}`, 'POST', {
        type: 'holder_type',
        holder_type: '006',
        pageSize: 100,
        currPage: 1
      }).then(({data}) => {
        if (data.code === 0) {
          this.semiHolder = data.page.list
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    /**
     * @property 以下为七个获取列表
     */
    // 获取包装车间人员列表
    Getpkguser () {
      this.$http(`${PACKAGING_API.PKGUSERLIST_API}`, 'POST', {
        order_id: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间人员列表')
          console.log(data)
          this.uerDate = data.listForm
          this.UserAudit = data.listApproval
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间准备时间列表
    Getpkgready () {
      this.$http(`${PACKAGING_API.PKGREADYLIST_API}`, 'POST', {
        order_id: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间准备时间列表')
          console.log(data)
          if (data.listForm.length > 0) {
            this.readyDate = data.listForm[0]
            this.ReadAudit = data.listApproval
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间异常记录列表
    GetpkgExc () {
      this.$http(`${PACKAGING_API.PKGEXCLIST_API}`, 'POST', {order_id: this.orderId}).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间异常记录列表')
          console.log(data)
          this.ExcDate = data.listForm
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间生产入库列表
    Getpkgin () {
      this.$http(`${PACKAGING_API.PKGINLIST_API}`, 'POST', {
        orderId: this.orderId,
        isPkgThree: this.order.properties === '二合一&礼盒产线' ? 'isTwoOne' : this.order.properties === '包装三车间' ? 'isPkgThree' : ''
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间生产入库列表')
          console.log(data)
          this.InDate = data.plist
          this.InVlist = data.vlist
          this.InAudit = data.vrlist
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间物料领用列表
    GetpkgSap () {
      this.$http(`${PACKAGING_API.PKGSPALIST_API}`, 'POST', {
        order_id: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间物料领用列表')
          console.log(data)
          this.listbomP = data.listFormP
          this.listbomS = data.listFormS
          this.SapAudit = data.listApproval
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间待杀菌数量列表
    GetpkgGerms () {
      this.$http(`${PACKAGING_API.PKGGERMSLIST_API}`, 'POST', {
        order_id: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间待杀菌数量列表')
          console.log(data)
          this.GermsDate = data.listForm
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间文本记录列表
    GetText () {
      this.$http(`${PACKAGING_API.PKGTEXTLIST_API}`, 'POST', {
        order_id: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间文本记录列表')
          console.log(data)
          this.Text = data.listForm[0].pkgText
          this.textId = data.listForm[0].id
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    /**
     * @property 以下为七个保存列表
     */
    // 保存
    SaveForm () {
      this.tableheader('已保存') // 修改表头
      this.UpdateReady() // 修改准备时间
      this.UpdateUser() // 修改人员
      this.UpdateExc() // 修改异常记录
      this.UpdateIn() // 修改生产入库
      this.UpdateSap() // 修改物料领用
      this.UpdateGerms() // 修改待杀菌数量
      this.UpdateText() // 修改文本
    },
    // 表头处理
    tableheader (str) {
      this.order.orderStatus = str
      this.order.realOutput = this.countOutputNum / this.ratio // 生产入库总产量 COUNT_OUTPUT_UNIT比较 OUTPUT_UNIT 换算
      this.order.countOutputUnit = '瓶'// 生产入库单位
      this.order.countOutput = this.countOutputNum // 生产入库总产量
      this.order.countMan = this.countMan // 实际作业人数
      this.order.expAllDate = this.ExcNum// 总停线时间
      this.order.germs = this.GermsNum // 待杀菌数量合计
      this.order.operator = `${this.realName}(${this.userName})`
      this.$http(`${PACKAGING_API.PKGORDERUPDATE_API}`, 'POST', this.order).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('保存表头成功')
        } else {
          this.$message.error('保存表头' + data.msg)
        }
      })
    },
    /**
     * @property 以下为七个修改列表
     */
    // 修改人员
    UpdateUser () {
      if (this.uerDate.length > 0) {
        this.uerDate.forEach((item) => {
          item.status = 'saved'
        })
        this.$http(`${PACKAGING_API.PKGUSERUPDATE_API}`, 'POST', this.uerDate).then(({data}) => {
          if (data.code === 0) {
            this.$message.success('修改人员成功')
            console.log(data)
            this.Getpkguser()
          } else {
            this.$message.error('修改人员成功' + data.msg)
          }
        })
      }
    },
    // 修改准备时间
    UpdateReady () {
      this.readyDate.orderId = this.orderId
      if (this.readyDate.isCause === '1') {
        this.$http(`${PACKAGING_API.PKGREADYUPDATE_API}`, 'POST', this.readyDate).then(({data}) => {
          if (data.code === 0) {
            this.$message.success('修改准备时间成功')
            this.Getpkgready()
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.$http(`${PACKAGING_API.PKGREADYUPDATE_API}`, 'POST', {
          id: this.readyDate.id ? this.readyDate.id : '',
          status: 'saved',
          isCause: this.readyDate.isCause,
          orderId: this.orderId,
          dayStartDate: this.readyDate.dayStartDate,
          dayStartLineDate: this.readyDate.dayStartLineDate,
          dayChange: this.readyDate.dayChange,
          dayDinner: this.readyDate.dayDinner,
          dayCauseDate: this.readyDate.dayCauseDate,
          dayEndDate: this.readyDate.dayEndDate,
          shift: this.readyDate.shift,
          meeting: this.readyDate.meeting,
          prepared: this.readyDate.prepared,
          clear: this.readyDate.clear
        }).then(({data}) => {
          if (data.code === 0) {
            this.$message.success('修改准备时间成功')
            console.log(data)
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    // 修改异常记录
    UpdateExc () {
      if (this.ExcDate.length > 0) {
        this.ExcDate.forEach((item) => {
          item.orderId = this.orderId
        })
        this.$http(`${PACKAGING_API.PKGEXCUPDATE_API}`, 'POST', this.ExcDate).then(({data}) => {
          if (data.code === 0) {
            this.$message.success('修改异常记录成功')
            this.GetpkgExc()
          } else {
            this.$message.error('异常记录' + data.msg)
          }
        })
      }
    },
    // 修改生产入库
    UpdateIn () {
      if (this.InDate.length > 0) {
        this.InDate.forEach((item) => {
          item.orderId = this.orderId
        })
        this.$http(`${PACKAGING_API.PKGINUPDATE_API}`, 'POST', this.InDate).then(({data}) => {
          if (data.code === 0) {
            this.$message.success('修改生产入库成功')
            this.Getpkgin()
          } else {
            this.$message.error('生产入库' + data.msg)
          }
        })
      }
    },
    // 修改物料领用
    UpdateSap () {
      this.listbomP.forEach((item) => {
        item.status = 'saved'
      })
      this.listbomS.forEach((item) => {
        item.status = 'saved'
      })
      this.$http(`${PACKAGING_API.PKGSPAUPDATEP_API}`, 'POST', this.listbomP).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('修改物料领用包材成功')
          this.GetpkgSap()
        } else {
          this.$message.error('物料领用' + data.msg)
        }
      })
      this.$http(`${PACKAGING_API.PKGSPAUPDATES_API}`, 'POST', this.listbomS).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('修改物料领用半成品成功')
          this.GetpkgSap()
        } else {
          this.$message.error('物料领用' + data.msg)
        }
      })
    },
    // 修改待杀菌数量
    UpdateGerms () {
      if (this.GermsDate.length > 0) {
        this.GermsDate.forEach((item) => {
          item.orderId = this.orderId
          item.status = 'saved'
        })
        this.$http(`${PACKAGING_API.PKGGERMSUPDATE_API}`, 'POST', this.GermsDate).then(({data}) => {
          if (data.code === 0) {
            this.$message.success('修改待杀菌数量成功')
            this.GetpkgGerms()
          } else {
            this.$message.error('修改待杀菌数量' + data.msg)
          }
        })
      }
    },
    // 修改文本
    UpdateText () {
      this.$http(`${PACKAGING_API.PKGTEXTUPDATE_API}`, 'POST', {
        id: this.textId,
        orderId: this.orderId,
        pkgText: this.Text,
        workShop: this.order.workShop,
        blongProc: this.order.productLine
      }).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('修改文本成功')
          this.GetText()
        } else {
          this.$message.error('修改文本' + data.msg)
        }
      })
    },
    /**
     * @property 以下为提交
     */
    // 提交
    SubmitForm () {
      this.$confirm('确认提交该订单, 是否继续?', '提交订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableheader('submit')
        this.ProHours()
      })
    },
    ProHours () {
      if (this.readyDate.isCause === '1') {
        this.readyDate.dayDinner = this.readyDate.dayDinner + ''
        this.readyDate.midDinner = this.readyDate.midDinner + ''
        this.readyDate.nightDinner = this.readyDate.nightDinner + ''
      } else {
        this.readyDate.dayDinner = this.readyDate.dayDinner + ''
      }
      this.$http(`${PACKAGING_API.PKGSAVEFORM_API}`, 'POST', [this.readyDate, {countMan: this.countMan.toString()}, this.uerDate, this.ExcDate, {
        orderId: this.orderId,
        countOutput: this.countOutputNum.toString(),
        countOutputUnit: '瓶',
        productDate: this.order.productDate
      }]).then(({data}) => {
        if (data.code === 0) {
          this.$message.success('提交成功')
        } else {
          this.$message.error(data.msg)
        }
      })
      // this.$http(`${PACKAGING_API.PKGSAVEFORMIN_API}`, 'POST', this.InDate).then(({data}) => {
      //   if (data.code === 0) {
      //   } else {
      //     this.$message.error(data.msg)
      //   }
      // })
    },
    // 我是分割线
    // 选择人员
    selectUser (row) {
      this.row = row
      if (row.userType === '借调') {
        this.GetUserforteam()
      } else if (row.userType === '正式') {
        if (row.deptId) {
          this.GetUserforteam(row.deptId)
        } else {
          this.$message.error('请选择班组/工序')
        }
      } else {
        this.$message.error('请选择人员属性')
      }
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
    // 新增人员
    addUserDate (form) {
      form.push({
        orderId: this.orderId,
        classType: '',
        deptId: '',
        userType: '',
        userId: [],
        startDate: '',
        dinner: '60',
        endDate: '',
        remark: ''
      })
    },
    // 新增入库
    AddInDate (form) {
      let types = ''
      if (this.order.properties === '二合一&礼盒产线') {
        types = 'isTwoOne'
      } else if (this.order.workShopName === '包装三车间') {
        types = 'isPkgThree'
      }
      form.push({
        status: 'saved',
        isPkgThree: types,
        orderId: '',
        classType: '',
        batch: '',
        manPacking: '',
        manPackingUnit: '瓶',
        aiPacking: '',
        aiPackingUnit: '瓶',
        aiShelves: '',
        aiShelvesUnit: '箱',
        aiSolid: '',
        aiSolidUnit: '箱',
        manSolid: '',
        manSolidUnit: '箱',
        bad: '',
        badUnit: '瓶',
        sample: 0,
        sampleUnit: '瓶',
        output: '',
        outputUnit: '瓶',
        mainBatch: '',
        attachBatch: ''
      })
    },
    // 删除半成品
    dellistbomS (row) {
      row.delFlag = '1'
    },
    // 新增物料半成品
    addSapS (form, row) {
      form.push({
        id: '',
        materialCode: row.materialCode,
        materialName: row.materialName,
        meins: row.meins,
        potNo: '',
        filterDate: '',
        productUseNum: '',
        changePotDate: '',
        usePotDate: '',
        isSplit: '1',
        delFlag: 0
      })
    },
    // 新增异常记录
    AddExcDate (form) {
      form.push({
        id: '',
        orderId: '',
        expCode: '',
        expInfo: '',
        expStartDate: '',
        expEndDate: '',
        expContinue: '',
        expContinueUnit: '',
        deviceId: '',
        materialShort: '',
        energy: '',
        remark: ''
      })
    },
    // 新增待杀菌
    AddGermsDate (form) {
      form.push({
        id: '',
        washing: 0,
        changeProduct: 0,
        bootHeader: 0,
        badMaterial: 0,
        badProduct: 0,
        badSemi: 0,
        deviceLoss: 0
      })
    },
    // 异常下拉
    setnull (row) {
      row.deviceId = ''
      row.materialShort = ''
      row.energy = ''
    },
    // 人员属性下拉
    userTypesele (row) {
      row.userId = []
    },
    // 人员选中 和  删除
    handleSelectionChangeUser (val) {
      this.multipleSelectionUser = val
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    delUser () {
      this.multipleSelectionUser.forEach((item) => {
        this.uerDate.splice(this.uerDate.indexOf(item), 1)
      })
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
  computed: {
    countMan: function () {
      let num = 0
      if (this.uerDate) {
        this.uerDate.forEach((item) => {
          num += item.userId.length
        })
        return num
      }
    },
    mistiming: function () {
      return function (end, start) {
        return (toDate(end) - toDate(start)) / 60000
      }
    },
    ExcNum: function () {
      let num = 0
      this.ExcDate.forEach((item) => {
        num += item.expContinue
      })
      // return typeof(this.ExcDate[0].expEndDate)
      return num
    },
    GermsNum: function () {
      let num = 0
      this.GermsDate.forEach((item) => {
        num += (item.washing * 1 + item.changeProduct * 1 + item.bootHeader * 1 + item.badMaterial * 1 + item.badProduct * 1 + item.badSemi * 1 + item.deviceLoss * 1)
      })
      return num
    },
    countOutputNum: function () {
      let num = 0
      this.InDate.forEach((item) => {
        num += item.output
      })
      return num
    },
    userName: {
      get () { return this.$store.state.user.name },
      set (val) { this.$store.commit('user/updateName', val) }
    },
    realName: {
      get () { return this.$store.state.user.realName },
      set (val) { this.$store.commit('user/updateName', val) }
    }
  },
  components: {
    AuditLog: resolve => {
      require(['@/views/components/AuditLog'], resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
.rowDel{
  display: none;
}
#tabs{
  h3{
    font-size: 16px;
    font-weight: bold;
    float: left;
  }
  border-top: 1px solid #e8e8e8;
  span{
    .el-button{
      background-color: white!important;
      font-size: 16px;
      padding: 0;
      border: none;
    }
  }
}
.dialogform{
  input{
    width: 100%;
  }
}
.times .el-input{
  width: 200px;
}
.btn{
  float: right;
}
.tabtit{
  span{
    font-size: 14px;
    font-weight: bold;
    line-height: 40px;
  }
}
.message{
  background-color: #e5f7ff;
  border-radius: 4px;
  border: solid 1px #b9e7ff;
  i{
    color:#1890ff;
    margin-left: 10px;
  }
  span{
    line-height: 40px;
    font-size: 14px;
    color: #606266;
    margin-left: 5px;
  }
  .num{
    cursor: pointer;
    color: #1890ff;
    margin: 0 5px;
  }
}

</style>
<style>
.rowDel{
  display: none;
}
.textarea textarea{
  width: 100%;
  height: 100%!important;
}
#tabs .el-tabs__item{
  height: 50px;
  line-height: 50px;
}
.el-card__header{
  font-size: 14px;
  padding: 13px 20px;
  background-color: #f9f9f9;
  color: black;
  font-weight: bold;
}
.topform .el-form-item__content{
  height: 32px;
}
.topform .el-input{
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
}
.el-card{
  margin-bottom: 20px;
}
</style>
