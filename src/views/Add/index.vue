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
      <el-steps class="step" :active="+active" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form class="add-form">
        <el-tabs
          v-model="active"
          tab-position="left"
          @tab-click="handleClick"
          :before-leave="validate"
        >
          <el-tab-pane label="基本信息" name="0"
            ><GoodsInfo ref="VC1"></GoodsInfo
          ></el-tab-pane>
          <el-tab-pane label="商品参数" name="1"></el-tab-pane>
          <el-tab-pane label="商品属性" name="2"></el-tab-pane>
          <el-tab-pane label="商品图片" name="3"></el-tab-pane>
          <el-tab-pane label="商品内容" name="4"></el-tab-pane>
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

const componentsMap = {
  0: 'GoodsInfo',
  1: 'GoodsParams',
  2: 'GoodsProperty',
  3: 'GoodsImage',
  4: 'GoodsContent',
}

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

  methods: {
    handleClick(tab) {
      console.log(tab)
      this.active = +tab.paneName
      this.stepCpt = componentsMap[tab.paneName]
    },

    validate(a, b) {
      console.log(a, b)
      // return false
    },
  },
}
</script>
<style lang="scss" scoped>
.step {
  margin: 15px 0;
}
</style>
