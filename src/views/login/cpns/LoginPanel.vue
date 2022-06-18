<template>
  <div class="loginpanel">
    <h1>内容管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account></login-account>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
      <!-- <el-tab-pane label="Config">Config</el-tab-pane>
      <el-tab-pane label="Role">Role</el-tab-pane>
      <el-tab-pane label="Task">Task</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

export default defineComponent({
  name: 'LoginPanel',
  components: { LoginAccount, LoginPhone }
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
</style>
