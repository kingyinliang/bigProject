<template>
  <div>
    <index :name="name"></index>
  </div>
</template>

<script>
import index from './index'
export default {
  name: 'Out',
  data () {
    return {
      name: 'Out'
    }
  },
  mounted () {
  },
  methods: {},
  computed: {},
  components: {
    index
  }
}
</script>

<style scoped>

</style>
