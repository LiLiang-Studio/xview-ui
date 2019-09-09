<template>
  <div :class="prefix">
    <input type="file" ref="File" v-show="false" :disabled="disabled" :multiple="multiple" :accept="accept">
    <div :class="`${prefix}-${type}`" @click="selectFile">
      <slot></slot>
    </div>
    <ul v-if="showUploadList" :class="`${prefix}-list`">
      <li>
        <div :class="`${prefix}-finish`">
          <ui-icon type="document"/>
          <span :class="`${prefix}-filename`">wjianming.jpg</span>
          <ui-close-icon-button :class="`${prefix}-remove`" size="18"/>
        </div>
        <ui-progress :strokeWidth="2" :percent="40" :status="'success'"/>
      </li>
    </ul>
    <div v-if="hasTip" :class="`${prefix}-tip`">
      <slot name="tip"></slot>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiProgress from '../progress'
import UiCloseIconButton from '../close-icon-button'
export default {
  name: 'UiUpload',
  components: { UiIcon, UiProgress, UiCloseIconButton },
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
      this.$refs.File.click()
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-upload {
  &-select {
    display: inline-block;
  }
  &-drag {
    display: block;
    cursor: pointer;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    border: 1px dashed @border-color;
    transition: border-color .2s ease;
    &:hover {
      border-color: @primary-color;
    }
  }
  &-tip, &-list {
    margin-top: 8px;
  }
  &-list {
    list-style: none;
  }
  &-finish {
    cursor: default;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    transition: all .2s ease;
    &:hover {
      background-color: @disabled-bg-color;
    }
  }
  &-filename {
    flex: 1;
    margin: 0 5px;
  }
}
</style>