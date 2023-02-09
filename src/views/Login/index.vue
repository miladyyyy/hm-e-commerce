<template>
  <div class="login-page">
    <div class="login-box">
      <div class="avatar-box">
        <img src="@/assets/images/logo2.png" />
      </div>
      <el-form :model="form" ref="form">
        <el-form-item prop="username" :rules="rules.username">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="rules.username">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loginAPI } from '@/api/user'

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456',
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
      },
    }
  },
  methods: {
    async login() {
      await this.$refs.form.validate()
      const res = await loginAPI(this.form)
      this.$message.success('登录成功！')
      this.$store.commit('user/setToken', res.data.token)
      this.$router.push('/welcome')
    },
  },
}
</script>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: #2b4b6b;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar-box {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    padding: 5px;
    box-shadow: 0 0 10px #ddd;
    margin: 0 auto;
    transform: translateY(-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login-box {
    position: fixed;
    width: 450px;
    height: 300px;
    background-color: #fff;
    ::v-deep .el-form {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 20px;
    }
    ::v-deep .el-form-item__content {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
