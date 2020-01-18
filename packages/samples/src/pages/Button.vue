<template>
  <div>
    <div class="page-title">Button 按钮</div>
    <p>
      按钮类型有：默认按钮、主按钮、虚线按钮、文字按钮以及四种颜色按钮。
      通过设置type为primary、dashed、text、info、success、warning、error创建不同样式的按钮，不设置为默认样式。
    </p>
    <div class="page-sub-title">按钮类型</div>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <br />
    <br />
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>

    <div class="page-sub-title">幽灵按钮</div>
    <p>幽灵按钮将其他按钮的内容反色，背景变为透明，常用在有色背景上。</p>
    <div style="padding:20px;background: rgb(190, 200, 200);">
      <Button type="default" ghost>Default</Button>
      <Button type="primary" ghost>Primary</Button>
      <Button type="dashed" ghost>Dashed</Button>
      <Button type="text" ghost>Text</Button>
      <Button type="info" ghost>Info</Button>
      <Button type="success" ghost>Success</Button>
      <Button type="warning" ghost>Warning</Button>
      <Button type="error" ghost>Error</Button>
    </div>

    <div class="page-sub-title">图标按钮及按钮形状</div>
    <p>
      通过设置icon属性在Button内嵌入一个Icon，或者直接在Button内使用Icon组件。
      使用Button的icon属性，图标位置将在最左边，如果需要自定义位置，需使用Icon组件。
      通过设置shape属性为circle，可将按钮置为圆的形状。
    </p>
    <Button type="primary" shape="circle" icon="ios-search"></Button>
    <Button type="primary" icon="ios-search">Search</Button>
    <Button type="primary" shape="circle" icon="ios-search">Search</Button>
    <Button type="primary" shape="circle">Circle</Button>
    <br />
    <br />
    <Button shape="circle" icon="ios-search"></Button>
    <Button icon="ios-search">Search</Button>
    <Button shape="circle" icon="ios-search">Search</Button>
    <Button shape="circle">Circle</Button>

    <div class="page-sub-title">按钮尺寸</div>
    <p>
      按钮有三种尺寸：大、默认（中）、小
      通过设置size为large和small将按钮设置为大和小尺寸，不设置为默认（中）尺寸
    </p>
    <RadioGroup v-model="buttonSize" type="button">
      <Radio label="large">Large</Radio>
      <Radio label="default">Default</Radio>
      <Radio label="small">small</Radio>
    </RadioGroup>
    <br />
    <br />
    <Button :size="buttonSize" type="primary">Primary</Button>
    <Button :size="buttonSize" type="default">Default</Button>
    <Button :size="buttonSize" type="dashed">Dashed</Button>
    <Button :size="buttonSize" type="text">Text</Button>
    <br />
    <br />
    <Button :size="buttonSize" icon="ios-download-outline" type="primary" shape="circle"></Button>
    <Button :size="buttonSize" icon="ios-download-outline" type="primary">Download</Button>
    <br />
    <br />
    <ButtonGroup :size="buttonSize">
      <Button :size="buttonSize" type="primary">
        <Icon type="ios-arrow-back" />Backward
      </Button>
      <Button :size="buttonSize" type="primary">
        Forward
        <Icon type="ios-arrow-forward" />
      </Button>
    </ButtonGroup>

    <div class="page-sub-title">长按钮</div>
    <p>
      通过设置属性 long 可将按钮宽度设置为 100%，常用于弹窗内操作按钮。
      使用者也可以直接通过给组件添加 style 来设置更细节的样式，比如定宽。
    </p>
    <Button type="success" long>SUBMIT</Button>
    <br />
    <br />
    <Button type="error" long>DELETE</Button>

    <div class="page-sub-title">不可用状态</div>
    <p>通过添加disabled属性可将按钮设置为不可用状态。</p>
    <Button>Default</Button>
    <Button disabled>Default(Disabled)</Button>
    <br />
    <Button type="primary">Primary</Button>
    <Button type="primary" disabled>Primary(Disabled)</Button>
    <br />
    <Button type="dashed">Dashed</Button>
    <Button type="dashed" disabled>Dashed(Disabled)</Button>
    <br />
    <Button type="text">Text</Button>
    <Button type="text" disabled>Text(Disabled)</Button>

    <div class="page-sub-title">加载中状态</div>
    <p>通过添加loading属性可以让按钮处于加载中状态，后两个按钮在点击时进入加载状态。</p>
    <Button type="primary" loading>Loading...</Button>
    <Button type="primary" :loading="loading" @click="toLoading">
      <span v-if="!loading">Click me!</span>
      <span v-else>Loading...</span>
    </Button>
    <Button type="primary" :loading="loading2" icon="ios-power" @click="toLoading2">
      <span v-if="!loading2">Click me!</span>
      <span v-else>Loading...</span>
    </Button>
    <Button loading shape="circle"></Button>
    <Button loading shape="circle" type="primary"></Button>

    <div class="page-sub-title">按钮组合</div>
    <p>
      将多个Button放入ButtonGroup内，可实现按钮组合的效果。
      通过设置ButtonGroup的属性size为large和small，可将按钮组尺寸设置为大和小，不设置size，则为默认（中）尺寸。
      通过设置ButtonGroup的属性shape为circle，可将按钮组形状设置为圆角。
    </p>
    <h4>Basic</h4>
    <br />
    <br />
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button type="primary">Confirm</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button disabled>Yesterday</Button>
      <Button disabled>Today</Button>
      <Button disabled>Tomorrow</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button type="primary">L</Button>
      <Button>M</Button>
      <Button>M</Button>
      <Button type="dashed">R</Button>
    </ButtonGroup>
    <br />
    <br />
    <h4>Icons</h4>
    <br />
    <br />
    <ButtonGroup>
      <Button type="primary">
        <Icon type="ios-arrow-back"></Icon>Backward
      </Button>
      <Button type="primary">
        Forward
        <Icon type="ios-arrow-forward"></Icon>
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button type="primary" icon="ios-arrow-back"></Button>
      <Button type="primary" icon="ios-arrow-forward"></Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button icon="ios-color-wand-outline"></Button>
      <Button icon="ios-sunny-outline"></Button>
      <Button icon="ios-crop"></Button>
      <Button icon="ios-color-filter-outline"></Button>
    </ButtonGroup>
    <br />
    <br />
    <h4>Circle</h4>
    <br />
    <br />
    <ButtonGroup shape="circle">
      <Button type="primary">
        <Icon type="ios-arrow-back"></Icon>Backward
      </Button>
      <Button type="primary">
        Forward
        <Icon type="ios-arrow-forward"></Icon>
      </Button>
    </ButtonGroup>
    <ButtonGroup shape="circle">
      <Button type="primary" icon="ios-arrow-back"></Button>
      <Button type="primary" icon="ios-arrow-forward"></Button>
    </ButtonGroup>
    <ButtonGroup shape="circle">
      <Button icon="ios-color-wand-outline"></Button>
      <Button icon="ios-sunny-outline"></Button>
      <Button icon="ios-crop"></Button>
      <Button icon="ios-color-filter-outline"></Button>
    </ButtonGroup>
    <br />
    <br />
    <h4>Size</h4>
    <br />
    <br />
    <ButtonGroup size="large">
      <Button>Large</Button>
      <Button>Large</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button>Default</Button>
      <Button>Default</Button>
    </ButtonGroup>
    <ButtonGroup size="small">
      <Button>Small</Button>
      <Button>Small</Button>
    </ButtonGroup>
    <br />
    <br />
    <ButtonGroup size="large" shape="circle">
      <Button>Large</Button>
      <Button>Large</Button>
    </ButtonGroup>
    <ButtonGroup shape="circle">
      <Button>Default</Button>
      <Button>Default</Button>
    </ButtonGroup>
    <ButtonGroup size="small" shape="circle">
      <Button>Small</Button>
      <Button>Small</Button>
    </ButtonGroup>

    <div class="page-sub-title">按钮组纵向排列</div>
    <p>通过设置ButtonGroup的属性vertical，可以使按钮组纵向排列。</p>
    <ButtonGroup vertical>
      <Button icon="ios-color-wand-outline"></Button>
      <Button icon="ios-sunny-outline"></Button>
      <Button icon="ios-crop"></Button>
      <Button icon="ios-color-filter-outline"></Button>
    </ButtonGroup>
    <ButtonGroup vertical shape="circle">
      <Button icon="ios-color-wand-outline"></Button>
      <Button icon="ios-sunny-outline"></Button>
      <Button icon="ios-crop"></Button>
      <Button icon="ios-color-filter-outline"></Button>
    </ButtonGroup>

    <div class="page-sub-title">跳转</div>
    <p>
      通过设置 to 可以实现点击按钮直接跳转，支持传入 vue-router 对象。
      设置 replace 则不会保存历史记录。
      设置 target，会跟 a 标签一样的行为。
    </p>
    <br />
    <Button to="/#/samples/Icon">Normal</Button>
    <Button to="/#/samples/Icon" replace>No history</Button>
    <Button to="//iviewui.com" target="_blank">New window</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      loading2: false,
      buttonSize: "large"
    };
  },
  methods: {
    toLoading() {
      this.loading = true;
    },
    toLoading2() {
      this.loading2 = true;
    }
  }
};
</script>