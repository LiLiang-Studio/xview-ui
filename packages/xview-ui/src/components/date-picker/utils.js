import { isBool } from '../../tools'

const S = String, B = Boolean, BTrue = { type: B, default: true }

export const genNums = len => Array.apply(null, { length: len }).map((_, i) => ({ val: (i < 10 ? '0' : '') + i }))

export const mixins = {
  props: {
    value: [Date, S, Array],
    format: S,
    placeholder: S,
    confirm: B,
    open: { type: B, default: null },
    size: S,
    disabled: B,
    clearable: BTrue,
    readonly: B,
    editable: BTrue,
    separator: { type: S, default: '-' },
    transfer: B,
    placement: { default: 'bottom-start' }
  },
  data() {
    return {
      visible: false,
      selectedValue: this.value
    }
  },
  computed: {
    inputProps() {
      return {
        size: this.size,
        disabled: this.disabled,
        clearable: this.clearable,
        readonly: this.readonly,
        placeholder: this.placeholder
      }
    },
    popperProps() {
      return {
        adaptive: false,
        visible: isBool(this.open) ? this.open : this.visible,
        transitionName: 'x-animate-dropdown'
      }
    },
    popperListeners() {
      return {
        clickoutside: this.toggle.bind(this, false),
        'on-popper-show': this.openChange.bind(this, true),
        'on-popper-hide': this.openChange.bind(this, false)
      }
    }
  },
  methods: {
    toggle(visible) {
      this.visible = visible === undefined ? !this.visible : visible
    },
    openChange(visible) {
      this.$emit('on-open-change', visible)
    },
    onClick() {
      if (this.disabled || (this.readonly && this.open === null)) return
      this.toggle(true)
    }
  }
}