<template>
  <div class="navmenu">
    <el-menu default-active="2" class="el-menu-vertical" :collapse="isCollapse">
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <template v-if="item.icon">
                <el-icon><component :is="item.icon.slice(8)" /></el-icon>
              </template>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="navMenuClick(subitem)">
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>

    <div class="switch-menu">
      <el-icon
        class="switchBtn"
        @click="switchMenu"
        v-model="isCollapse"
        v-if="isCollapse == false"
      >
        <Fold />
      </el-icon>
      <el-icon class="switchBtn" @click="switchMenu" v-model="isCollapse" v-else>
        <Expand />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NavMenu',
  components: {},
  setup() {
    const store = useStore()
    const router = useRouter()
    const isCollapse = ref(false)
    const userMenus = computed(() => {
      return store.state.login.userMenus
    })
    const switchMenu = () => {
      isCollapse.value = !isCollapse.value
    }

    const navMenuClick = (item: any) => {
      console.log(item.url)
      router.push({
        path: item.url
      })
    }
    return { userMenus, isCollapse, switchMenu, navMenuClick }
  }
})
</script>

<style scoped lang="less">
.navmenu {
  height: 100%;

  .el-menu {
    height: calc(100% - 40px);
  }
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary-light-8);
  border-right: 3px solid #1890ff;
}

.switch-menu {
  height: 40px;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-right: solid 1px var(--el-menu-border-color);
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  font-size: 18px;
  padding-left: 24px;
  color: #999;

  .switchBtn {
    cursor: pointer;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
