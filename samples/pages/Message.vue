<template>
  <div>
    <div class="page-title">Message 消息提示</div>
    <Button @click="openInfo">信息</Button>
    <Button @click="openSuccess">成功</Button>
    <Button @click="openWarning">警告</Button>
    <Button @click="openError">错误</Button>
    <Button @click="openLoading">加载中</Button>
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
      this.$Message.loading('这是一条加载中提示')
    }
  }
}
</script>
