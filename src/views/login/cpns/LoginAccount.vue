<template>
  <div class="loginaccount">
    <el-form>
      <el-form-item label="账号" required>
        <el-input v-model="account.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" required>
        <el-input v-model="account.password" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'LoginAccount',
  components: {},
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })

    return {
      account
    }
  }
})
</script>

<style scoped></style>
