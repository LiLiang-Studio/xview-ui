<template>
  <div>
    <div class="page-title">Notice 通知提醒</div>
    <p>在界面右上角显示可关闭的全局通知，常用于通知内容带有描述信息或系统主动推送</p><br>
    
    <div class="page-sub-title">基础用法</div>
    <p>基本用法，默认在 4.5秒后关闭。如果 desc 参数为空或不填，则自动应用仅标题模式下的样式。</p>
    <p>建议标题言简意赅，例如"删除成功"，更详细的内容可以放在描述信息里。</p><br>
    <Button type="primary" @click="open(false)">Open notice</Button>
    <Button @click="open(true)">Open notice(only title)</Button>

    <div class="page-sub-title">提醒类型</div>
    <p>带有状态图标的提醒。</p><br>
    <p>With desc</p>
    <Button @click="info(false)">Info</Button>
    <Button @click="success(false)">Success</Button>
    <Button @click="warning(false)">Warning</Button>
    <Button @click="error(false)">Error</Button>
    <p>Only title</p>
    <Button @click="info(true)">Info</Button>
    <Button @click="success(true)">Success</Button>
    <Button @click="warning(true)">Warning</Button>
    <Button @click="error(true)">Error</Button>
    
    <div class="page-sub-title">自定义时长</div>
    <p>自定义时长，为 0 则不自动关闭。也可以在Notice.config()中全局配置，详见API。</p><br>
    <Button type="primary" @click="time">Open notice</Button>
    
    <div class="page-sub-title">Render 函数</div>
    <p>你可以自定义 Render 函数来替代 desc</p><br>
    <Button type="primary" @click="renderFunc">Open notice</Button>
  </div>
</template>
<script>
export default {
  methods: {
    open (nodesc) {
      this.$Notice.open({
        title: 'Notification title',
        desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
      });
    },
    info(nodesc) {
      this.$Notice.info({
        title: "Notification title",
        desc: nodesc
          ? ""
          : "Here is the notification description. Here is the notification description. "
      })
    },
    success(nodesc) {
      this.$Notice.success({
        title: "Notification title",
        desc: nodesc
          ? ""
          : "Here is the notification description. Here is the notification description. "
      })
    },
    warning(nodesc) {
      this.$Notice.warning({
        title: "Notification title",
        desc: nodesc
          ? ""
          : "Here is the notification description. Here is the notification description. "
      })
    },
    error(nodesc) {
      this.$Notice.error({
        title: "Notification title",
        desc: nodesc
          ? ""
          : "Here is the notification description. Here is the notification description. "
      })
    },
    time () {
      this.$Notice.open({
        title: 'Notification title',
        desc: 'This notification does not automatically close, and you need to click the close button to close.',
        duration: 0
      });
    },
    renderFunc() {
      this.$Notice.success({
        title: '渲染函数通知',
        render: h => h('i', 'Here is the notification description. Here is the notification description.'),
        onClose() {
          this.$Message('通知关闭')
        }
      })
    }
  }
}
</script>
