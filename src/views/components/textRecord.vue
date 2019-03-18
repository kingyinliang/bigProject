<template>
  <div><el-input type="textarea" v-model="textObj.pkgText" class="textarea" :disabled="!isRedact" style="width: 100%;height: 200px"></el-input></div>
</template>

<script>
import { PACKAGING_API } from '@/api/api'
export default {
  name: 'textRecord',
  data () {
    return {
      textObj: {
        id: '',
        pkgText: ''
      }
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
  },
  methods: {
    // 获取文本记录
    GetText (id) {
      let postdata
      if (typeof id === 'string') {
        postdata = {
          order_id: id
        }
      } else if (typeof id === 'object') {
        postdata = id
      }
      this.$http(`${PACKAGING_API.PKGTEXTLIST_API}`, 'POST', postdata, false, false, false).then(({data}) => {
        if (data.code === 0) {
          this.textObj = (data.listForm[0] ? data.listForm[0] : {
            id: '',
            pkgText: ''
          })
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    UpdateText (formHeader, str, resolve, reject) {
      if (formHeader.orderHouseId) {
        this.textObj.orderHouseId = formHeader.orderHouseId
        this.textObj.blongProc = formHeader.productLine
        this.textObj.orderId = formHeader.orderId
      } else {
        this.textObj.orderId = formHeader.orderId
      }
      // this.textObj.workShop = (formHeader.workShop ? formHeader.workShop : null)
      // this.textObj.orderHouseId = (formHeader.orderHouseId ? formHeader.orderHouseId : null)
      // this.textObj.blongProc = formHeader.productLine
      // this.textObj.orderId = formHeader.orderId
      this.$http(`${PACKAGING_API.PKGTEXTUPDATE_API}`, 'POST', this.textObj).then(({data}) => {
        if (data.code === 0) {
          if (resolve) {
            resolve('resolve')
          }
        } else {
          this.$message.error('修改文本' + data.msg)
          if (reject) {
            reject('修改文本' + data.msg)
          }
        }
      })
    }
  },
  computed: {},
  components: {}
}
</script>

<style>
.textarea textarea{
  width: 100%;
  height: 100%!important;
}
</style>
