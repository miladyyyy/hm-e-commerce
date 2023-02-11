<template>
  <div>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-steps class="step" :active="active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form class="add-form">
        <el-tabs tab-position="left" style="height: 200px">
          <el-tab-pane label="基本信息"></el-tab-pane>
          <el-tab-pane label="商品参数"></el-tab-pane>
          <el-tab-pane label="商品属性"></el-tab-pane>
          <el-tab-pane label="商品图片"></el-tab-pane>
          <el-tab-pane label="商品内容"></el-tab-pane>

          <component :is="stepCpt"></component>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import GoodsInfo from './components/GoodsInfo.vue'
import GoodsParams from './components/GoodsParams.vue'
import GoodsProperty from './components/GoodsProperty.vue'
import GoodsImage from './components/GoodsImage.vue'
import GoodsContent from './components/GoodsContent.vue'

export default {
  name: 'AddPage',
  components: {
    GoodsInfo,
    GoodsParams,
    GoodsProperty,
    GoodsImage,
    GoodsContent,
  },
  data() {
    return {
      active: 0,
      stepCpt: 'GoodsInfo',
    }
  },
}
</script>
<style lang="scss" scoped>
.step {
  margin: 15px 0;
}
</style>
