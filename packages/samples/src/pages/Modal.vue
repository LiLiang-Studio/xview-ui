<template>
  <div style="padding-bottom:100px;">
    <div class="page-title">Modal 对话框</div>
    <p>模态对话框，在浮层中显示，引导用户进行相关操作。Modal提供了两种用法，普通组件使用和封装好的简洁实例调用。</p>

    <div class="page-sub-title">基础用法</div>
    <p>最简单的使用方法，通过控制属性visible来显示 / 隐藏对话框。可以使用 v-model 实现双向绑定。</p><br>
    <Button type="primary" @click="modal1 = true">显示对话框</Button>
    <Modal v-model="modal1" middle title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>

    <div class="page-sub-title">自定义样式</div>
    <p>Modal 组件提供了灵活的自定义样式 API 和 Slot，可以自由控制整个 Modal 的各个组成部分，
      比如页头、页脚、关闭按钮。通过和其它组件的交互，能实现更复杂的功能，满足了大多业务场景。</p><br>
    <Button @click="modal2 = true">自定义头和脚</Button>
    <Modal v-model="modal2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此任务删除后，下游 10 个任务将无法执行。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>
      </div>
    </Modal>
    <Button @click="modal3 = true">不带标题栏</Button>
    <Modal v-model="modal3">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>
    <Button @click="modal4 = true">国际化</Button>
    <Modal v-model="modal4" title="Modal Title" ok-text="OK" cancel-text="Cancel">
      <p>Something...</p>
      <p>Something...</p>
      <p>Something...</p>
    </Modal>
    <Button @click="modal5 = true">设置宽度</Button>
    <Modal v-model="modal5" title="Custom width" width="300">
      <p>Customize width, unit px, default 520px.</p>
      <p>
        自定义宽度，单位 px，默认 520px。
        对话框的宽度是响应式的，当屏幕尺寸小于 768px 时，宽度会变为自动auto。
      </p>
    </Modal>

    <div class="page-sub-title">异步关闭</div>
    <p>给Modal添加属性loading后，点击确定按钮对话框不会自动消失，
      并显示 loading 状态，需要手动关闭对话框，常用于表单提交。</p><br>
    <Button type="primary" @click="modal6 = true">异步关闭</Button>
    <Modal v-model="modal6" title="Title" :loading="loading" @on-ok="asyncOK">
      <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </Modal>

    <div class="page-sub-title">禁用关闭</div>
    <p>可以禁用关闭和遮罩层关闭</p><br>
    <Button @click="modal7 = true">禁用右上角关闭</Button>
    <Modal title="Title" v-model="modal7" :closable="false">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
    <Button @click="modal8 = true">禁用遮罩层关闭</Button>
    <Modal title="Title" v-model="modal8" :mask-closable="false">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>

    <div class="page-sub-title">自定义位置</div>
    <p>可以自定义 Modal 的对话框样式 以及 对话框 Wrap 的 class 名称，从而实现更多自定义的样式，比如垂直居中。</p><br>
    <Button @click="modal9 = true">距离顶部20px</Button>
    <Modal
        title="Title"
        v-model="modal9"
        :styles="{top: '20px'}">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    <Button @click="modal10 = true">垂直居中</Button>
    <Modal
        title="Title"
        v-model="modal10"
        class-name="vertical-center-modal">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>

    <div class="page-sub-title">全屏</div>
    <p>设置属性 fullscreen 可以全屏显示。设置属性 footer-hide 可以隐藏底部内容。</p><br>
    <Button @click="modal11 = true">显示全屏对话框</Button>
    <Modal v-model="modal11" fullscreen title="Fullscreen Modal">
        <div>This is a fullscreen modal</div>
    </Modal>

    <div class="page-sub-title">实例化使用方法</div>
    <p>除了上述通过标准组件的使用方法，我还精心封装了一些实例方法，用来创建一次性的轻量级对话框。
      实例以隐式创建 Vue 组件的方式在全局创建一个对话框，并在消失时移除，所以同时只能操作一个对话框。</p><br>
    <Button @click="instance('info')">消息</Button>
    <Button @click="instance('success')">成功</Button>
    <Button @click="instance('warning')">警告</Button>
    <Button @click="instance('error')">错误</Button>
    <div class="page-sub-title">快速弹出确认对话框，并且可以自定义按钮文字及异步关闭。</div>
    <Button @click="instance('confirm')">标准</Button>
    <Button @click="custom">自定义按钮文字</Button>
    <Button @click="async">异步关闭</Button>

    <div class="page-sub-title">自定义内容</div>
    <p>使用 render 字段可以基于 Render 函数来自定义内容。使用 render 后，将不再限制类型，content 也将无效。</p><br>
    <p>
        姓名: {{ value }}
    </p>
    <p>
        <Button @click="handleRender">自定义内容</Button>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal1: false,
      modal2: false,
      modal_loading: false,
      modal3: false,
      modal4: false,
      modal5: false,
      modal6: false,
      loading: true,
      modal7: false,
      modal8: false,
      modal9: false,
      modal10: false,
      modal11: false,
      value: ''
    };
  },
  methods: {
    ok() {
      this.$Message.info("Clicked ok");
    },
    cancel() {
      this.$Message.info("Clicked cancel");
    },
    del() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        this.modal2 = false;
        this.$Message.success("Successfully delete");
      }, 2000);
    },
    asyncOK() {
      setTimeout(() => {
        this.modal6 = false;
      }, 2000);
    },
    instance(type) {
      const title = "对话框的标题";
      const content =
        "<p>一些对话框内容</p><p>一些对话框内容</p><p>一些对话框内容</p>";
      switch (type) {
        case "info":
          this.$Modal.info({
            title: title,
            content: content
          });
          break;
        case "success":
          this.$Modal.success({
            title: title,
            content: content
          });
          break;
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content
          });
          break;
        case "error":
          this.$Modal.error({
            title: title,
            content: content
          });
          break;
        case "confirm":
          this.$Modal.confirm({
            title: title,
            content: content,
            onOk: () => {
              this.$Message.info("Clicked ok");
            },
            onCancel: () => {
              this.$Message.info("Clicked cancel");
            }
          });
          break;
      }
    },
    custom() {
      this.$Modal.confirm({
        title: "Title",
        content: "<p>Content of dialog</p><p>Content of dialog</p>",
        okText: "OK",
        cancelText: "Cancel"
      });
    },
    async() {
      this.$Modal.confirm({
        title: "Title",
        content: "<p>The dialog box will be closed after 2 seconds</p>",
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.info("Asynchronously close the dialog box");
          }, 2000);
        }
      });
    },
    handleRender () {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
            value: this.value
          },
          attrs: {
            autofocus: true,
            placeholder: '请输入你的名字...'
          },
          on: {
              input: (val) => {
                this.value = val;
              }
            }
          })
        }
      })
    }
  }
};
</script>
<style lang="less">
.vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
  .x-modal_content {
    top: 0;
  }
}
</style>