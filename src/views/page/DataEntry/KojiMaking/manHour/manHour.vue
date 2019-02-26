<template>
  <div>
    <div class="main">
      <el-card class="searchCard  newCard">
        <el-row type="flex">
          <el-col :span="21">
            <form-head :formHeader="formHeader"></form-head>
          </el-col>
          <el-col :span="3" style="font-size: 14px;line-height: 32px">
            <div style="float:left">
              <span class="point" :style="{'background': orderStatus === 'noPass'? 'red' : orderStatus === 'saved'? '#1890f' : orderStatus === 'submit' ? '#1890ff' : orderStatus === '已同步' ?  '#f5f7fa' : 'rgb(103, 194, 58)'}"></span>订单状态：
              <span :style="{'color': orderStatus === 'noPass'? 'red' : '' }">{{orderStatus === 'noPass'? '审核不通过':orderStatus === 'saved'? '已保存':orderStatus === 'submit' ? '已提交' : orderStatus === 'checked'? '通过':orderStatus === '已同步' ? '未录入' : orderStatus }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row style="text-align:right" class="buttonCss">
          <template style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" @click="$router.push({ path: '/DataEntry-KojiMaking-index'})">返回</el-button>
            <el-button type="primary" class="button" size="small" @click="isRedact = !isRedact" v-if="orderStatus !== 'submit' && orderStatus !== 'checked' && isAuth('wht:order:update')">{{isRedact?'取消':'编辑'}}</el-button>
          </template>
          <template v-if="isRedact" style="float:right; margin-left: 10px;">
            <el-button type="primary" size="small" @click="savedOrSubmitForm('saved')" v-if="isAuth('wht:order:update')">保存</el-button>
            <el-button type="primary" size="small" @click="SubmitForm" v-if="isAuth('sys:whtInStorage:submit')">提交</el-button>
          </template>
        </el-row>
        <div class="toggleSearchBottom">
          <i class="el-icon-caret-top"></i>
        </div>
      </el-card>
    </div>
    <div class="main">
      <div class="tableCard">
        <div class="toggleSearchTop" style="background-color: white;margin-bottom: 8px;position: relative;border-radius: 5px">
          <i class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <el-card class="box-cards">
        <el-card style="margin-bottom: 10px">
          <h3 style="font-size: 14px;line-height: 32px;font-weight: bold">产量（单位：批）</h3>
          <el-form :inline="true" :model="readyTimeDate" ref="timesForm" size="small" label-width="125px">
            <el-form-item label="入曲批数：">
              <el-input v-model="readyTimeDate.dayChange" placeholder="手工录入" :disabled="!isRedact"></el-input>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card style="margin-bottom: 10px">
          <el-form :inline="true" :model="readyTimeDate" ref="timesForm" size="small" label-width="125px">
            <div class="clearfix">
              <h3 style="font-size: 14px;line-height: 32px;font-weight: bold;float: left">准备时间（分钟：min）</h3>
              <el-form-item label="班次：" style="float: right">
                <el-select v-model="readyTimeDate.classes" placeholder="请选择" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))">
                  <el-option label="白班" value="白班"></el-option>
                  <el-option label="中班" value="中班"></el-option>
                  <el-option label="夜班" value="夜班"></el-option>
                  <el-option label="多班" value="多班"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <el-row v-if="readyTimeDate.classes === '白班' || readyTimeDate.classes === '多班' || !readyTimeDate.classes">
              <el-form-item label="交接班（白班）：">
                <el-input v-model="readyTimeDate.dayChange" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="班前会：" label-width="80px">
                <el-input v-model="readyTimeDate.dayChangeBefore" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="生产前准备：" label-width="100px">
                <el-input v-model="readyTimeDate.dayChangePre" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="生产后清场：" label-width="100px">
                <el-input v-model="readyTimeDate.dayChangeAfter" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
            </el-row>
            <el-row v-if="readyTimeDate.classes === '中班' || readyTimeDate.classes === '多班' || !readyTimeDate.classes">
              <el-form-item label="交接班（中班）：">
                <el-input v-model="readyTimeDate.midChange" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="班前会：" label-width="80px">
                <el-input v-model="readyTimeDate.midChangeBefore" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="生产前准备：" label-width="100px">
                <el-input v-model="readyTimeDate.midChangePre" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="生产后清场：" label-width="100px">
                <el-input v-model="readyTimeDate.midChangeAfter" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
            </el-row>
            <el-row v-if="readyTimeDate.classes === '夜班' || readyTimeDate.classes === '多班' || !readyTimeDate.classes">
              <el-form-item label="交接班（夜班）：">
                <el-input v-model="readyTimeDate.nightChange" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="班前会：" label-width="80px">
                <el-input v-model="readyTimeDate.nightChangeBefore" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="生产前准备：" label-width="100px">
                <el-input v-model="readyTimeDate.nightChangePre" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
              <el-form-item label="生产后清场：" label-width="100px">
                <el-input v-model="readyTimeDate.nightChangeAfter" placeholder="手工录入" :disabled="!(isRedact && (readyTimeDate.status ==='noPass' || readyTimeDate.status ==='saved' || readyTimeDate.status ===''))"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-card>
        <el-card style="margin-bottom: 10px">
          <h3 style="font-size: 14px;line-height: 32px;font-weight: bold">人员(小时:H)</h3>
          <worker ref="workerref" :isRedact="isRedact" :order="formHeader"></worker>
        </el-card>
      </el-card>
    </div>
  </div>
</template>

<script>
import { headanimation } from '@/net/validate'
import FormHead from './formHead'
import Worker from '@/views/components/worker'
export default {
  name: 'manHour',
  data () {
    return {
      isRedact: false,
      orderStatus: '',
      formHeader: {},
      readyTimeDate: {}
    }
  },
  mounted () {
    headanimation(this.$)
  },
  methods: {},
  computed: {},
  components: {
    FormHead,
    Worker
  }
}
</script>

<style lang="scss">
.box-cards{
  .el-card__body{
    padding: 12px!important;
  }
}
</style>
