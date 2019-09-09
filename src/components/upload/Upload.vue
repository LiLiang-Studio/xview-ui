<template>
  <div :class="prefix">
    <input type="file" ref="File" v-show="false" :multiple="multiple" :accept="accept">
    <div :class="`${prefix}-trigger`" @click="selectFile">
      <slot></slot>
    </div>
    <div v-if="hasTip" :class="`${prefix}-tip`">
      <slot name="tip"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UiUpload',
  data() {
    return { prefix: 'ui-upload' }
  },
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    multiple: Boolean,
    paste: Boolean,
    disabled: Boolean,
    data: Object,
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: Boolean,
    showUploadList: {
      type: Boolean,
      default: true
    },
    type: {
      default: 'select',
      validator(value) {
        return ['select', 'drag'].indexOf(value) !== -1
      }
    },
    accept: String,
    format: {
      type: Array,
      default: () => []
    },
    maxSize: Number,
    beforeUpload: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    onPreview: Function,
    onRemove: Function,
    onFormatError: Function,
    onExceededSize: Function,
    defaultFileList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    hasTip() {
      return this.$slots.tip !== undefined
    }
  },
  methods: {
    selectFile() {
      if (!this.disabled) this.$refs.File.click()
    }
  }
}
</script>
<style lang="less">
.ui-upload {
  &-trigger {
    display: inline-block;
  }
  &-tip {
    margin-top: 8px;
  }
}
</style>