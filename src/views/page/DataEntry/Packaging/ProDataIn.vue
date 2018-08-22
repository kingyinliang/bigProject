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
            <el-form :inline="true" :model="form" size="small" label-width="80px" class="topform">
              <el-form-item label="车间">
                <p class="el-input"></p>
              </el-form-item>
              <el-form-item label="产线">
                <p class="el-input">{{order.name}}</p>
              </el-form-item>
              <el-form-item label="订单号">
                <p class="el-input">{{order.order_no}}</p>
              </el-form-item>
              <el-form-item label="品项">
                <p class="el-input">{{order.name}}</p>
              </el-form-item>
              <el-form-item label="计划产量">
                <p class="el-input">{{order.plan}}</p>
              </el-form-item>
              <el-form-item label="日期">
                <p class="el-input">{{order.product_date}}</p>
              </el-form-item>
              <el-form-item label="提交人员">
                <p class="el-input">{{order.name}}</p>
              </el-form-item>
              <el-form-item label="提交时间">
                <p class="el-input">{{order.name}}</p>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col style="width: 210px">
            <el-row style="float: right;margin-bottom: 13px">
              <el-button type="primary" >返回</el-button>
              <el-button type="primary" @click="isRedact=true">编辑</el-button>
            </el-row>
            <el-row style="float: right" v-if="isRedact">
              <el-button type="primary" @click="SaveForm">保存</el-button>
              <el-button type="primary" >提交</el-button>
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
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <el-button>准备时间</el-button>
              </el-tooltip>
            </span>
            <div class="times">
              <el-form :inline="true" :model="readyDate" size="small" label-width="110px">
                <div class="clearfix">
                  <h3>录入数据单位：MIN</h3>
                  <el-form-item label="是否停线交接班" style="float: right">
                    <el-select v-model="readyDatetype" placeholder="是否停线交接班">
                      <el-option label="是" value="true"></el-option>
                      <el-option label="否" value="false"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>白班录入</span>
                  </div>
                  <div>
                    <el-form-item label="工作开始时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.dayStartDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.dayStartDate}}</p>
                    </el-form-item>
                    <el-form-item label="开线时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.dayStartLineDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.dayStartLineDate}}</p>
                    </el-form-item>
                    <el-form-item label="切换时间" >
                      <el-input v-model="readyDate.dayChange" v-if="isRedact"></el-input>
                      <p class="el-input" v-else>{{readyDate.dayChange}}</p>
                    </el-form-item>
                    <el-form-item label="工作结束时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.dayEndDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.dayEndDate}}</p>
                    </el-form-item>
                    <el-form-item label="停线时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.dayCauseDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.dayCauseDate}}</p>
                    </el-form-item>
                    <el-form-item label="用餐时间" >
                      <el-input v-model="readyDate.dayDinner" v-if="isRedact"></el-input>
                      <p class="el-input" v-else>{{readyDate.dayDinner}}</p>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card class="box-card" v-if="readyDatetype == 'true'">
                  <div slot="header" class="clearfix">
                    <span>中班录入</span>
                  </div>
                  <div>
                    <el-form-item label="工作开始时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.midStartDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.midStartDate}}</p>
                    </el-form-item>
                    <el-form-item label="开线时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.midStartLineDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.midStartLineDate}}</p>
                    </el-form-item>
                    <el-form-item label="切换时间" >
                      <el-input v-model="readyDate.midChange" v-if="isRedact"></el-input>
                      <p class="el-input" v-else>{{readyDate.midChange}}</p>
                    </el-form-item>
                    <el-form-item label="工作结束时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.midEndDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.midEndDate}}</p>
                    </el-form-item>
                    <el-form-item label="停线时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.midCauseDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.midCauseDate}}</p>
                    </el-form-item>
                    <el-form-item label="用餐时间" >
                      <el-input v-model="readyDate.midDinner" v-if="isRedact"></el-input>
                      <p class="el-input" v-else>{{readyDate.midDinner}}</p>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card class="box-card" v-if="readyDatetype == 'true'">
                  <div slot="header" class="clearfix">
                    <span>夜班录入</span>
                  </div>
                  <div>
                    <el-form-item label="工作开始时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.nightStartDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.nightStartDate}}</p>
                    </el-form-item>
                    <el-form-item label="开线时间" >
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.nightStartLineDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.nightStartLineDate}}</p>
                    </el-form-item>
                    <el-form-item label="切换时间" >
                      <el-input v-model="readyDate.nightChange" v-if="isRedact"></el-input>
                      <p class="el-input" v-else>{{readyDate.nightChange}}</p>
                    </el-form-item>
                    <el-form-item label="工作结束时间">
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.nightEndDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.nightEndDate}}</p>
                    </el-form-item>
                    <el-form-item label="停线时间">
                      <el-date-picker type="datetime" placeholder="选择" v-model="readyDate.nightCauseDate" v-if="isRedact"></el-date-picker>
                      <p class="el-input" v-else>{{readyDate.nightCauseDate}}</p>
                    </el-form-item>
                    <el-form-item label="用餐时间" >
                      <el-input v-model="readyDate.nightDinner" v-if="isRedact"></el-input>
                      <p class="el-input" v-else>{{readyDate.nightDinner}}</p>
                    </el-form-item>
                  </div>
                </el-card>
                <div style="padding: 20px">
                  <el-form-item label="交接班">
                    <el-input v-model="readyDate.shift" v-if="isRedact"></el-input>
                    <p class="el-input" v-else>{{readyDate.shift}}</p>
                  </el-form-item>
                  <el-form-item label="班前会">
                    <el-input v-model="readyDate.meeting" v-if="isRedact"></el-input>
                    <p class="el-input" v-else>{{readyDate.meeting}}</p>
                  </el-form-item>
                  <el-form-item label="生产前准备">
                    <el-input v-model="readyDate.prepared" v-if="isRedact"></el-input>
                    <p class="el-input" v-else>{{readyDate.prepared}}</p>
                  </el-form-item>
                  <el-form-item label="生产后清场">
                    <el-input v-model="readyDate.clear" v-if="isRedact"></el-input>
                    <p class="el-input" v-else>{{readyDate.clear}}</p>
                  </el-form-item>
                </div>
                <auditLog :tableData="tableData"></auditLog>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane name="2">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <el-button>人员</el-button>
              </el-tooltip>
            </span>
            <div class="staff">
              <div class="clearfix">
                <h3>录入数据单位：MIN</h3>
                <div class="btn">
                  <el-button type="primary" @click="addformrow">新增</el-button>
                </div>
              </div>
              <div>
                <div class="message">
                  <i class="el-icon-info"></i>
                  <span>已选择 <span class="num">{{multipleSelection.length}}</span> 项 <span>是否删除</span></span><span class="num" @click="cleararr">清空</span>
                </div>
                <el-table
                  ref="table1"
                  header-row-class-name="tableHead"
                  :data="tableData3"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;margin-bottom: 20px"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                  label="白/中/夜班"
                  width="120">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.crew" placeholder="请选择">
                        <el-option label="白班" value="1"></el-option>
                        <el-option label="中班" value="2"></el-option>
                        <el-option label="夜班" value="3"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="班组/工序"
                    width="120">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.crew" placeholder="请选择">
                        <el-option label="班组" value="1"></el-option>
                        <el-option label="工序" value="2"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="人员属性"
                    width="120">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.peprop" placeholder="请选择">
                        <el-option label="正式" value="1"></el-option>
                        <el-option label="借调" value="2"></el-option>
                        <el-option label="临时工" value="3"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="人员选择"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-if="scope.row.peprop==3" v-model="scope.row.peprop3"></el-input>
                      <el-button type="text" v-else>点击选择人员</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="开始时间"
                    width="120">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="用餐时间（MIN）"
                    width="120">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="结束时间"
                    width="120">
                    <template slot-scope="scope">
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    width="120">
                    <template slot-scope="scope">
                      <el-input></el-input>
                    </template>
                  </el-table-column>
                </el-table>
                <el-form :inline="true" size="small" label-width="110px" style="margin: 20px 0">
                  <el-form-item label="实际作业人数">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </el-form>
                <auditLog :tableData="tableData"></auditLog>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="3">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <el-button>异常记录</el-button>
              </el-tooltip>
            </span>
            <div class="clearfix">
              <h3>录入数据单位：MIN</h3>
              <div class="btn">
                <el-button type="primary" @click="addformrow">新增</el-button>
              </div>
            </div>
            <div class="message">
              <i class="el-icon-info"></i>
              <span>已选择 <span class="num">{{multipleSelection.length}}</span> 项 <span>是否删除</span></span><span class="num" @click="cleararr">清空</span>
            </div>
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              :data="tableData3"
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
                  <el-select v-model="scope.row.crew" placeholder="请选择S">
                    <el-option label="设备故障" value="1"></el-option>
                    <el-option label="小停机" value="2"></el-option>
                    <el-option label="制程不良" value="3"></el-option>
                    <el-option label="等待损失" value="4"></el-option>
                    <el-option label="能源" value="5"></el-option>
                    <el-option label="其他" value="6"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="异常描述"
                width="120">
                <template slot-scope="scope">
                  <el-input></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="异常开始时间"
                width="120">
                <template slot-scope="scope">
                  <el-date-picker type="date" placeholder="选择" v-model="scope.row.starttime"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                label="异常结束时间"
                width="120">
                <template slot-scope="scope">
                  <el-date-picker type="date" placeholder="选择" v-model="scope.row.endtime"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column
                label="异常时间"
                width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.endtime-scope.row.starttime}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="单位"
                width="120">
                <template slot-scope="scope">
                  <span>MIN</span>
                </template>
              </el-table-column>
              <el-table-column
                label="设备"
                width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.crew" placeholder="设备">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="物料分类简称"
                width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.crew" placeholder="选择简称">
                    <el-option label="箱" value="1"></el-option>
                    <el-option label="瓶" value="2"></el-option>
                    <el-option label="盖" value="3"></el-option>
                    <el-option label="胶帽" value="4"></el-option>
                    <el-option label="标签" value="5"></el-option>
                    <el-option label="胶带（水）" value="6"></el-option>
                    <el-option label="半成品" value="7"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="能源"
                width="120">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.crew" placeholder="选择能源">
                    <el-option label="水" value="1"></el-option>
                    <el-option label="电" value="2"></el-option>
                    <el-option label="气" value="3"></el-option>
                    <el-option label="汽" value="4"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                width="120">
                <el-input></el-input>
              </el-table-column>
            </el-table>
            <el-form :inline="true" size="small" label-width="110px" style="margin: 20px 0">
              <el-form-item label="总停线时间">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
            <auditLog :tableData="tableData"></auditLog>
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <el-button>生产入库</el-button>
              </el-tooltip>
            </span>
            <div class="tab4">
              <div class="tabtit">
                <div class="btn">
                  <el-button type="primary" @click="addformrow">新增</el-button>
                </div>
              </div>
              <el-table
                ref="table1"
                header-row-class-name="tableHead"
                :data="tableData3"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px"
                @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  label="白/中/夜班"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.crew" placeholder="请选择">
                      <el-option label="白班" value="1"></el-option>
                      <el-option label="中班" value="2"></el-option>
                      <el-option label="夜班" value="3"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="生产批次"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.date"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="人工码垛-包材库 A"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.date1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>瓶</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="人工码垛-包材库 B"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.date2"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>箱</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="自动上架-立体库 C"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.date3"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>箱</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="不良品 D"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.date4"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>瓶</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="样品 E"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.date5"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>瓶</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="产出数"
                  width="120">
                  <template slot-scope="scope">{{ scope.row.date1*1 + scope.row.date2*1 + scope.row.date3*1 + scope.row.date5*1 }}</template>
                </el-table-column>
                <el-table-column
                  label="单位"
                  width="120">
                  <template slot-scope="scope">
                    <span>瓶</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注"
                  width="120">
                  <template slot-scope="scope">
                    <el-input></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button @click="remove(scope.$index,tableData3)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--<div class="tabtit">-->
                <!--<span>夜班录入</span>-->
                <!--<div class="btn">-->
                  <!--<el-button type="primary" @click="addformrow">新增</el-button>-->
                <!--</div>-->
              <!--</div>-->
              <!--<el-table-->
                <!--ref="table1"-->
                <!--header-row-class-name="tableHead"-->
                <!--:data="tableData3"-->
                <!--border-->
                <!--tooltip-effect="dark"-->
                <!--style="width: 100%;margin-bottom: 20px"-->
                <!--@selection-change="handleSelectionChange">-->
                <!--<el-table-column-->
                  <!--type="selection"-->
                  <!--width="55">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--label="日期"-->
                  <!--width="120">-->
                  <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="姓名"-->
                  <!--width="120">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="address"-->
                  <!--label="地址"-->
                  <!--show-overflow-tooltip>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--label="地址">-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-select v-model="scope.row.crew" placeholder="车间">-->
                      <!--<el-option label="区域一" value="shanghai"></el-option>-->
                      <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                  <!--prop="address"-->
                  <!--label="删除"-->
                  <!--show-overflow-tooltip>-->
                  <!--<template slot-scope="scope">-->
                    <!--<el-button @click="remove(scope.$index,tableData3)">删除</el-button>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              <!--</el-table>-->
              <div class="tabtit">
                <span>机维组数量确认</span>
                <div class="btn">
                  <el-button type="primary">刷新</el-button>
                </div>
              </div>
              <el-table
                ref="table1"
                header-row-class-name="tableHead"
                :data="tableData3"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px">
                <el-table-column
                  prop="name"
                  label="生产订单号"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="生产批次"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="自动上架数-立体库"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="单位"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="机维组确认数"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="单位"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="差异数量"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="单位"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="差异说明"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="机维组确认人"
                  width="120">
                </el-table-column>
              </el-table>
              <auditLog :tableData="tableData"></auditLog>
            </div>
          </el-tab-pane>
          <el-tab-pane name="5">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <el-button>物料领用</el-button>
              </el-tooltip>
            </span>
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              :data="tableData3"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px"
              @selection-change="handleSelectionChange">
              <el-table-column
                label="日期"
                width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="地址">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.crew" placeholder="车间">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                label="地址">
                <template slot-scope="scope">
                  <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          {{ scope.row.crew }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
                      <el-dropdown-item command="狮子头">狮子头</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
            <auditLog :tableData="tableData"></auditLog>
          </el-tab-pane>
          <el-tab-pane name="6">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <el-button>待杀菌数量</el-button>
              </el-tooltip>
            </span>
            <el-table
              ref="table1"
              header-row-class-name="tableHead"
              :data="tableData3"
              border
              tooltip-effect="dark"
              style="width: 100%;margin-bottom: 20px"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="name"
                label="">
              </el-table-column>
              <el-table-column
                prop="name"
                label="清洗冲顶">
              </el-table-column>
              <el-table-column
                prop="name"
                label="换产冲顶">
              </el-table-column>
              <el-table-column
                prop="name"
                label="开机冲顶">
              </el-table-column>
              <el-table-column
                prop="name"
                label="包材不良">
              </el-table-column>
              <el-table-column
                label="日期"
                width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="地址">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.crew" placeholder="车间">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="删除"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button @click="remove(scope.$index,tableData3)">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="地址">
                <template slot-scope="scope">
                  <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          {{ scope.row.crew }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="黄金糕">黄金糕</el-dropdown-item>
                      <el-dropdown-item command="狮子头">狮子头</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
            <el-form :inline="true" size="small" label-width="120px" style="margin: 20px 0">
              <el-form-item label="待杀菌数量（L）">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="7">
            <span slot="label">
              <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                <el-button>文本记录</el-button>
              </el-tooltip>
            </span>
            <el-form :model="form">
              <el-input type="textarea" v-model="form.name" class="textarea" style="width: 100%;height: 200px"></el-input>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import {PACKAGING_API} from '@/api/api'
export default {
  name: 'ProDataIn',
  data () {
    return {
      isRedact: false,
      form: {
        shiftChange: 'true',
        connect: 'yes'
      },
      activeName: '1',
      tableData: [],
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        crew: ''
      }],
      multipleSelection: [],
      orderId: '',
      orderNo: '',
      productDate: '',
      workShop: '',
      factoryid: '',
      order: {},
      readyDatetype: 'true',
      readyDate: {
        dayStartDate: '',
        dayStartLineDate: '',
        dayChange: '',
        dayDinner: '',
        dayCauseDate: '',
        dayEndDate: '',
        midCauseDate: '',
        midChange: '',
        midDinner: '',
        midEndDate: '',
        midStartDate: '',
        midStartLineDate: '',
        nightCauseDate: '',
        nightChange: '',
        nightDinner: '',
        nightEndDate: '',
        nightStartDate: '',
        nightStartLineDate: '',
        shift: '',
        meeting: '',
        prepared: '',
        clear: ''
      },
      uerDate: []
    }
  },
  mounted () {
    this.orderNo = this.$route.query.order_no
    this.productDate = this.$route.query.productDate
    this.workShop = this.$route.query.workShop
    this.factoryid = this.$route.query.factoryid
    this.GetOrderList()
  },
  methods: {
    // 获取表头
    GetOrderList () {
      this.$http(`${PACKAGING_API.PKGORDELIST_API}`, 'POST', {
        // workShop: this.plantList.workShop,
        workShop: '4E5FE5ADEC514FB5B680F1096A9D4AAA',
        productDate: this.productDate,
        orderNo: this.orderNo
      }).then(({data}) => {
        if (data.code === 0) {
          this.order = data.list[0]
          this.orderId = data.list[0].order_id
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
        orderId: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间人员列表')
          console.log(data)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间准备时间列表
    Getpkgready () {
      this.$http(`${PACKAGING_API.PKGREADYLIST_API}`, 'POST', {
        orderId: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间准备时间列表')
          console.log(data)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间生产入库列表
    Getpkgin () {
      this.$http(`${PACKAGING_API.PKGINLIST_API}`, 'POST', {
        orderId: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          console.log('获取包装车间生产入库列表')
          console.log(data)
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
      this.$http(`${PACKAGING_API.PKGORDERID_API}`, 'POST', {
        orderNo: this.orderNo
      }).then(({data}) => {
        if (data.code === 0) {
          // this.order.
          if (data.orderId) {
            this.$http(`${PACKAGING_API.PKGORDERUPDATE_API}`, 'POST', this.order).then(({data}) => {
              if (data.code === 0) {
                console.log('保存表头')
                console.log(data)
                this.SaveReady()
              } else {
                this.$message.error(data.msg)
              }
            })
          } else {
            this.$http(`${PACKAGING_API.PKGORDERSAVE_API}`, 'POST', this.order).then(({data}) => {
              if (data.code === 0) {
                console.log('修改表头')
                console.log(data)
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 保存准备时间
    SaveReady () {
      if (this.readyDatetype === 'true') {
        this.$http(`${PACKAGING_API.PKGREADYSAVE_API}`, 'POST', this.readyDate).then(({data}) => {
          if (data.code === 0) {
            console.log('保存准备时间')
            console.log(data)
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.$http(`${PACKAGING_API.PKGREADYSAVE_API}`, 'POST', {
          dayStartDate: this.dayStartDate,
          dayStartLineDate: this.dayStartLineDate,
          dayChange: this.dayChange,
          dayDinner: this.dayDinner,
          dayCauseDate: this.dayCauseDate,
          dayEndDate: this.dayEndDate,
          shift: this.shift,
          meeting: this.meeting,
          prepared: this.prepared,
          clear: this.clear
        }).then(({data}) => {
          if (data.code === 0) {
            console.log('保存准备时间')
            console.log(data)
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    // 保存人员
    SaveUser () {
      this.$http(`${PACKAGING_API.PKGUSERSAVE_API}`, 'POST', {}).then(({data}) => {
        if (data.code === 0) {
          console.log('保存人员')
          console.log(data)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 修改人员
    UpdateUser () {
      this.$http(`${PACKAGING_API.PKGUSERUPDATE_API}`, 'POST', {}).then(({data}) => {
        if (data.code === 0) {
          console.log('修改人员')
          console.log(data)
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 修改准备时间
    UpdateReady () {
      if (this.readyDatetype === 'true') {
        this.$http(`${PACKAGING_API.PKGREADYUPDATE_API}`, 'POST', this.readyDate).then(({data}) => {
          if (data.code === 0) {
            console.log('保存准备时间')
            console.log(data)
          } else {
            this.$message.error(data.msg)
          }
        })
      } else {
        this.$http(`${PACKAGING_API.PKGREADYUPDATE_API}`, 'POST', {
          dayStartDate: this.dayStartDate,
          dayStartLineDate: this.dayStartLineDate,
          dayChange: this.dayChange,
          dayDinner: this.dayDinner,
          dayCauseDate: this.dayCauseDate,
          dayEndDate: this.dayEndDate,
          shift: this.shift,
          meeting: this.meeting,
          prepared: this.prepared,
          clear: this.clear
        }).then(({data}) => {
          if (data.code === 0) {
            console.log('保存准备时间')
            console.log(data)
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    },
    // 我是分割线
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCommand (command) {
      this.$message('click on item ' + command)
    },
    addformrow () {
      this.tableData3.push({
        date: '',
        name: '',
        address: '',
        crew: ''
      })
    },
    cleararr () {
      this.$refs.table1.clearSelection()
    },
    remove (index, rows) {
      rows.splice(index, 1)
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
.times .el-input{
  width: 180px;
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
.topform .el-input{
  width: 180px;
}
.el-card{
  margin-bottom: 20px;
}
</style>
