<template>
  <div class="page_container">
    <el-form :model="model" :rules="rules" label-position="left" label-width="0px" class="login-container">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="phone">
        <el-input type="number" v-model="model.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="sms_code">
        <el-input
          class="fl w_60p"
          type="password"
          v-model="model.sms_code"
          auto-complete="off"
          placeholder="请输入短信验证码"
          @keyup.native.enter="handleSubmit"
        ></el-input>
        <el-button v-if="getSmsOpen" type="primary" class="fr w_35p" @click="getSmsCode">获取验证码</el-button>
        <el-button v-else type="info" plain class="fr w_35p" @click="getSmsCode">{{ timeOver }}(S)</el-button>
      </el-form-item>
      <el-form-item>
        <el-select v-model="currPortalId" style="width: 100%">
          <el-option v-for="(item, index) in portalSite" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="w_100p">
        <el-button type="primary" class="w_100p" @click="handleSubmit" :loading="isLoginLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped></style>
