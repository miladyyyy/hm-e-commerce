<template>
  <div>
    <el-card>
      <div class="header">
        <el-button
          type="primary"
          style="margin-bottom: 20px"
          @click="handleOpen('add')"
          >添加分类</el-button
        >
      </div>
      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        v-loading="loading"
      >
        <template #isValid="{ row }">
          <i
            class="el-icon-success"
            v-if="!row.cat_deleted"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>

        <template #level="{ row }">
          <el-tag size="mini" v-if="row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>

        <template #operate="{ row }">
          <el-button size="mini" type="primary" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(row.cat_id)"
            >删除</el-button
          >
        </template>
      </tree-table>

      <el-pagination
        :current-page="params.pagenum"
        :page-sizes="[4, 8, 12]"
        :page-size="params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>

    <el-dialog title="dialogTitle" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item prop="cate_name" label="分类名称">
          <el-input v-model="form.cate_name"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getCategoriesListAPI, deleteCategoryAPI } from '@/api/goods'

export default {
  name: 'CategoriesPage',
  data() {
    return {
      cateList: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isValid',
          // prop: 'cat_deleted',
        },
        {
          label: '排序',
          type: 'template',
          template: 'level',
          // prop: 'cat_level',
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
        },
      ],
      total: 0,
      params: {
        type: 3,
        pagenum: 1,
        pagesize: 4,
      },
      loading: false,
      currentType: null,
      dialogVisible: false,
      form: {
        cate_name: '',
        pCate: null,
      },
    }
  },

  computed: {
    dialogTitle() {
      if (currentType === 'add') return '添加分类'
      else return '编辑分类'
    },
  },

  created() {
    this.initData()
  },

  methods: {
    async initData() {
      this.loading = true
      try {
        const { data } = await getCategoriesListAPI(this.params)
        this.cateList = data.result
        this.total = data.total
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    handleSizeChange(newSize) {
      this.params.pagesize = newSize
      this.initData()
    },

    handleCurrentChange(newNum) {
      this.params.pagenum = newNum
      this.initData()
    },

    async handleDelete(id) {
      await deleteCategoryAPI(id)
      this.$message.success = '删除成功'
      this.initData()
    },

    handleOpen(type) {
      this.dialogVisible = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
