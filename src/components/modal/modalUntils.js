/**
 * 对话框工具模块
 */

export function getDefaultProps() {
  return {
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    scrollable: Boolean,
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    width: {
      type: [Number, String],
      default: 520
    },
    styles: Object,
    className: String,
    maskClosable: {
      type: Boolean,
      default: true
    },
    middle: Boolean
  }
}