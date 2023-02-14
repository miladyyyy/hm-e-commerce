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
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleOpen('edit', row.cat_id)"
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

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      @close="handleClose"
    >
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item
          prop="cate_name"
          label="分类名称"
          :rules="[
            {
              required: true,
              message: '请输入分类名称',
              trigger: ['blur'],
            },
          ]"
        >
          <el-input v-model="form.cate_name"></el-input>
        </el-form-item>
        <el-form-item
          prop="pCate"
          label="父级分类"
          v-if="currentType === 'add'"
        >
          <el-cascader
            style="width: 100%"
            v-model="form.pCate"
            :options="options"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
              checkStrictly: true,
            }"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-row type="flex" justify="end">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  getCategoriesListAPI,
  deleteCategoryAPI,
  addCategoryAPI,
  getOptionsAPI,
  getCategoryAPI,
  editCategoryAPI,
} from '@/api/goods'

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
      currentId: null,
      dialogVisible: false,
      form: {
        cate_name: '',
        pCate: null,
      },
      options: [],
      payload: {
        cat_level: 0,
        cat_name: '一级',
        cat_pid: 0,
      },
    }
  },

  computed: {
    dialogTitle() {
      if (this.currentType) {
        return this.currentType === 'add' ? '添加分类' : '编辑分类'
      }
      return ''
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
    async initOptions() {
      const { data } = await getOptionsAPI(2)
      this.options = data
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

    async handleOpen(type, id) {
      this.dialogVisible = true
      this.currentType = type
      switch (type) {
        case 'add':
          this.initOptions()
          break
        case 'edit':
          const { data } = await getCategoryAPI(id)
          this.form.cate_name = data.cat_name
          this.currentId = id
          break
      }
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
      this.currentType = null
    },

    handleChange(val) {
      switch (val.length) {
        case 0:
          this.payload = {
            cat_level: 0,
            cat_name: this.form.cate_name,
            cat_pid: 0,
          }
          break
        case 1:
          this.payload = {
            cat_level: 1,
            cat_name: this.form.cate_name,
            cat_pid: val[0],
          }
          break
        case 3:
          this.payload = {
            cat_level: 2,
            cat_name: this.form.cate_name,
            cat_pid: val[1],
          }
          break
      }
    },

    async handleConfirm() {
      await this.$refs.form.validate()
      switch (this.currentType) {
        case 'add':
          ;(this.payload.cat_name = this.form.cate_name),
            await addCategoryAPI(this.payload)
          this.$message.success('添加成功')
          break
        case 'edit':
          await editCategoryAPI(this.currentId, {
            cat_name: this.form.cate_name,
          })
          this.$message.success('修改成功')
          break
      }
      this.handleClose()
      this.initData()
    },
  },
}
</script>
<style lang="scss" scoped></style>
