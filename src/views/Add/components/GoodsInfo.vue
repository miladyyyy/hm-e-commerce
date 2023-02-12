<template>
  <el-form :model="infoForm" :rules="rules" ref="infoForm">
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
    <el-form-item label="商品分类" :rules="rules.goods_category">
      <el-cascader
        v-model="infoForm.goods_category"
        :options="Categories"
        :props="{ expandTrigger: 'hover', label: 'cat_name', value: 'cat_id' }"
      ></el-cascader>
    </el-form-item>
  </el-form>
</template>
<script>
import { getCategoriesAPI } from '@/api/goods'

export default {
  name: 'GoodsInfo',
  data() {
    return {
      infoForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_category: '',
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
        ],
        goods_category: [
          { required: true, message: '请输入商品分类', trigger: 'blur' },
        ],
      },
      Categories: [],
    }
  },

  async created() {
    await this.initCategories()
  },

  methods: {
    async initCategories() {
      const { data } = await getCategoriesAPI()
      this.Categories = data
    },
  },
}
</script>
<style lang="scss" scoped></style>
