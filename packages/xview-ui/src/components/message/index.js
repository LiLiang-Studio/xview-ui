import creator from '../notice/creator'
import XMessage from './Message.vue'

export default creator(XMessage, null, {
  loading(addNotice, options, getVM) {
    let key = addNotice(options, 'loading')
    return () => getVM().removeItem(key)
  }
})