<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column prop="attr_name" label="参数名称"> </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-edit"
          @click="handleEdit"
          >编辑</el-button
        >
        <el-button type="danger" size="small" icon="el-icon-delete"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
// import { editAttributesAPI } from '@/api/goods'

export default {
  name: 'ParamsTable',
  props: ['tableData'],
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    async handleEdit() {
      // await editAttributesAPI()
    },
  },
}
</script>
<style lang="scss"></style>
