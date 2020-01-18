<template>
  <div>
    <div class="page-title">Affix 图钉</div>
    <p>使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。</p>

    <div style="padding: 150px;"></div>
    <div class="page-sub-title">简单使用，当元素不可见时，直接固定在最顶端。</div>
    <Affix>
      <span class="demo-affix">固定在最顶部</span>
    </Affix>

    <div class="page-sub-title">当滚动到一定距离时再固定。</div>
    <Affix :offset-top="50">
      <span class="demo-affix">固定在距离顶部 50px 的位置</span>
    </Affix>

    <div class="page-sub-title">
      在屏幕下方固定，可以通过缩小浏览器窗口高度来查看效果。
      注意，offset-top和offset-bottom只可以设置一个，如果都设置，会使用offset-top。
    </div>
    <Affix :offset-bottom="20">
      <span class="demo-affix">固定在距离底部 20px 的位置</span>
    </Affix>

    <div class="page-sub-title">当固定状态发生改变时，会触发on-change事件</div>
    <Affix :offset-top="100" @on-change="change">
      <span class="demo-affix">固定在距离顶部 100px 的位置</span>
    </Affix>

    <div style="padding: 320px;"></div>
  </div>
</template>
<script>
export default {
  methods: {
    change(status) {
      this.$Message.info(`Status: ${status}`);
    }
  }
};
</script>
<style lang="less" scoped>
.demo-affix {
  display: inline-block;
  color: #fff;
  padding: 10px 30px;
  text-align: center;
  background: rgba(0, 153, 229, 0.9);
}
</style>