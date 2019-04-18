<template>
  <div>
    <index :name="name"></index>
  </div>
</template>

<script>
import index from './index'
export default {
  name: 'Boiled',
  data () {
    return {
      name: 'Boiled'
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
