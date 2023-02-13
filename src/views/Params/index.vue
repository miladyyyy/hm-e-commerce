<template>
  <div>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-row class="row-1">
        <span>选择商品分类：</span>
        <el-cascader
          v-model="secectedCate"
          :options="categories"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id',
          }"
          @change="getParams"
        ></el-cascader>
      </el-row>

      <template>
        <el-tabs v-model="currentTab" @tab-click="handleClick">
          <el-button
            class="add-btn"
            type="primary"
            size="small"
            @click="handleOpen('add')"
            :disabled="!currentId"
            >添加{{ ipt_label }}</el-button
          >
          <el-tab-pane label="动态参数" name="0">
            <ParamsTable
              :tableData="paramsList"
              :id="currentId"
              :sel="selType"
              @initData="initData"
            />
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="1"
            ><ParamsTable
              :tableData="paramsList"
              :id="currentId"
              :sel="selType"
              @initData="initData"
          /></el-tab-pane>
        </el-tabs>
      </template>
    </el-card>

    <el-dialog :visible="dialogVisible">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item
          prop="attr"
          :label="ipt_label"
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
import { mapState, mapActions } from 'vuex'
import { getParamsAPI, addAttributesAPI } from '@/api/goods'
import ParamsTable from './components/ParamsTable.vue'

const selMap = {
  0: 'many',
  1: 'only',
}

export default {
  name: 'ParamsPage',
  components: { ParamsTable },
  data() {
    return {
      currentTab: '0',
      currentId: null,
      secectedCate: '',
      paramsList: [],
      dialogVisible: false,
      form: { attr: '' },
    }
  },
  created() {
    this.getCategoriesAction()
  },
  computed: {
    ...mapState('goods', ['categories']),
    ipt_label() {
      if (this.currentTab === '0') return '动态参数'
      else return '静态参数'
    },

    selType() {
      if (this.currentTab === '0') return 'many'
      else if (this.currentTab === '1') return 'only'
    },
  },
  methods: {
    ...mapActions('goods', ['getCategoriesAction']),
    async initData() {
      if (!this.currentId) return
      const { data } = await getParamsAPI(
        this.currentId,
        selMap[this.currentTab]
      )
      this.paramsList = data
    },

    async getParams(ids) {
      this.currentId = ids.at(-1)
      this.initData()
    },

    async handleClick(tab) {
      this.currentTab = tab.name
      this.initData()
    },

    handleOpen() {
      this.dialogVisible = true
    },

    async handleConfirm() {
      await this.$refs.form.validate()
      await addAttributesAPI(this.currentId, {
        attr_name: this.form.attr,
        attr_sel: selMap[this.currentTab],
      })
      const { data } = await getParamsAPI(
        this.currentId,
        selMap[this.currentTab]
      )
      this.paramsList = data

      this.$message.success('添加成功')
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },

    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.row-1 {
  margin: 20px 0;
}

.add-btn {
  margin-bottom: 20px;
}
</style>
