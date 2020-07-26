<template>
  <el-container class="container">
    <el-header class="header">
      <transition name="el-zoom-in-center">
        <router-link to="/home" class="logo fl" v-show="!isCollapse" style="width: 200px;">{{ sysName }} </router-link>
      </transition>
      <div :class="['collapse_btn', isCollapse ? 'active' : '', 'fl']" @click="isCollapse = !isCollapse">
        <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
      </div>

      <div class="userinfo fr">
        <span class="time mr20">{{ getDateTime }}</span>
        <span class="name mr10">Hi，{{ sysUserName }}</span>
        <el-dropdown trigger="hover">
          <img class="avatar el-dropdown-link" src="/static/images/common/userImg.png" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logoutFn">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="ovh">
      <el-aside class="aside" width="auto">
        <aside-menu
          :class="['menu', isCollapse ? 'collapse' : '']"
          :routes="$router.options.routes[0].children"
          :permission-list="$store.state.permissionList"
          :config="asidemenuConfig"
          :collapse="isCollapse"
          :default-active="activePage"
          @select="handleSelect"
          v-bar
        />
      </el-aside>
      <el-main class="main">
        <div class="flex flex-j-sp flex-a-c mb20">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="item in $route.matched.slice(1)" :key="item.path" :to="{path: item.path}">
              {{ item.meta.tit }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view :key="routerviewKey" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from '@/components/asidemenu'
export default {
  name: 'index',
  components: {AsideMenu},
  data () {
    return {
      routerviewKey: new Date().getTime(),
      isCollapse: false,
      menuColor: '#fff',
      menuActiveColor: '#ffd04b',
      sysName: '后台管理系统', // 系统名称
      sysUserName: this.$store.state.userInfo.adminName,
      asidemenuConfig: {
        backgroundColor: '#515a6e',
        textColor: '#fff',
        activeTextColor: '#ffd04b'
      }
    }
  },
  provide () {
    let that = this
    return {
      pageReload () {
        that.routerviewKey = new Date().getTime()
      }
    }
  },
  created () {
    this.API.getPermissionList().then(res => {
      let {code, data} = res
      if (code === 0) {
        this.$store.commit('updatePermissionList', data.permissionList)
      }
    })
  },
  mounted () {},
  methods: {
    logoutFn () {
      // 退出
      this.API.signOut().then((res) => {
        if (res.code === 0) {
          clearInterval(this.timeMonitorPolling)
          this.$store.commit('logout')
          this.$message({
            message: '退出成功',
            type: 'success'
          })
          this.$router.push({path: '/login'})
        }
      })
    },
    handleSelect (index) {
      if (index) {
        this.$router.push(index)
      }
    }
  },
  computed: {
    getDateTime () {
      let weekday = ['  星期日', '  星期一', '  星期二', '  星期三', '  星期四', '  星期五', '  星期六']
      let myDate = new Date()
      let day = this.timer(myDate.getTime(), 'day')
      let week = weekday[myDate.getDay()]
      return day + '   ' + week
    },
    activePage () {
      console.log(this.$route.path)
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .header {
    padding: 0;
    background: $black;
    .logo {
      line-height: 61px;
      text-align: center;
      font-size: 18px;
      color: $white;
    }
    .collapse_btn {
      &.active {
        color: $active;
      }
      cursor: pointer;
      color: $white;
      width: 68px;
      text-align: center;
      font-size: 20px;
      line-height: 61px;
    }
    .menu {
      border: none;
      flex: 1 1 auto;
    }
    .userinfo {
      display: flex;
      align-items: center;
      color: $white;
      float: right;
      height: 60px;
      margin-right: 10px;
      .avatar {
        border-radius: 50%;
        width: 40px;
        height: auto;
        object-fit: cover;
      }
    }
  }
  .aside {
    width: 200px!important;
    &.collapse{
      width: auto!important;
    }
    .menu {
      width: 200px !important;
      height: 100%;
      &.collapse {
        width: auto !important;
      }
    }
  }
  .item {
    >>> .el-badge__content.is-fixed {
      top: 10px;
      right: 20px;
    }
  }
  .main {
    padding: 20px 10px 10px;
    box-sizing: border-box;
  }
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
>>> .el-badge__content {
  animation: blink 1s linear infinite;
}
</style>
