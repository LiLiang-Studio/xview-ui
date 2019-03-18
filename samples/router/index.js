import Vue from 'vue'
import Router from 'vue-router'

const _require = name => require(`../pages/${name}.vue`).default

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/samples/',
  routes: [
    {
      path: '/',
      component: _require('HomeRouter'),
      children: [
        { path: '', redirect: 'Alert' },
        { path: 'Alert', name: 'Alert', component: _require('Alert') },
        { path: 'Avator', name: 'Avator', component: _require('Avator') },
        { path: 'BackTop', name: 'BackTop', component: _require('BackTop') },
        { path: 'Badge', name: 'Badge', component: _require('Badge') },
        { path: 'Button', name: 'Button', component: _require('Button') },
        { path: 'ButtonGroup', name: 'ButtonGroup', component: _require('ButtonGroup') },
        { path: 'Icon', name: 'Icon', component: _require('Icon') },
        { path: 'Input', name: 'Input', component: _require('Input') },
        { path: 'Message', name: 'Message', component: _require('Message') },
        { path: 'Notice', name: 'Notice', component: _require('Notice') },
        { path: 'Tag', name: 'Tag', component: _require('Tag') }
      ]
    }
  ]
})