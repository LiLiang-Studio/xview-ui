<template>
  <div>
    <div class="page-title">Divider 分割线</div>
    <p>
      区隔内容的分割线。
      对不同章节的文本段落进行分割。
      对行内文字/链接进行分割，例如表格的操作列。
    </p>
    <div class="page-sub-title">水平分割线</div>
    <p>默认为水平分割线，可在中间加入文字。</p>
    <p>
      Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman,
      chief executive officer, and a co-founder of Apple Inc.
    </p>
    <Divider />
    <p>
      Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman,
      chief executive officer, and a co-founder of Apple Inc.
    </p>
    <Divider>With Text</Divider>
    <p>
      Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman,
      chief executive officer, and a co-founder of Apple Inc.
    </p>
    <Divider dashed />
    <p>
      Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman,
      chief executive officer, and a co-founder of Apple Inc.
    </p>

    <div class="page-sub-title">垂直分割线</div>
    <p>使用 type="vertical" 设置为行内的垂直分割线。</p>Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>

    <div class="page-sub-title">标题位置</div>
    <p>修改分割线标题的位置。</p>
    <Divider orientation="left">Left Text</Divider>
    <p>
      Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman,
      chief executive officer, and a co-founder of Apple Inc.
    </p>
    <Divider orientation="right">Right Text</Divider>
    <p>
      Steven Paul Jobs was an American entrepreneur and business magnate. He was the chairman,
      chief executive officer, and a co-founder of Apple Inc.
    </p>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
</style>