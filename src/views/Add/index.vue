<template>
  <div>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <el-steps class="step" :active="+active" finish-status="success">
        <el-step title="基本信息"> </el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-form class="add-form" ref="infoForm">
        <el-tabs
          v-model="active"
          tab-position="left"
          @tab-click="tabClicked"
          :before-leave="beforeTabLeave"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form :model="infoForm" :rules="rules" ref="infoForm">
              <el-form-item
                label="商品名称"
                prop="goods_name"
                :rules="rules.goods_name"
                ><el-input v-model="infoForm.goods_name"></el-input
              ></el-form-item>

              <el-form-item
                label="商品价格"
                prop="goods_price"
                :rules="rules.goods_price"
                ><el-input
                  type="number"
                  v-model="infoForm.goods_price"
                ></el-input
              ></el-form-item>

              <el-form-item
                label="商品数量"
                prop="goods_number"
                :rules="rules.goods_number"
                ><el-input
                  type="number"
                  v-model="infoForm.goods_number"
                ></el-input
              ></el-form-item>

              <el-form-item
                label="商品重量"
                prop="goods_weight"
                :rules="rules.goods_weight"
                ><el-input v-model="infoForm.goods_weight"></el-input
              ></el-form-item>
              <el-form-item label="商品分类" :rules="rules.goods_category">
                <el-cascader
                  v-model="infoForm.goods_category"
                  :options="Categories"
                  :props="{
                    expandTrigger: 'hover',
                    label: 'cat_name',
                    value: 'cat_id',
                  }"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="item in manyTableDate"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="cb"
                  v-for="(cb, index) in item.attr_vals"
                  :key="index"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2"></el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              listType="pitcure"
              :headers="headerObj"
            >
              <el-button size="samll" type="primary" style="margin-top: 20px"
                >点击上传</el-button
              >
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quillEditor
              class="ql-editor"
              v-model="infoForm.goods_content"
            ></quillEditor>
            <el-button type="primary" @click="handleAdd">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <el-dialog title="图片预览" :visible.sync="previewVisble">
      <img :src="previewPath" style="width: 100%"
    /></el-dialog>
  </div>
</template>
<script>
import { getCategoriesAPI, getParamsAPI } from '@/api/goods'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
// import GoodsInfo from './components/GoodsInfo.vue'
// import GoodsParams from './components/GoodsParams.vue'
// import GoodsProperty from './components/GoodsProperty.vue'
// import GoodsImage from './components/GoodsImage.vue'
// import GoodsContent from './components/GoodsContent.vue'

// const componentsMap = {
//   0: 'GoodsInfo',
//   1: 'GoodsParams',
//   2: 'GoodsProperty',
//   3: 'GoodsImage',
//   4: 'GoodsContent',
// }

export default {
  name: 'AddPage',
  components: {
    quillEditor,
  },
  data() {
    return {
      active: 0,
      infoForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_category: [],
        pics: [],
        goods_content: '',
        attrs: [],
      },
      rules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' },
        ],
        goods_category: [
          { required: true, message: '请输入商品分类', trigger: 'blur' },
        ],
      },
      Categories: [],
      manyTableDate: [],
      uploadURL: 'https://lianghj.top:8888/api/private/v1/upload',
      headerObj: {
        Authorization: this.$store.state.user.token,
      },
      previewPath: '',
      previewVisble: false,
    }
  },

  computed: {
    cateId() {
      if (this.infoForm.goods_category.length === 3) {
        return this.infoForm.goods_category[2]
      }
      return null
    },
  },

  async created() {
    await this.initCategories()
  },

  methods: {
    async tabClicked(tab) {
      if (this.active === '1') {
        const { data } = await getParamsAPI(this.cateId, 'many')
        data.forEach((item) => {
          item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyTableDate = data
      }
    },

    async initCategories() {
      const { data } = await getCategoriesAPI()
      this.Categories = data
    },

    handleChange() {
      if (this.infoForm.goods_category.length !== 3) {
        this.infoForm.goods_category = []
      }
    },

    beforeTabLeave(activeName, oldActiveName) {
      if (oldActiveName === '0' && this.infoForm.goods_category.length !== 3) {
        this.$message.error('请选择商品分类')
        return false
      }
    },

    handlePreview(file) {
      this.previewPath = file.response.data.url
      this.previewVisble = true
    },

    handleRemove(file) {
      const filePath = file.response.data.tmp_path
      const i = this.infoForm.pics.findIndex((item) => item.pic === filePath)
      this.infoForm.pics.splice(i, 1)
    },

    handleSuccess(res) {
      this.infoForm.pics.push(res.data.tmp_path)
    },

    async handleAdd() {
      await this.$refs.infoForm.validate()
      const form = structuredClone(this.infoForm)
      form.good_cat = form.good_cat.join(',')

      this.manyTableDate.forEach((item) => {
        const newInfo = {
          attr_id: item.attr_id,
          attr_value: item.attr_vals.join(' '),
        }
        this.infoForm.attrs.push(newInfo)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.step {
  margin: 15px 0;
}

::v-deep .el-checkbox {
  margin: 0 10px 0 0;
}

::v-deep .ql-editor {
  min-height: 200px;
}
</style>
