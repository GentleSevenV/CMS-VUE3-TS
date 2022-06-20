<template>
  <div class="loginphone">
    <el-form :rules="rules" :model="Phone">
      <el-form-item label="手机号" prop="number">
        <el-input v-model="Phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="Phone.code"></el-input>
          <el-button type="primary" class="verify-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'LoginPhone',
  components: {},
  setup() {
    const Phone = reactive({
      number: '',
      code: ''
    })

    const rules = {
      number: [
        { required: true, message: '手机号必填', trigger: 'blur' },
        { pattern: /^[0-9]{11,11}$/, message: '请输入11位手机号码', trigger: 'blur' }
      ],
      code: [
        { required: true, message: '验证码必填', trigger: 'blur' },
        { pattern: /^[0-9]{6,6}$/, message: '验证码必须是6位数字', trigger: 'blur' }
      ]
    }
    return {
      Phone,
      rules
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.verify-btn {
  margin-left: 8px;
}
</style>
