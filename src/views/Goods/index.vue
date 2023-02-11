<template>
  <div>
    <el-card>
      <el-row class="row-1" type="flex">
        <el-col class="col-1" :span="8" type="flex">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model.trim="searchContent"
            @clear="initData"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </el-col>
        <el-col>
          <el-button type="primary" @click="$router.push('/add')"
            >添加商品</el-button
          >
        </el-col>
      </el-row>

      <el-table :data="goodsList" stripe border style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格" width="180">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重置">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间"> </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" size="small" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button type="danger" size="small" icon="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getGoodsListAPI, searchGoodsAPI } from '@/api/goods'

export default {
  name: 'GoddsPage',
  data() {
    return {
      goodsList: [],
      pagenum: 1,
      pagesize: 10,
      total: 0,
      searchContent: '',
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const { data } = await getGoodsListAPI({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      })
      this.goodsList = data.goods
      this.total = data.total
      console.log(data)
    },

    async handleSearch() {
      const { data } = await searchGoodsAPI({
        query: this.searchContent,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      })
      this.goodsList = data.goods
    },
  },
}
</script>
<style lang="scss" scoped>
.row-1 {
  margin-bottom: 20px;
  .col-1 {
    margin-right: 20px;
  }
}
</style>
