<template>
  <div id="app" :class="{hasNav}">
    <SidebarNav v-if="hasNav"/>
    <div class="app-content-wrapper">
      <router-view></router-view>
    </div>
    <back-top/>
  </div>
</template>
<script>
import SidebarNav from "./components/SidebarNav.vue";
export default {
  components: { SidebarNav },
  computed: {
    hasNav() {
      return !this.$route.meta.noNav
    }
  }
};
</script>
<style lang="less">
#app {
  &.hasNav {
    padding: 30px 0;
    padding-left: 135px;
  }
}
a {
  -webkit-tap-highlight-color: transparent;
}
p {
  font-size: 14px;
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
  width: 135px;
  background-color: #fff;
  border-right: 1px solid #f2f2f2;
  overflow: auto;
}

.app-content-wrapper {
  padding: 0 16px 200px;
}
</style>