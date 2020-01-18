<template>
  <div>
    <div class="page-title">BackTop 返回顶部</div>
    <p>当页面内容冗长，需要快捷返回顶部时使用，一般放置在页面右下角位置。</p>
    <div class="page-sub-title">默认位置距离页面右部和底部 30px，滚动至距顶端 400px 时显示。</div>
    <div class="page-sub-title">自定义了位置在页面底部 200px,滚动至距顶端 200px 时显示。</div>
    <div style="margin-top:2000px;"></div>
    <BackTop></BackTop>
    <BackTop :height="100" :bottom="200">
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>
<style scoped>
.top {
  padding: 10px;
  background: rgba(0, 153, 229, 0.7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>