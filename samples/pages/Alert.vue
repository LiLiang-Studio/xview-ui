<template>
  <div class="page-alert">
    <div class="page-title">Alert 警告提示</div>
    
    <div class="page-sub-title">不带描述</div>
    <Alert>An info prompt</Alert>
    <Alert type="success">A success prompt</Alert>
    <Alert type="warning">A warning prompt</Alert>
    <Alert type="error">An error prompt</Alert>

    <div class="page-sub-title">自定义slot name="desc"描述内容。</div>
    <Alert>
        An info prompt
        <template slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </template>
    </Alert>
    <Alert type="success">
        A success prompt
        <template slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </template>
    </Alert>
    <Alert type="warning">
        A warning prompt
        <template slot="desc">
        Content of prompt. Content of prompt. Content of prompt.
    </template>
    </Alert>
    <Alert type="error">
        An error prompt
        <span slot="desc">
            Custom error description copywriting. <Icon type="help-circled" size="14"></Icon>
        </span>
    </Alert>


    <div class="page-sub-title">带图标</div>
    <Alert show-icon>An info prompt</Alert>
    <Alert type="success" show-icon>A success prompt</Alert>
    <Alert type="warning" show-icon>A warning prompt</Alert>
    <Alert type="error" show-icon>An error prompt</Alert>
    <Alert show-icon>
        An info prompt
        <template slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </template>
    </Alert>
    <Alert type="success" show-icon>
        A success prompt
        <span slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </span>
    </Alert>
    <Alert type="warning" show-icon>
        A warning prompt
        <template slot="desc">
        Content of prompt. Content of prompt. Content of prompt.
    </template>
    </Alert>
    <Alert type="error" show-icon>
        An error prompt
        <span slot="desc">
            Custom error description copywriting.
        </span>
    </Alert>
    <Alert show-icon>
        Custom icon
        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
        <template slot="desc">Custom icon copywriting. Custom icon copywriting. Custom icon copywriting. </template>
    </Alert>

    <div class="page-sub-title">可以关闭</div>
    <Alert closable>An info prompt</Alert>
    <Alert type="success" show-icon closable>
        A success prompt
        <span slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </span>
    </Alert>
    <Alert type="warning" closable>
        Custom closing content
        <span slot="close">No longer prompt</span>
    </Alert>
  </div>
</template>