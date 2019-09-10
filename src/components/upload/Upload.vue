<template>
  <div :class="prefix">
    <input type="file" ref="File" v-show="false" :disabled="disabled" :multiple="multiple" :accept="accept" @change="onFileChange">
    <div :class="`${prefix}-${type}`" @click="selectFile">
      <slot></slot>
    </div>
    <ul v-if="showUploadList" :class="`${prefix}-list`">
      <li v-for="item in fileList" :key="item.key">
        <div :class="`${prefix}-finish`">
          <ui-icon type="document"/>
          <span :class="`${prefix}-filename`" @click="previewItem">{{item.name}}</span>
          <b :class="`${prefix}-spring`"></b>
          <ui-close-icon-button :class="`${prefix}-remove`" size="18" @click="removeItem(item)"/>
        </div>
        <transition :name="`${prefix}-progressbar`">
          <ui-progress v-if="item.showProgress" 
            :class="`${prefix}-progressbar`" :strokeWidth="2" :percent="item.percentage" :status="item.status"/>
        </transition>
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
let incKey = 0
export default {
  name: 'UiUpload',
  components: { UiIcon, UiProgress, UiCloseIconButton },
  data() {
    return {
      prefix: 'ui-upload',
      fileList: []
    }
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
  watch: {
    defaultFileList: {
      immediate: true,
      handler(newval) {
        this.fileList = newval.map(_ => ({
          ..._, 
          key: incKey++,
          showProgress: false,
          status: 'success'
        }))
      }
    }
  },
  methods: {
    selectFile() {
      this.$refs.File.click()
    },
    onFileChange(e) {
      let files = Array.prototype.slice.call(e.target.files)
      files.forEach(file => this.validFormat(file) && this.validSize(file) && this.upload(file))
      this.$nextTick(() => e.target.value = '')
    },
    validFormat(file) {
      if (this.format.length) {
        let fileFormat = file.name.split('.').pop().toLowerCase()
        if (this.format.every(_ => _.toLowerCase() !== fileFormat)) {
          this.onFormatError && this.onFormatError(file, this.fileList)
          return false
        }
      }
      return true
    },
    validSize(file) {
      if (this.maxSize && file.size > this.maxSize * 1024) {
        this.onExceededSize && this.onExceededSize(file, this.fileList)
        return false
      }
      return true
    },
    upload(file) {
      const fileItem = {
        file,
        percentage: 0,
        key: incKey++,
        name: file.name,
        status: 'normal',
        showProgress: true
      }
      this.fileList.push(fileItem)
      const formData = new FormData()
      formData.append(this.name, file)
      this.data && Object.keys(this.data).forEach(_ => formData.append(_, this.data[_]))
      const xhr = new XMLHttpRequest()
      xhr.onprogress = e => {
        if (e.total > 0) {
          fileItem.percentage = e.loaded / e.total * 100
        }
        this.onProgress && this.onProgress(e, fileItem, this.fileList)
      }
      xhr.onload = () => {
        if (xhr.status < 200 && xhr.status >= 300) {
          fileItem.status = 'wrong'
          fileItem.showProgress = false
          this.fileList.splice(this.fileList.indexOf(fileItem), 1)
          return this.onError && this.onError(new Error(`fail to post ${this.action} ${xhr.status}'`), fileItem, this.fileList)
        }
        fileItem.percentage = 100
        fileItem.status = 'success'
        fileItem.showProgress = false
        fileItem.response = xhr.response
        this.onSuccess && this.onSuccess(xhr.response, fileItem, this.fileList)
      }
      xhr.onerror = err => {
        fileItem.percentage = 100
        fileItem.status = 'wrong'
        fileItem.showProgress = false
        this.fileList.splice(this.fileList.indexOf(fileItem), 1)
        this.onError && this.onError(err)
      }
      xhr.open('post', this.action, true)
      xhr.withCredentials = this.withCredentials
      Object.keys(this.headers).forEach(_ => xhr.setRequestHeader(_, headers[_]))
      xhr.send(formData)
    },
    removeItem(item) {
      this.fileList.splice(this.fileList.indexOf(item), 1)
      this.onRemove && this.onRemove(item, this.fileList)
    },
    previewItem(item) {
      this.onPreview && this.onPreview(item)
    },
    clearFiles() {
      this.fileList = []
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
    margin: 0 5px;
    cursor: pointer;
    transition: color .2s ease;
  }
  &-finish:hover &-filename {
    color: @primary-color;
  }
  &-spring {
    flex: 1;
  }
  &-progressbar {
    transition: opacity .3s ease .3s;
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>