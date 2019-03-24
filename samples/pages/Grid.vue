<template>
  <div class="example-demo">
    <div class="page-title">Grid 栅格</div>
    <div class="page-sub-title">
      我们采用了24栅格系统，将区域进行24等分，这样可以轻松应对大部分布局问题。使用栅格系统进行网页布局，可以使页面排版美观、舒适。
      我们定义了两个概念，行row和列col，具体使用方法如下：
    </div>
    <ul class="desc">
      <li>使用row在水平方向创建一行</li>
      <li>将一组col插入在row中</li>
      <li>在每个col中，键入自己的内容</li>
      <li>通过设置col的span参数，指定跨越的范围，其范围是1到24</li>
      <li>每个row中的col总和应该为24</li>
    </ul>
    <Row>
      <Col span="12">col-12</Col>
      <Col span="12">col-12</Col>
    </Row>
    <br>
    <Row>
      <Col span="8">col-8</Col>
      <Col span="8">col-8</Col>
      <Col span="8">col-8</Col>
    </Row>
    <br>
    <Row>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
      <Col span="6">col-6</Col>
    </Row>

    <div class="page-sub-title">通过给 row 添加 gutter 属性，可以给下属的 col 添加间距，推荐使用 (16+8n)px 作为栅格间隔。</div>
    <Row :gutter="16">
      <Col span="6">
        <div>col-6</div>
      </Col>
      <Col span="6">
        <div>col-6</div>
      </Col>
      <Col span="6">
        <div>col-6</div>
      </Col>
      <Col span="6">
        <div>col-6</div>
      </Col>
    </Row>

    <div class="page-sub-title">通过order来改变栅格的顺序。</div>
    <Row type="flex">
      <Col span="6" order="4">1 | order-4</Col>
      <Col span="6" order="3">2 | order-3</Col>
      <Col span="6" order="2">3 | order-2</Col>
      <Col span="6" order="1">4 | order-1</Col>
    </Row>

    <div class="page-sub-title">通过设置push和pull来改变栅格的顺序。</div>
    <Row>
      <Col span="18" push="6">col-18 | push-6</Col>
      <Col span="6" pull="18">col-6 | pull-18</Col>
    </Row>

    <div class="page-sub-title">通过设置offset属性，将列进行左右偏移，偏移栅格数为offset的值。</div>
    <Row>
      <Col span="8">col-8</Col>
      <Col span="8" offset="8">col-8 | offset-8</Col>
    </Row>
    <br>
    <Row>
      <Col span="6" offset="8">col-6 | offset-8</Col>
      <Col span="6" offset="4">col-6 | offset-4</Col>
    </Row>
    <br>
    <Row>
      <Col span="12" offset="8">col-12 | offset-8</Col>
    </Row>

    <div class="page-sub-title">通过给row设置参数justify为不同的值，来定义子元素的排布方式。</div>
    <p>子元素向左排列</p>
    <Row type="flex" justify="start" class="code-row-bg">
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
    </Row>
    <p>子元素向右排列</p>
    <Row type="flex" justify="end" class="code-row-bg">
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
    </Row>
    <p>子元素居中排列</p>
    <Row type="flex" justify="center" class="code-row-bg">
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
    </Row>
    <p>子元素等宽排列</p>
    <Row type="flex" justify="space-between" class="code-row-bg">
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
    </Row>
    <p>子元素分散排列</p>
    <Row type="flex" justify="space-around" class="code-row-bg">
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
      <Col span="4">col-4</Col>
    </Row>

    <div class="page-sub-title">通过给row设置参数align为不同的值，来定义子元素在垂直方向上的排布方式。</div>
    <p>顶部对齐</p>
    <Row type="flex" justify="center" align="top" class="code-row-bg">
      <Col span="4">
        <p style="height: 80px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 30px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 100px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 60px">col-4</p>
      </Col>
    </Row>
    <p>底部对齐</p>
    <Row type="flex" justify="center" align="bottom" class="code-row-bg">
      <Col span="4">
        <p style="height: 80px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 30px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 100px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 60px">col-4</p>
      </Col>
    </Row>
    <p>居中对齐</p>
    <Row type="flex" justify="center" align="middle" class="code-row-bg">
      <Col span="4">
        <p style="height: 80px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 30px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 100px">col-4</p>
      </Col>
      <Col span="4">
        <p style="height: 60px">col-4</p>
      </Col>
    </Row>

    <div class="page-sub-title">参照 Bootstrap 的 响应式设计，预设四个响应尺寸：xs sm md lg，详见 API。调整浏览器尺寸来查看效果</div>
    <Row>
      <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
      <Col :xs="20" :sm="16" :md="12" :lg="8">Col</Col>
      <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
    </Row>

    <div
      class="page-sub-title"
    >span pull push offset order 属性可以通过内嵌到 xs sm md lg 属性中来使用。其中 :xs="6" 相当于 :xs="{ span: 6 }"。</div>
    <Row>
      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
      <Col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
      <Col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
    </Row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.desc {
  padding-left: 30px;
  line-height: 1.8;
}
.example-demo .ui-col,
.example-demo .ui-col div {
  color: #fff;
  padding: 10px 0;
  text-align: center;
  background: rgba(0, 153, 229, 0.9);
}
.example-demo .ui-col:nth-child(odd) div,
.example-demo .ui-col:nth-child(odd) {
  background: rgba(0, 153, 229, 0.7);
}
.example-demo .gutter .ui-col {
  background: transparent !important;
}
.code-row-bg {
  background: rgba(0, 0, 0, 0.05);
}
</style>