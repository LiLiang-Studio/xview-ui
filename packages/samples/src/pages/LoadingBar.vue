<template>
  <div>
    <div class="page-title">LoadingBar 加载进度条</div>
    <p>全局创建一个显示页面加载、异步请求、文件上传等的加载进度条。</p>
    <br>
    <p>
      LoadingBar 只会在全局创建一个，因此在任何位置调用的方法都会控制这同一个组件。
      主要使用场景是路由切换和Ajax，因为这两者都不能拿到精确的进度，LoadingBar 会模拟进度，
      当然也可以通过update()方法来传入一个精确的进度，比如在文件上传时会很有用，具体见API。
    </p>

    <div class="page-sub-title">基本用法</div>
    <p>点击 Start 开始进度，点击 Finish 结束。在调用start()方法后，组件会自动模拟进度，当调用finish()或error()时，补全进度并自动消失。</p><br>
    <Button @click="start">开始</Button>
    <Button style="margin-left:4px;" @click="finish">完成</Button>
    <Button style="margin-left:4px;" @click="error">错误</Button>
    <Button style="margin-left:4px;" @click="destroy">注销</Button>

  <div class="page-sub-title">通过直接调用以下方法来使用组件：</div>
  <ul class="list">
    <li>this.$Loading.start()</li>
    <li>this.$Loading.finish()</li>
    <li>this.$Loading.error()</li>
    <li>this.$Loading.update(percent)</li>
  </ul>

  <div class="page-sub-title">另外提供了全局配置和全局销毁的方法：</div>
  <ul class="list">
    <li>this.$Loading.config(options)</li>
    <li>this.$Loading.destroy()</li>
  </ul>
  <br><br>
  <p>如果要在路由中使用，请用Vue.LoadingBar 代替 this.$Loading，API完全一致</p>
  </div>
</template>
<script>
export default {
  methods: {
    start() {
      this.$Loading.start();
    },
    finish() {
      this.$Loading.finish();
    },
    error() {
      this.$Loading.error();
    },
    destroy() {
      this.$Loading.destroy()
    }
  }
}
</script>
<style lang="less" scoped>
.list {
  padding-left: 30px;
  line-height: 2;
  font-size: 14px;
}
</style>