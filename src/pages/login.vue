<template>
  <div class="container">
    <div class="login_panel">
      <el-tabs type="border-card">
        <el-tab-pane label="手机登录">
          <el-form
            :model="model"
            :rules="rules"
            label-position="left"
            label-width="0px"
          >
            <el-form-item prop="phone">
              <el-input
                type="number"
                v-model="model.phone"
                auto-complete="off"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="sms_code">
              <el-input
                type="text"
                v-model="model.sms_code"
                auto-complete="off"
                placeholder="请输入验证码"
                @keyup.native.enter="handleSubmit"
              ></el-input>
              <div class="absolute t0 r5">
                <el-button
                  v-if="isGetSmsOpen"
                  type="text"
                  @click="onSmsClick"

                  >获取验证码</el-button
                >
                <el-button
                  v-else
                  type="text"
                  >{{ timeOver }}(S)</el-button
                >
              </div>
            </el-form-item>
            <el-form-item class="tac mt40">
              <el-button type="primary" @click="handleSubmit"  :loading="isLogin"
                >立即登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="账号登录">
          <el-form
            :model="model"
            label-position="left"
            label-width="0px"
          >
            <el-form-item prop="account">
              <el-input
                type="text"
                v-model="model.account"
                auto-complete="off"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="model.password"
                auto-complete="off"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item class="tac mt40">
              <el-button type="primary" @click="handleAccountSubmit" :loading="isLogin"
                >立即登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      model: { // 表单数据
        phone: '',
        sms_code: '',
        account: '',
        password: '',
        token: ''
      },
      isGetSmsOpen: true, // 获取验证码是否开启
      timeOver: 60, // 计时
      noClick: false, // 不可点击
      rules: { // 表单规则
        account: [
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '没有填写密码或者密码不正确',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '还没有填写手机号',
            trigger: 'blur'
          },
          {
            min: 11,
            max: 11,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        sms_code: [
          {
            required: true,
            message: '请输入短信验证码密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    if (this.$store.state.token) {
      // this.$router.push({ path: '/home' })
    }
    if (~~window.localStorage.getItem('phone')) {
      this.model.phone = window.localStorage.getItem('phone')
    }
    // this.getGeetestInit()
  },
  computed: {
    ...mapState(['token', 'defaultImg', 'userInfo']),
    isLogin () {
      return !!this.token
    }
  },
  methods: {
    onSmsClick () {
      if (!this.isGetSmsOpen) {
        this.$message.error('请稍后再试')
        return false
      }
      if (!this.model.phone || this.model.phone.length !== 11) {
        this.$message.error('请输入正确手机号')
        return false
      }
      this.getSmsCode()
    },
    getSmsCode () {
      let that = this
      let data = Object.assign({template_scene: 'frontend_login_captcha', phone: this.model.phone}, this.captchaData)
      this.API
        .sendSmsCaptcha(data)
        .then((res) => {
          if (res.code === 0) {
            localStorage.setItem('phone', this.model.phone)
            this.$message({
              type: 'success',
              message: '获取成功'
            })
            this.isGetSmsOpen = false
            var time = 60
            var timer = setInterval(() => {
              if (time === 0) {
                clearTimeout(timer)
                that.isGetSmsOpen = true
                that.timeOver = 60
              } else {
                time = parseInt(time) - 1
                that.timeOver = time
              }
            }, 1000)
          } else {
            this.$message.error(res.message)
          }
        })
    },
    handleSubmit (ev) {
      if (this.noClick) return
      if (!this.model.phone) {
        this.$message({
          message: '还没有填写手机号',
          type: 'error'
        })
        return false
      }
      if (this.model.phone.length !== 11) {
        this.errorText = '请输入正确手机号'
        this.$message({
          message: '还没有填写手机号',
          type: 'error'
        })
        return false
      }
      if (!this.model.sms_code || this.model.sms_code.length !== 6) {
        this.$message({
          message: '请输入正确的短信验证码',
          type: 'error'
        })
        return false
      }
      this.noClick = true
      this.API
        .loginPhone({ phone: this.model.phone, captcha: this.model.sms_code, 'allow_create_user': 0 })
        .then((res) => {
          this.noClick = false
          if (res.code === 0) {
            this.model.token = res.data.login_token
            this.model.userinfo = res.data.user_info
            this.$store.commit('login', this.model)
            this.$router.push({ path: '/' })
          }
        })
    },
    handleAccountSubmit () {
      if (this.noClick) return
      if (!this.model.account) {
        this.$message({
          message: '请输入账号',
          type: 'error'
        })
        return false
      }
      if (!this.model.password || this.model.password.length < 6) {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
        return false
      }
      this.noClick = true
      this.API
        .loginAccount({ nickname: this.model.account, password: this.model.password, 'allow_create_user': 0 }, { isHideError: true })
        .then((res) => {
          this.noClick = false
          if (res.code === 0) {
            this.model.token = res.data.login_token
            this.model.userinfo = res.data.user_info
            this.$store.commit('login', this.model)
            this.$router.push({ path: '/' })
          } else {
            if (res.code === 102003) {
              this.$message({
                message: '密码不正确',
                type: 'error'
              })
            } else {
              this.$message({message: `[${res.code}]${res.msg}`, type: 'error'})
            }
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 登录 */
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../../static/images/common/bg.jpg') no-repeat center;
  background-size: cover;
  .login_panel {
    width: 340px;
    background: #fff;
    border: 1px solid #eaeaea;
    position: absolute;
    top: 100px;
    right: 100px;
    border-radius: 8px;
    overflow: hidden;
    border: 0;
  }
}
</style>
