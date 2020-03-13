import creator from './creator'
import XNotice from './Notice.vue'

export default creator(XNotice, { duration: 4.5 }, {
  open(addNotice, options) {
    addNotice(options, 'open')
  }
})