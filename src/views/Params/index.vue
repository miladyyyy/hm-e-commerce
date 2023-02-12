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
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-button type="primary" size="small" @click="handleOpen('add')"
            >添加动态参数</el-button
          >
          <el-tab-pane label="动态参数" name="first">
            <ParamsTable :tableData="paramsList" />
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="second">配置管理</el-tab-pane>
        </el-tabs>
      </template>
    </el-card>

    <el-dialog :visible="dialogVisible">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item
          prop="attr"
          label="'参数'"
          :rules="[{ required: true, message: '请输入参数' }]"
        >
          <el-input v-model="form.attr"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
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
  1: 'onlt',
}

export default {
  name: 'ParamsPage',
  components: { ParamsTable },
  data() {
    return {
      activeName: 0,
      currentTab: 0,
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
  },
  methods: {
    ...mapActions('goods', ['getCategoriesAction']),
    async getParams(ids) {
      if (!this.currentId) this.currentId = ids.at(-1)
      const { data } = await getParamsAPI(this.currentId, 'many')
      this.paramsList = data
    },

    handleClick() {},

    handleOpen() {
      this.dialogVisible = true
    },

    async handleConfirm() {
      await addAttributesAPI(this.currentId, {
        attr_name: this.form.attr,
        attr_sel: selMap[this.currentTab],
      })
      this.$message.success('添加成功')
      this.dialogVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.row-1 {
  margin: 20px 0;
}
</style>
