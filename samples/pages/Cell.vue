<template>
  <div>
    <div class="page-title">Cell 单元格</div>
    <p>用于固定的菜单列表。</p>
    <div style="padding: 10px;background: #f8f8f9">
      <Card title="Options" icon="navicon" :padding="0" shadow style="width: 300px;">
        <CellGroup>
          <Cell title="只显示标题"/>
          <Cell title="显示 label 内容" label="label 的内容"/>
          <Cell title="显示右侧内容" extra="详细信息" />
          <Cell title="链接" extra="详细信息" to="Alert" />
          <Cell title="新窗口打开链接" to="/#/samples/Button" target="_blank" />
          <Cell title="禁用" disabled />
          <Cell title="选中" selected />
          <Cell title="显示徽标" to="Badge">
            <Badge :count="10" slot="extra" />
          </Cell>
          <Cell title="开关">
            <ISwitch v-model="switchValue" slot="extra" />
          </Cell>
        </CellGroup>
      </Card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      switchValue: true
    };
  }
};
</script>