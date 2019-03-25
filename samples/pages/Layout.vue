<template>
  <div class="page-layout">
    <div class="page-title">Layout 布局</div>
    <p class="desc">协助进行页面级整体布局。</p>

    <div class="page-sub-title">典型的页面布局</div>
    <div class="layout-single">
      <Layout>
        <Header class="layout-header">Header</Header>
        <Content class="layout-content">Content</Content>
        <Footer class="layout-footer">Footer</Footer>
      </Layout>
    </div>

    <div class="layout-single">
      <Layout>
        <Header class="layout-header">Header</Header>
        <Layout>
          <Sider class="layout-sider" hide-trigger>Sider</Sider>
          <Content class="layout-content">Content</Content>
        </Layout>
        <Footer class="layout-footer">Footer</Footer>
      </Layout>
    </div>

    <div class="layout-single">
      <Layout>
        <Header class="layout-header">Header</Header>
        <Layout>
          <Content class="layout-content">Content</Content>
          <Sider class="layout-sider" hide-trigger>Sider</Sider>
        </Layout>
        <Footer class="layout-footer">Footer</Footer>
      </Layout>
    </div>

    <div class="layout-single">
      <Layout>
        <Sider class="layout-sider" hide-trigger>Sider</Sider>
        <Layout>
          <Header class="layout-header">Header</Header>
          <Content class="layout-content">Content</Content>
          <Footer class="layout-footer">Footer</Footer>
        </Layout>
      </Layout>
    </div>

    <div class="page-sub-title">最基本的『上-中-下』布局。</div>
    <p class="desc">
      一般主导航放置于页面的顶端，从左自右依次为：logo、一级导航项、辅助菜单（用户、设置、通知等）。
      通常将内容放在固定尺寸（例如：1200px）内，整个页面排版稳定，不受用户终端显示器影响；
      上下级的结构符合用户上下浏览的习惯，也是较为经典的网站导航模式。
      页面上下切分的方式提高了主工作区域的信息展示效率，但在纵向空间上会有一些牺牲。
      此外，由于导航栏水平空间的限制，不适合那些一级导航项很多的信息结构。
    </p>
    <div class="layout">
      <Layout>
        <Header>
          <div class="layout-logo"></div>
        </Header>
        <Content :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '20px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div style="min-height: 200px;">Content</div>
          </Card>
        </Content>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>
    </div>

    <div class="page-sub-title">同样拥有顶部导航及侧边栏，区别是两边未留边距，多用于应用型的网站。</div>
    <div class="layout">
      <Layout>
        <Header>
          <div class="layout-logo"></div>
          <div class="layout-nav"></div>
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}"></Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '24px 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">Content</Content>
          </Layout>
        </Layout>
      </Layout>
    </div>

    <div class="page-sub-title">拥有顶部导航及侧边栏的页面，多用于展示类网站。</div>
    <div class="layout">
      <Layout>
        <Header>
          <div class="layout-logo"></div>
        </Header>
        <Layout :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
            <Layout>
              <Sider hide-trigger :style="{background: '#fff'}"></Sider>
              <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">Content</Content>
            </Layout>
          </Content>
        </Layout>
        <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
      </Layout>
    </div>

    <div class="page-sub-title">侧边布局</div>
    <p class="desc">
      侧边两列式布局。页面横向空间有限时，侧边导航可收起。
      侧边导航在页面布局上采用的是左右的结构，一般主导航放置于页面的左侧固定位置，辅助菜单放置于工作区顶部。
      内容根据浏览器终端进行自适应，能提高横向空间的使用率，但是整个页面排版不稳定。
      侧边导航的模式层级扩展性强，一、二、三级导航项目可以更为顺畅且具关联性的被展示，同时侧边导航可以固定，
      使得用户在操作和浏览中可以快速的定位和切换当前位置，有很高的操作效率。
      但这类导航横向页面内容的空间会被牺牲一部份。
    </p>
    <div class="layout" style="height: 360px; overflow:auto;">
      <Layout :style="{minHeight: '100vh'}">
        <Sider hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed"></Sider>
        <Layout>
          <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
          <Content :style="{padding: '0 16px 16px'}">
            <Breadcrumb :style="{margin: '16px 0'}">
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
            <Card>
              <div style="height: 600px">Content</div>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </div>

    <div class="page-sub-title">自定义触发器</div>
    <p class="desc">要使用自定义触发器，可以设置hide-trigger属性来隐藏默认触发器，也可以通过slot替换默认触发器。</p>
    <div class="layout">
      <Layout>
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed"></Sider>
        <Layout>
          <Header :style="{padding: 0}" class="layout-header-bar">
            <Icon
              @click.native="collapsedSider"
              :class="rotateIcon"
              :style="{margin: '20px 20px 0'}"
              type="navicon-round"
              size="24"
            ></Icon>
          </Header>
          <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">Content</Content>
        </Layout>
      </Layout>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    }
  }
};
</script>
<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.layout-footer-center {
  text-align: center;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-single {
  height: 253px;
  margin-bottom: 48px;
  font-size: 14px;
  color: #fff;
  text-align: center;
}

.layout-footer,
.layout-header {
  background: #7cbce9;
  color: #fff;
}

.layout-content {
  background: #0f8de9;
  min-height: 120px;
  line-height: 120px;
}

.layout-sider {
  background: #3a9fe8;
  min-height: 120px;
  line-height: 120px;
}

.desc {
  margin-bottom: 15px;
}
</style>
