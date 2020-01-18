<template>
  <div>
    <div class="page-title">Modal 对话框</div>

    <div class="page-sub-title">最简单的使用方法，通过控制属性visible来显示 / 隐藏对话框。可以使用 v-model 实现双向绑定。</div>
    <Button type="primary" @click="modal1 = true">显示对话框</Button>
    <Modal v-model="modal1" middle title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
      <p>对话框内容</p>
      <p>对话框内容</p>
      <p>对话框内容</p>
    </Modal>

    <div class="page-sub-title">
      Modal 组件提供了灵活的自定义样式 API 和 Slot，可以自由控制整个 Modal 的各个组成部分，
      比如页头、页脚、关闭按钮。通过和其它组件的交互，能实现更复杂的功能，满足了大多业务场景。。
    </div>
    <Button @click="modal2 = true">Custom header and footer</Button>
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
    <Button @click="modal3 = true">No title bar</Button>
    <Modal v-model="modal3">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
    <Button @click="modal4 = true">Internationalization</Button>
    <Modal v-model="modal4" title="Modal Title" ok-text="OK" cancel-text="Cancel">
      <p>Something...</p>
      <p>Something...</p>
      <p>Something...</p>
    </Modal>
    <Button @click="modal5 = true">Set the width</Button>
    <Modal v-model="modal5" title="Custom width" width="300">
      <p>Customize width, unit px, default 520px.</p>
      <p>
        The width of the dialog box is responsive, and the width becomes
        <code>auto</code> when the screen size is less than 768px.
      </p>
    </Modal>

    <div class="page-sub-title">
      给Modal添加属性loading后，点击确定按钮对话框不会自动消失，
      并显示 loading 状态，需要手动关闭对话框，常用于表单提交。
    </div>
    <Button type="primary" @click="modal6 = true">Display dialog box</Button>
    <Modal v-model="modal6" title="Title" :loading="loading" @on-ok="asyncOK">
      <p>After you click ok, the dialog box will close in 2 seconds.</p>
    </Modal>

    <div class="page-sub-title">可以禁用关闭和遮罩层关闭</div>
    <Button @click="modal7 = true">Disable upper right corner (including Esc key)</Button>
    <Modal title="Title" v-model="modal7" :closable="false">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
    <Button @click="modal8 = true">Disable mask layer closure</Button>
    <Modal title="Title" v-model="modal8" :mask-closable="false">
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>

    <div class="page-sub-title">
      除了上述通过标准组件的使用方法，我还精心封装了一些实例方法，用来创建一次性的轻量级对话框。
      实例以隐式创建 Vue 组件的方式在全局创建一个对话框，并在消失时移除，所以同时只能操作一个对话框。
    </div>
    <Button @click="instance('info')">Info</Button>
    <Button @click="instance('success')">Success</Button>
    <Button @click="instance('warning')">Warning</Button>
    <Button @click="instance('error')">Error</Button>
    <div class="page-sub-title">快速弹出确认对话框，并且可以自定义按钮文字及异步关闭。</div>
    <Button @click="instance('confirm')">Confirm</Button>
    <Button @click="custom">Custom button text</Button>
    <Button @click="async">Asynchronous closing</Button>
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
      modal8: false
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
    }
  }
};
</script>
