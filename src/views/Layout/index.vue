<template>
  <div>
    <el-container class="layout-page">
      <el-header>
        <div class="header-log">
          <img src="@/assets/images/logo.png" />
        </div>
        <el-button type="info">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '200px' : '64px'">
          <div class="toggle-button" @click="toggle">|||</div>
          <el-menu
            :collapse="!isCollapse"
            background-color="#313743"
            text-color="#fff"
            unique-opened
            :collapse-transition="false"
            router
          >
            <el-menu-item index="welcome">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu
              v-for="item in menuList"
              :key="item.id"
              :index="item.path"
            >
              <template slot="title">
                <i :class="iconMap[item.path]"></i>
                <span slot="title">{{ item.authName }}</span>
              </template>
              <el-menu-item
                v-for="subItem in item.children || []"
                :key="subItem.id"
                :index="subItem.path"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <template v-if="$route.path !== '/welcome'">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ pageName.mainTitle }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ pageName.subTitle }}</el-breadcrumb-item>
            </el-breadcrumb>
          </template>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getMenusAPI } from '@/api'

export default {
  name: 'LayoutPage',
  data() {
    return {
      isCollapse: false,
      menuList: [],

      iconMap: {
        users: 'el-icon-s-custom',
        rights: 'el-icon-s-check',
        goods: 'el-icon-s-shop',
        orders: 'el-icon-s-order',
        reports: 'el-icon-s-marketing',
      },
    }
  },
  computed: {
    pageName() {
      let res
      let subTitle
      let mainTitle
      this.menuList.forEach((item) => {
        res = item.children.find((subItem) => {
          return '/' + subItem.path === this.$route.path
        })
        if (res) {
          subTitle = res.authName
          mainTitle = item.authName
        }
      })
      return { subTitle, mainTitle }
    },
  },
  created() {
    this.initMenu()
  },
  methods: {
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    async initMenu() {
      const { data } = await getMenusAPI()
      // console.log(data)
      this.menuList = data
    },
  },
}
</script>
<style lang="scss" scoped>
.el-container {
  height: 100vh;
  .el-header {
    height: 60px;
    background-color: #363d40;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .header-log img {
      height: 50px;
    }
    .el-button {
      height: 40px;
    }
  }
  .el-aside {
    min-width: 64px;
    background-color: #313743;
    color: #fff;
    transition: width 0.3s;
    user-select: none;
  }
  .el-main {
    background-color: #e9edf1;
  }
  .toggle-button {
    background-color: #4a5064;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    letter-spacing: 2px;
    cursor: pointer;
  }
}
.el-menu {
  border: none;
}
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
