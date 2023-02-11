<template>
  <div class="roles-page">
    <el-card>
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="handleOpen('add')"
          >添加角色</el-button
        >
      </div>
      <el-table :data="rolesData" style="width: 100%" stripe border>
        <el-table-column type="expand">
          <template #default="{ row }">
            <el-row
              v-for="item in row.children"
              :key="item.id"
              class="main border-bottom"
            >
              <el-col class="col-1">
                <el-tag
                  closable
                  :disable-transitions="false"
                  @close="handleDeleteRights(row.id, item.id, row.children)"
                  >{{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col border>
                <el-row
                  v-for="item2 in item.children"
                  :key="item2.id"
                  class="sub border-bottom"
                >
                  <el-tag
                    type="success"
                    closable
                    @close="handleDeleteRights(row.id, item2.id, item.children)"
                    >{{ item2.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                  <el-tag
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    closable
                    @close="
                      handleDeleteRights(row.id, item3.id, item2.children)
                    "
                  >
                    {{ item3.authName }}</el-tag
                  >
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"> </el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
        <el-table-column label="操作" width="300">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="handleOpen('edit', row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(row.id)"
              >删除</el-button
            >
            <el-button
              size="small"
              type="warning"
              icon="el-icon-menu"
              @click="handleOpen('allocate', row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-tree
        v-if="currentType === 'allocate'"
        ref="tree"
        :data="tree"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="idList"
        :props="defaultProps"
      >
      </el-tree>
      <el-form v-else :model="form" ref="form" label-width="80px">
        <el-form-item label="角色名称" prop="roleName" :rules="rules.roleName">
          <el-input v-model.trim="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc" :rules="rules.roleDesc">
          <el-input v-model.trim="form.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-button">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getRolesDataAPI,
  addRolesAPI,
  editRolesAPI,
  deleteRolesAPI,
  getRolesTreeAPI,
  assignPermissionsAPI,
  deleteRightsAPI,
} from '@/api/roles'

export default {
  name: 'RolesPage',
  data() {
    return {
      rolesData: [],
      dialogVisible: false,
      currentType: null,
      currentId: null,
      tree: [],
      idList: [],

      form: {
        roleName: '',
        roleDesc: '',
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: ['blur'],
          },
        ],
        roleDesc: [
          {
            required: true,
            message: '请输入角色描述',
            trigger: ['blur'],
          },
        ],
      },

      defaultProps: {
        children: 'children',
        label: 'authName',
      },
    }
  },
  computed: {
    title() {
      switch (this.currentType) {
        case 'add':
          return '添加角色'
        case 'edit':
          return '修改角色'
        case 'allocate':
          return '分配权限'
        default:
          return ''
      }
    },
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const { data } = await getRolesDataAPI()
      this.rolesData = data
    },
    indexMethod(index) {
      return index + 1
    },
    async handleOpen(type, row) {
      this.currentType = type
      if (type === 'edit') {
        this.form.roleName = row.roleName
        this.form.roleDesc = row.roleDesc
        this.currentId = row.id
      }
      if (type === 'allocate') {
        const { data } = await getRolesTreeAPI()
        this.currentId = row.id
        this.tree = data
        row.children.forEach((item) => {
          item.children.forEach((item2) => {
            item2.children.forEach((item3) => {
              this.idList.push(item3.id)
            })
          })
        })
      }
      this.dialogVisible = true
    },
    handleClose() {
      if (this.currentType !== 'allocate') this.$refs.form.resetFields()
      this.dialogVisible = false
      this.currentType = null
      this.currentId = null
      this.idList = []
    },
    async handleConfirm() {
      if (this.currentType !== 'allocate') await this.$refs.form.validate()
      switch (this.currentType) {
        case 'add':
          await addRolesAPI(this.form)
          this.$message.success('添加成功')
          break
        case 'edit':
          await editRolesAPI(this.currentId, this.form)
          this.$message.success('修改成功')
          break
        case 'allocate':
          const rids = {
            rids: this.$refs.tree
              .getCheckedNodes()
              .map((item) => item.id + ',' + item.pid)
              .join(','),
          }
          await assignPermissionsAPI(this.currentId, rids)
          this.$message.success('分配成功')
      }
      if (this.currentType !== 'allocate') this.$refs.form.resetFields()
      this.initData()
      this.dialogVisible = false
    },
    async handleDelete(id) {
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteRolesAPI(id)
          this.$message.success('删除成功')
          this.initData()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    async handleDeleteRights(id, rid, pids) {
      this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          await deleteRightsAPI(id, rid)
          pids.splice(pids.indexOf(id), 1)
          this.$message.success('删除成功')
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__expanded-cell {
  padding: 20px 50px;

  .el-row {
    display: flex;
    align-items: center;
  }

  .col-1 {
    width: 20%;
  }
}

.el-tag {
  margin: 7px;
}

.border-bottom {
  border-bottom: 1px solid #eee;
}

.sub.border-bottom:last-child {
  border: none;
}

.main.border-bottom:first-child {
  border-top: 1px solid #eee;
}

.dialog-button {
  display: flex;
  justify-content: flex-end;
}
</style>
