<template>
  <div>
    <div class="page-title">Spin 加载中</div>
    <p>当区块正在获取数据中时可使用，适当的等待动画可以提升用户体验。</p>

    <div class="page-sub-title">最简单使用 Spin 的方法。</div>
    <Spin></Spin>

    <div class="page-sub-title">通过设置size属性为large和small将 Spin 设置为大和小尺寸，不设置为默认（中）尺寸。</div>
    <Row>
      <Col span="8">
        <Spin size="small"></Spin>
      </Col>
      <Col span="8">
        <Spin></Spin>
      </Col>
      <Col span="8">
        <Spin size="large"></Spin>
      </Col>
    </Row>

    <div class="page-sub-title">在容器内部垂直居中固定，需要父级有relative或absolute。</div>
    <div class="demo-spin-container">
      <Spin fix></Spin>
    </div>

    <div class="page-sub-title">自定义 Spin 的内容，可以是简单的文字，也可以是很复杂的动画。</div>
    <Row>
      <Col class="demo-spin-col" span="8">
        <Spin fix>加载中...</Spin>
      </Col>
      <Col class="demo-spin-col" span="8">
        <Spin fix>
          <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </Col>
      <Col class="demo-spin-col" span="8">
        <Spin fix>
          <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
              <circle
                class="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke-width="5"
                stroke-miterlimit="10"
              ></circle>
            </svg>
          </div>
        </Spin>
      </Col>
    </Row>

    <div class="page-sub-title">控制 Spin 组件的显示和消失。</div>
    <div class="demo-spin-article">
      <h3>登金陵凤凰台</h3>
      <address>李白</address>
      <article>
        <p>凤凰台上凤凰游，凤去台空江自流。</p>
        <p>吴宫花草埋幽径，晋代衣冠成古丘。</p>
        <p>三山半落青天外，二水中分白鹭洲。</p>
        <p>总为浮云能蔽日，长安不见使人愁。</p>
      </article>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <br>切换显示状态：
    <i-switch @on-change="spinShow = !spinShow"></i-switch>

    <div class="page-sub-title">使用内置的 $Spin 方法可以全局加载。可以使用 Render 函数自定义显示内容</div>
    <div>
      <Button type="primary" @click="handleSpinShow">整页显示，3秒后关闭</Button>
      <Button type="primary" style="margin-left: 10px;" @click="handleSpinCustom">自定义显示内容</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      spinShow: true
    };
  },
  methods: {
    handleSpinShow() {
      this.$Spin.show();
      setTimeout(() => {
        this.$Spin.hide();
      }, 3000);
    },
    handleSpinCustom() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "load-c",
                size: 18
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      setTimeout(() => {
        this.$Spin.hide();
      }, 3000);
    }
  }
};
</script>
<style lang="less" scoped>
.demo-spin-container {
  display: inline-block;
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
svg:not(:root) {
  overflow: hidden;
}
.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
  stroke-linecap: round;
}
.loader {
  width: 30px;
  height: 30px;
  position: relative;
  margin: 0 auto;
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }

  to {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
@keyframes color {
  0%,
  to {
    stroke: #d62d20;
  }

  40% {
    stroke: #0057e7;
  }

  66% {
    stroke: #008744;
  }

  80%,
  90% {
    stroke: #ffa700;
  }
}
@keyframes rotate {
  to {
    transform: rotate(1turn);
  }
}
.demo-spin-article {
  width: 400px;
  height: 200px;
  padding: 10px;
  text-align: center;
  position: relative;
  border: 1px solid #eee;
}
</style>
<style lang="less">
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>