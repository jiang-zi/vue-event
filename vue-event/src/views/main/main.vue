<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img
              v-if="userInfo.user_pic"
              :src="userInfo.user_pic"
              class="avatar"
            />
            <img v-else src="../../assets/logo.png" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item @click="logoutHandler" index="2"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div class="user-box">
          <img v-if="userInfo.user_pic" :src="userInfo.user_pic" />
          <img v-else src="../../assets/logo.png" />
          <span>欢迎 {{ userInfo.nickname || userInfo.username }}</span>
        </div>
        <el-menu
          :default-active="$route.path"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          router
        >
          <template v-for="item in menusList">
            <el-menu-item v-if="!item.children" :key="item.indexPath" :index="item.indexPath">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu v-else :key="item.indexPath" :index="item.indexPath">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="ele in item.children" :key="ele.indexPath" :index="ele.indexPath">
                  <i :class="ele.icon"></i>
                  {{ele.title}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main> <router-view></router-view> </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Main',
  data () {
    return {
      menusList: []
    }
  },
  async created () {
    try {
      await this.getMenus()
      this.$store.dispatch('user/getUserInfo')
    } catch (e) {

    }
  },
  methods: {
    logoutHandler () {
      this.$confirm('确认退出么嘤嘤嘤?', '退出登录呜呜~~', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出登录呜呜~~!'
          })
          this.$store.commit('user/updateToken', '')
          this.$router.push('/login')
        })
        .catch((e) => e)
    },
    getMenus () {
      return this.$http.get('/my/menus').then(({ data: res }) => {
        if (!res) return
        if (res.code !== 0) return
        this.menusList = res.data
      })
    }
  },
  computed: {
    ...mapState('user', ['userInfo', 'token'])
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
//     background-image: linear-gradient(
//     to right,
//     #ffff00,
//     #f8ea47,
//     #f0d465,
//     #f0d465,
//     #e7bf7c,
//     #ddaa8f,
//     #d095a1,
//     #c280b2,
//     #b26cc2,
//     #9d56d2,
//     #8440e1,
//     #6028f0,
//     #0000ff
//   );
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    // background-color: #f2f2f2;
    background-image: linear-gradient(
    to right,
    #ffff00,
    #f8ea47,
    #f0d465,
    #f0d465,
    #e7bf7c,
    #ddaa8f,
    #d095a1,
    #c280b2,
    #b26cc2,
    #9d56d2,
    #8440e1,
    #6028f0,
    #0000ff
  );
  }
  .el-footer {
    // background-color: #eee;
    background-image: linear-gradient(
    to right,
    #ffff00,
    #f8ea47,
    #f0d465,
    #f0d465,
    #e7bf7c,
    #ddaa8f,
    #d095a1,
    #c280b2,
    #b26cc2,
    #9d56d2,
    #8440e1,
    #6028f0,
    #0000ff
  );
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
//   background-color: #fff;
background-image: linear-gradient(
    to right,
    #ffff00,
    #f8ea47,
    #f0d465,
    #f0d465,
    #e7bf7c,
    #ddaa8f,
    #d095a1,
    #c280b2,
    #b26cc2,
    #9d56d2,
    #8440e1,
    #6028f0,
    #0000ff
  );
  margin-right: 10px;
  object-fit: cover;
}
// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    // background-color: #fff;
    background-image: linear-gradient(
    to right,
    #ffff00,
    #f8ea47,
    #f0d465,
    #f0d465,
    #e7bf7c,
    #ddaa8f,
    #d095a1,
    #c280b2,
    #b26cc2,
    #9d56d2,
    #8440e1,
    #6028f0,
    #0000ff
  );
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>
