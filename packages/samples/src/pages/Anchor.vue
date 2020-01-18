<template>
  <div style="padding-bottom:600px">
    <div class="page-title">Anchor 锚点</div>
    <p>用于跳转到页面指定位置。</p><br>

    <div id="basic_usage">
      <div class="page-sub-title">基础用法</div>
      <p>最简单的用法。</p><br>
      <Anchor show-ink>
          <AnchorLink href="#basic_usage" title="基础用法" />
          <AnchorLink href="#static_position" title="静态位置" />
          <AnchorLink href="#API" title="API">
              <AnchorLink href="#Anchor_props" title="Anchor props" />
              <AnchorLink href="#Anchor_events" title="Anchor events" />
              <AnchorLink href="#AnchorLink_props" title="AnchorLink props" />
          </AnchorLink>
      </Anchor>
    </div>

    <div id="static_position">
      <div class="page-sub-title">静态位置</div>
      <p>不浮动，状态不随页面滚动变化。</p><br>
      <Anchor :affix="false" show-ink>
          <AnchorLink href="#basic_usage" title="基础用法" />
          <AnchorLink href="#static_position" title="静态位置" />
          <AnchorLink href="#API" title="API">
              <AnchorLink href="#Anchor_props" title="Anchor props" />
              <AnchorLink href="#Anchor_events" title="Anchor events" />
              <AnchorLink href="#AnchorLink_props" title="AnchorLink props" />
          </AnchorLink>
      </Anchor>
    </div>

    <div class="page-sub-title" id="Anchor_props" style="padding-bottom:200px;">Anchor props （演示用）</div>
    <div class="page-sub-title" id="Anchor_events" style="padding-bottom:200px;">Anchor events （演示用）</div>
    <div class="page-sub-title" id="AnchorLink_props">AnchorLink props （演示用）</div>
  </div>
</template>