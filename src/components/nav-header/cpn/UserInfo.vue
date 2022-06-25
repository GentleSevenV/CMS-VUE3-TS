<template>
  <div class="userinfo">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          :size="30"
          class="userAvatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        {{ userName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-icon><User /></el-icon>
            个人中心
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon><Setting /></el-icon>
            个人设置
          </el-dropdown-item>
          <el-dropdown-item divided>
            <el-icon><SwitchButton /></el-icon>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'UserInfo',
  components: {},
  setup() {
    const store = useStore()
    const userName = computed(() => {
      return store.state.login.userInfo.name
    })
    return { userName }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-white);
  display: flex;
  align-items: center;
  .userAvatar {
    margin-right: 6px;
  }
}

.el-dropdown-menu__item:not(.is-disabled):focus {
  background-color: var(--el-dropdown-menuItem-hover-fill);
  color: var(--el-dropdown-menuItem-hover-color);
}
</style>
