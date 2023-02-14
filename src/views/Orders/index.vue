<template>
  <div>
    <el-card>
      <el-row>
        <el-input
          placeholder="请输入内容"
          v-model="searchContent"
          style="width: 30%; margin-bottom: 20px"
        >
          <template #append>
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </el-row>

      <el-table style="width: 100%" :data="ordersData" stripe border>
        <el-table-column width="50" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template #default="{ row }">
            <el-tag :type="row.pay_status === '0' ? 'danger' : 'success'">
              {{ row.pay_status === '0' ? '未付款' : '已付款' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template #default="{ row }">
            {{ row.create_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleOpen('edit', row.order_id)"
            ></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-location"
              @click="handleOpen('detail')"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
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
      :visible="dialogVisible"
      @close="handleClose"
    >
      <el-form
        :model="formData"
        label-width="100px"
        ref="form"
        v-if="this.currentType === 'edit'"
      >
        <el-form-item
          label="订单价格"
          prop="order_price"
          :rules="[
            { required: true, message: '请输入订单价格', trigger: ['blur'] },
          ]"
        >
          <el-input
            type="number"
            v-model.number="formData.order_price"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否付款" prop="pay_status">
          <el-radio v-model="formData.pay_status" label="1">已付款</el-radio>
          <el-radio v-model="formData.pay_status" label="0">未付款</el-radio>
        </el-form-item>
        <el-form-item label="是否发货" prop="is_send">
          <el-radio v-model="formData.is_send" label="是">是</el-radio>
          <el-radio v-model="formData.is_send" label="否">否</el-radio>
        </el-form-item>
        <el-row type="flex" justify="end">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button size="small" type="primary" @click="handleConfirm"
            >确认</el-button
          >
        </el-row>
      </el-form>

      <el-timeline v-else>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>
<script>
import { getOrdersListAPI, getOrderAPI, updateOrderAPI } from '@/api/orders'

export default {
  name: 'OrdersPage',
  data() {
    return {
      params: {
        pagesize: 4,
        pagenum: 1,
      },
      ordersData: [],
      total: 0,
      searchContent: '',
      dialogVisible: false,
      currentType: null,
      currentId: null,
      formData: {
        order_price: '',
        pay_status: '0',
        is_send: '否',
      },
      activities: [
        {
          timestamp: '2018-05-10 09:39:00',
          content: '已签收,感谢使用顺丰,期待再次为您服务',
        },
        {
          timestamp: '2018-05-10 08:23:00',
          content:
            '[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件',
        },
        {
          timestamp: '2018-05-10 07:32:00',
          content: '快件到达 [北京海淀育新小区营业点]',
        },
        {
          timestamp: '2018-05-10 02:03:00',
          content:
            '快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]',
        },
        {
          timestamp: '2018-05-09 23:05:00',
          content: '快件到达 [北京顺义集散中心]',
        },
        {
          timestamp: '2018-05-09 21:21:00',
          content: '快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]',
        },
        {
          timestamp: '2018-05-09 13:07:00',
          content: '顺丰速运 已收取快件',
        },
        {
          timestamp: '2018-05-09 12:25:03',
          content: '卖家发货',
        },
        {
          timestamp: '2018-05-09 12:22:24',
          content: '您的订单将由HLA（北京海淀区清河中街店）门店安排发货。',
        },
        {
          timestamp: '2018-05-08 21:36:04',
          content: '商品已经下单',
        },
      ],
    }
  },
  computed: {
    dialogTitle() {
      if (this.currentType) {
        return this.currentType === 'edit' ? '修改订单数据' : '物流进度'
      }
      return ''
    },
  },
  created() {
    this.initOrdersData()
  },
  methods: {
    async initOrdersData() {
      const { data } = await getOrdersListAPI(this.params)
      this.ordersData = data.goods
      this.total = data.total
    },

    handleSizeChange(newSize) {
      this.params.pagesize = newSize
      this.initOrdersData()
    },

    handleCurrentChange(newNum) {
      this.params.pagenum = newNum
      this.initOrdersData()
    },

    async handleOpen(type, id) {
      this.currentType = type
      this.dialogVisible = true
      this.currentId = id
      if (type === 'edit') {
        const { data } = await getOrderAPI(id)
        this.formData = {
          order_price: data.order_price,
          pay_status: data.pay_status,
          is_send: data.is_send,
        }
      }
    },

    handleClose() {
      if (this.currentType === 'edit') this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    async handleConfirm() {
      await this.$refs.form.validate()
      await updateOrderAPI(this.currentId, this.formData)
      this.$message.success('修改成功')
      this.initOrdersData()
      this.handleClose()
    },
  },
}
</script>
<style lang="scss" scoped></style>
