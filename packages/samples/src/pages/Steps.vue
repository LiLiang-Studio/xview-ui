<template>
  <div>
    <div class="page-title">Steps 步骤条</div>
    <p>拆分某项流程的步骤，引导用户按流程完成任务。</p>

    <div class="page-sub-title">基础用法</div>
    <p>基本用法，组件会根据current自动判断各步骤状态。</p><br>
    <Steps :current="1">
      <Step title="已完成" content="这里是该步骤的描述信息"></Step>
      <Step title="进行中" content="这里是该步骤的描述信息"></Step>
      <Step title="待进行" content="这里是该步骤的描述信息"></Step>
      <Step title="待进行" content="这里是该步骤的描述信息"></Step>
    </Steps>

    <div class="page-sub-title">迷你版</div>
    <p>设置属性size为small启用迷你版。</p><br>
    <Steps :current="2" size="small">
      <Step title="已完成"></Step>
      <Step title="已完成"></Step>
      <Step title="进行中"></Step>
      <Step title="待进行"></Step>
    </Steps>

    <div class="page-sub-title">带图标的步骤条</div>
    <p>通过设置Step的icon属性可以自定义图标。</p><br>
    <Steps :current="1">
      <Step title="注册" icon="person-add"></Step>
      <Step title="上传头像" icon="camera"></Step>
      <Step title="验证邮箱" icon="email"></Step>
    </Steps>

    <div class="page-sub-title">切换步骤</div>
    <p>点击下一步按钮可以切换当前进度状态。</p><br>
    <p>当前正在进行第 {{ current + 1 }} 步</p>
    <Steps style="margin:15px 0;" :current="current">
      <Step title="步骤1"></Step>
      <Step title="步骤2"></Step>
      <Step title="步骤3"></Step>
      <Step title="步骤4"></Step>
    </Steps>
    <Button type="primary" @click="next">Next step</Button>

    <div class="page-sub-title">垂直方向</div>
    <p>设置属性direction为vertical在垂直方向展示。</p><br>
    <Steps :current="2" direction="vertical">
      <Step title="已完成" content="这里是该步骤的描述信息"></Step>
      <Step title="已完成" content="这里是该步骤的描述信息"></Step>
      <Step title="进行中" content="这里是该步骤的描述信息"></Step>
      <Step title="待进行" content="这里是该步骤的描述信息"></Step>
    </Steps>

    <div class="page-sub-title">步骤运行错误</div>
    <p>设置Steps的属性status为error指定当前步骤状态。</p><br>
    <Steps :current="1" status="error">
      <Step title="已完成" content="这里是该步骤的描述信息"></Step>
      <Step title="进行中" content="这里是该步骤的描述信息"></Step>
      <Step title="待进行" content="这里是该步骤的描述信息"></Step>
      <Step title="待进行" content="这里是该步骤的描述信息"></Step>
    </Steps>

    <div style="padding:100px;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    next() {
      if (this.current == 3) {
        this.current = 0;
      } else {
        this.current += 1;
      }
    }
  }
};
</script>
<style lang="less">
</style>