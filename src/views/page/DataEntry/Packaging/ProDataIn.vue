<template>
  <el-col v-loading.fullscreen.lock="lodingStatus" element-loading-text="加载中">
    <el-col v-loading.fullscreen.lock="lodingStatus1" element-loading-text="加载中">
      <div class="main">
        <el-card class="searchCard" style="margin: 0">
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
                  <p class="el-input" style="width: 457px;">{{order.materialCode + ' ' + order.materialName}}</p>
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
                  <p class="el-input">{{order.operDate? (order.operDate.indexOf('.')!==-1?order.operDate.substring(0, order.operDate.indexOf('.')):order.operDate):''}}</p>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col style="width: 210px">
              <el-row style="float: right;margin-bottom: 13px">
                <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-Packaging-index'})">返回</el-button>
                <el-button type="primary" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('verify:material:save:packing')">{{isRedact?'取消':'编辑'}}</el-button>
              </el-row>
              <el-row style="float: right" v-if="isRedact">
                <el-button type="primary" size="small" @click="SaveForm('saved')" v-if="netStatus.orderStatus && netStatus.readyState && netStatus.userState && netStatus.excState && netStatus.inState && netStatus.sapState1 && netStatus.sapState2 && netStatus.meState && netStatus.textState">保存</el-button>
                <el-button type="primary" size="small" @click="SaveForm('saved')" v-else disabled>保存</el-button>
                <el-button type="primary" size="small" @click="SubmitForm()" v-if="netStatus.orderStatus && netStatus.readyState && netStatus.userState && netStatus.excState && netStatus.inState && netStatus.sapState1 && netStatus.sapState2 && netStatus.meState && netStatus.textState">提交</el-button>
                <el-button type="primary" size="small" @click="SubmitForm()" v-else disabled>提交</el-button>
              </el-row>
              <el-row style="position: absolute;right: 0;top: 100px;">
                <div>订单状态：<span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span></div>
              </el-row>
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
          <el-tabs v-model="activeName" id="tabs">
            <el-tab-pane name="1">
              <span slot="label">
                <el-tooltip class="item" effect="dark" :content="readyDate.status === 'noPass'? '不通过':readyDate.status === 'saved'? '已保存':readyDate.status === 'submit' ? '已提交' : readyDate.status === 'checked'? '通过':'未录入'" placement="top-start">
                  <el-button :style="{'color': readyDate.status === 'noPass'? 'red' : ''}">准备时间</el-button>
                </el-tooltip>
              </span>
              <div class="times">
                <el-form :inline="true" :model="readyDate" ref="timesForm" size="small" label-width="125px">
                  <div class="clearfix topBox">
                    <h3>录入数据单位：MIN</h3>
                    <el-form-item label="班次：" style="float: right;width: 162px" label-width="60px" v-if="readyDate.isCause === '1'">
                      <el-select style="width: 100px" v-model="readyDate.classes" placeholder="请选择" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">
                        <el-option label="白班" value="白班"></el-option>
                        <el-option label="中班" value="中班"></el-option>
                        <el-option label="夜班" value="夜班"></el-option>
                        <el-option label="多班" value="多班"></el-option>
                      </el-select>
                      <el-select style="width: 100px" v-model="readyDate.classes" placeholder="请选择" v-else disabled>
                        <el-option label="白班" value="白班"></el-option>
                        <el-option label="中班" value="中班"></el-option>
                        <el-option label="夜班" value="夜班"></el-option>
                        <el-option label="多班" value="多班"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="是否停线交接班：" style="float: right;width: 230px">
                      <el-select style="width: 100px" @change="isCauseChange" v-model="readyDate.isCause" placeholder="是否停线交接班" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                      </el-select>
                      <el-select style="width: 100px" v-model="readyDate.isCause" placeholder="是否停线交接班" v-else disabled>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                  <el-card class="box-card" v-if="readyDate.classes === '' || readyDate.classes === '白班' || readyDate.classes === '多班'">
                    <div slot="header" class="clearfix">
                      <span class="shiftBtn dayshift" name="dayshift">白班录入 <i class="el-icon-caret-top"></i></span>
                    </div>
                    <div class="dayshiftBox">
                      <el-form-item label="工作开始时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.dayStartDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.dayStartDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="开线时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.dayStartLineDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.dayStartLineDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="切换时间：">
                        <el-input v-model="readyDate.dayChange" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')" placeholder="手工录入"></el-input>
                        <el-input v-model="readyDate.dayChange" placeholder="手工录入" v-else disabled></el-input>
                      </el-form-item>
                      <el-form-item label="工作结束时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.dayEndDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.dayEndDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="停线时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.dayCauseDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.dayCauseDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="用餐时间：" >
                        <el-input v-model="readyDate.dayDinner" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')" placeholder="手工录入"></el-input>
                        <el-input v-model="readyDate.dayDinner" placeholder="手工录入" v-else disabled></el-input>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class="box-card" v-if="readyDate.isCause == '1' &&(readyDate.classes === '' || readyDate.classes === '中班' || readyDate.classes === '多班')">
                    <div slot="header" class="clearfix">
                      <span class="shiftBtn middleshift" name="middleshift">中班录入 <i class="el-icon-caret-top"></i></span>
                    </div>
                    <div class="middleshiftBox">
                      <el-form-item label="工作开始时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.midStartDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.midStartDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="开线时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.midStartLineDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.midStartLineDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="切换时间：">
                        <el-input v-model="readyDate.midChange" placeholder="手工录入" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                        <el-input v-model="readyDate.midChange" placeholder="手工录入" v-else disabled></el-input>
                      </el-form-item>
                      <el-form-item label="工作结束时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.midEndDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.midEndDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="停线时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.midCauseDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.midCauseDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="用餐时间：" >
                        <el-input v-model="readyDate.midDinner" placeholder="手工录入" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                        <el-input v-model="readyDate.midDinner" placeholder="手工录入" v-else disabled></el-input>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class="box-card" v-if="readyDate.isCause == '1' &&(readyDate.classes === '' || readyDate.classes === '夜班' || readyDate.classes === '多班')">
                    <div slot="header" class="clearfix">
                      <span class="shiftBtn nightshift" name="nightshift">夜班录入 <i class="el-icon-caret-top"></i></span>
                    </div>
                    <div class="nightshiftBox">
                      <el-form-item label="工作开始时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.nightStartDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.nightStartDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="开线时间：" >
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.nightStartLineDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.nightStartLineDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="切换时间：" >
                        <el-input v-model="readyDate.nightChange" placeholder="手工录入" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                        <el-input v-model="readyDate.nightChange" placeholder="手工录入" v-else disabled></el-input>
                      </el-form-item>
                      <el-form-item label="工作结束时间：">
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.nightEndDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.nightEndDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="停线时间：">
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.nightCauseDate" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="readyDate.nightCauseDate" v-else disabled></el-date-picker>
                      </el-form-item>
                      <el-form-item label="用餐时间：" >
                        <el-input v-model="readyDate.nightDinner" placeholder="手工录入" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                        <el-input v-model="readyDate.nightDinner" placeholder="手工录入" v-else disabled></el-input>
                      </el-form-item>
                    </div>
                  </el-card>
                  <div style="padding: 20px">
                    <el-form-item label="交接班：">
                      <el-input v-model="readyDate.shift" placeholder="手工录入" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                      <el-input v-model="readyDate.shift" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                    <el-form-item label="班前会：">
                      <el-input v-model="readyDate.meeting" placeholder="手工录入" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                      <el-input v-model="readyDate.meeting" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                    <el-form-item label="生产前准备：">
                      <el-input v-model="readyDate.prepared" placeholder="手工录入" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                      <el-input v-model="readyDate.prepared" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                    <el-form-item label="生产后清场：">
                      <el-input v-model="readyDate.clear" placeholder="手工录入" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                      <el-input v-model="readyDate.clear" placeholder="手工录入" v-else disabled></el-input>
                    </el-form-item>
                  </div>
                  <auditLog :tableData="ReadAudit"></auditLog>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane name="2">
              <span slot="label">
                <el-tooltip class="item" effect="dark" :content="readyDate.status === 'noPass'? '不通过':readyDate.status === 'saved'? '已保存':readyDate.status === 'submit' ? '已提交' : readyDate.status === 'checked'? '通过': '未录入'" placement="top-start">
                  <el-button :style="{'color': readyDate.status === 'noPass'? 'red' : ''}">人员</el-button>
                </el-tooltip>
              </span>
              <div class="staff">
                <div class="clearfix topBox">
                  <h3>录入数据单位：MIN</h3>
                  <div class="btn">
                    <el-button type="primary" @click="addUserDate(uerDate)" size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">新增</el-button>
                    <el-button type="primary" @click="addUserDate(uerDate)" size="small" v-else disabled>新增</el-button>
                  </div>
                </div>
                <div>
                  <el-table
                    ref="table1"
                    header-row-class-name="tableHead"
                    :data="uerDate"
                    :row-class-name="RowDelFlag"
                    border
                    tooltip-effect="dark"
                    style="width: 100%;margin-bottom: 20px">
                    <el-table-column
                      type="index"
                      width="55"
                      label="序号">
                    </el-table-column>
                    <el-table-column
                    label="白/中/夜班"
                    width="100">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">
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
                        <el-select v-model="scope.row.deptId" placeholder="请选择" size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">
                          <el-option :label="iteam.deptName" :value="iteam.deptId" v-for="(iteam, index) in Team" :key="index"></el-option>
                        </el-select>
                        <el-select v-model="scope.row.deptId" placeholder="请选择" size="small" v-else disabled>
                          <el-option :label="iteam.deptName" :value="iteam.deptId" v-for="(iteam, index) in Team" :key="index"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="人员属性"
                      width="130">
                      <template slot-scope="scope">
                        <div class="required">
                          <i class="reqI">*</i>
                          <el-select v-model="scope.row.userType" placeholder="请选择" size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')" @change="userTypesele(scope.row)">
                            <el-option label="正式" value="正式"></el-option>
                            <el-option label="借调" value="借调"></el-option>
                            <el-option label="临时工" value="临时工"></el-option>
                          </el-select>
                          <el-select v-model="scope.row.userType" placeholder="请选择" size="small" v-else disabled>
                            <el-option label="正式" value="正式"></el-option>
                            <el-option label="借调" value="借调"></el-option>
                            <el-option label="临时工" value="临时工"></el-option>
                          </el-select>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="人员选择"
                      :show-overflow-tooltip="true"
                      width="300">
                      <template slot-scope="scope">
                        <div class="required" style="min-height: 32px">
                          <i class="reqI">*</i>
                          <span v-if="!isRedact" style="cursor: pointer">
                            <i v-for="(item,index) in scope.row.userId" :key="index">{{item}}，</i>
                          </span>
                          <span v-if="isRedact && (readyDate.status ==='submit' || readyDate.status ==='checked')">
                            <i v-for="(item,index) in scope.row.userId" :key="index">{{item}}，</i>
                          </span>
                          <span style="cursor: pointer" @click="selectUser(scope.row)" v-if="isRedact && scope.row.userType !=='临时工' && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">
                            <i v-for="(item,index) in scope.row.userId" :key="index">{{item}}，</i>
                            <i>点击选择人员</i>
                          </span>
                          <span style="cursor: pointer" @click="dayLaborer(scope.row)" v-if="scope.row.userType=='临时工' && isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">
                            <i v-for="(item,index) in scope.row.userId" :key="index">{{item}}，</i>
                            <i>点击输入临时工</i>
                          </span>
                        </div>
                        <!--<el-button type="text" size="small" @click="selectUser(scope.row)" v-if="isRedact && scope.row.userType !=='临时工' && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">点击选择人员</el-button>-->
                        <!--<el-button type="text" size="small" @click="dayLaborer(scope.row)" v-if="scope.row.userType=='临时工' && isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')">点击输入临时工</el-button>-->
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="241"
                      label="开始时间">
                      <template slot-scope="scope">
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.startDate" size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.startDate" size="small" v-else disabled></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="用餐时间"
                      width="100">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.dinner" size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')" type="number" min="0"></el-input>
                        <el-input v-model="scope.row.dinner" size="small" v-else disabled type="number" min="0"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      width="241"
                      label="结束时间">
                      <template slot-scope="scope">
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.endDate" size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-date-picker>
                        <el-date-picker type="datetime" value-format="yyyy.MM.dd HH:mm" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.endDate" size="small" v-else disabled></el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="备注"
                      width="100">@click="delUser()"
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.remark" size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')"></el-input>
                        <el-input v-model="scope.row.remark" size="small" v-else disabled></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="60">
                      <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="isRedact && (readyDate.status ==='noPass' || readyDate.status ==='saved' || readyDate.status ==='')" @click="delUser(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle size="small" v-else disabled></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-form :inline="true" size="small" label-width="110px" style="margin: 20px 0">
                    <el-form-item label="实际作业人数：">
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
              <div class="clearfix topBox">
                <h3>录入数据单位：MIN</h3>
                <div class="btn">
                  <el-button type="primary" @click="AddExcDate(ExcDate)" size="small" v-if="isRedact">新增</el-button>
                  <el-button type="primary" @click="AddExcDate(ExcDate)" size="small" v-else disabled>新增</el-button>
                </div>
              </div>
              <el-table
                ref="table1"
                header-row-class-name="tableHead"
                :data="ExcDate"
                :row-class-name="RowDelFlag"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px">
                <el-table-column
                  type="index"
                  width="55"
                  label="序号">
                </el-table-column>
                <el-table-column
                  label="异常情况"
                  width="150">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-select v-model="scope.row.expCode" placeholder="请选择"  v-if="!isRedact" size="small" disabled>
                        <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                      </el-select>
                      <el-select v-model="scope.row.expCode" placeholder="请选择" v-else size="small" @change="setnull(scope.row)">
                        <el-option :label="item.value" v-for="(item, index) in stoppageType" :key="index" :value="item.code"></el-option>
                      </el-select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="异常描述"
                  :show-overflow-tooltip="true"
                  width="220">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.expInfo" v-if="!isRedact" size="small" disabled placeholder="手工录入"></el-input>
                    <el-input v-model="scope.row.expInfo" v-else size="small" placeholder="手工录入"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  width="241"
                  label="异常开始时间">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss.0" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expStartDate" v-if="!isRedact" disabled size="small"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss.0" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expStartDate" v-else size="small"></el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  width="241"
                  label="异常结束时间">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss.0" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expEndDate"  v-if="!isRedact" disabled="" size="small"></el-date-picker>
                      <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss.0" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.expEndDate" v-else size="small"></el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="异常时间"
                  width="80">
                  <template slot-scope="scope">
                    <!--<span>{{scope.row.expContinue = (scope.row.expEndDate-scope.row.expStartDate)/60000}}</span>-->
                    <span>{{ scope.row.expContinue = mistiming(scope.row.expEndDate, scope.row.expStartDate, scope.row) }}</span>
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
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="60">
                  <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="isRedact" @click="dellistbomS(scope.row, delFlagnum.excnum)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="small" v-else disabled></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-form :inline="true" size="small" label-width="110px" style="margin: 20px 0">
                <el-form-item label="总停线时间：">
                  <span>{{ExcNum}}</span>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane name="4">
              <span slot="label">
                <el-tooltip class="item" effect="dark" :content="Instatus === 'noPass'? '不通过':Instatus === 'saved'? '已保存':Instatus === 'submit' ? '已提交' : Instatus === 'checked'? '通过':'未录入'" placement="top-start">
                  <el-button :style="{'color': Instatus === 'noPass'? 'red' : ''}">生产入库</el-button>
                </el-tooltip>
              </span>
              <div class="tab4">
                <div class="tabtit topBox">
                  <div class="btn">
                    <el-button type="primary" @click="AddInDate(InDate)" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='')">新增</el-button>
                    <el-button type="primary" @click="AddInDate(InDate)" size="small" v-else disabled>新增</el-button>
                  </div>
                </div>
                <el-table
                  ref="table1"
                  header-row-class-name="tableHead"
                  :data="InDate"
                  :row-class-name="RowDelFlag"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;margin-bottom: 20px"
                  v-if="order.properties !== '二合一&礼盒产线'">
                  <el-table-column
                    type="index"
                    width="55"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    label="白/中/夜班"
                    width="120">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.classType" placeholder="请选择" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" size="small">
                        <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                      </el-select>
                      <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-else disabled>
                        <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="生产批次"
                    width="150">
                    <template slot-scope="scope">
                      <div class="required">
                        <i class="reqI">*</i>
                        <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" maxlength="10"></el-input>
                        <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" v-else disabled></el-input>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="人工码垛-包材库"
                    width="140">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.manPacking" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.manPacking" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60">
                    <template slot-scope="scope">
                      <span>{{ scope.row.manPackingUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="自动码垛-包材库"
                    width="140" v-if="order.workShopName === '包装三车间'">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.aiPacking" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.aiPacking" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60" v-if="order.workShopName === '包装三车间'">
                    <template slot-scope="scope">
                      <span>{{scope.row.aiPackingUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="人工码垛-立体库"
                    width="140">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60">
                    <template slot-scope="scope">
                      <span>{{scope.row.manSolidUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="自动码垛-立体库"
                    width="120" v-if="order.workShopName === '包装三车间'">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.aiSolid" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.aiSolid" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60" v-if="order.workShopName === '包装三车间'">
                    <template slot-scope="scope">
                      <span>{{scope.row.aiSolidUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="自动上架-立体库"
                    width="140" v-if="order.workShopName !== '包装三车间'">
                    <template slot-scope="scope">
                      <el-input type="number" min="0" v-model="scope.row.aiShelves" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.aiShelves" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60" v-if="order.workShopName !== '包装三车间'">
                    <template slot-scope="scope">
                      <span>{{scope.row.aiShelvesUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="不良品"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60">
                    <template slot-scope="scope">
                      <span>{{scope.row.badUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="样品"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60">
                    <template slot-scope="scope">
                      <span>{{scope.row.sampleUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="产出数"
                    width="120">
                    <template slot-scope="scope">
                      <span  v-if="order.workShopName === '包装三车间'">{{ scope.row.output = (scope.row.manPacking*1 + scope.row.aiPacking*1 + scope.row.manSolid*1*(ratio*1) + scope.row.aiSolid*1*(ratio*1) + scope.row.sample*1) }}</span>
                      <span v-else>{{scope.row.ratio}}{{ scope.row.output = (scope.row.manPacking*1 + scope.row.manSolid*1*(ratio*1) + scope.row.aiShelves*1*(ratio*1) + scope.row.sample*1) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60">
                    <template slot-scope="scope">
                      <span>{{scope.row.outputUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="60">
                    <template slot-scope="scope">
                      <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" @click="dellistbomS(scope.row, delFlagnum.innum)"></el-button>
                      <el-button type="danger" icon="el-icon-delete" circle size="small" v-else disabled></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table
                  ref="table1"
                  header-row-class-name="tableHead"
                  :data="InDate"
                  :row-class-name="RowDelFlag"
                  border
                  tooltip-effect="dark"
                  style="width: 100%;margin-bottom: 20px"
                  v-if="order.properties === '二合一&礼盒产线'">
                  <el-table-column
                    type="index"
                    width="55"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    label="白/中/夜班"
                    width="120">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.classType" placeholder="请选择" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" size="small">
                        <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                      </el-select>
                      <el-select v-model="scope.row.classType" placeholder="请选择" size="small" v-else disabled>
                        <el-option :label="iteam.value" :value="iteam.code" v-for="(iteam, index) in productShift" :key="index"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="生产批次"
                    width="150">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.batch" maxlength="10" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.batch" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="人工码垛-立体库"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.manSolid" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60">
                    <template slot-scope="scope">
                      <span>{{ productUnitName? scope.row.manSolidUnitName = productUnitName : scope.row.manSolidUnitName = basicUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="不良品"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.bad" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="120">
                    <template slot-scope="scope">
                      <span>{{scope.row.badUnitName = basicUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="样品"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.sample" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60">
                    <template slot-scope="scope">
                      <span>{{scope.row.sampleUnitName = basicUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="产出数"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.output = (scope.row.manSolid*1*(ratio*1) + scope.row.sample*1) }}</template>
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    width="60">
                    <template slot-scope="scope">
                      <span>{{scope.row.outputUnitName = basicUnitName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="主产品批次"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.mainBatch" maxlength="10" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.mainBatch" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="赠品批次"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.attachBatch" maxlength="10" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.attachBatch" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="备注"
                    width="120">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input v-model="scope.row.remark" placeholder="手工录入" size="small" v-else disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="60">
                    <template slot-scope="scope">
                      <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="isRedact && (Instatus ==='noPass' || Instatus ==='saved' || Instatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" @click="dellistbomS(scope.row, delFlagnum.innum)"></el-button>
                      <el-button type="danger" icon="el-icon-delete" circle size="small" v-else disabled></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div>
                  <el-form :inline="true" :model="countOutput" size="small" label-width="110px">
                    <el-form-item label="产出数合计：">
                      <span>{{countOutputNum}}</span>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="tabtit" v-if="order.properties !== '二合一&礼盒产线' && order.workShopName !== '包装三车间'">
                  <span>机维组数量确认</span>
                  <div class="btn">
                    <el-button type="primary" size="small" @click="GetMaintain()">刷新</el-button>
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
                    type="index"
                    width="55"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="orderNo"
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
                    prop="aiShelvesUnitName"
                    label="单位"
                    width="60">
                  </el-table-column>
                  <el-table-column
                    prop="jwzAcount"
                    label="机维组确认数"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="differentUnitName"
                    label="单位"
                    width="60">
                  </el-table-column>
                  <el-table-column
                    prop="orgnDifferent"
                    label="原差异数量"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="differentUnitName"
                    label="单位"
                    width="60">
                  </el-table-column>
                  <el-table-column
                    prop="differentInfo"
                    label="差异说明"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="jwzMan"
                    label="机维组确认人">
                  </el-table-column>
                </el-table>
                <auditLog :tableData="InAudit"></auditLog>
              </div>
            </el-tab-pane>
            <el-tab-pane name="5">
              <span slot="label">
                <el-tooltip class="item" effect="dark" :content="Sapstatus === 'noPass'? '不通过':Sapstatus === 'saved'? '已保存':Sapstatus === 'submit' ? '已提交' : Sapstatus === 'checked'? '通过':'未录入'" placement="top-start">
                  <el-button :style="{'color': Sapstatus === 'noPass'? 'red' : ''}">物料领用</el-button>
                </el-tooltip>
              </span>
              <el-table
                ref="table1"
                :row-class-name="tableRowClassName"
                header-row-class-name="tableHead"
                :data="listbomP"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px">
                <el-table-column
                  type="index"
                  width="55"
                  label="序号">
                </el-table-column>
                <el-table-column
                  width="240"
                  :show-overflow-tooltip="true"
                  label="物料">
                  <template slot-scope="scope">{{ scope.row.materialCode + ' ' + scope.row.materialName }}</template>
                </el-table-column>
                <el-table-column
                  prop="unit"
                  label="单位"
                  width="60">
                </el-table-column>
                <el-table-column
                  prop="needNum"
                  label="需求用量"
                  width="90">
                </el-table-column>
                <el-table-column
                  label="生产使用"
                  width="150">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-input size="small" v-model="scope.row.productUseNum" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" type="number" min="0"></el-input>
                      <el-input size="small" v-model="scope.row.productUseNum" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="本班损耗">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.classLoss" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" type="number" min="0"></el-input>
                    <el-input size="small" v-model="scope.row.classLoss" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="不合格数">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.belowGradeNum" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" type="number" min="0"></el-input>
                    <el-input size="small" v-model="scope.row.belowGradeNum" placeholder="手工录入" v-else disabled type="number" min="0"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="不良批次">
                  <template slot-scope="scope">
                    <el-input size="small" maxlength="10" v-model="scope.row.badBatch" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                    <el-input size="small" v-model="scope.row.badBatch" placeholder="手工录入" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="厂家">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.factory" placeholder="手工录入" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                    <el-input size="small" v-model="scope.row.factory" placeholder="手工录入" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.remark" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                    <el-input size="small" v-model="scope.row.remark" v-else disabled></el-input>
                  </template>
                </el-table-column>
              </el-table>
              <el-table
                ref="table1"
                header-row-class-name="tableHead"
                :data="listbomS"
                :row-class-name="RowDelFlag"
                border
                v-if="order.properties !== '二合一&礼盒产线'"
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px">
                <el-table-column
                  type="index"
                  width="55"
                  label="序号">
                </el-table-column>
                <el-table-column
                  width="120"
                  label="物料（半成品）">
                  <template slot-scope="scope">{{ scope.row.materialCode + ' ' + scope.row.materialName }}</template>
                </el-table-column>
                <el-table-column
                  prop="unit"
                  label="单位"
                  width="60">
                </el-table-column>
                <el-table-column
                  width="150"
                  label="领用罐号">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-select v-model="scope.row.potNo" placeholder="请选择" filterable v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')" size="small">
                        <el-option :label="iteam.holderNo + iteam.typeName" :value="iteam.holderNo + iteam.typeName" v-for="iteam in finHolder" :key="iteam.holderId"></el-option>
                        <el-option :label="iteam.holderNo + iteam.typeName" :value="iteam.holderNo + iteam.typeName" v-for="iteam in semiHolder" :key="iteam.holderId"></el-option>
                      </el-select>
                      <el-select v-model="scope.row.potNo" placeholder="请选择" filterable v-else disabled size="small">
                        <el-option :label="iteam.holderName" :value="iteam.holderName" v-for="iteam in finHolder" :key="iteam.holderId"></el-option>
                        <el-option :label="iteam.holderName" :value="iteam.holderName" v-for="iteam in semiHolder" :key="iteam.holderId"></el-option>
                      </el-select>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  width="160"
                  label="过滤日期">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-date-picker size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.filterDate" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-date-picker>
                      <el-date-picker size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.filterDate" v-else disabled></el-date-picker>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  width="150"
                  label="批次">
                  <template slot-scope="scope">
                    <el-input size="small" maxlength="10" v-model="scope.row.batch" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                    <el-input size="small" v-model="scope.row.batch" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  width="120"
                  label="生产使用量">
                  <template slot-scope="scope">
                    <div class="required">
                      <i class="reqI">*</i>
                      <el-input size="small" v-model="scope.row.productUseNum" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                      <el-input size="small" v-model="scope.row.productUseNum" v-else disabled></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  width="160"
                  label="换罐时间">
                  <template slot-scope="scope">
                    <el-date-picker type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.changePotDate" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-date-picker>
                    <el-date-picker type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.changePotDate" v-else disabled></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  width="160"
                  label="用完时间">
                  <template slot-scope="scope">
                    <el-date-picker type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.usePotDate" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-date-picker>
                    <el-date-picker type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy.MM.dd HH:mm" placeholder="选择" v-model="scope.row.usePotDate" v-else disabled></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  label="备注">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.remark" v-if="isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-input>
                    <el-input size="small" v-model="scope.row.remark" v-else disabled></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="60">
                  <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-plus" circle size="small" @click="addSapS(listbomS, scope.row)" v-if="scope.row.isSplit === '0' && isRedact && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='') && (scope.row.status !== 'submit' && scope.row.status !== 'checked')"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="scope.row.isSplit === '1' && isRedact  && (Sapstatus ==='noPass' || Sapstatus ==='saved' || Sapstatus ==='')" @click="dellistbomS(scope.row, delFlagnum.sapnum)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <auditLog :tableData="SapAudit"></auditLog>
            </el-tab-pane>
            <el-tab-pane name="6" v-if="order.properties !== '二合一&礼盒产线'">
              <span slot="label">
                <el-button>待杀菌数量</el-button>
              </span>
              <div class="clearfix topBox">
                <div class="btn">
                  <el-button type="primary" @click="AddGermsDate(GermsDate)" size="small" v-if="isRedact">新增</el-button>
                  <el-button type="primary" @click="AddGermsDate(GermsDate)" size="small" v-else disabled>新增</el-button>
                </div>
              </div>
              <el-table
                ref="table1"
                header-row-class-name="tableHead"
                :data="GermsDate"
                :row-class-name="RowDelFlag"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom: 20px">
                <el-table-column
                  type="index"
                  width="55"
                  label="序号">
                </el-table-column>
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
                  width="140">
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
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="60">
                  <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle size="small" v-if="isRedact" @click="dellistbomS(scope.row, delFlagnum.menum)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="small" v-else disabled></el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-form :inline="true" size="small" label-width="140px" style="margin: 20px 0">
                <el-form-item label="待杀菌数量（L）：">
                  <span>{{GermsNum}}</span>
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
    </el-col>
  </el-col>
</template>

<script>
import {SYSTEMSETUP_API, PACKAGING_API, BASICDATA_API} from '@/api/api'
import { setUserList, toDate } from '@/net/validate'
export default {
  name: 'ProDataIn',
  data () {
    return {
      St: true,
      lodingStatus1: false,
      loading: true,
      timesForm1: {
        dayStartDate: [
          { required: true, message: '请输入工作开始时间', trigger: 'change' }
        ],
        dayStartLineDate: [
          { required: true, message: '请输入开线时间', trigger: 'change' }
        ],
        dayEndDate: [
          { required: true, message: '请输入工作结束时间', trigger: 'change' }
        ],
        dayCauseDate: [
          { required: true, message: '请输入停线时间', trigger: 'change' }
        ],
        dayDinner: [
          { required: true, message: '请输入用餐时间', trigger: 'change' }
        ]
      },
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
      OrgTree: [],
      arrList: [],
      filterMethod (query, item) {
        return item.screncon.indexOf(query) > -1
      },
      isRedact: false,
      visible: false,
      visible1: false,
      visible2: false,
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
        classes: '多班',
        id: '',
        status: '',
        orderId: '',
        isCause: '1',
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
      Instatus: '',
      InVlist: [],
      basicUnit: '',
      productUnit: '',
      productUnitName: '',
      basicUnitName: '',
      ratio: undefined,
      InAudit: [],
      productShift: [],
      SapDateP: [],
      SapDateS: [],
      SapAudit: [],
      Sapstatus: '',
      finHolder: [],
      semiHolder: [],
      GermsDate: [],
      textlist: {},
      Text: '',
      textId: '',
      multipleSelectionUser: [],
      tree1Status: false,
      tree2Status: false,
      netStatus: {
        orderStatus: true,
        readyState: true,
        userState: true,
        excState: true,
        inState: true,
        sapState1: true,
        sapState2: true,
        meState: true,
        textState: true
      },
      tabStatus: {
        order: false,
        user: false,
        ready: false,
        exc: false,
        inpkg: false,
        sap1: false,
        sap2: false,
        me: false,
        text: false,
        subhour: false,
        subin: false,
        subsap1: false,
        subsap2: false
      },
      delFlagnum: {
        usernum: 0,
        excnum: 0,
        innum: 0,
        sapnum: 0,
        menum: 0
      },
      instatus: 0
    }
  },
  watch: {
    'readyDate.classes' (val) {
      if (val === '白班') {
        this.readyDate.midCauseDate = null
        this.readyDate.midChange = null
        this.readyDate.midDinner = null
        this.readyDate.midEndDate = null
        this.readyDate.midStartDate = null
        this.readyDate.midStartLineDate = null
        this.readyDate.nightCauseDate = null
        this.readyDate.nightChange = null
        this.readyDate.nightDinner = null
        this.readyDate.nightEndDate = null
        this.readyDate.nightStartDate = null
        this.readyDate.nightStartLineDate = null
      } else if (val === '中班') {
        this.readyDate.dayStartDate = null
        this.readyDate.dayStartLineDate = null
        this.readyDate.dayChange = null
        this.readyDate.dayDinner = null
        this.readyDate.dayCauseDate = null
        this.readyDate.dayEndDate = null
        this.readyDate.nightCauseDate = null
        this.readyDate.nightChange = null
        this.readyDate.nightDinner = null
        this.readyDate.nightEndDate = null
        this.readyDate.nightStartDate = null
        this.readyDate.nightStartLineDate = null
      } else if (val === '夜班') {
        this.readyDate.dayStartDate = null
        this.readyDate.dayStartLineDate = null
        this.readyDate.dayChange = null
        this.readyDate.dayDinner = null
        this.readyDate.dayCauseDate = null
        this.readyDate.dayEndDate = null
        this.readyDate.midCauseDate = null
        this.readyDate.midChange = null
        this.readyDate.midDinner = null
        this.readyDate.midEndDate = null
        this.readyDate.midStartDate = null
        this.readyDate.midStartLineDate = null
      } else if (val === '多班') {
        this.readyDate.midCauseDate = null
        this.readyDate.midChange = null
        this.readyDate.midDinner = null
        this.readyDate.midEndDate = null
        this.readyDate.midStartDate = null
        this.readyDate.midStartLineDate = null
      } else {
        this.readyDate.midCauseDate = null
        this.readyDate.midChange = null
        this.readyDate.midDinner = null
        this.readyDate.midEndDate = null
        this.readyDate.midStartDate = null
        this.readyDate.midStartLineDate = null
        this.readyDate.nightCauseDate = null
        this.readyDate.nightChange = null
        this.readyDate.nightDinner = null
        this.readyDate.nightEndDate = null
        this.readyDate.nightStartDate = null
        this.readyDate.nightStartLineDate = null
      }
    },
    filterText (val) {
      this.$refs.userlistTree.filter(val)
    },
    filterText1 (val) {
      this.$refs.userlistTree1.filter(val)
    }
  },
  mounted () {
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
    // 白班、中班、晚班切换显隐
    $('.shiftBtn').click(function () {
      var $shiftBtn = $('.' + $(this).attr('name'))
      var $shiftBox = $('.' + $(this).attr('name') + 'Box')
      if ($shiftBtn.children('i').hasClass('el-icon-caret-top')) {
        $shiftBox.animate({height: 0}, 300, function () {
          $shiftBtn.children('i').removeClass('el-icon-caret-top').addClass('el-icon-caret-bottom')
          $(this).parent('.el-card__body').css({'padding-top': 0, 'padding-bottom': 0})
        })
      } else {
        $shiftBox.parent('.el-card__body').css({'padding-top': 20, 'padding-bottom': 20})
        $shiftBox.animate({height: 150}, 300, function () {
          $shiftBtn.children('i').removeClass('el-icon-caret-bottom').addClass('el-icon-caret-top')
        })
      }
    })
    this.orderNo = this.PkgorderNo
    this.productDate = this.PkgproductDate
    this.workShop = this.PkgworkShop
    this.GetOrderList()
    this.GetmaterialShort()
    this.GetProductShift()
    this.Getenery()
    this.GetstoppageType()
    this.GetTeam()
    this.getTree()
  },
  methods: {
    isCauseChange (data) {
      if (data === '0') {
        this.readyDate.classes = ''
      }
    },
    tableRowClassName ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'warning-row'
      }
      return ''
    },
    // 初始化data
    clearData () {
      this.readyDate = {
        id: '',
        status: '',
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
      }
      this.ReadAudit = []
      this.uerDate = []
      this.UserAudit = []
      this.ExcDate = []
      this.InDate = []
      this.InAudit = []
      this.SapAudit = []
      this.GermsDate = []
      this.Text = ''
      this.isRedact = false
      this.visible = false
      this.visible1 = false
      this.visible2 = false
      this.netStatus = {
        orderStatus: true,
        readyState: true,
        userState: true,
        excState: true,
        inState: true,
        sapState1: true,
        sapState2: true,
        meState: true,
        textState: true
      }
    },
    // 获取组织结构树
    getTree () {
      this.$http(`${BASICDATA_API.ORGSTRUCTURE_API}`, 'GET', {}).then(({data}) => {
        if (data.code === 0) {
          this.OrgTree = data.deptList
          this.arrList = [this.OrgTree[0].children[0].deptId]
          // if (type) {
          //   this.setdetail(this.OrgTree[0].children[0])
          // }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
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
          this.GetPot()
          this.GetRatio()
          this.GetequipmentType()
          if (this.orderStatus !== '已同步') {
            if (this.orderStatus === 'checked') {
              this.Instatus = 'checked'
              this.Sapstatus = 'checked'
            } else if (this.orderStatus === 'submit') {
              this.Instatus = 'submit'
              this.Sapstatus = 'submit'
            } else if (this.orderStatus === 'saved') {
              this.Instatus = 'saved'
              this.Sapstatus = 'saved'
            }
            this.Getpkgready()
            this.Getpkguser()
            this.GetpkgExc()
            this.Getpkgin()
            this.GetpkgSap()
            this.GetpkgGerms()
            this.GetText()
          } else {
            this.addUserDate(this.uerDate)
            // this.AddExcDate(this.ExcDate)
            this.AddInDate(this.InDate)
            // this.AddGermsDate(this.GermsDate)
            this.listbomP = data.listbomP
            this.listbomS = data.listbomS
            this.listbomS.forEach((item) => {
              item.isSplit = '0'
              item.delFlag = '0'
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
            this.productUnitName = data.sme.productUnitName
            this.basicUnitName = data.sme.basicUnitName
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
        workShopName: this.order.workShopName,
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
        workShopName: this.order.workShopName,
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
        isPkgThree: this.order.properties === '二合一&礼盒产线' ? 'twoAndOne' : this.order.workShopName === '包装三车间' ? 'isPkgThree' : ''
      }).then(({data}) => {
        if (data.code === 0) {
          this.InDate = data.plist
          this.InVlist = data.vlist
          this.InAudit = data.vrlist
          let sub = 0
          let che = 0
          let no = 0
          let sav = 0
          this.InDate.forEach((item) => {
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
            this.Instatus = 'noPass'
          } else if (sub > 0) {
            this.Instatus = 'submit'
          } else if (sav > 0) {
            this.Instatus = 'saved'
          } else if (che > 0) {
            this.Instatus = 'checked'
          }
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 机维组刷新
    GetMaintain () {
      this.$http(`${PACKAGING_API.PKGINLIST_API}`, 'POST', {
        orderId: this.orderId,
        isPkgThree: this.order.properties === '二合一&礼盒产线' ? 'twoAndOne' : this.order.workShopName === '包装三车间' ? 'isPkgThree' : ''
      }).then(({data}) => {
        if (data.code === 0) {
          this.InVlist = data.vlist
          this.$message.success('刷新成功')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    // 获取包装车间物料领用列表
    GetpkgSap (resolve) {
      this.$http(`${PACKAGING_API.PKGSPALIST_API}`, 'POST', {
        order_id: this.orderId
      }).then(({data}) => {
        if (data.code === 0) {
          this.listbomP = data.listFormP
          this.listbomS = data.listFormS
          this.SapAudit = data.listApproval
          if (resolve) {
            resolve('resolve')
          }
          let sub = 0
          let che = 0
          let no = 0
          let sav = 0
          this.listbomP.forEach((item) => {
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
          this.listbomS.forEach((item) => {
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
            this.Sapstatus = 'noPass'
          } else if (sav > 0) {
            this.Sapstatus = 'saved'
          } else if (sub > 0) {
            this.Sapstatus = 'submit'
          } else if (che > 0) {
            this.Sapstatus = 'checked'
          }
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
          this.textlist = data.listForm[0]
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
    // 校验
    readyrul () {
      let ty = true
      if (this.readyDate.classes === '白班') {
        if (this.readyDate.dayStartLineDate && this.readyDate.dayStartDate && (this.readyDate.dayDinner || this.readyDate.dayDinner !== '' || this.readyDate.dayDinner === 0) && this.readyDate.dayCauseDate && this.readyDate.dayEndDate) {} else {
          ty = false
          this.$message.error('准备时间白班必填字段未填')
          return false
        }
      } else if (this.readyDate.classes === '中班') {
        if (this.readyDate.midCauseDate && this.readyDate.midStartDate && (this.readyDate.midDinner || this.readyDate.midDinner !== '' || this.readyDate.midDinner === 0) && this.readyDate.midCauseDate && this.readyDate.midEndDate) {} else {
          ty = false
          this.$message.error('准备时间中班必填字段未填')
          return false
        }
      } else if (this.readyDate.classes === '夜班') {
        if (this.readyDate.nightStartLineDate && this.readyDate.nightStartDate && (this.readyDate.nightDinner || this.readyDate.nightDinner !== '' || this.readyDate.nightDinner === 0) && this.readyDate.nightCauseDate && this.readyDate.nightEndDate) {} else {
          ty = false
          this.$message.error('准备时间夜班必填字段未填')
          return false
        }
      } else if (this.readyDate.classes === '多班') {
        if (this.readyDate.dayStartLineDate && this.readyDate.dayStartDate && (this.readyDate.dayDinner || this.readyDate.dayDinner !== '' || this.readyDate.dayDinner === 0) && this.readyDate.dayCauseDate && this.readyDate.dayEndDate && this.readyDate.nightStartLineDate && this.readyDate.nightStartDate && (this.readyDate.nightDinner || this.readyDate.nightDinner !== '' || this.readyDate.nightDinner === 0) && this.readyDate.nightCauseDate && this.readyDate.nightEndDate) {} else {
          ty = false
          this.$message.error('准备时间白班和夜班必填字段未填')
          return false
        }
      }
      return ty
    },
    userrul () {
      let ty = true
      this.uerDate.forEach((item) => {
        if (item.delFlag !== '1') {
          if (item.userType && item.userId.length !== 0) {} else {
            ty = false
          }
        }
      })
      return ty
    },
    excrul () {
      let ty = true
      this.ExcDate.forEach((item) => {
        if (item.delFlag !== '1') {
          if (item.expCode && item.expStartDate && item.expEndDate) {
            if ((item.expContinue * 1) < 0) {
              ty = false
              this.$message.error('异常开始时间大于结束时间')
              return false
            }
            if (item.expCode === '001' || item.expCode === '002') {
              if (!item.deviceId) {
                ty = false
                this.$message.error('异常记录设备必填')
                return false
              }
            } else if (item.expCode === '003' || item.expCode === '004') {
              if (!item.materialShort) {
                ty = false
                this.$message.error('异常记录物料分类必填')
                return false
              }
            } else if (item.expCode === '005') {
              if (!item.energy) {
                ty = false
                this.$message.error('异常记录能源必填')
                return false
              }
            }
          } else {
            ty = false
            this.$message.error('异常记录必填项未填')
            return false
          }
        }
      })
      return ty
    },
    inrul () {
      let ty = true
      this.instatus = 0
      let obj = {}
      this.InDate.forEach((item) => {
        if (item.delFlag !== '1') {
          item.aiShelves = item.aiShelves + ''
          if (item.batch) {
            if (item.batch.length !== 10) {
              ty = false
              this.$message.error('生产入库请录入10位批次号')
              return false
            }
          } else {
            ty = false
            this.$message.error('生产入库批次项未填')
            return false
          }
          if (item.aiShelves !== '' && item.aiShelves !== '0') {
            this.instatus = 1
            if (obj[item.batch]) {
              obj[item.batch] = obj[item.batch] * 1 + item.aiShelves * 1
            } else {
              obj[item.batch] = item.aiShelves * 1
            }
          }
        }
      })
      let that = this
      Object.keys(obj).forEach(function (key) {
        let tmp = true
        that.InVlist.forEach((item) => {
          if (item.batch === key && item.aiShelves === obj[key]) {
            tmp = false
          }
        })
        if (tmp) {
          ty = false
          that.$message.error('机维组未确认，请保存后等待机维组确认后提交')
          return false
        }
      })
      // this.InVlist.forEach((item) => {
      //   if (obj[item.batch] !== item.aiShelves) {
      //     console.log(obj)
      //     ty = false
      //     this.$message.error('机维组未确认，不能提交')
      //     return false
      //   }
      // })
      return ty
    },
    saprul () {
      let ty = true
      this.listbomP.forEach((item) => {
        if (item.delFlag !== '1') {
          if (item.productUseNum === 0 || item.productUseNum) {} else {
            ty = false
          }
        }
      })
      if (this.order.properties !== '二合一&礼盒产线') {
        this.listbomS.forEach((item) => {
          if (item.delFlag !== '1') {
            if (item.potNo && item.filterDate && item.productUseNum) {} else {
              ty = false
            }
          }
        })
      }
      return ty
    },
    // 保存
    SaveForm (str) {
      let that = this
      if (str === 'submit') {
        if (!this.readyrul()) {
          return false
        }
        if (this.uerDate.length === 0) {
          this.$message.error('人员不能为空')
          return false
        }
        if (!this.userrul()) {
          this.$message.error('人员必填项未填')
          return false
        }
        if (this.ExcDate.length > 0) {
          if (!this.excrul()) {
            return false
          }
        }
        if (this.InDate.length === 0 || this.delFlagnum.innum === this.InDate.length) {
          this.$message.error('生产入库不能为空')
          return false
        } else {
          if (!this.inrul()) {
            return false
          }
        }
        this.inrul()
        if (this.InVlist.length === 0 && this.order.properties !== '二合一&礼盒产线' && this.order.workShopName !== '包装三车间' && this.instatus === 1) {
          this.$message.error('机维组未确认，不能提交')
          return false
        }
        if (!this.saprul()) {
          this.$message.error('物料领用必填项未填')
          return false
        }
      }
      this.lodingStatus1 = true
      this.isRedact = false
      let net1 = new Promise((resolve, reject) => {
        that.tableheader(str, resolve) // 修改准备时间
      })
      let net2 = new Promise(function (resolve, reject) {
        that.UpdateReady(str, resolve) // 修改准备时间
      })
      let net3 = new Promise(function (resolve, reject) {
        that.UpdateUser(str, resolve) // 修改人员
      })
      let net4 = new Promise(function (resolve, reject) {
        that.UpdateExc(str, resolve) // 修改异常记录
      })
      let net5 = new Promise(function (resolve, reject) {
        that.UpdateIn(str, resolve) // 修改生产入库
      })
      let net6 = new Promise(function (resolve, reject) {
        that.UpdateSap(str, resolve) // 修改物料领用
      })
      let net7 = new Promise(function (resolve, reject) {
        that.UpdateGerms(str, resolve) // 修改待杀菌数量
      })
      let net8 = new Promise(function (resolve, reject) {
        that.UpdateText(str, resolve) // 修改文本
      })
      if (str === 'submit') {
        let net9 = Promise.all([net1, net2, net3, net4, net5, net6, net7, net8])
        net9.then(function () {
          console.log('--------开始提交--------')
          let net10 = new Promise((resolve, reject) => {
            that.ProHours(resolve) // 报工
          })
          let net11 = new Promise((resolve, reject) => {
            that.submitIn(resolve) // 入库
          })
          let net12 = new Promise((resolve, reject) => {
            that.subSap(resolve) // 发料
          })
          let net13 = Promise.all([net10, net11, net12])
          net13.then(() => {
            console.log('--------提交成功--------')
            that.lodingStatus1 = false
            that.$message.success('提交成功')
          })
        })
      } else {
        let net9 = Promise.all([net1, net2, net3, net4, net5, net6, net7, net8])
        net9.then(function () {
          that.lodingStatus1 = false
          that.$message.success('保存成功')
        })
      }
    },
    // 表头处理
    tableheader (str, resolve) {
      this.netStatus.orderStatus = false
      this.order.orderStatus = str
      this.order.realOutput = this.countOutputNum / this.ratio // 生产入库总产量 COUNT_OUTPUT_UNIT比较 OUTPUT_UNIT 换算
      this.order.countOutputUnit = this.order.properties === '二合一&礼盒产线' ? this.basicUnit : 'BOT'// 生产入库单位
      this.order.countOutput = this.countOutputNum // 生产入库总产量
      this.order.countMan = this.countMan // 实际作业人数
      this.order.expAllDate = this.ExcNum// 总停线时间
      this.order.germs = this.GermsNum // 待杀菌数量合计
      if (str !== 'saved') {
        this.order.operator = `${this.realName}(${this.userName})`
        this.order.operDate = new Date().getFullYear().toString() + '-' + (new Date().getMonth() + 1).toString() + '-' + new Date().getDay().toString()
      }
      this.$http(`${PACKAGING_API.PKGORDERUPDATE_API}`, 'POST', this.order).then(({data}) => {
        this.netStatus.orderStatus = true
        if (data.code === 0) {
          this.GetOrderList()
          this.tabStatus.order = true
        } else {
          this.$message.error('保存表头' + data.msg)
        }
        // this.getStatus(str)
        if (resolve) {
          resolve('resolve')
        }
      })
    },
    /**
     * @property 以下为七个修改列表
     */
    // 修改人员
    UpdateUser (str, resolve) {
      if (this.uerDate.length > 0) {
        this.netStatus.userState = false
        this.uerDate.forEach((item) => {
          if (item.status) {
            if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
          } else {
            item.status = str
          }
        })
        this.$http(`${PACKAGING_API.PKGUSERUPDATE_API}`, 'POST', this.uerDate).then(({data}) => {
          this.netStatus.userState = true
          if (data.code === 0) {
            this.tabStatus.user = true
            this.Getpkguser()
          } else {
            this.$message.error('修改人员成功' + data.msg)
          }
          // this.getStatus(str)
          if (resolve) {
            resolve('resolve')
          }
        })
      } else {
        this.tabStatus.user = true
        // this.getStatus(str)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 修改准备时间
    UpdateReady (str, resolve) {
      this.netStatus.readyState = false
      this.readyDate.orderId = this.orderId
      if (!this.readyDate.status) {
        this.readyDate.status = str
      } else {
        if (this.readyDate.status === 'saved') { this.readyDate.status = str } else if (this.readyDate.status === 'noPass' && str === 'submit') { this.readyDate.status = str }
      }
      this.$http(`${PACKAGING_API.PKGREADYUPDATE_API}`, 'POST', this.readyDate).then(({data}) => {
        this.netStatus.readyState = true
        if (data.code === 0) {
          this.tabStatus.ready = true
          this.Getpkgready()
        } else {
          this.$message.error(data.msg)
        }
        // this.getStatus(str)
        if (resolve) {
          resolve('resolve')
        }
      })
    },
    // 修改异常记录
    UpdateExc (str, resolve) {
      if (this.ExcDate.length > 0) {
        this.netStatus.excState = false
        this.ExcDate.forEach((item) => {
          item.orderId = this.orderId
        })
        this.$http(`${PACKAGING_API.PKGEXCUPDATE_API}`, 'POST', this.ExcDate).then(({data}) => {
          this.netStatus.excState = true
          if (data.code === 0) {
            this.tabStatus.exc = true
            this.GetpkgExc()
          } else {
            this.$message.error('异常记录' + data.msg)
          }
          // this.getStatus(str)
          if (resolve) {
            resolve('resolve')
          }
        })
      } else {
        this.tabStatus.exc = true
        // this.getStatus(str)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 修改生产入库
    UpdateIn (str, resolve) {
      if (this.InDate.length > 0) {
        this.netStatus.inState = false
        let types = ''
        if (this.order.properties === '二合一&礼盒产线') {
          types = 'twoAndOne'
        } else if (this.order.workShopName === '包装三车间') {
          types = 'isPkgThree'
        }
        this.InDate.forEach((item) => {
          item.orderId = this.orderId
          if (item.status) {
            if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
          } else {
            item.status = str
          }
          item.isPkgThree = types
          if (this.order.properties === '二合一&礼盒产线') {
            this.productUnit ? item.manSolidUnit = this.productUnit : item.manSolidUnit = this.basicUnit
            item.badUnit = this.basicUnit
            item.sampleUnit = this.basicUnit
            this.productUnit ? item.outputUnit = this.productUnit : item.outputUnit = this.basicUnit
          }
        })
        this.$http(`${PACKAGING_API.PKGINUPDATE_API}`, 'POST', this.InDate).then(({data}) => {
          this.netStatus.inState = true
          if (data.code === 0) {
            this.tabStatus.inpkg = true
            this.Getpkgin()
          } else {
            this.$message.error('生产入库' + data.msg)
          }
          // this.getStatus(str)
          if (resolve) {
            resolve('resolve')
          }
        })
      } else {
        this.tabStatus.inpkg = true
        // this.getStatus(str)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 修改物料领用
    UpdateSap (str, resolve) {
      this.netStatus.sapState1 = false
      this.netStatus.sapState2 = false
      this.listbomP.forEach((item) => {
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.listbomS.forEach((item) => {
        if (item.status) {
          if (item.status === 'saved') { item.status = str } else if (item.status === 'noPass' && str === 'submit') { item.status = str }
        } else {
          item.status = str
        }
      })
      this.$http(`${PACKAGING_API.PKGSPAUPDATEP_API}`, 'POST', this.listbomP).then(({data}) => {
        this.netStatus.sapState1 = true
        this.$http(`${PACKAGING_API.PKGSPAUPDATES_API}`, 'POST', this.listbomS).then(({data}) => {
          this.netStatus.sapState2 = true
          // this.getStatus(str)
          if (resolve) {
            this.GetpkgSap(resolve)
          } else {
            this.GetpkgSap()
          }
          if (data.code === 0) {
            this.tabStatus.sap2 = true
          } else {
            this.$message.error('物料领用' + data.msg)
          }
        })
        if (data.code === 0) {
          this.tabStatus.sap1 = true
        } else {
          this.$message.error('物料领用' + data.msg)
        }
      })
    },
    // 修改待杀菌数量
    UpdateGerms (str, resolve) {
      if (this.GermsDate.length > 0) {
        this.netStatus.meState = false
        this.GermsDate.forEach((item) => {
          item.orderId = this.orderId
        })
        this.$http(`${PACKAGING_API.PKGGERMSUPDATE_API}`, 'POST', this.GermsDate).then(({data}) => {
          this.netStatus.meState = true
          if (data.code === 0) {
            this.tabStatus.me = true
            this.GetpkgGerms()
          } else {
            this.$message.error('修改待杀菌数量' + data.msg)
          }
          // this.getStatus(str)
          if (resolve) {
            resolve('resolve')
          }
        })
      } else {
        this.tabStatus.me = true
        // this.getStatus(str)
        if (resolve) {
          resolve('resolve')
        }
      }
    },
    // 修改文本
    UpdateText (str, resolve) {
      this.netStatus.textState = false
      this.$http(`${PACKAGING_API.PKGTEXTUPDATE_API}`, 'POST', {
        id: this.textId,
        orderId: this.orderId,
        pkgText: this.Text,
        changed: this.textlist.changed ? this.textlist.changed : null,
        changer: this.textlist.changer ? this.textlist.changer : null,
        created: this.textlist.created ? this.textlist.created : null,
        creator: this.textlist.creator ? this.textlist.creator : null,
        workShop: this.order.workShop,
        blongProc: this.order.productLine
      }).then(({data}) => {
        this.netStatus.textState = true
        if (data.code === 0) {
          this.tabStatus.text = true
          this.GetText()
        } else {
          this.$message.error('修改文本' + data.msg)
        }
        // this.getStatus(str)
        if (resolve) {
          resolve('resolve')
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
        this.St = true
        this.SaveForm('submit')
      })
    },
    // 报工提交
    ProHours (resolve) {
      if (this.readyDate.isCause === '1') {
        this.readyDate.dayDinner === null ? this.readyDate.dayDinner = this.readyDate.dayDinner : this.readyDate.dayDinner = this.readyDate.dayDinner + ''
        this.readyDate.midDinner === null ? this.readyDate.midDinner = this.readyDate.midDinner : this.readyDate.midDinner = this.readyDate.midDinner + ''
        this.readyDate.nightDinner == null ? this.readyDate.nightDinner = this.readyDate.nightDinner : this.readyDate.nightDinner = this.readyDate.nightDinner + ''
      } else {
        this.readyDate.dayDinner = this.readyDate.dayDinner + ''
      }
      this.$http(`${PACKAGING_API.PKGSAVEFORM_API}`, 'POST', [this.readyDate, {countMan: this.countMan.toString()}, this.uerDate, this.ExcDate, {
        orderId: this.orderId,
        outputUnit: this.order.outputUnit,
        realOutput: this.order.realOutput + '',
        countOutput: this.countOutputNum.toString(),
        countOutputUnit: this.order.properties === '二合一&礼盒产线' ? (this.productUnit ? this.productUnit : this.basicUnit) : 'BOT',
        productDate: this.order.productDate
      }]).then(({data}) => {
        if (data.code === 0) {
          this.tabStatus.subhour = true
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      })
    },
    // 入库提交
    submitIn (resolve) {
      this.$http(`${PACKAGING_API.PKGSAVEFORMIN_API}`, 'POST', this.InDate).then(({data}) => {
        if (data.code === 0) {
          this.tabStatus.subin = true
        } else {
          this.$message.error(data.msg)
        }
        if (resolve) {
          resolve('resolve')
        }
      })
    },
    // 物料提交
    subSap (resolve) {
      this.$http(`${PACKAGING_API.PKGSAVEFORMP_API}`, 'POST', this.listbomP).then(({data}) => {
        if (data.code === 0) {
          this.tabStatus.subsap1 = true
        } else {
          this.$message.error(data.msg)
        }
        this.$http(`${PACKAGING_API.PKGSAVEFORMS_API}`, 'POST', this.listbomS).then(({data}) => {
          if (data.code === 0) {
            this.tabStatus.subsap2 = true
          } else {
            this.$message.error(data.msg)
          }
          if (resolve) {
            resolve('resolve')
          }
        })
      })
    },
    // 我是分割线
    // 搜索人员
    filterNode (value, data) {
      if (!value) return true
      return data.realName.indexOf(value) !== -1 || data.workNum.indexOf(value) !== -1
    },
    filterNode1 (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 选择人员
    selectUser (row) {
      this.row = row
      if (row.userType === '借调') {
        // this.GetUserforteam()
        this.SetSelecd()
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
    // 新增人员
    addUserDate (form) {
      if (form.length) {
        form.push({
          status: '',
          orderId: this.orderId,
          classType: '',
          deptId: '',
          userType: '',
          userId: [],
          startDate: form[form.length - 1].startDate,
          dinner: '60',
          endDate: form[form.length - 1].endDate,
          remark: ''
        })
      } else {
        form.push({
          status: '',
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
      }
    },
    // 新增入库
    AddInDate (form) {
      form.push({
        status: '',
        isPkgThree: '',
        orderId: '',
        classType: '',
        batch: '',
        manPacking: '',
        manPackingUnit: 'BOT',
        manPackingUnitName: '瓶',
        aiPacking: '',
        aiPackingUnit: 'BOT',
        aiPackingUnitName: '瓶',
        aiShelves: '',
        aiShelvesUnit: 'CAR',
        aiShelvesUnitName: '箱',
        aiSolid: '',
        aiSolidUnit: 'CAR',
        aiSolidUnitName: '箱',
        manSolid: '',
        manSolidUnit: 'CAR',
        manSolidUnitName: '箱',
        bad: '',
        badUnit: 'BOT',
        badUnitName: '瓶',
        sample: 0,
        sampleUnit: 'BOT',
        sampleUnitName: '瓶',
        output: '',
        outputUnit: 'BOT',
        outputUnitName: '瓶',
        mainBatch: '',
        attachBatch: '',
        delFlag: '0'
      })
    },
    // 删除半成品
    dellistbomS (row, num) {
      row.delFlag = '1'
      num++
    },
    // 新增物料半成品
    addSapS (form, row) {
      form.push({
        orderId: this.order.orderId,
        status: '',
        id: '',
        materialCode: row.materialCode,
        materialName: row.materialName,
        unit: row.unit,
        potNo: '',
        filterDate: null,
        productUseNum: '',
        changePotDate: null,
        usePotDate: null,
        isSplit: '1',
        delFlag: '0'
      })
    },
    // 新增异常记录
    AddExcDate (form) {
      form.push({
        id: '',
        orderId: '',
        expCode: '',
        expInfo: '',
        expStartDate: null,
        expEndDate: null,
        expContinue: '',
        expContinueUnit: '',
        deviceId: '',
        materialShort: '',
        energy: '',
        remark: '',
        delFlag: '0'
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
        deviceLoss: 0,
        delFlag: '0'
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
    // 人员删除
    delUser (row) {
      this.uerDate.splice(this.uerDate.indexOf(row), 1)
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
      return function (end, start, row) {
        if (end && start && row.delFlag !== '1') {
          if (((toDate(end) - toDate(start)) / 60000) < 0) {
            this.$message.error('异常结束时间早于异常开始时间，请重新录入')
            return 'NaN'
          } else {
            return (toDate(end) - toDate(start)) / 60000
          }
        }
      }
    },
    ExcNum: function () {
      let num = 0
      this.ExcDate.forEach((item) => {
        num = num + (item.delFlag === '0' ? (item.expContinue ? item.expContinue * 1 : 0) : 0)
      })
      // return typeof(this.ExcDate[0].expEndDate)
      return num
    },
    GermsNum: function () {
      let num = 0
      this.GermsDate.forEach((item) => {
        num = num + (item.delFlag === '0' ? (item.washing * 1000 + item.changeProduct * 1000 + item.bootHeader * 1000 + item.badMaterial * 1000 + item.badProduct * 1000 + item.badSemi * 1000 + item.deviceLoss * 1000) : 0)
      })
      return num / 1000
    },
    countOutputNum: function () {
      let num = 0
      this.InDate.forEach((item) => {
        num = num + (item.delFlag === '0' ? item.output : 0)
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
    },
    PkgworkShop: {
      get () { return this.$store.state.common.PkgworkShop },
      set (val) { this.$store.commit('common/updateWorkShop', val) }
    },
    PkgproductDate: {
      get () { return this.$store.state.common.PkgproductDate },
      set (val) { this.$store.commit('common/updateProductDate', val) }
    },
    PkgorderNo: {
      get () { return this.$store.state.common.PkgorderNo },
      set (val) { this.$store.commit('common/updateOrderNo', val) }
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
<style lang="scss">
  .required{
    position: relative;
    padding-left: 15px;
    .reqI{
      color: red;
      position: absolute;
      left: 0;
      line-height: 32px;
    }
  }
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
  .shiftBtn {
    cursor: pointer;
  }
#tabs{
  table{
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .notNull{
    color: red;
  }
  .el-table .warning-row:hover>td{
    background: #bbbbbb!important;
    background-color: #bbbbbb!important;
  }
  .el-table .warning-row>td{
    background: #bbbbbb!important;
    background-color: #bbbbbb!important;
  }
  // .el-input--small .el-input__inner { height: 22px; line-height: 22px; }
}
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
.el-input.is-disabled .el-input__inner {
  background-color: white!important;
  color: #606266!important;
  border-color: #dcdfe6!important;
  background: none;
}
.topBox .btn { margin-bottom: 18px; }
.topBox > h3 { height: 32px; line-height: 32px; }
</style>
