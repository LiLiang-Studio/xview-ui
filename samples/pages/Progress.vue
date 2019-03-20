<template>
  <div>
    <div class="page-title">Progress 进度条</div>

    <div class="page-sub-title">处在不同状态下的进度条，当 percent 为 100 时，自动将状态置为 success。</div>
    <Progress :percent="25"></Progress>
    <Progress :percent="45" status="active"></Progress>
    <Progress :percent="65" status="wrong"></Progress>
    <Progress :percent="100"></Progress>
    <Progress :percent="25" hide-info></Progress>

    <div class="page-sub-title">设置属性 vertical 将以垂直方向显示。</div>
    <div style="height: 100px;">
      <Progress vertical :percent="25"></Progress>
      <Progress vertical :percent="45" status="active"></Progress>
      <Progress vertical :percent="65" status="wrong"></Progress>
      <Progress vertical :percent="100"></Progress>
      <Progress vertical :percent="25" hide-info></Progress>
    </div>

    <div class="page-sub-title">配合外部组件使用</div>
    <Progress :percent="percent"></Progress>
    <ButtonGroup size="large">
      <Button icon="ios-plus-empty" @click="add"></Button>
      <Button icon="ios-minus-empty" @click="minus"></Button>
    </ButtonGroup>

    <div class="page-sub-title">通过自定义slot和属性stroke-width改变进度条效果</div>
    <Progress :percent="25" :stroke-width="5"></Progress>
    <Progress :percent="100">
      <Icon type="checkmark-circled"></Icon>
      <span>成功</span>
    </Progress>
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
