export const propsMixin = {
  value: Date,
  placement: {
    default: 'bottom-start',
    validator(value) {
      return [
        'top', 'top-start', 'top-end',
        'right', 'right-start', 'right-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end'
      ]
    }
  },
  placeholder: String,
  confirm: Boolean,
  open: {
    type: Boolean,
    default: null
  },
  size: {
    validator(value) {
      return ['large', 'small', 'default'].indexOf(value) !== -1
    }
  },
  disabled: Boolean,
  clearable: {
    type: Boolean,
    default: true
  },
  readonly: Boolean,
  editable: {
    type: Boolean,
    default: true
  },
  elementId: String
}