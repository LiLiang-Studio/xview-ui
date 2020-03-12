<template>
  <div style="padding-bottom:100px;">
    <div class="page-title">Progress 进度条</div>
    <p>展示操作或任务的当前进度，比如上传文件。</p>

    <div class="page-sub-title">基本用法</div>
    <p>处在不同状态下的进度条，当 percent 为 100 时，自动将状态置为 success。</p><br>
    <Progress :percent="25"></Progress>
    <Progress :percent="45" status="active"></Progress>
    <Progress :percent="65" status="wrong"></Progress>
    <Progress :percent="100"></Progress>
    <Progress :percent="25" hide-info></Progress>

    <div class="page-sub-title">百分比内显</div>
    <p>设置属性 text-inside 可以将百分比显示在进度条内部。需要通过属性 stroke-width 设置一个足够的高度。</p><br>
    <Progress :percent="25" :stroke-width="20" text-inside />
    <Progress :percent="45" :stroke-width="20" status="active" text-inside />
    <Progress :percent="65" :stroke-width="20" status="wrong" text-inside />
    <Progress :percent="100" :stroke-width="20" text-inside />

    <div class="page-sub-title">垂直方向</div>
    <p>设置属性 vertical 将以垂直方向显示。</p><br>
    <div style="height: 100px;">
      <Progress vertical :percent="25"></Progress>
      <Progress vertical :percent="45" status="active"></Progress>
      <Progress vertical :percent="65" status="wrong"></Progress>
      <Progress vertical :percent="100"></Progress>
      <Progress vertical :percent="25" hide-info></Progress>
    </div>

    <div class="page-sub-title">配合外部组件使用</div>
    <p>通过数据的联动和逻辑控制，实现动态效果。</p><br>
    <Progress :percent="percent"></Progress>
    <ButtonGroup size="large">
      <Button icon="ios-plus-empty" @click="add"></Button>
      <Button icon="ios-minus-empty" @click="minus"></Button>
    </ButtonGroup>

    <div class="page-sub-title">自定义更多样式</div>
    <p>通过自定义slot和属性stroke-width改变进度条效果。</p><br>
    <Progress :percent="25" :stroke-width="5"></Progress>
    <Progress :percent="100">
      <Icon type="checkmark-circled"></Icon>
      <span>成功</span>
    </Progress>

    <div class="page-sub-title">颜色</div>
    <p>通过属性 stroke-color 设置进度条颜色。</p><br>
    <Progress :percent="90" stroke-color="blue" />

    <div class="page-sub-title">渐变色</div>
    <p>设置属性 stroke-color 为数组时，可以显示为渐变色。数组只能设置为两项。</p><br>
    <Progress :percent="90" :stroke-color="['#108ee9', '#87d068']" />

    <div class="page-sub-title">分段进度条</div>
    <p>标准的进度条。</p><br>
    <Progress :percent="60" :success-percent="30" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      percent: 0
    }
  },
  methods: {
    add() {
      if (this.percent >= 100) {
        return false;
      }
      this.percent += 10;
    },
    minus() {
      if (this.percent <= 0) {
        return false;
      }
      this.percent -= 10;
    }
  }
}
</script>
