<template>
  <div>
    <div class="page-title">Notice 通知</div>
    <Button @click="openNoIcon">不带图标</Button>

    <div class="page-sub-title">带描述</div>
    <Button @click="info(false)">Info</Button>
    <Button @click="success(false)">Success</Button>
    <Button @click="warning(false)">Warning</Button>
    <Button @click="error(false)">Error</Button>
    <div class="page-sub-title">不带描述</div>
    <Button @click="info(true)">Info</Button>
    <Button @click="success(true)">Success</Button>
    <Button @click="warning(true)">Warning</Button>
    <Button @click="error(true)">Error</Button>
    <div class="page-sub-title">渲染函数</div>
    <Button @click="renderFns(true)">Success</Button>
  </div>
</template>
<script>
export default {
  methods: {
    openNoIcon() {
      this.$Notice.open({
        title: "Notification title",
        desc:
          "Here is the notification description. Here is the notification description. "
      })
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
    renderFns() {
      this.$Notice.success({
        title: '渲染函数通知',
        render: h => h('i', 'Here is the notification description. Here is the notification description.')
      })
    }
  }
}
</script>
