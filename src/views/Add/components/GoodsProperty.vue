<template>
  <div></div>
</template>
<script>
import { getAttributesAPI } from '@/api/goods'

export default {
  name: 'GoodsProperty',
  created() {
    this.initProperty()
  },
  methods: {
    async initProperty() {
      await getAttributesAPI('only')
    },
  },
}
</script>
<style lang="scss" scoped></style>
