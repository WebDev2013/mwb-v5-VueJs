<template>
  <page-common :page="PAGE"></page-common>
</template>

<script>
import PageCommon from './PageCommon'
export default {
  data: function () {
    return {
      PAGE: 'validations'
    }
  },
  components: {
    'page-common': PageCommon
  }
}
</script>

<style scoped>
</style>
