<template>
  <div>
    <div class="demo-avatar">
      <Avatar icon="ios-person" size="large" />
      <Avatar icon="ios-person" />
      <Avatar icon="ios-person" size="small" />
    </div>
    <br>
    <div class="demo-avatar">
      <Avatar shape="square" icon="ios-person" size="large" />
      <Avatar shape="square" icon="ios-person" />
      <Avatar shape="square" icon="ios-person" size="small"/>
    </div>
    <br>
    <Avatar icon="ios-person" />
    <Avatar>U</Avatar>
    <Avatar>USER</Avatar>
    <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
    <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
    <Avatar style="background-color: #87d068" icon="ios-person" />
    <br>
    <br>
    <br>
    <Badge :count="1">
      <Avatar shape="square" icon="ios-person" />
    </Badge>
    <br>
    <br>
    <Badge dot>
      <Avatar shape="square" icon="ios-person" />
    </Badge>
  </div>
</template>