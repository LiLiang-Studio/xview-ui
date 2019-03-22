<template>
  <div>
    <div class="page-title">Breadcrumb 面包屑</div>
    <div class="page-sub-title">显示网站的层级结构，告知用户当前所在位置，以及在需要向上级导航时使用。</div>

    <div class="page-sub-title">最基础的用法，通过设置to属性添加链接。</div>
    <Breadcrumb>
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem to="/samples/Breadcrumb">Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>

    <div class="page-sub-title">可自定义每项的内容，比如带有一个图标。</div>
    <Breadcrumb>
      <BreadcrumbItem to="/">
        <Icon type="ios-home-outline"></Icon>Home
      </BreadcrumbItem>
      <BreadcrumbItem to="/samples/Breadcrumb">
        <Icon type="social-buffer-outline"></Icon>Components
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Icon type="pound"></Icon>Breadcrumb
      </BreadcrumbItem>
    </Breadcrumb>

    <div class="page-sub-title">通过设置separator属性来自定义分隔符，比如 > ，也可以接受自定义的HTML字符串</div>
    <Breadcrumb separator=">">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem to="/samples/Breadcrumb">Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
    <Breadcrumb separator="<b style='color: #ff5500;padding: 0 5px;'>=></b>">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem to="/samples/Breadcrumb">Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>