<template>
  <div>
    <div class="page-title">Menu 导航菜单</div>
    <p>为页面和功能提供导航的菜单列表，常用于网站顶部和左侧。</p>

    <div class="page-sub-title">顶部导航</div>
    <p>
      水平的顶部导航菜单。
      通过设置属性 theme 为 light、dark、primary 可以选择主题。
      通过事件 on-select 可以得到点击菜单的 name 值，从而控制页面路由或自定义操作。</p><br>
    <Menu mode="horizontal" :theme="theme1" active-name="1" @on-open-change="handleOpenChange" @on-select="handleSelect">
      <MenuItem name="1">
        <Icon type="ios-paper"></Icon>内容管理
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people"></Icon>用户管理
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="stats-bars"></Icon>统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="4">
        <Icon type="settings"></Icon>综合设置
      </MenuItem>
    </Menu>
    <br>
    <p>Change theme</p>
    <RadioGroup v-model="theme1">
      <Radio label="light"></Radio>
      <Radio label="dark"></Radio>
      <Radio label="primary"></Radio>
    </RadioGroup>

    <div class="page-sub-title">侧栏导航</div>
    <p>
      垂直导航菜单，可以内嵌子菜单。
      设置 active-name 可以选中指定的菜单，设置 open-names 可以展开指定的子菜单。
      设置属性 accordion 可以开启手风琴模式，每次只能展开一个子菜单。
      通过设置属性 theme 为 light、dark 可以选择主题，侧栏菜单不支持 primary 主题。</p><br>
    <Row>
      <Col span="8">
        <Menu :theme="theme2">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"></Icon>内容管理
            </template>
            <MenuItem name="1-1">文章管理</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people"></Icon>用户管理
            </template>
            <MenuItem name="2-1">新增用户</MenuItem>
            <MenuItem name="2-2">活跃用户</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="stats-bars"></Icon>统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
        </Menu>
      </Col>
      <Col span="8">
        <Menu :theme="theme2" active-name="1-2" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"></Icon>内容管理
            </template>
            <MenuItem name="1-1">文章管理</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people"></Icon>用户管理
            </template>
            <MenuItem name="2-1">新增用户</MenuItem>
            <MenuItem name="2-2">活跃用户</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="stats-bars"></Icon>统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
        </Menu>
      </Col>
      <Col span="8">
        <Menu :theme="theme2" :open-names="['1']" accordion>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-paper"></Icon>内容管理
            </template>
            <MenuItem name="1-1">文章管理</MenuItem>
            <MenuItem name="1-2">评论管理</MenuItem>
            <MenuItem name="1-3">举报管理</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-people"></Icon>用户管理
            </template>
            <MenuItem name="2-1">新增用户</MenuItem>
            <MenuItem name="2-2">活跃用户</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="stats-bars"></Icon>统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="3-1">新增和启动</MenuItem>
              <MenuItem name="3-2">活跃分析</MenuItem>
              <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="3-4">用户留存</MenuItem>
              <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
        </Menu>
      </Col>
    </Row>
    <br>
    <p>Change theme</p>
    <RadioGroup v-model="theme2">
      <Radio label="light"></Radio>
      <Radio label="dark"></Radio>
    </RadioGroup>

    <div class="page-sub-title">内嵌菜单</div>
    <p>垂直菜单，子菜单内嵌在菜单区域。</p><br>
    <Menu active-name="1-2" :open-names="['1']">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-analytics"></Icon>Navigation One
        </template>
        <MenuGroup title="Item 1">
          <MenuItem name="1-1">Option 1</MenuItem>
          <MenuItem name="1-2">Option 2</MenuItem>
        </MenuGroup>
        <MenuGroup title="Item 2">
          <MenuItem name="1-3">Option 3</MenuItem>
          <MenuItem name="1-4">Option 4</MenuItem>
        </MenuGroup>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-filing"></Icon>Navigation Two
        </template>
        <MenuItem name="2-1">Option 5</MenuItem>
        <MenuItem name="2-2">Option 6</MenuItem>
        <Submenu name="3">
          <template slot="title">Submenu</template>
          <MenuItem name="3-1">Option 7</MenuItem>
          <MenuItem name="3-2">Option 8</MenuItem>
        </Submenu>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-gear"></Icon>Navigation Three
        </template>
        <MenuItem name="4-1">Option 9</MenuItem>
        <MenuItem name="4-2">Option 10</MenuItem>
        <MenuItem name="4-3">Option 11</MenuItem>
        <MenuItem name="4-4">Option 12</MenuItem>
      </Submenu>
    </Menu>

    <div class="page-sub-title">分组</div>
    <p>使用 MenuGroup 组件进行分组。</p><br>
    <Menu :theme="theme3" active-name="1">
      <MenuGroup title="内容管理">
        <MenuItem name="1">
          <Icon type="document-text"></Icon>文章管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="chatbubbles"></Icon>评论管理
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="统计分析">
        <MenuItem name="3">
          <Icon type="heart"></Icon>用户留存
        </MenuItem>
        <MenuItem name="4">
          <Icon type="heart-broken"></Icon>流失用户
        </MenuItem>
      </MenuGroup>
    </Menu>
    <br>
    <p>Change theme</p>
    <RadioGroup v-model="theme3">
      <Radio label="light"></Radio>
      <Radio label="dark"></Radio>
    </RadioGroup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme1: "light",
      theme2: "light",
      theme3: "light"
    };
  },
  methods: {
    handleOpenChange(name, isOpen) {
      // console.log(name, isOpen)
    },
    handleSelect(name) {
      // console.log(name)
    }
  }
};
</script>
<style lang="less">
</style>