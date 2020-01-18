<template>
  <div>
    <div class="page-title">Badge 徽标数</div>
    <p>主要用于通知未读数的角标，提醒用户点击。</p>
    <div class="page-sub-title">最简单的使用方法。</div>
    <Badge :count="3">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <br />
    <div class="page-sub-title">强迫症患者慎用！</div>
    <Badge dot>
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge dot>
      <Icon type="ios-albums" size="26"></Icon>
    </Badge>
    <Badge dot>
      <a href="#">可以是一个链接</a>
    </Badge>
    <br />
    <div class="page-sub-title">通过设置overflow-count属性设置一个封顶值，当超过时，会显示${overflowCount}+</div>
    <Badge :count="100">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge :count="1000" overflow-count="999">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <br />
    <div class="page-sub-title">可以没有 slot 独立展示。</div>
    <Badge :count="10"></Badge>
    <Badge :count="20" class-name="demo-badge-alone"></Badge>
    <div class="page-sub-title">设置 text 属性，可以自定义显示内容</div>
    <Row>
      <Col span="6">
        <Badge text="new">
          <a href="#" class="demo-badge"></a>
        </Badge>
      </Col>
      <Col span="6">
        <Badge text="hot">
          <a href="#" class="demo-badge"></a>
        </Badge>
      </Col>
    </Row>

    <div class="page-sub-title">使用 type 属性，可以设置不同的颜色。</div>
    <Badge :count="5" type="primary">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge :count="5" type="success">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge :count="5" type="normal">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge :count="5" type="info">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge :count="5" type="error">
      <a href="#" class="demo-badge"></a>
    </Badge>
    <Badge :count="5" type="warning">
      <a href="#" class="demo-badge"></a>
    </Badge>

    <div class="page-sub-title">设置偏移。</div>
    <Badge :count="5" type="error" :offset="[-5, 5]">
      <a href="#" class="demo-badge"></a>
    </Badge>
  </div>
</template>
<style scoped>
.demo-badge {
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
}
</style>
<style lang="less">
.demo-badge-alone {
  background: #5cb85c !important;
}
</style>