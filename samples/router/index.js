import Vue from 'vue'
import Router from 'vue-router'

const _require = name => require(`../pages/${name}.vue`).default

Vue.use(Router)

export const routeArray = [
  'InputNumber',
  'Rate',
  'Transfer',
  'Spin',
  'Tabs',
  'Switch',
  'Radio',
  'Grid',
  'Layout',
  'Swiper',
  'Alert',
  'Avator',
  'BackTop',
  'Badge',
  'Button',
  'Card',
  'Checkbox',
  'Icon',
  'Input',
  'Message',
  'Notice',
  'Progress',
  'Tag',
  'Timeline',
  'Collapse',
  'Modal',
  'Breadcrumb'
]

export default new Router({
  // mode: 'history',
  base: '/samples',
  routes: [
    { path: '/', redirect: '/samples' },
    {
      path: '/samples',
      component: _require('HomeRouter'),
      children: [
        { path: '', redirect: routeArray[0] },
        ...routeArray.map(_ => ({ path: _, name: _, component: _require(_) }))
      ]
    }
  ]
})