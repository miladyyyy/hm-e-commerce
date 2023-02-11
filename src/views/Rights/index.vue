<template>
  <div>
    <el-card>
      <el-table :data="rightsList" stripe border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column label="权限名称" prop="authName"> </el-table-column>
        <el-table-column label="路径" prop="path"> </el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template #default="{ row }">
            <el-tag :type="row.level | typeFilter">{{
              row.level | levelFilter
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getRightsAPI } from '@/api/roles'

export default {
  name: 'RightsPage',
  data() {
    return {
      rightsList: [],
    }
  },

  filters: {
    levelFilter(value) {
      switch (value) {
        case '0':
          return '一级'
        case '1':
          return '二级'
        case '2':
          return '三级'
      }
    },

    typeFilter(value) {
      switch (value) {
        case '0':
          return ''
        case '1':
          return 'success'
        case '2':
          return 'warning'
      }
    },
  },

  created() {
    this.initData()
  },

  methods: {
    async initData() {
      const { data } = await getRightsAPI()
      this.rightsList = data
    },
  },
}
</script>
<style lang="scss" scoped></style>
