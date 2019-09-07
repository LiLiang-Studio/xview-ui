<template>
  <div style="padding-bottom:200px">
    <div class="page-title">Carousel 走马灯</div>
    <p>常用于一组图片或卡片轮播，当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。</p>

    <div class="page-sub-title">基础用法</div>
    <p>
      最基本的用法
      <br />
      <br />
    </p>
    <Carousel v-model="value1" loop>
      <CarouselItem>
        <div class="demo-carousel">1</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">2</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">3</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">4</div>
      </CarouselItem>
    </Carousel>

    <div class="page-sub-title">自动切换</div>
    <p>
      设置属性 autoplay 可以自动轮播，同时可以设置属性 autoplay-speed 改变自动播放的速度
      <br />
      <br />
    </p>
    <Carousel autoplay v-model="value2" loop>
      <CarouselItem>
        <div class="demo-carousel">1</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">2</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">3</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">4</div>
      </CarouselItem>
    </Carousel>

    <div class="page-sub-title">综合设置</div>
    <p>
      动态调整各配置
      <br />
      <br />
    </p>
    <Form :model="setting" :label-width="100">
      <FormItem label="自动切换">
        <ISwitch v-model="setting.autoplay">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </ISwitch>
      </FormItem>
      <FormItem label="圆形指示器">
        <ISwitch v-model="setting.radiusDot">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </ISwitch>
      </FormItem>
      <FormItem label="自动切换速度">
        <Slider v-model="setting.autoplaySpeed" :min="300" :max="10000" :step="100"></Slider>
      </FormItem>
      <FormItem label="指示器位置">
        <RadioGroup v-model="setting.dots" type="button">
          <Radio label="inside">内部</Radio>
          <Radio label="outside">外部</Radio>
          <Radio label="none">不显示</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="切换箭头">
        <RadioGroup v-model="setting.arrow" type="button">
          <Radio label="hover">悬停时显示</Radio>
          <Radio label="always">总是显示</Radio>
          <Radio label="never">不显示</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="指示器触发方式">
        <RadioGroup v-model="setting.trigger" type="button">
          <Radio label="click">单击</Radio>
          <Radio label="hover">悬停</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <Carousel
      v-model="value3"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
      loop
    >
      <CarouselItem>
        <div class="demo-carousel">1</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">2</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">3</div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">4</div>
      </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 0,
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