<template>
  <div class="loginaccount">
    <!-- 将定义的验证方式绑定到el-form上 -->
    <el-form :rules="rules" :model="account" ref="formRef">
      <!-- prop对应的是rules里面的验证方式验证的是账户 -->
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" clearable></el-input>
      </el-form-item>

      <!-- prop对应的是rules里面的验证方式验证的是密码 -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

// 此处导入ElForm不是为了使用el-form这个组件，而是为了在下面通过泛型拿到ElForm它的类型赋值给formRef这个ref对象
import { ElForm } from 'element-plus'

export default defineComponent({
  name: 'LoginAccount',
  components: {},
  setup() {
    // 定义account对象用于保存用户输入的账户及密码信息
    const account = reactive({
      name: '',
      password: ''
    })

    //定义验证账户及密码的验证方式
    const rules = {
      // 定义对账户的验证方式，数组表示定义多个验证规则对象，对账户进行验证
      name: [
        { required: true, message: '用户名必填', trigger: 'blur' },
        { pattern: /^[a-z0-9]{5,10}$/, message: '用户名必须是5-10个字母或者数字', trigger: 'blur' }
      ],

      // 定义对密码的验证方式，数组表示定义多个验证规则对象，对密码进行验证
      password: [
        { required: true, message: '密码必填', trigger: 'blur' },
        { pattern: /^[a-z0-9]{3,}$/, message: '密码必须是3个以上字母或数字', trigger: 'blur' }
      ]
    }

    // 通过ref拿到ElForm对象，并且通过<InstanceType<typeof ElForm>>这个泛型拿到一个ElForm的Ref对象类型，意思就是指定当前的formRef对象为ElForm类型
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 给当前LoginAccount组件定义一个LoginAccountAction方法，并return出去
    const LoginAccountAction = () => {
      // 通过formRef这个对象获取上面el-form里面保存的账户和密码，并通过validate这个方法对账户和密码进行验证，validate这个方法里有一个回调函数，当验证通过时，回调函数中的isValid为true，当验证失败时isValid为false
      formRef.value?.validate((isValid) => {
        console.log(isValid)
        if (isValid) {
          console.log('正在执行真正的登录操作...')
        } else {
          console.log('账号或密码有误，请检查之后重新登录...')
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      LoginAccountAction
    }
  }
})
</script>

<style scoped></style>
