<template>
  <div>
    <div class="page-title">Message 消息提示</div>
    <Button @click="openInfo">信息</Button>
    <Button @click="openSuccess">成功</Button>
    <Button @click="openWarning">警告</Button>
    <Button @click="openError">错误</Button>
    <Button @click="openLoading">加载中</Button>
    <Button @click="openCanClose">可以关闭</Button>
    <Button @click="openRenderFns">渲染函数</Button>
  </div>
</template>
<script>
export default {
  methods: {
    openInfo() {
      this.$Message.info('这是一条信息提示')
    },
    openSuccess() {
      this.$Message.success('这是一条成功提示')
    },
    openWarning() {
      this.$Message.warning('这是一条警告提示')
    },
    openError() {
      this.$Message.error('这是一条错误提示')
    },
    openLoading() {
      let cs = this.$Message.loading({
        content: '这是一条加载中提示'
      })
    },
    openCanClose() {
      this.$Message.error({
        content: '这是可以关闭的消息，点击关闭',
        closable: true
      })
    },
    openRenderFns() {
      this.$Message.error({
        closable: true,
        render: h => {
          return h('b', '这是渲染函数，可以关闭的消息，点击关闭')
        }
      })
    }
  }
}
</script>
