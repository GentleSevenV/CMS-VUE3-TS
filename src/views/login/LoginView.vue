<template>
  <div class="loginview">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from '@/views/login/cpns/LoginPanel.vue'

export default defineComponent({
  name: 'LoginView',
  components: {
    LoginPanel
  }
})
</script>

<style scoped lang="less">
.loginview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/login_bg.jpg') top center no-repeat;
  background-size: cover;
}
</style>
