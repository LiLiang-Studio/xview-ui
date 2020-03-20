<template>
  <div>
    <div class="page-title">Page 分页</div>
    <p>当数据量较多时，使用分页可以快速进行数据切换。</p>

    <div class="page-sub-title">基本</div>
    <p>基本的分页，页数过多时会自动折叠。</p><br>
    <Page :total="105"></Page>

    <div class="page-sub-title">每页数量</div>
    <p>可以切换每页显示的数量。</p><br>
    <Page :total="100" show-sizer></Page>
    
    <div class="page-sub-title">电梯</div>
    <p>快速跳转到某一页</p><br>
    <Page :total="100" show-elevator></Page>
    
    <div class="page-sub-title">总数</div>
    <p>显示总共多少条数据，接受 slot 来自定义内容，默认显示共{ total }条</p><br>
    <Page :total="100" show-total></Page>
    
    <div class="page-sub-title">迷你型</div>
    <p>设置size为small使用迷你型，迷你型拥有普通的所有功能。</p><br>
    <Page style="margin-bottom:15px;" :total="40" size="small"></Page>
    <Page style="margin-bottom:15px;" :total="40" size="small" show-elevator show-sizer></Page>
    <Page :total="40" size="small" show-total></Page>
    
    <div class="page-sub-title">简洁</div>
    <p>设置simple属性即可使用简洁版的分页，通过输入页码回车切换，或使用鼠标点击切换页码，或使用键盘的上下键来切换。
      简洁分页不能使用总数、电梯和切换数量。</p><br>
    <Page :current="2" :total="50" simple></Page>

    <div class="page-sub-title">上一页和下一页</div>
    <p>使用属性 prev-text 和 next-text，替代图标显示为文字。</p><br>
    <Page :total="100" prev-text="Previous" next-text="Next" />
    
    <div style="padding-top:200px;"></div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less">

</style>