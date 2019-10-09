<template>
  <div class="header_main">
    <el-card class="searchCard">
      <el-row>
        <el-col :span="21">
          <el-form :inline="true" size="small" label-width="70px">
            <el-form-item label="生产车间：">
              <p class="input_bommom">&nbsp;{{formHeader.workShopName ? formHeader.workShopName : ''}}</p>
            </el-form-item>
            <el-form-item label="曲房号：">
              <p class="input_bommom">&nbsp;{{formHeader.houseNoName ? formHeader.houseNoName : ''}}</p>
            </el-form-item>
            <el-form-item label="工序：">
              <p class="input_bommom">&nbsp;看曲</p>
            </el-form-item>
            <el-form-item label="生产订单：" label-width="85px">
              <p class="input_bommom">&nbsp;{{formHeader.orderNo ? formHeader.orderNo : ''}}</p>
            </el-form-item>
            <el-form-item label="生产品项：">
              <p class="input_bommom">&nbsp;{{(formHeader.materialCode ? formHeader.materialCode : '') + ' ' + (formHeader.materialName ? formHeader.materialName : '')}}</p>
            </el-form-item>
            <el-form-item label="生产日期：">
              <p class="input_bommom">&nbsp;{{formHeader.inKjmDate ? formHeader.inKjmDate : ''}}</p>
            </el-form-item>
            <el-form-item label="入罐号：">
              <p class="input_bommom">&nbsp;{{formHeader.inPotNoName ? formHeader.inPotNoName : ''}}</p>
            </el-form-item>
            <el-form-item label="连续蒸煮号：" label-width="85px">
              <p class="input_bommom">&nbsp;{{formHeader.cookingNoName ? formHeader.cookingNoName : ''}}</p>
            </el-form-item>
            <el-form-item label="提交人员：">
              <p class="input_bommom">&nbsp;{{formHeader.changer ? formHeader.changer : ''}}</p>
            </el-form-item>
            <el-form-item label="提交时间：">
              <p class="input_bommom">&nbsp;{{formHeader.changed? (formHeader.changed.indexOf('.')!==-1?formHeader.changed.substring(0, formHeader.changed.indexOf('.')):formHeader.changed):''}}</p>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3">
          <div style="float:right; line-height:31px;font-size: 14px">
            <div style="float: right;">
              <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? 'rgb(103, 194, 58)' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
              <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="text-align:right" class="button_three_goup">
        <template style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-KojiMaking-index'})">返回</el-button>
          <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('kjm:guard:tech:update')">{{isRedact?'取消':'编辑'}}</el-button>
        </template>
        <template v-if="isRedact" style="float:right; margin-left: 10px;">
          <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('kjm:guard:tech:update')">保存</el-button>
          <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('kjm:guard:tech:update')">提交</el-button>
        </template>
      </el-row>
      <div class="toggleSearchBottom">
        <i class="el-icon-caret-top"></i>
      </div>
    </el-card>
    <div class="tableCard">
      <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-tabs @tab-click='tabClick' ref='tabs' v-model="activeName" type="border-card" class="NewDaatTtabs" id="DaatTtabs" style="margin-top:5px">
        <el-tab-pane name="1">
          <span slot="label" class="spanview">
            <el-tooltip class="item" effect="dark"  :content="applyCraftState === 'noPass'? '不通过':applyCraftState === 'saved'? '已保存':applyCraftState === 'submit' ? '已提交' : applyCraftState === 'checked'? '通过':'未录入'" placement="top-start">
              <el-button :style="{'color': applyCraftState === 'noPass'? 'red' : ''}">工艺控制</el-button>
            </el-tooltip>
          </span>
          <div>
            <el-card>
              <el-form :inline="true" :model="tech" size="small" label-width="130px">
                <el-form-item label="入曲检查：" :required="true">
                  <el-input style="width:171px" v-model="tech.inCheck" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
                </el-form-item>
                <el-form-item label="检查人：" :required="true">
                  <el-select v-model="tech.inCheckMan" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')">
                    <el-option v-for="sole in userList" :key="sole.userId" :value="sole.realName + `(${sole.workNum})`" :label="sole.realName + `（${sole.workNum}）`"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="入曲开始时间：" :required="true">
                  <el-date-picker v-model="tech.inStartTime" type="datetime" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
                </el-form-item>
                <el-form-item label="入曲结束时间：" :required="true">
                  <el-date-picker v-model="tech.inEndTime" type="datetime" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width:171px"></el-date-picker>
                </el-form-item>
                <el-form-item label="入曲时长：">{{timecha}}</el-form-item>
              </el-form>
            </el-card>
            <el-card>
              <div class="htitle">
                <span class="iconfont">&#xe606;</span> 看曲记录<el-button type="text" class="readyshiftBtn" name="lookar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
              </div>
              <div class="lookarBox">
                <look-echarts ref="LookEcharts"></look-echarts>
                <!-- <iframe src="#/lookEcharts" style="width:100%; height:460px" name="iframe_a" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe> -->
                <!-- <iframe src="https://search-iot-m4krkhtzni6xjktkbymymhix5a.cn-north-1.es.amazonaws.com.cn/_plugin/kibana/app/kibana#/visualize/edit/e6382af0-adb4-11e9-8b6e-1f733cf01d7e?embed=true&_g=(refreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3A'2019-07-23T14%3A52%3A42.616Z'%2Cmode%3Aabsolute%2Cto%3A'2019-07-26T14%3A12%3A20.186Z'))" style="width:100%;height:600px" name="iframe_a" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe> -->
                <el-row style="line-height: 32px; margin-bottom:10px">
                  <el-col :span="5">第（<el-input size="small" v-model="tech.guardProcess" style="width:80px; padding:0;" class="guard-form-input">{{tech.guardProcess}}</el-input>）套程序</el-col>
                  <el-col :span="15">
                    <el-radio-group v-model="tech.processType">
                      <el-radio label="自动" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')">自动</el-radio>
                      <el-radio label="半自动" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')">半自动</el-radio>
                      <el-radio label="手动" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')">手动</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="4">
                    <el-button type="primary" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" @click="ReadRow" size="small" style="float: right">读取数据</el-button>
                    <el-button type="primary" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" @click="addline" size="small" style="float: right; margin-right:10px"> + 新增</el-button>
                  </el-col>
                </el-row>
                <el-table border ref="recordTable" max-height="315" header-row-class-name="tableHead" :data="lookList" :row-class-name="rowDelFlag" tooltip-effect="dark">
                  <el-table-column label="序号" type="index" width="50px"></el-table-column>
                  <el-table-column label="" width="205">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>看曲时间</span>
                    </template>
                    <template slot-scope="scope">
                      <el-date-picker v-model="scope.row.guardTime" type="datetime" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" placeholder="选择日期" size="small" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" style="width:175px"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column width="100">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>风温实际</span>
                    </template>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.windTemp" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column width="100">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>品温实际</span>
                    </template>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.productTemp" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column width="130">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>风速（R/HZ）</span>
                    </template>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.windSpeed" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column width="100">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>风门/进风</span>
                    </template>
                    <template slot-scope="scope">
                      <el-input type="number" v-model="scope.row.windInFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="" width="100">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>强排/反风</span>
                    </template>
                    <template slot-scope="scope">
                      <el-input type="number" v-model="scope.row.forceOutFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      <!-- <el-select v-model="scope.row.forceOutFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small">
                        <el-option label="强排" value="1"></el-option>
                        <el-option label="反风" value="0"></el-option>
                      </el-select> -->
                    </template>
                  </el-table-column>
                  <el-table-column label="" width="100">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>加湿情况</span>
                    </template>
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.jiashiFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small">
                        <el-option label="0" value="0"></el-option>
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="" width="100">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>加热/冷却</span>
                    </template>
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.jiareFlag" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small">
                        <el-option label="0" value="2"></el-option>
                        <el-option label="∆" value="1"></el-option>
                        <el-option label="※" value="0"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="外品温探头温度">
                    <el-table-column label="">
                      <template slot="header">
                        <i class="reqI">*</i>
                        <span>上</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.productTempOutsideUp" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="">
                      <template slot="header">
                        <i class="reqI">*</i>
                        <span>中</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.productTempOutsideMid" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="">
                      <template slot="header">
                        <i class="reqI">*</i>
                        <span>下</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.productTempOutsideDown" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="内品温探头温度">
                    <el-table-column label="">
                      <template slot="header">
                        <span>上</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.productTempUp" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="">
                      <template slot="header">
                        <span>中</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.productTempMid" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="">
                      <template slot="header">
                        <span>下</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.productTempDown" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="温度计温度">
                    <el-table-column label="外">
                      <template slot="header">
                        <i class="reqI">*</i>
                        <span>外</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.thermometerOut" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="里">
                      <template slot="header">
                        <i class="reqI">*</i>
                        <span>里</span>
                      </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.thermometerInner" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="备注">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.remark" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作人" prop="changer" width="150px"></el-table-column>
                  <el-table-column width=70 fixed="right">
                    <template slot-scope="scope">
                      <el-button class="delBtn" type="text" icon="el-icon-delete" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" size="small" @click="delrow(scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
            <el-card>
              <el-form :inline="true" :model="tech" size="small">
                <div class="htitle">
                  <span class="iconfont">&#xe609;</span> 加水量记录<el-button type="text" class="readyshiftBtn" name="shuiar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
                </div>
                <div class="shuiarBox">
                  <div>
                    <div style="line-height:32px;">翻曲加水</div>
                    <el-form-item label="起始数：" :required="true">
                      <el-input size="small" v-model="tech.overStartWeight" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
                    </el-form-item>
                    <el-form-item label="结束数：" :required="true">
                      <el-input size="small" v-model="tech.overEndWeight" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
                    </el-form-item>
                    <el-form-item label="加水量（L）：">
                      <el-input size="small" v-model="tech.overWeight" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <div style="line-height:32px;">出曲加水</div>
                    <el-form-item label="起始数：" :required="true">
                      <el-input size="small" v-model="tech.outStartWeight" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
                    </el-form-item>
                    <el-form-item label="结束数：" :required="true">
                      <el-input size="small" v-model="tech.outEndWeight" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')"></el-input>
                    </el-form-item>
                    <el-form-item label="加水量（L）：">
                      <el-input size="small" v-model="tech.outWeight" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </el-card>
            <el-card>
              <div class="htitle">
                <span class="iconfont">&#xe602;</span> 感官评价记录<el-button type="text" class="readyshiftBtn" name="feelar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
              </div>
              <div class="feelarBox">
                <el-table border header-row-class-name="tableHead" :data="assessList">
                  <el-table-column prop="feelName"></el-table-column>
                  <el-table-column>
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>U</span>
                    </template>
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.codeU" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" placeholder="请选择" size="small" >
                        <el-option v-for="item in Ulist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="S">
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>S</span>
                    </template>
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.codeS" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" placeholder="请选择" size="small">
                        <el-option v-for="item in Slist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column>
                    <template slot="header">
                      <i class="reqI">*</i>
                      <span>A</span>
                    </template>
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.codeA" :disabled="!(isRedact && tech.status !== 'submit' && tech.status !== 'checked')" placeholder="请选择" size="small">
                        <el-option v-for="item in Alist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
            <el-card>
              <el-form :inline="true" :model="tech" size="small">
                <div class="htitle">
                  <span class="iconfont">&#xe607;</span> 异常情况记录<el-button type="text" class="readyshiftBtn" name="excar" style="margin-left: 30px">收起<i class="el-icon-caret-top"></i></el-button>
                </div>
                <div class="excarBox"><el-input type="textarea" v-model="tech.guardException" :disabled="!(isRedact && this.tech.status !== 'submit' && this.tech.status !== 'checked')" class="textarea" style="width: 100%;height:40px"></el-input></div>
              </el-form>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label" class="spanview">
            <el-button>异常记录</el-button>
          </span>
          <exc-record ref="excrecord" :isRedact="isRedact"></exc-record>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label" class="spanview">
            <el-button>文本记录</el-button>
          </span>
          <text-record ref="textrecord" :isRedact="isRedact"></text-record>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {KJM_API, SYSTEMSETUP_API} from '@/api/api'
import {headanimation, Readyanimation} from '@/net/validate'
import ExcRecord from '@/views/components/excRecord'
import TextRecord from '@/views/components/textRecord'
import LookEcharts from '@/views/components/lookEcharts'
export default {
  name: 'look',
  data () {
    return {
      activeName: '1',
      formHeader: {
        inStartTime: ''
      },
      orderStatus: '已同步',
      isRedact: false,
      submitStatus: 'saved',
      applyCraftState: '', // 工艺状态
      succmessage: '保存成功',
      statuss: 'saved',
      userList: [],
      tech: {
        id: this.uuid(32, 62),
        orderHouseId: '',
        addOrupdate: '0',
        status: '',
        inCheck: '',
        inCheckMan: '',
        inStartTime: '',
        inEndTime: '',
        guardProcess: '',
        processType: '',
        overStartWeight: '',
        overEndWeight: '',
        overWeight: '',
        outStartWeight: '',
        outEndWeight: '',
        outWeight: '',
        guardException: ''
      },
      lookList: [],
      assessList: [{feelName: '一翻', id: ''}, {feelName: '二翻', id: ''}, {feelName: '出曲', id: ''}],
      Ulist: [
        {value: 'U1', label: 'U1'},
        {value: 'U2', label: 'U2'},
        {value: 'U3', label: 'U3'},
        {value: 'U4', label: 'U4'},
        {value: 'U5', label: 'U5'}
      ],
      Slist: [
        {value: 'S1', label: 'S1'},
        {value: 'S2', label: 'S2'},
        {value: 'S3', label: 'S3'},
        {value: 'S4', label: 'S4'},
        {value: 'S5', label: 'S5'}
      ],
      Alist: [
        {value: 'A1', label: 'A1'},
        {value: 'A2', label: 'A2'},
        {value: 'A3', label: 'A3'},
        {value: 'A4', label: 'A4'},
        {value: 'A5', label: 'A5'}
      ],
      omg: 0
    }
  },
  watch: {
    'formHeader.workShop' () {
      this.checkList()
    },
    'overcha': function () {
      this.tech.overWeight = this.overcha
    },
    'outcha': function () {
      this.tech.outWeight = this.outcha
    }
  },
  mounted () {
    headanimation(this.$)
    Readyanimation(this.$)
    this.$nextTick(function () {
      if (this.omg === 0) {
        this.GetheadList()
      }
    })
  },
  methods: {
    tabClick (val) {
      this.$refs.tabs.setCurrentName(val.name)
    },
    GetheadList () {
      this.omg = 1
      console.log('abc')
      this.$http(`${KJM_API.DOUHEAERLIST}`, `POST`, {orderHouseId: this.$store.state.common.ZQWorkshop.params.lookOrderHouseId, deptName: '看曲'}, false, false, false).then((res) => {
        if (res.data.code === 0) {
          this.formHeader = res.data.headList[0]
          this.orderStatus = res.data.headList[0].guardStatus
          this.$refs.excrecord.GetequipmentType(this.formHeader.processId)
          this.$refs.excrecord.getDataList(this.formHeader.factory)
          if (this.orderStatus !== '已同步') {
            this.getList(this.formHeader)
            this.$refs.excrecord.GetExcDate({
              order_id: this.formHeader.orderId,
              orderHouseId: this.formHeader.id,
              blongProc: this.formHeader.processId
            })
            this.$refs.textrecord.GetText({
              order_id: this.formHeader.orderId,
              orderHouseId: this.formHeader.orderHouseId,
              blongProc: this.formHeader.processId
            })
          } else {
            this.formHeader.inStartTime = ''
            this.$refs.LookEcharts.testInit(this.formHeader)
          }
        } else {
          this.$notify.error({title: '错误', message: res.data.msg})
        }
      })
    },
    UpdateHeaderCreator (str, resolve) {
      this.$http(`${KJM_API.DOUMATERHEADCREATOR_API}`, 'POST', {orderId: this.formHeader.orderId}).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: '保存表头' + data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      })
    },
    // 提交
    SubmitForm () {
      if (!this.Readyrules()) {
        return false
      }
      if (!this.$refs.excrecord.excrul()) {
        return false
      }
      this.$confirm('确认提交该订单, 是否继续?', '提交订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.savedOrSubmitForm('submit')
      })
    },
    // 保存
    savedOrSubmitForm (str) {
      // 提交
      if (str === 'submit') {
        this.submitStatus = 'submit'
        this.succmessage = '提交成功'
      } else {
        this.submitStatus = 'saved'
      }
      let that = this
      new Promise((resolve, reject) => {
        that.savesmain(resolve, reject)
      }).then(function () {
        let excSaveNet = new Promise((resolve, reject) => {
          that.$refs.excrecord.saveOrSubmitExc({
            orderId: that.formHeader.orderId,
            orderHouseId: that.formHeader.orderHouseId,
            blongProc: that.formHeader.processId
          }, str, resolve, reject)
        })
        let textSaveNet = new Promise((resolve, reject) => {
          that.$refs.textrecord.UpdateText({
            orderId: that.formHeader.orderId,
            orderHouseId: that.formHeader.orderHouseId,
            blongProc: that.formHeader.processId
          }, str, resolve, reject)
        })
        let net101 = new Promise((resolve, reject) => {
          that.UpdateHeaderCreator(str, resolve)
        })
        let net1 = new Promise((resolve, reject) => {
          that.savestauts(resolve, reject)
        })
        let net2 = new Promise((resolve, reject) => {
          that.savesecond(resolve, reject)
        })
        let net3 = new Promise((resolve, reject) => {
          that.savefeel(resolve, reject)
        })
        Promise.all([net1, net2, net3, excSaveNet, textSaveNet, net101]).then(function () {
          that.$notify({title: '成功', message: that.succmessage, type: 'success'})
          that.GetheadList()
          that.isRedact = false
        }).catch(() => {
          that.$error_SHINHO('网络请求失败，请刷新重试')
        })
      })
    },
    // 工艺 start
    // 检查人
    checkList () {
      this.$http(`${SYSTEMSETUP_API.USERLIST_API}`, 'POST', {
        deptId: this.formHeader.workShop, // this.formHeader.workShop, // 工序id
        currPage: '1',
        pageSize: '100'
      }).then(({data}) => {
        if (data.code === 0) {
          this.userList = data.page.list
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    Readyrules () {
      let ty = true
      if (!this.tech.inCheck || this.tech.inCheck === '') {
        ty = false
        this.$warning_SHINHO('入曲检查必填')
        return false
      }
      if (!this.tech.inCheckMan || this.tech.inCheckMan === '') {
        ty = false
        this.$warning_SHINHO('检查人必填')
        return false
      }
      if (!this.tech.inStartTime || this.tech.inStartTime === '') {
        ty = false
        this.$warning_SHINHO('入曲开始时间为必填')
        return false
      }
      if (!this.tech.inEndTime || this.tech.inEndTime === '') {
        ty = false
        this.$warning_SHINHO('入曲结束时间为必填')
        return false
      }
      if (this.lookList.length === 0) {
        ty = false
        this.$warning_SHINHO('看曲记录未填')
        return false
      }
      for (let items of this.lookList) {
        if (items.delFlag === '0') {
          if (items.guardTime === '' || items.windTemp === '' || items.productTemp === '' || items.windSpeed === '' || items.windInFlag === '' || items.forceOutFlag === '' || items.jiashiFlag === '' || items.jiareFlag === '' || items.productTempOutsideUp === '' || items.productTempOutsideMid === '' || items.productTempOutsideDown === '' || items.thermometerOut === '' || items.thermometerInner === '' || items.productTempOutsideUp === '' || items.productTempOutsideMid === '' || items.productTempOutsideDown === '') {
            // if (!items.guardTime || items.guardTime === '' || !items.guardTime || items.guardTime === '' || !items.windTemp || items.windTemp === '' || !items.productTemp || items.productTemp === '' || !items.windSpeed || items.windSpeed === '' || !items.windInFlag || items.windInFlag === '' || !items.forceOutFlag || items.forceOutFlag === '' || !items.jiashiFlag || items.jiashiFlag === '' || !items.jiareFlag || items.jiareFlag === '' || !items.productTempUp || items.productTempUp === '' || !items.productTempMid || items.productTempMid === '' || !items.productTempDown || items.productTempDown === '' || !items.thermometerOut || items.thermometerOut === '' || !items.thermometerInner || items.thermometerInner === '') {
            ty = false
            this.$warning_SHINHO('看曲记录必填项未填')
            return false
          }
        }
      }
      if (!this.tech.overStartWeight || !this.tech.overEndWeight || !this.tech.outStartWeight || !this.tech.outEndWeight || this.tech.overStartWeight === '' || this.tech.overEndWeight === '' || this.tech.outStartWeight === '' || this.tech.outEndWeight === '') {
        ty = false
        this.$warning_SHINHO('加水量记录全必填')
        return false
      }
      if (this.tech.overWeight < 0 || this.tech.outWeight < 0) {
        ty = false
        this.$warning_SHINHO('加水量不能为负数')
        return false
      }
      this.assessList.map((item) => {
        if (item.codeU === undefined || item.codeS === undefined || item.codeA === undefined) {
          ty = false
          this.$warning_SHINHO('感官评价记录必须全选')
          return false
        }
      })
      return ty
    },
    addline () {
      this.lookList.push({
        id: '',
        guardTechId: this.tech.id,
        guardTime: '',
        windTemp: '',
        productTemp: '',
        windSpeed: '',
        windInFlag: '',
        forceOutFlag: '',
        jiashiFlag: '',
        jiareFlag: '',
        productTempUp: '',
        productTempMid: '',
        productTempDown: '',
        thermometerOut: '',
        thermometerInner: '',
        remark: '',
        delFlag: '0',
        changer: this.$store.state.user.realName + `(${this.$store.state.user.name})`,
        unit: 'R/MIN'
      })
      this.$nextTick(function () {
        this.$refs.recordTable.bodyWrapper.scrollTop = this.$refs.recordTable.bodyWrapper.scrollHeight
      })
    },
    delrow (row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.delFlag = '1'
      })
    },
    rowDelFlag ({row, rowIndex}) {
      if (row.delFlag === '1') {
        return 'rowDel'
      } else {
        return ''
      }
    },
    savestauts (resolve, reject) {
      if (this.submitStatus === 'submit') {
        this.statuss = 'submit'
      }
      this.$http(`${KJM_API.DOULOOKSTATUS_API}`, 'POST', {status: this.statuss, orderHouseId: this.formHeader.orderHouseId}).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    savesmain (resolve, reject) {
      if (this.submitStatus === 'submit') {
        this.tech.status = 'submit'
      } else {
        this.tech.status = 'saved'
      }
      this.tech.orderHouseId = this.formHeader.orderHouseId
      this.$http(`${KJM_API.DOULOOKZHUSAVE_API}`, 'POST', this.tech).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    savesecond (resolve, reject) {
      this.$http(`${KJM_API.DOULOOKKANQUSAVE_API}`, 'POST', this.lookList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    savefeel (resolve, reject) {
      this.assessList.map((item) => {
        this.$set(item, 'guardTechId', this.tech.id)
        if (item.codeU === undefined) {
          this.$set(item, 'codeU', '')
        }
        if (item.codeS === undefined) {
          this.$set(item, 'codeS', '')
        }
        if (item.codeA === undefined) {
          this.$set(item, 'codeA', '')
        }
      })
      this.$http(`${KJM_API.DOULOOKGANGUANSAVE_API}`, 'POST', this.assessList).then(({data}) => {
        if (data.code === 0) {
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
        if (resolve) {
          resolve('resolve')
        }
      }).catch(() => {
        if (resolve) {
          reject('reject')
        }
      })
    },
    getList (formHeader) {
      this.$http(`${KJM_API.DOULOOKLIST_API}`, 'POST', {orderHouseId: formHeader.orderHouseId}).then(({data}) => {
        if (data.code === 0) {
          this.tech = data.techList[0]
          this.formHeader.inStartTime = data.techList[0].inStartTime === null ? '' : data.techList[0].inStartTime
          this.$refs.LookEcharts.testInit(this.formHeader)
          this.applyCraftState = this.tech.status
          this.$refs.tabs.handleTabClick(this.$refs.tabs.panes[0])
          this.assessList = data.feelList
          this.lookList = data.recordList
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    },
    ReadRow () {
      let params = {
        factory: this.formHeader.factory,
        houseNoName: this.formHeader.houseNoName,
        workShopName: this.formHeader.workShopName,
        inStartTime: this.tech.inStartTime,
        orderHouseId: this.formHeader.orderHouseId
      }
      this.$http(`${KJM_API.IOT_READ}`, 'POST', params).then(({data}) => {
        if (data.code === 0) {
          data.list.map((item) => {
            this.lookList.push(item)
          })
          this.$nextTick(function () {
            this.$refs.recordTable.bodyWrapper.scrollTop = this.$refs.recordTable.bodyWrapper.scrollHeight
          })
        } else {
          this.$notify.error({title: '错误', message: data.msg})
        }
      })
    }
  },
  components: {
    ExcRecord,
    TextRecord,
    AbnRecord: resolve => {
      require(['@/views/components/abnRecord'], resolve)
    },
    LookEcharts
  },
  computed: {
    timecha: function () {
      if (!this.tech.inEndTime || !this.tech.inStartTime) {
        return 0
      } else {
        return (new Date(this.tech.inEndTime) - new Date(this.tech.inStartTime)) / 60000
      }
    },
    overcha: function () {
      return (this.tech.overEndWeight - this.tech.overStartWeight).toFixed(3)
    },
    outcha: function () {
      return (this.tech.outEndWeight - this.tech.outStartWeight).toFixed(3)
    }
  }
}
</script>

<style>
.rowDel{display: none;}
.guard-form-input .el-input__inner {
  border: 0 none;
  border-bottom: 1px solid #ccc;
  border-radius: 0px;
  text-align: center
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"]{
  -moz-appearance: textfield;
}
</style>
<style lang="less" scoped>
.input_bommom {
  width: 147px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 32px;
  border-bottom: solid 1px #D8D8D8;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  margin-bottom: 8px
}
.searchCard {
  .el-button--primary,.el-button--primary:focus{
    color: #000000;
    background-color: #FFFFFF;
    border-color: #D9D9D9;
  }
  .el-button--primary:hover{
    background-color: #1890FF;
    color: #FFFFFF
  }
  .el-button--primary:first-child{
    background-color: #1890FF;
    color: #FFFFFF;
    border-color: #1890FF;
  }
}
#DaatTtabs{
  border-radius: 15px;
  overflow: hidden;
}
.htitle {
  margin: 0 0 10px 0;
}
.rowDel{
  display: none;
}
.htitle {
  margin: 0 0 10px 0;
  overflow: hidden;
}
.audit{
  line-height: 32px;
  margin: 0 0 10px 0;
  i{
    font-size: 22px;
    float: left;
  }
  span{
    font-size: 16px;
  }
}
.reqI{
  color: red;
}
</style>
