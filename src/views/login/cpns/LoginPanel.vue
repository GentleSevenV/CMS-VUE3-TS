<template>
  <div class="loginpanel">
    <h1>内容管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" v-model="currentTab" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="loginAccountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="loginPhoneRef"></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="login-control">
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="default" />
      <el-link type="primary">忘记密码</el-link>
    </div>

    <!-- 给登录按钮添加一个点击事件HandleLoginAction -->
    <el-button type="primary" @click="HandleLoginAction" class="login-btn">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

export default defineComponent({
  name: 'LoginPanel',
  components: { LoginAccount, LoginPhone },
  setup() {
    // 定义一个响应式变量isKeepPassword用于保存是否记住密码，默认true（勾选记住密码）
    const isKeepPassword = ref(true)
    const currentTab = ref('account')

    // 定义一个Ref对象loginAccountRef用于拿到LoginAccount这个组件对象，并通过<InstanceType<typeof LoginAccount>>这一泛型指定这个Ref对象类型为LoginAccount
    const loginAccountRef = ref<InstanceType<typeof LoginAccount>>()

    const loginPhoneRef = ref<InstanceType<typeof LoginPhone>>()

    // 当立即登录按钮被点击时触发HandleLoginAction这一点击事件，执行其内部函数
    const HandleLoginAction = () => {
      if (currentTab.value === 'account') {
        // console.log(loginAccountRef.value)
        // 通过loginAccountRef拿到LoginAccount这个组件对象，并调用LoginAccount这个组件对象中的LoginAccountAction这个方法（想要获取ref对象内部的值或者方法必须调用.value,并且此处需要使用可选类型，以避免因为没有LoginAccount这个对象时而报错）
        loginAccountRef.value?.LoginAccountAction(isKeepPassword.value)
      } else {
        loginPhoneRef.value?.loginPhoneAction()
      }
    }

    return {
      isKeepPassword,
      loginAccountRef,
      HandleLoginAction,
      currentTab
    }
  }
})
</script>

<style>
.loginpanel {
  width: 320px;
  margin-bottom: 150px;
}

.loginpanel > h1 {
  text-align: center;
}

.el-tabs--top.el-tabs--border-card > .el-tabs__header .el-tabs__item:last-child {
  border-right: none !important;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}

.login-control {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.login-btn {
  width: 100%;
  height: 40px;
  margin-top: 10px;
}
</style>
