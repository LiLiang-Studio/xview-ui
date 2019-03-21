<template>
  <div id="app">
    <SidebarNav/>
    <div class="app-content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import SidebarNav from './components/SidebarNav'
export default {
  components: { SidebarNav }
}
</script>
<style lang="less">
#app {
  padding: 30px 0;
  padding-left: 256px;
}
.page-title {
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
}

.page-sub-title {
  margin: 24px 0;
  font-size: 18px;
  font-weight: bold;
}

.com-sidebar-nav {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 256px;
  min-width: 256px;
  background-color: #fff;
  border-right: 1px solid #f2f2f2;
  overflow: auto;
}

.app-content-wrapper {
  padding: 0 16px;
}
</style>