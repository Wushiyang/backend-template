<template>
  <div class="page_container">
    <el-form :model="model" :rules="rules" label-position="left" label-width="0px" class="login_panel">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="phone">
        <el-input type="number" v-model="model.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="sms_code">
        <el-input
          class="fl w60p"
          type="password"
          v-model="model.sms_code"
          auto-complete="off"
          placeholder="请输入短信验证码"
          @keyup.native.enter="handleSubmit"
        ></el-input>
        <el-button v-if="showGetSmsBtn" type="primary" class="fr w30p" @click="getSmsCode">获取验证码</el-button>
        <el-button v-else type="info" plain class="fr w30p" @click="getSmsCode">{{ timeCounter }}(S)</el-button>
      </el-form-item>
      <el-form-item class="w100p">
        <el-button type="primary" class="w100p" @click="handleSubmit" :loading="isLoginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      model: {
        phone: this.$store.state.userInfo.phone,
        sms_code: ''
      },
      showGetSmsBtn: true,
      timeCounter: 60,
      rules: {
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入短信验证码密码',
            trigger: 'blur'
          }
        ]
      },
      isLoginLoading: false
    }
  },
  created () {
    if (this.$store.state.token) {
      this.$router.push({ path: '/' })
    }
    if (~~window.localStorage.getItem('phone')) {
      this.model.phone = window.localStorage.getItem('phone')
    }
  },
  methods: {
    getSmsCode () {
      let that = this
      if (!this.showGetSmsBtn) {
        this.$message({ message: '请稍后再试', type: 'error' })
      } else {
        if (!~~this.model.phone || this.model.phone.length !== 11) {
          this.$message({
            message: '请输入正确手机号',
            type: 'error'
          })
        } else {
          this.$API.sendSmsCaptcha({ template_scene: 'backend_login_captcha', phone: this.model.phone }).then((res) => {
            const { code } = res
            if (code === 0) {
              localStorage.setItem('phone', this.model.phone)
              this.showGetSmsBtn = false
              let time = 60
              let timer = setInterval(() => {
                if (time === 0) {
                  clearInterval(timer)
                  that.showGetSmsBtn = true
                  that.timeCounter = 60
                } else {
                  that.timeCounter = --time
                }
              }, 1000)
            }
          })
        }
      }
    },
    handleSubmit (ev) {
      if (!~~this.model.phone || this.model.phone.length !== 11) {
        this.$message({ message: '请输入正确手机号', type: 'error' })
        return false
      }
      if (!~~this.model.sms_code || this.model.sms_code.length !== 6) {
        this.$message({
          message: '请输入正确的短信验证码',
          type: 'error'
        })
        return false
      }
      this.isLoginLoading = true
      this.$API.loginPhone({ phone: this.model.phone, captcha: this.model.sms_code }).then((res) => {
        const { data, code } = res
        if (code === 0) {
          this.$store.commit('login', data)
          this.$router.push({ path: '/' })
        }
        this.isLoginLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page_container {
  overflow: hidden;
  background: url('/static/images/bz.jpeg') 50% no-repeat;
  background-size: cover;
  .login_panel {
    border-radius: 5px;
    background-clip: padding-box;
    margin: 17% auto;
    width: 350px;
    padding: 50px 35px 30px;
    background: #fff;
    border: 1px solid #eaeaea;
    .title {
      margin: 0px auto 40px;
      text-align: center;
      color: #505458;
    }
  }
}
</style>
