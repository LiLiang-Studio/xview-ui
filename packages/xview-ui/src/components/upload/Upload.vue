<template>
  <div :class="prefix">
    <input v-show="0" v-bind="inputProps" @change="onFileChange">
    <div :class="[`${prefix}_${type}`, {dragOver}]"
      @click="selectFile" @drop.prevent="onDrop" @dragover.prevent="dragOver = true" @dragleave.prevent="dragOver = false">
      <slot></slot>
    </div>
    <ul v-if="showUploadList" :class="`${prefix}_list`">
      <li v-for="_ in fileList" :key="_.key">
        <div :class="`${prefix}_finish`">
          <x-icon type="document"/>
          <span :class="`${prefix}_filename`" @click="previewItem">{{_.name}}</span>
          <b :class="`${prefix}_spring`"></b>
          <x-close-icon-button v-if="_.status !== 'normal'" :class="`${prefix}_remove`" size="18" @click="removeItem(_)"/>
        </div>
        <transition :name="`${prefix}_progress`">
          <x-progress v-if="_.showProgress" :class="`${prefix}_progress`" :strokeWidth="2" :percent="_.percent" :status="_.status"/>
        </transition>
      </li>
    </ul>
    <div v-if="$slots.tip" :class="`${prefix}_tip`">
      <slot name="tip"></slot>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
import XProgress from '../progress'
import XCloseIconButton from '../close-icon-button'
const B = Boolean, F = Function
let incKey = 0
export default {
  name: 'XUpload',
  components: { XIcon, XProgress, XCloseIconButton },
  props: {
    action: { type: String, required: true },
    headers: { type: Object, default: () => ({}) },
    disabled: B,
    data: Object,
    name: { type: String, default: 'file' },
    withCredentials: B,
    showUploadList: { type: B, default: true },
    type: { default: 'select', validator: v => ['select', 'drag'].indexOf(v) > -1 },
    format: { type: Array, default: () => [] },
    maxSize: Number,
    beforeUpload: F,
    onProgress: F,
    onSuccess: F,
    onError: F,
    onPreview: F,
    onRemove: F,
    onFormatError: F,
    onExceededSize: F,
    defaultFileList: { type: Array, default: () => [] }
  },
  data() {
    return { prefix: 'x-upload', fileList: [], dragOver: false }
  },
  computed: {
    inputProps() {
      return { ...this.$attrs, type: 'file', ref: 'File', disabled: this.disabled }
    }
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler(val) {
        this.fileList = val.map(_ => ({ ..._,  key: incKey++, status: 'success' }))
      }
    }
  },
  methods: {
    selectFile() {
      this.$refs.File.click()
    },
    onDrop(e) {
      this.dragOver = false
      if (!this.disabled) this.onFileChange(e)
    },
    onFileChange(e) {
      Array.from(e.target.files || e.dataTransfer.files).forEach(_ => this.validate(_) && this.upload(_))
      this.$nextTick(() => e.target.value = '')
    },
    validate(file) {
      if (this.format.length) {
        let fileFormat = file.name.split('.').pop().toLowerCase()
        if (this.format.indexOf(fileFormat) < 0) {
          this.onFormatError && this.onFormatError(file, this.fileList)
          return false
        }
      } else if (this.maxSize && file.size > this.maxSize * 1024) {
        this.onExceededSize && this.onExceededSize(file, this.fileList)
        return false
      }
      return true
    },
    onFail(e, item) {
      item.percent = 100
      item.status = 'wrong'
      item.showProgress = false
      this.fileList.splice(this.fileList.indexOf(item), 1)
      this.onError && this.onError(e, item, this.fileList)
    },
    upload(file) {
      const fileItem = {
        file,
        percent: 0,
        key: incKey++,
        name: file.name,
        status: 'normal'
      }
      if (this.beforeUpload) {
        let result = this.beforeUpload(file)
        if (result === false || result instanceof Promise) return
      }
      fileItem.showProgress = true
      this.fileList.push(fileItem)
      const formData = new FormData()
      formData.append(this.name, file)
      this.data && Object.keys(this.data).forEach(_ => formData.append(_, this.data[_]))
      const xhr = new XMLHttpRequest()
      xhr.onprogress = e => {
        if (e.total > 0) {
          fileItem.percent = e.loaded / e.total * 100
        }
        this.onProgress && this.onProgress(e, fileItem, this.fileList)
      }
      xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          return this.onFail(new Error(`fail to post ${this.action} ${xhr.status}`), fileItem)
        }
        fileItem.percent = 100
        fileItem.status = 'success'
        fileItem.showProgress = false
        fileItem.response = xhr.response
        this.onSuccess && this.onSuccess(xhr.response, fileItem, this.fileList)
      }
      xhr.onerror = e => this.onFail(e, fileItem)
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
.x-upload {
  &_select {
    display: inline-block;
  }
  &_drag {
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
    &.dragOver {
      border: 2px dashed @primary-color;
    }
  }
  &_tip, &_list {
    margin-top: 8px;
  }
  &_list {
    list-style: none;
  }
  &_finish {
    cursor: default;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    transition: all .2s ease;
    &:hover {
      background-color: darken(@bg-color, 2%);
    }
  }
  &_filename {
    margin: 0 5px;
    cursor: pointer;
    transition: color .2s ease;
  }
  &_finish:hover &_filename {
    color: @primary-color;
  }
  &_spring {
    flex: 1;
  }
  &_progress {
    transition: opacity .3s ease .3s;
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>