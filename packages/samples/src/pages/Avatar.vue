<template>
  <div style="padding-bottom:100px;">
    <div class="page-title">Avatar 头像</div>
    <p>用来代表用户或事物，支持图片、图标或字符展示。</p>

    <div class="page-sub-title">基础用法</div>
    <p>头像有三种尺寸，两种形状可选 size 可以设置为数值</p><br>
    <div class="demo-avatar">
      <Avatar icon="ios-person" size="64" />
      <Avatar icon="ios-person" size="large" />
      <Avatar icon="ios-person" />
      <Avatar icon="ios-person" size="small" />
    </div>
    <br>
    <div class="demo-avatar">
      <Avatar size="64">U</Avatar>
      <Avatar size="large">U</Avatar>
      <Avatar>U</Avatar>
      <Avatar size="small">U</Avatar>
    </div>
    <br>
    <div class="demo-avatar">
      <Avatar shape="square" icon="ios-person" size="64" />
      <Avatar shape="square" icon="ios-person" size="large" />
      <Avatar shape="square" icon="ios-person" />
      <Avatar shape="square" icon="ios-person" size="small"/>
    </div>
    <br>
    <div class="page-sub-title">类型</div>
    <p>支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。</p><br>
    <Avatar icon="ios-person" />
    <Avatar>U</Avatar>
    <Avatar>USER</Avatar>
    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
    <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
    <Avatar style="background-color: #87d068" icon="ios-person" />
    <br>
    <div class="page-sub-title">带徽标的头像</div>
    <p>通常用于消息提示。</p><br>
    <Badge :count="1">
      <Avatar shape="square" icon="ios-person" />
    </Badge>
    <Badge dot>
      <Avatar shape="square" icon="ios-person" />
    </Badge>
    <div class="page-sub-title">自动调整字符大小</div>
    <p>对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。</p><br>
    <div class="demo-avatar">
        <Avatar :style="{background: color}" :text="user"></Avatar>
        <Button size="small" @click="handleChange">Change</Button>
    </div>
  </div>
</template>
<script>
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
export default {
  data () {
    return {
      user: UserList[0],
      color: ColorList[0]
    }
  },
  methods: {
    handleChange () {
      const index = UserList.indexOf(this.user);
      this.user = index < UserList.length - 1 ? UserList[index + 1] : UserList[0];
      this.color = index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0];
    }
  }        
}
</script>