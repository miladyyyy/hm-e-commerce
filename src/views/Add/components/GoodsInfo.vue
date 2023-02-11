<template>
  <el-form :model="infoForm" :rules="rules" ref="infoForm" label-width="100px">
    <el-form-item label="商品名称" prop="goods_name" :rules="rules.goods_name"
      ><el-input v-model="infoForm.goods_name"></el-input
    ></el-form-item>

    <el-form-item label="商品价格" prop="goods_price" :rules="rules.goods_price"
      ><el-input type="number" v-model="infoForm.goods_price"></el-input
    ></el-form-item>

    <el-form-item
      label="商品数量"
      prop="goods_number"
      :rules="rules.goods_number"
      ><el-input type="number" v-model="infoForm.goods_number"></el-input
    ></el-form-item>

    <el-form-item
      label="商品重量"
      prop="goods_weight"
      :rules="rules.goods_weight"
      ><el-input v-model="infoForm.goods_weight"></el-input
    ></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'GoodsInfo',
  data() {
    return {
      infoForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_class: '',
      },
      rules: {
        goods_name: [],
        goods_price: [],
        goods_number: [],
        goods_weight: [],
        goods_class: [],
      },
    }
  },
}
</script>
<style lang="scss" scoped></style>
