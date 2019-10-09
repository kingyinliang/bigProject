<template>
  <div class="pageMain">
    <echarts-head>欣和企业制曲车间数据展示中心</echarts-head>
    <div class="Container">
      <div class="Container_box">
        <div class="Container_box_left">
          <div class="Container_box_left_top">
            <div class="Container_box_left_top_title"><p>看曲实时曲线</p></div>
            <div class="Container_box_left_top_echarts" id="Line1"></div>
          </div>
        </div>
        <div class="Container_box_right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { line } from './Line'
export default {
  name: 'index',
  data () {
    return {
      Line1: null
    }
  },
  mounted () {
    this.Line1 = echarts.init(document.getElementById('Line1'))
    this.Line1.setOption(line)
    window.addEventListener('resize', () => {
      if (this.Line1) {
        this.Line1.resize()
      }
    })
  },
  methods: {},
  computed: {},
  components: {
    EchartsHead: resolve => {
      require(['../../layout/EchartsHead'], resolve)
    }
  }
}
</script>

<style lang="scss" scoped>
  .pageMain {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .Container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 120px;
      &_box {
        display: flex;
        justify-content: left;
        &_left{
          width: 600px;
          &_top{
            width: 100%;
            height: 400px;
            display: flex;
            flex-direction: column;
            padding-left: 15px;
            padding-top: 15px;
            background: url('~@/assets/img/echartsDetailLeftBg.png') no-repeat;
            background-size:100% 100%;
            &_title{
              margin-left: 10px;
              height: 20px;
              line-height: 20px;
              font-size: 16px;
              color: #00dfff;
              border-left: 6px solid #00dfff;
              padding-left: 10px;
            }
            &_echarts{
              flex: 1;
              width: 100%;
            }
          }
        }
        &_right{
          width: 450px;
          margin-left: 50px;
        }
      }
    }
  }
  @media (max-width: 1367px) {
    .pageMain {
      .Container {
        &_box {
          width: 1153px;
          height: 500px;
          &_left{
            width: 600px;
          }
          &_right{
            width: 450px;
            margin-left: 50px;
          }
        }
      }
    }
  }
  @media (min-width: 1367px) {
    .pageMain {
      .Container {
        &_box {
          width: 1153px;
          height: 500px;
        }
      }
    }
  }
</style>
