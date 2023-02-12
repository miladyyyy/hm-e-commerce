<template>
  <div>111111111</div>
</template>
<script>
import { getAttributesAPI } from '@/api/goods'

export default {
  name: 'GoodsParams',
  created() {
    this.initParams()
  },
  methods: {
    async initParams() {
      await getAttributesAPI('many')
    },
  },
}
</script>
<style lang="scss" scoped></style>
