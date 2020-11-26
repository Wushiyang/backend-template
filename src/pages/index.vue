<template>
  <el-container class="container">
    <el-header class="header">
      <transition name="el-zoom-in-center">
        <router-link to="/home" class="logo" v-show="!is_collapse" style="width: 200px;">{{ sysName }} </router-link>
      </transition>
      <div :class="['collapse_btn', is_collapse ? 'active' : '']" @click="is_collapse = !is_collapse">
        <i :class="[is_collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
      </div>
      <div class="userinfo">
        <span class="time mr20">{{ dateTime }}</span>
        <span class="name mr10">Hi，{{ sysUserName }}</span>
        <el-dropdown trigger="hover" class="mr10">
          <img
            class="avatar el-dropdown-link"
            :src="$store.state.userInfo.avatar.full_url | jumpImgs('/userImg.png')"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container class="ovh">
      <el-aside class="aside" width="auto">
        <aside-menu
          :class="['menu', is_collapse ? 'collapse' : '']"
          :routes="$router.options.routes[0].children"
          :config="asidemenu_config"
          :collapse="is_collapse"
          :default-active="active_page"
          :permissionDict="$store.state.permissionDict"
          @select="handleSelect"
          v-bar
        />
      </el-aside>
      <el-main class="main">
        <div class="main_head">
          <el-breadcrumb separator="/" class="">
            <el-breadcrumb-item v-for="item in $route.matched.slice(1)" :key="item.path" :to="{ path: item.path }">
              {{ item.meta.tit }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view :key="routerview_key" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { timeToCNWeek, timeFormat } from '@/assets/js/utils'
import AsideMenu from '@/components/asidemenu'
// import RouterMiddleware from '@/components/routermiddleware'
export default {
  name: 'Index',
  components: { AsideMenu },
  data () {
    let nowDate = new Date()
    return {
      routerview_key: nowDate.getTime(),
      is_collapse: false,
      menu_bg: '#515a6e',
      menu_color: '#fff',
      menu_active_color: '#ffd04b',
      sysName: '后台管理系统', // 系统名称
      sysUserName: this.$store.state.userInfo.nickname,
      dateTime: timeFormat(nowDate, 'yyyy-MM-dd') + '        ' + timeToCNWeek(nowDate),
      asidemenu_config: {
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
        that.routerview_key = new Date().getTime()
      },
      setMenuList () {
        that.setMenuList()
      }
    }
  },
  created () {
    this.setMenuList()
  },
  mounted () {},
  methods: {
    audiofn () {
      let audio = new Audio()
      audio.src = '/static/audio/1689.mp3'
      audio.play()
    },
    // onSoundChange () {
    //   this.Sound = !this.Sound
    //   // this.$store.commit('setSound', this.Sound)
    // },
    handleLogout () {
      // 退出
      // this.$API.signOut().then((res) => {
      //   if (res.code === 0) {
      //     clearInterval(this.timeMonitorPolling)
      //     this.$store.commit('logout')
      //     this.$message({
      //       message: '退出成功',
      //       type: 'success'
      //     })
      //     this.$router.push({ path: '/login' })
      //   }
      // })
      this.$store.commit('logout')
      this.$message({
        message: '退出成功',
        type: 'success'
      })
      this.$router.push({ path: '/login' })
    },
    handleSelect (index) {
      if (index) {
        this.$router.push(index)
      }
    },
    setMenuList () {
      this.$API.getAdminUserInfo({}).then((res) => {
        const { code, data } = res
        if (code === 0) {
          this.$store.commit('setPermissionDic', data.permission_list)
        }
      })
    }
  },
  computed: {
    active_page () {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  .header {
    padding: 0;
    display: flex;
    align-content: center;
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
      float: right;
      align-items: center;
      color: $white;
      flex-grow: 1;
      justify-content: flex-end;
      .avatar {
        border-radius: 50%;
        width: 40px;
        height: auto;
        object-fit: cover;
      }
    }
  }
  .aside {
    // width: 200px!important;
    // &.collapse{
    //   width: auto!important;
    // }
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
    .main_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      .title {
        font-size: 24px;
      }
    }
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
.portal-container {
  padding: 5px;
  a {
    text-decoration: none;
    color: #333;
    &:hover {
      color: rgb(255, 208, 75);
    }
  }
}
</style>
