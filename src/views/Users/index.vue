<template>
  <div class="user-page">
    <el-card>
      <div class="card-header">
        <div class="add-bar">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model.trim="searchContent"
            @keyup.enter="searchUser"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchUser"
            ></el-button>
          </el-input>
        </div>
        <el-button type="primary" @click="handleOpen('add')"
          >添加用户</el-button
        >
      </div>

      <template>
        <el-table
          v-loading="loading"
          style="width: 100%"
          :data="userList"
          stripe
          border
        >
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
              <el-switch
                v-model="row.mg_state"
                @change="handleChange($event, row.id)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template #default="{ row }">
              <el-button
                size="small"
                type="primary"
                icon="el-icon-edit"
                @click="handleOpen('edit', row.id)"
              ></el-button>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(row.id)"
              ></el-button>
              <el-button
                size="small"
                type="warning"
                icon="el-icon-setting"
                @click="
                  handleOpen('allocate', row.id, row.role_name, row.username)
                "
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>

    <el-dialog
      :title="hint"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="allocate_menu" v-if="this.currentType === 'allocate'">
        <p>当前用户: {{ form.username }}</p>
        <p>当前角色： {{ currentRole }}</p>
        <p>
          分配新角色:
          <el-select v-model="selectedRid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </p>
      </div>
      <el-form :model="form" ref="form" label-width="70px" v-else>
        <el-form-item label="用户名" prop="username" :rules="rules.username">
          <el-input
            v-model="form.username"
            :disabled="currentType === 'edit'"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="rules.password"
          v-if="currentType !== 'edit'"
        >
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :rules="rules.email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile" :rules="rules.mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUsersListAPI,
  addUsersAPI,
  changeState,
  getUsersAPI,
  updateUsersAPI,
  deleteUsersAPI,
  getRoleListAPI,
  updateRoleAPI,
  searchUsersAPI,
} from '@/api/users'

export default {
  name: 'UsersPage',
  data() {
    return {
      userList: [],
      roleList: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      dialogVisible: false,
      currentType: null,
      currentId: null,
      currentRole: null,
      selectedRid: null,
      searchContent: '',
      loading: false,
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
        email: [
          { required: true, message: '请输入邮箱', trigger: ['blur'] },
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '请输入正确的邮箱',
            trigger: ['blur'],
          },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur'] },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: ['blur'],
          },
        ],
      },
    }
  },
  computed: {
    hint() {
      switch (this.currentType) {
        case 'add':
          return '添加用户'
        case 'edit':
          return '修改用户'
        default:
          return ''
      }
    },
  },
  created() {
    this.initUserList()
  },
  methods: {
    async initUserList() {
      const { pagenum, pagesize } = this
      this.loading = true
      try {
        const { data } = await getUsersListAPI({ pagenum, pagesize })
        this.loading = false
        this.userList = data.users
        this.total = data.total
      } catch (error) {
        this.loading = false
      }
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
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },

    async searchUser() {
      this.loading = true
      try {
        const { data } = await searchUsersAPI({
          query: this.searchContent,
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        })
        this.userList = data.users
        this.total = data.total
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },

    async handleChange(val, id) {
      await changeState(val, id)
      this.$message.success('更新状态成功')
      this.initUserList()
    },
    async handleOpen(type, id, role_name, username) {
      this.currentType = type
      this.dialogVisible = true
      if (type === 'edit') {
        const { data } = await getUsersAPI(id)
        this.$refs.form.clearValidate('username')
        this.form.username = data.username
        this.form.email = data.email
        this.form.mobile = data.mobile
        this.cucurrentId = id
      }
      if (type === 'allocate') {
        const { data } = await getRoleListAPI()
        this.roleList = data
        this.currentId = id
        this.currentRole = role_name
        this.form.username = username
      }
    },
    async handleConfirm() {
      switch (this.currentType) {
        case 'add':
          await this.$refs.form.validate()
          await addUsersAPI(this.form)
          this.dialogVisible = false
          this.currentType = null
          this.$message.success('添加成功')
          this.$refs.form.resetFields()
          this.pagenum = 1
          break
        case 'edit':
          await this.$refs.form.validate()
          await updateUsersAPI(this.currentId, {
            mobile: this.form.mobile,
            email: this.form.email,
          })
          this.$message.success('修改成功')
          this.$refs.form.resetFields()
          this.cucurrentId = null
          break
        case 'allocate':
          await updateRoleAPI(this.currentId, this.selectedRid)
          this.$message.success('分配角色成功')
          this.roleList = null
          this.selectedRid = null
          this.currentId = null
          this.currentRole = null
          this.form.username = ''
          break
      }
      this.currentType = null
      this.dialogVisible = false
      this.initUserList()
    },

    handleDelete(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteUsersAPI(id)
          this.$message.success('删除成功')
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      this.initUserList()
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
.allocate_menu p {
  margin-bottom: 15px;
}
</style>
