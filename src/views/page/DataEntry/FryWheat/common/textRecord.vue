<template>
  <div><el-input type="textarea" v-model="Text" class="textarea" :disabled="!isRedact" style="width: 100%;height: 200px"></el-input></div>
</template>

<script>
export default {
  name: 'textRecord',
  data () {
    return {
      Text: ''
    }
  },
  props: {
    isRedact: {}
  },
  mounted () {
  },
  methods: {},
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
