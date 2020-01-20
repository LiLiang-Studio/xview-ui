/**
 * 全局指令模块
 */

import createEventDirective from './eventDirective'

export function directives(Vue) {
  createEventDirective(Vue, 'winclick', window, 'click')
  createEventDirective(Vue, 'winscroll', window, 'scroll')
  createEventDirective(Vue, 'winresize', window, 'resize')
}