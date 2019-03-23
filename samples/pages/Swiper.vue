<template>
  <div>
    <div class="page-title">Swiper 走马灯</div>
    <div class="page-sub-title">常用于一组图片或卡片轮播，当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。</div>

    <div class="page-sub-title">最基本的用法。</div>
    <Swiper v-model="value1" loop>
      <SwiperItem>
        <div class="demo-carousel">1</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">2</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">3</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">4</div>
      </SwiperItem>
    </Swiper>

    <div class="page-sub-title">设置属性 autoplay 可以自动轮播，同时可以设置属性 autoplay-speed 改变自动播放的速度。</div>
    <Swiper autoplay v-model="value2" loop radiusDot>
      <SwiperItem>
        <div class="demo-carousel">1</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">2</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">3</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">4</div>
      </SwiperItem>
    </Swiper>

    <div class="page-sub-title">动态调整各配置</div>
    <Checkbox v-model="setting.autoplay">自动切换</Checkbox>
    <Checkbox v-model="setting.radiusDot">圆形指示器</Checkbox>
    <br><br>
    <Swiper
      loop
      v-model="value3"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
    >
      <SwiperItem>
        <div class="demo-carousel">1</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">2</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">3</div>
      </SwiperItem>
      <SwiperItem>
        <div class="demo-carousel">4</div>
      </SwiperItem>
    </Swiper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 3,
      value2: 0,
      value3: 0,
      setting: {
        autoplay: false,
        autoplaySpeed: 2000,
        dots: "inside",
        radiusDot: false,
        trigger: "click",
        arrow: "hover"
      }
    };
  }
};
</script>
<style lang="less" scoped>
.demo-carousel {
  height: 200px;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  background: #506b9e;
}
</style>