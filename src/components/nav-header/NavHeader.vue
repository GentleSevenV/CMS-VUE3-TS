<template>
  <div class="navheader">
    <div class="logo">
      <img src="@/assets/images/element-plus-logo.svg" />
    </div>
    <user-info />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserInfo from './cpn/UserInfo.vue'

export default defineComponent({
  name: 'NavHeader',
  components: { UserInfo },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.navheader {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  height: 60px;

  .logo > img {
    height: 32px;
  }
}
</style>
