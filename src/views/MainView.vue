<template>
  <div class="home">
    <div class="common-layout">
      <el-container class="layout-con">
        <el-header class="layout-header">
          <nav-header></nav-header>
        </el-header>
        <el-container>
          <el-aside class="layout-aside">
            <nav-menu></nav-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import NavHeader from '@/components/nav-header/NavHeader.vue'
import NavMenu from '@/components/nav-menu/NavMenu.vue'

export default defineComponent({
  name: 'MainView',
  components: {
    NavHeader,
    NavMenu
  },
  setup() {
    const goBack = () => {
      console.log('go back')
    }
    return {
      goBack
    }
  }
})
</script>

<style scoped lang="less">
.home {
  height: 100%;
  background: #f0f2f5;
}

.common-layout {
  height: 100%;
}

.layout-con {
  height: 100%;
}

.layout-header {
  background: #001529;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  color: #fff;
}

.layout-aside {
  width: auto;
  background: #fff;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
