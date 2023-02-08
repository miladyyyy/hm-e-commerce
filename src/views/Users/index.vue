<template>
  <div class="user-page">
    <el-card>
      <div class="card-header">
        <div class="add-bar">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-button type="primary" @click="dialogVisible = true"
          >添加用户</el-button
        >
      </div>

      <template>
        <el-table style="width: 100%" :data="userList" stripe border>
          <el-table-column width="48" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column prop="username" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column prop="mg_state" label="状态" width="100">
            <template #default="{ row }">
              <el-switch v-model="row.mg_state"> </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template #default>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-edit"
              ></el-button>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
              ></el-button>
              <el-button
                size="small"
                type="warning"
                icon="el-icon-setting"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="form" label-width="70px">
        <el-form-item label="用户名" prop="username" :rules="rules.username">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="密码" prop="password" :rules="rules.password">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="邮箱" prop="email" :rules="rules.email">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item label="手机" prop="mobile" :rules="rules.mobile">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getUsersListAPI } from '@/api/users'

export default {
  name: 'UsersPage',
  data() {
    return {
      userList: [],
      pagenum: 1,
      pagesize: 4,
      total: 0,
      dialogVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur'],
          },
          {
            min: 5,
            max: 11,
            message: '长度在 5 到 11 个字符',
            trigger: ['blur'],
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur'] },
          {
            pattern: /^\w{5,11}$/,
            message: '请输入 5 到 10 位的密码',
            trigger: ['blur'],
          },
        ],
        email: '',
        mobile: '',
      },
    }
  },
  created() {
    this.initUserList()
  },
  methods: {
    async initUserList() {
      const { pagenum, pagesize } = this
      const { data } = await getUsersListAPI({ pagenum, pagesize })
      this.userList = data.users
      this.total = data.total
    },

    indexMethod(index) {
      return index + 1
    },
    async handleSizeChange(pageSize) {
      this.pagesize = pageSize
      await this.initUserList()
    },
    handleCurrentChange(currentPage) {
      this.pagenum = currentPage
      this.initUserList()
    },
    handleClose() {
      console.log('closed')
    },
  },
}
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  margin-bottom: 15px;
  .add-bar {
    width: 33%;
    margin-right: 15px;
  }
}
</style>
