<template>
  <div class="breadcrumb">
    <el-breadcrumb>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BreadCrumb',
  components: {}
})
</script>

<style scoped>
.breadcrumb {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}
</style>
