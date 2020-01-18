<template>
  <div>
    <div class="page-title">Dropdown 下拉菜单</div>
    <p>展示一组折叠的下拉菜单。</p>

    <div class="page-sub-title">
      需要配合 DropdownMenu 和 DropdownItem 两个组件来使用，并且给列表设置具名 slot 为 list。
      触发对象可以是链接、按钮等各种元素。本例还展示了禁用项和分隔线。
    </div>
    <Dropdown>
      <a href="javascript:void(0)">
        下拉菜单
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem disabled>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem divided>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown style="margin-left: 20px">
      <Button type="primary">
        下拉菜单
        <Icon type="arrow-down-b"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem disabled>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem divided>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <div class="page-sub-title">
      通过设置属性 trigger 可以更改触发方式，可选项为 click 、 hover(默认) 或 custom(自定义)。
      触发方式设置为 custom 自定义时，需手动设置 visible 属性来控制下拉框的显示。
    </div>
    <Dropdown>
      <a href="javascript:void(0)">
        hover 触发
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown trigger="click" style="margin-left: 20px">
      <a href="javascript:void(0)">
        click 触发
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown trigger="custom" :visible="visible" style="margin-left: 20px">
      <a href="javascript:void(0)" @click="handleOpen">
        custom 触发
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <p style="margin: 5px;">常用于各种自定义下拉内容的场景。</p>
        <div style="text-align: right;margin:10px;">
          <Button type="primary" @click="handleClose">关闭</Button>
        </div>
      </DropdownMenu>
    </Dropdown>

    <div
      class="page-sub-title"
    >通过设置属性 placement 可以更改下拉菜单出现的方向，与 Poptip 和 Tooltip 配置一致，支持 12 个方向，详见 API。</div>
    <Dropdown placement="bottom-start">
      <a href="javascript:void(0)">
        菜单(左)
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown style="margin-left: 20px">
      <a href="javascript:void(0)">
        菜单(居中)
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dropdown style="margin-left: 20px" placement="bottom-end">
      <a href="javascript:void(0)">
        菜单(右)
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <DropdownItem>冰糖葫芦</DropdownItem>
        <DropdownItem>北京烤鸭</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <!-- <div class="page-sub-title">下拉菜单可以进行嵌套实现级联的效果，嵌套时注意设置子集的展开方向</div>
    <Dropdown>
      <a href="javascript:void(0)">
        北京小吃
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem>驴打滚</DropdownItem>
        <DropdownItem>炸酱面</DropdownItem>
        <DropdownItem>豆汁儿</DropdownItem>
        <Dropdown placement="right-start">
          <DropdownItem>
            北京烤鸭
            <Icon type="ios-arrow-right"></Icon>
          </DropdownItem>
          <DropdownMenu slot="list">
            <DropdownItem>挂炉烤鸭</DropdownItem>
            <DropdownItem>焖炉烤鸭</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <DropdownItem>冰糖葫芦</DropdownItem>
      </DropdownMenu>
    </Dropdown> -->

    <div style="padding: 100px;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less">
</style>