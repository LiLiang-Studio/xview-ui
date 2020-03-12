export default {
  percent: {
    type: Number,
    default: 0
  },
  status: {
    default: 'normal',
    validator(value) {
      return ['normal', 'active', 'wrong', 'success'].indexOf(value) !== -1
    }
  },
  hideInfo: Boolean,
  textInside: Boolean
}