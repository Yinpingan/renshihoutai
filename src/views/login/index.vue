<template>
  <div class="box">
    <div class="pic">
    </div>
    <div class="login">
      <div class="box2">
        <h1 style="margin: 0;font-weight: normal;width: 350px;">登录</h1>
        <el-form :model="loginForm" :rules="loginRules" ref="loginfrom">
          <el-form-item prop="mobile">
            <el-input class="input" v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input" v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree" style="width: 350px;"> 用户平台使用协议 </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="dl">登录</el-button>
          </el-form-item>
        </el-form>
        <div style="min-width: 350px; color: red;font-size: 14px;"> 仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息 (如手机号、身份证号等)!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data() {
    const isAgreeFn = (a, b, c) => {
      b ? c() : c(new Error('请勾选协议'))
    }
    return {
      checked: false,
      loginForm: {
        mobile: "13800000002",
        password: "hm#qd@23!",
        isAgree: true
      },
      loginRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}/, message: "请输入正确的手机号", trigger: 'blur' }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: 'blur' },
          { min: 6, max: 12, message: "密码是6-12位", trigger: 'blur' }
        ],
        isAgree: [
          {
            validator: isAgreeFn
          }
        ]
      }
    }
  },
  watch: {

  },
  methods: {
    ...mapActions('user', ['login']),
    dl() {
      this.$refs['loginfrom'].validate(async (a, b) => {
        await this.login(this.loginForm)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss"></style>

<style lang="scss" scoped>
.box {
  width: 100%;
  min-width: 760px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
  box-sizing: border-box;

  .pic {
    flex: 3;
    height: 100vh;
    background: #2648b0 url(https://heimahr.itheima.net/static/img/login_back.5ecbf4ab.png) no-repeat 50%/cover;
    border-top-right-radius: 20px;
  }

  .login {
    flex: 2;
    height: 100vh;
    margin-left: 190px;
    display: flex;
    align-items: center;

    .box2 {
      min-width: 350px;
      height: 340px;

      display: flex;
      flex-direction: column;

      .input {
        width: 350px;
      }

      .btn {
        width: 350px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #2752fb;
        color: #fff;
        margin: 10px 0;
      }
    }
  }
}
</style>
