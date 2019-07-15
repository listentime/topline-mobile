<template>
  <div class="login-wrap">
    <!-- 头部 -->
    <van-nav-bar title="登录" />

    <!-- 表单 -->
    <form>
      <van-cell-group>
        <van-field v-model="user.mobile"
                   required
                   clearable
                   label="手机号"
                   placeholder="请输入手机号"
                   name="mobile"
                   error-message="errors.first('mobile')"
                   v-validate="required|mobile" />

        <van-field v-model="user.code"
                   type="password"
                   label="密码"
                   placeholder="请输入密码"
                   name="code"
                   error />
      </van-cell-group>

      <div class="login-btn-box">
        <van-button class="login-btn"
                    type="info"
                    :loading="loginLoading"
                    loading-text="登录中..."
                    @click.prevent="handleLogin">登录</van-button>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: { // 提交登录的表单数据
        mobile: '18801185985',
        code: '246810'
      },
      loginLoading: false, // 控制登录按钮的 loading 状态
      myErrors: {
        mobile: '',
        code: ''
      }
    }
  },
  created () {
    // this.configFormErrorMessages()
  },
  methods: {
    async handleLogin () {
      try {
        // 调用 JavaScript 触发验证
        // const valid = await this.$validator.validate()
        // // 如果校验失败，则停止后续代码执行
        // if (!valid) {
        //   return
        // }
        // 表单验证通过，发送请求，loading 加载
        this.loginLoading = true
        const data = await login(this.user)
        this.$store.commit('setUser', data)
        /**
         * 这里先简单粗暴的跳转到首页
         * 真实的业务要处理成跳转到之前过来的的页面
         */
        this.$router.push({
          name: 'home'
        })
      } catch (err) {
        this.$toast.fail('登录失败')
      }
      this.loginLoading = false
    }
    // configFormErrorMessages () {
    //   const dict = {
    //     custom: {
    //       mobile: {
    //         required: '手机号不能为空'
    //       },
    //       code: {
    //         required: '密码不能为空'
    //       }
    //     }
    //   }
    //   //  如果需要错误消息提示全局生效
    //   // Validator.localize('en', dict);
    //   // 组件中这也注册生效
    //   // or use the instance method
    //   // this.$validator.localize('zh_CN', dict)
    // }
  }
}
</script>

<style lang="less" scoped>
.login-btn-box {
  padding: 20px;
  .login-btn {
    width: 100%;
  }
}
</style>
