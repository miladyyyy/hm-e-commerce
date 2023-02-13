<template>
  <div>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(row.attr_id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDelete(row.attr_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible="dialogVisible">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item
          prop="attr"
          label="编辑参数"
          :rules="[{ required: true, message: '请输入参数' }]"
        >
          <el-input v-model="form.attr"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleConfirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { editAttributesAPI, deleteAttributesAPI } from '@/api/goods'

export default {
  name: 'ParamsTable',
  props: {
    tableData: { type: Array, required: true },
    id: { type: Number },
    sel: { type: String },
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        attr: '',
      },
      attr_id: null,
    }
  },
  methods: {
    async handleEdit(aid) {
      this.dialogVisible = true
      this.attr_id = aid
    },

    async handleDelete(aid) {
      await deleteAttributesAPI(this.id, aid)
      this.$message.success('删除成功')
      this.$emit('initData')
    },

    async handleConfirm() {
      await this.$refs.form.validate()
      await editAttributesAPI(this.id, this.attr_id, {
        attr_name: this.form.attr,
        attr_sel: this.sel,
      })
      this.$message.success('修改成功')
      this.$refs.form.resetFields()
      this.dialogVisible = false
      this.$emit('initData')
    },

    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
  },
}
</script>
<style lang="scss"></style>
