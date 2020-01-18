<template>
  <div>
    <div class="page-title">ICircle 进度环</div>
    <p>图表类组件。一般有两种用途：显示某项任务进度的百分比；统计某些指标的占比。</p>

    <div class="page-sub-title">基础用法</div>
    <ICircle :percent="80">
      <span class="demo-Circle-inner" style="font-size:24px">80%</span>
    </ICircle>
    <ICircle style="margin-left:10px;" :percent="100" stroke-color="#5cb85c">
      <Icon type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
    </ICircle>
    <ICircle style="margin-left:10px;" :percent="35" stroke-color="#ff5500">
      <span class="demo-Circle-inner">
        <Icon type="ios-close-empty" size="50" style="color:#ff5500"></Icon>
      </span>
    </ICircle>

    <div class="page-sub-title">通过数据的联动和逻辑控制，实现交互效果。</div>
    <ICircle :percent="percent" :stroke-color="color">
      <Icon v-if="percent == 100" type="ios-checkmark-empty" size="60" style="color:#5cb85c"></Icon>
      <span v-else style="font-size:24px">{{ percent }}%</span>
    </ICircle>
    <ButtonGroup size="large">
      <Button icon="ios-plus-empty" @click="add"></Button>
      <Button icon="ios-minus-empty" @click="minus"></Button>
    </ButtonGroup>

    <div class="page-sub-title">通过自定义slot和丰富的配置，可以组合出很多统计效果。</div>
    <ICircle
      :size="250"
      :trail-width="4"
      :stroke-width="5"
      :percent="75"
      stroke-linecap="square"
      stroke-color="#43a3fb"
    >
      <div class="demo-Circle-custom">
        <h1>42,001,776</h1>
        <p>消费人群规模</p>
        <span>
          总占人数
          <i>75%</i>
        </span>
      </div>
    </ICircle>
    <div class="page-sub-title">通过设置属性 dashboard，可以很方便地实现仪表盘样式的进度环。</div>
    <ICircle :percent="80" dashboard>
        <span class="demo-circle-inner" style="font-size:24px">80%</span>
    </ICircle>
  </div>
</template>
<script>
export default {
  data() {
    return {
      percent: 0
    };
  },
  computed: {
    color() {
      let color = "#2db7f5";
      if (this.percent == 100) {
        color = "#5cb85c";
      }
      return color;
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
};
</script>
<style lang="less" scoped>
.demo-Circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 28px;
    font-weight: normal;
  }
  & p {
    color: #657180;
    font-size: 14px;
    margin: 10px 0 15px;
  }
  & span {
    display: block;
    padding-top: 15px;
    color: #657180;
    font-size: 14px;
    &:before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: -15px;
    }
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
}
</style>