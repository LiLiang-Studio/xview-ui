import Vue from 'vue'
import Router from 'vue-router'

const _require = name => require(`../pages/${name}.vue`).default

Vue.use(Router)

const routeArray = [
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
  'Modal'
]

export default new Router({
  mode: 'history',
  base: '/samples/',
  routes: [
    {
      path: '/',
      component: _require('HomeRouter'),
      children: routeArray.map(_ => ({ path: _, name: _, component: _require(_) }))
    }
  ]
})