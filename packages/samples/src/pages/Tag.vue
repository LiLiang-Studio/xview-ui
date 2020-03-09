<template>
  <div style="padding-bottom:100px;">
    <div class="page-title">Tag 标签</div>
    <p>对不同维度进行简单的标记和分类</p>

    <div class="page-sub-title">基本用法</div>
    <p>简单的展示，添加属性closable可以关闭标签。点击关闭标签时，会触发 on-close 事件，需自己实现关闭逻辑。</p>
    <Tag>标签一</Tag>
    <Tag>标签二</Tag>
    <Tag v-if="show" closable :fade="false" @on-close="handleClose">标签三</Tag>

    <div class="page-sub-title">样式类型</div>
    <p>通过设置 type 属性为 border 或 dot 来选择不同的样式类型。建议有关闭的某些场景下使用 border，图例的场景下使用 dot。</p>
    <Tag type="border">标签三</Tag>
    <Tag type="border" closable>标签四</Tag>
    <Tag type="dot">标签一</Tag>
    <Tag type="dot" closable>标签二</Tag>

    <div class="page-sub-title">各种颜色</div>
    <p>多种预设颜色，可自定义颜色</p>
    <Tag color="default">default</Tag>
    <Tag color="primary">primary</Tag>
    <Tag color="success">success</Tag>
    <Tag color="error">error</Tag>
    <Tag color="warning">warning</Tag>
    <Tag color="red">red</Tag>
    <Tag color="orange">orange</Tag>
    <Tag color="green">green</Tag>
    <Tag color="blue">blue</Tag>
    <Tag color="#FFA2D3" checkable>Custom Color</Tag>
    <br />
    <br />
    <Tag type="border" closable color="primary">标签一</Tag>
    <Tag type="border" closable color="success">标签二</Tag>
    <Tag type="border" closable color="error">标签三</Tag>
    <Tag type="border" closable color="warning">标签四</Tag>
    <br />
    <br />
    <Tag type="dot" closable color="primary">标签一</Tag>
    <Tag type="dot" closable color="success">标签二</Tag>
    <Tag type="dot" closable color="error">标签三</Tag>
    <Tag type="dot" closable color="warning">标签四</Tag>

    <div class="page-sub-title">可选择</div>
    <p>设置属性 checkable，可以对标签进行选择，属性 checked 控制当前选择状态</p>
    <Tag checkable color="primary">标签一</Tag>
    <Tag checkable color="success">标签二</Tag>
    <Tag checkable color="error">标签三</Tag>
    <Tag checkable color="warning">标签四</Tag>
    <Tag checkable color="blue">blue</Tag>
    <Tag checkable color="default">default</Tag>

    <div class="page-sub-title">动态添加和删除</div>
    <p>用数组生成一组标签，可以动态添加和删除。</p>
    <Tag
      v-for="item in count"
      :key="item"
      :name="item"
      closable
      @on-close="handleClose2"
    >标签{{ item + 1 }}</Tag>
    <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>

    <div class="page-sub-title">尺寸</div>
    <p>设置属性 size 可以显示不同尺寸的标签。</p>
    <Tag>Default Tag</Tag>
    <Tag size="medium">Medium Tag</Tag>
    <Tag size="large">Large Tag</Tag>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      count: [0, 1, 2]
    };
  },
  methods: {
    handleClose() {
      this.show = false;
    },
    handleAdd() {
      if (this.count.length) {
        this.count.push(this.count[this.count.length - 1] + 1);
      } else {
        this.count.push(0);
      }
    },
    handleClose2(event, name) {
      const index = this.count.indexOf(name);
      this.count.splice(index, 1);
    }
  }
};
</script>