<template>
  <div class="ui-page" :class="[size, {simple}]">
    <ul v-if="simple" class="ui-page-list simple">
      <li class="ui-page-arrow prev" :class="{disabled: disabledPrev}" @click="toPrev">
        <UiIcon type="ios-arrow-left"/>
      </li>
      <div class="ui-page-input">
        <UiInput size="small" v-model="inputValue" @on-enter="toInputPage"/>
        <span>/</span> {{pageCount}}
      </div>
      <li class="ui-page-arrow next" :class="{disabled: disabledNext}" @click="toNext">
        <UiIcon type="ios-arrow-right"/>
      </li>
    </ul>
    <template v-else>
      <span v-if="showTotal" class="ui-page-count">
        <slot>共 {{total}} 条</slot>
      </span>
      <ul class="ui-page-list">
        <li class="ui-page-arrow prev" :class="{disabled: disabledPrev}" @click="toPrev">
          <UiIcon type="ios-arrow-left"/>
        </li>
        <template v-if="currentPage >= 5">
          <li :class="{active: currentPage === 1}" @click="toPage(1)">1</li>
          <li class="ui-page-more" title="向前5页" @click="toPrev5">
            <UiIcon type="ios-arrow-left"/>
            <UiIcon type="ios-arrow-left"/>
            <UiIcon class="icon-more" type="ios-more"/>
          </li>
        </template>
        <li v-for="item in showPages" :key="item" :class="{active: currentPage === item}" @click="toPage(item)">{{item}}</li>
        <template v-if="pageCount - currentPage >= 4">
          <li class="ui-page-more" title="向后5页" @click="toNext5">
            <UiIcon type="ios-arrow-right"/>
            <UiIcon type="ios-arrow-right"/>
            <UiIcon class="icon-more" type="ios-more"/>
          </li>
          <li :class="{active: currentPage === pageCount}" @click="toPage(pageCount)">{{pageCount}}</li>
        </template>
        <li class="ui-page-arrow next" :class="{disabled: disabledNext}" @click="toNext">
          <UiIcon type="ios-arrow-right"/>
        </li>
      </ul>
      <ui-select v-if="showSizer" class="ui-page-sizer" v-model="limit" :size="size">
        <UiOption v-for="item in pageSizeOpts" :key="item" :value="item" :label="`${item} 条/页`"/>
      </ui-select>
      <div v-if="showElevator" class="ui-page-input">
        跳至<UiInput :size="size" v-model="inputValue" @on-enter="toInputPage"/>页
      </div>
    </template>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiInput from '../input'
import UiSelect from '../select'
import UiOption from '../option'
export default {
  components: { UiIcon, UiSelect, UiOption, UiInput },
  data() {
    return {
      limit: this.pageSize,
      currentPage: this.current,
      inputValue: this.current
    }
  },
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default: () => [10, 20, 30, 40]
    },
    placement: {
      default: 'bottom',
      validator(value) {
        return ['bottom', 'top'].indexOf(value) !== -1
      }
    },
    size: {
      validator(value) {
        return value === 'small'
      }
    },
    simple: Boolean,
    showTotal: Boolean,
    showElevator: Boolean,
    showSizer: Boolean
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total / this.limit)
    },
    disabledPrev() {
      return this.currentPage === 1
    },
    disabledNext() {
      return this.currentPage === this.pageCount
    },
    showPages() {
      let { currentPage, pageCount } = this
      let nums = []
      if (currentPage < 5) {
        for (let i = 1; i <= currentPage; i++) nums.push(i)
      } else {
        nums = [currentPage - 2, currentPage - 1, currentPage]
      }
      if (pageCount - currentPage <= 3) {
        for (let i = currentPage + 1; i <= pageCount; i++) nums.push(i)
      } else {
        nums.push(...[currentPage + 1, currentPage + 2])
      }
      return nums
    }
  },
  watch: {
    limit(newVal) {
      this.toPage(1)
      this.$emit('on-page-size-change', newVal)
    }
  },
  methods: {
    toPage(page) {
      this.currentPage = page
      this.$emit('update:current', page)
      this.$emit('on-change', page)
    },
    toPrev() {
      !this.disabledPrev && this.toPage(this.currentPage - 1)
    },
    toNext() {
      !this.disabledNext && this.toPage(this.currentPage + 1)
    },
    toPrev5() {
      this.toPage(Math.max(this.currentPage - 5, 1))
    },
    toNext5() {
      this.toPage(Math.min(this.currentPage + 5, this.pageCount))
    },
    toInputPage() {
      let inputValue = +this.inputValue
      if (isNaN(inputValue) || inputValue < 1) {
        this.toPage(1)
        this.inputValue = 1
      } else if (inputValue > this.pageCount) {
        this.toPage(this.pageCount)
        this.inputValue = this.pageCount
      } else {
        this.toPage(inputValue)
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-page-list {
  display: inline-block;
  li {
    list-style: none;
    cursor: pointer;
    user-select: none;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    color: #666;
    border: 1px solid @border-color;
    border-radius: 4px;
    transition: border .2s ease-in-out;
    line-height: @form-control-normal - 2px;
    height: @form-control-normal;
    min-width: @form-control-normal;
    margin-right: 5px;
    &:hover:not(.disabled):not(.active) {
      color: @primary-color;
    }
    &.active:not(.disabled), &:hover:not(.disabled):not(.ui-page-more) {
      border-color: @primary-color;
    }
    &.active {
      color: #fff;
      background-color: @primary-color;
    }
    &.disabled {
      cursor: not-allowed;
      color: #ccc;
    }
    &.ui-page-arrow {
      font-size: 14px;
      &.prev {
        margin-right: 10px;
      }
      &.next {
        margin-left: 5px;
      }
      .ui-icon {
        line-height: @form-control-normal - 2px;
      }
    }
    &.ui-page-more {
      position: relative;
      .icon-more {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-radius: 4px;
        font-size: 20px;
        color: #ccc;
      }
      &:hover {
        .icon-more {
          display: none;
        }
      }
    }
  }
}

.ui-page-count {
  margin-right: 15px;
}

.ui-page {
  .ui-page-sizer, .ui-page-input {
    width: auto;
    margin-left: 15px;
    display: inline-block;
    vertical-align: middle;
  }
  .ui-page-input {
    .ui-input {
      width: 50px;
      margin: 0 10px;
    }
  }
  &.small, &.simple {
    .ui-page-list li {
      border: none;
      min-width: @form-control-small;
      height: @form-control-small;
      line-height: @form-control-small - 2px;
      &.ui-page-arrow .ui-icon {
        line-height: @form-control-small - 2px;
      }
    }
  }
  &.simple {
    .ui-page-input {
      margin-left: 0;
      .ui-input {
        margin: 0;
        width: 40px;
      }
      > span {
        padding: 0 8px;
      }
    }
  }
}
</style>