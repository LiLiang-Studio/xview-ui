<template>
  <div>
    <div class="page-title">Message 全局提示</div>
    <p>轻量级的信息反馈组件，在顶部居中显示，并自动消失。有多种不同的提示状态可选择。</p><br>

    <div class="page-sub-title">普通提示</div>
    <p>最基本的提示，默认在1.5秒后消失。</p><br>
    <Button type="primary" @click="info">显示普通消息</Button>
    
    <div class="page-sub-title">提示类型</div>
    <p>不同的提示状态：成功、警告、错误。</p><br>
    <Button @click="success">Display success prompt</Button>
    <Button @click="warning">Display warning prompt</Button>
    <Button @click="error">Display error prompt</Button>

    <div class="page-sub-title">带背景色</div>
    <p>设置属性 background 后，通知提示会显示背景色。</p><br>
    <div>
      <Button @click="background('info')">显示普通提示</Button>
      <Button @click="background('success')">显示成功提示</Button>
      <Button @click="background('warning')">显示警告提示</Button>
      <Button @click="background('error')">显示错误提示</Button>
    </div>

    <div class="page-sub-title">加载中</div>
    <p>Loading 的状态，并异步在某个时机移除。</p><br>
    <Button @click="loading">Display loading...</Button>

    <div class="page-sub-title">自定义时长</div>
    <p>自定义时长，也可以在Message.config()中全局配置，详见API。</p><br>
    <Button @click="time">Displays a 10 second prompt</Button>

    <div class="page-sub-title">可关闭</div>
    <p>将参数设置为一个对象，并指定 closable 为 true 后可以手动关闭提示，完整参数详见API。</p><br>
    <Button @click="closable">Display a closable message</Button>

    <div class="page-sub-title">自定义 Render 函数</div>
    <p>使用 Render 函数自定义内容。</p><br>
    <Button @click="renderFunc">show message</Button>

    <div class="page-sub-title">全局配置和注销</div>
    <p>使用 config方法全局配置和destroy方法注销实例</p><br>
    <Button @click="config">全局配置</Button>
    <Button @click="destroy">注销实例</Button>
  </div>
</template>
<script>
export default {
  methods: {
    info () {
      this.$Message.info('这是一条普通的提示');
    },
    success () {
      this.$Message.success('This is a success tip');
    },
    warning () {
      this.$Message.warning('This is a warning tip');
    },
    error () {
      this.$Message.error('This is an error tip');
    },
    background (type) {
      this.$Message[type]({
        background: true,
        content: '这是一条带背景色的通知',
        closable: true
      });
    },
    loading () {
      const msg = this.$Message.loading({
        content: 'Loading...',
        duration: 0
      });
      setTimeout(msg, 3000);
    },
    time() {
      this.$Message.info({
        content: 'I\'ll be gone in 10 seconds',
        duration: 10
      });
    },
    closable () {
      this.$Message.info({
        content: 'Tips for manual closing',
        duration: 10,
        closable: true
      });
    },
    renderFunc() {
      this.$Message.error({
        closable: true,
        render: h => {
          return h('b', '这是渲染函数渲染的，可以点击关闭')
        }
      })
    },
    config() {
      this.$Message.config({
        closable: true,
        duration: 3,
        background: true
      })
    },
    destroy() {
      this.$Message.destroy()
    }
  }
}
</script>
