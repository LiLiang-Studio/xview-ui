import { isUrl } from './tools'
export const link = {
  props: {
    to: [String, Object],
    replace: Boolean,
    target: String,
    append: Boolean
  },
  methods: {
    getLinkProps() {
      let { to, target, replace, append } = this
      return to ? isUrl(to) || target ? { is: 'a', target, href: to } : { is: 'RouterLink', to, replace, append } : null
    }
  }
}