<template>
  <div class="userview">
    <bread-crumb />
    <div class="user-search">
      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="ID：" prop="name" class="form-label">
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名：" prop="name">
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="真实姓名：" prop="realname">
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号：" prop="phone">
              <el-input clearable />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态：" prop="state">
              <el-select v-model="value" clearable placeholder="Select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间：" prop="createTime">
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BreadCrumb from '@/components/breadcrumb/BreadCrumb.vue'

export default defineComponent({
  name: 'UserView',
  components: {
    BreadCrumb
  },
  setup() {
    const value = ref('')
    const value1 = ref('')
    const options = [
      {
        value: 'Option1',
        label: 'Option1'
      },
      {
        value: 'Option2',
        label: 'Option2'
      },
      {
        value: 'Option3',
        label: 'Option3'
      },
      {
        value: 'Option4',
        label: 'Option4'
      },
      {
        value: 'Option5',
        label: 'Option5'
      }
    ]
    return { value, options, value1 }
  }
})
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.user-search {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 4px;
}

.form-label .el-form-item__label {
  width: 120px;
}

.el-form-item__content {
  width: calc(100%-120px);
}
</style>
