import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from '../pages/HomeRouter.vue'

Vue.use(Router)

export const routes = [
  {
    path: 'Icon',
    name: 'Icon',
    component: () => import('../pages/Icon.vue')
  },
  {
    path: 'Affix',
    name: 'Affix',
    component: () => import('../pages/Affix.vue')
  },
  {
    path: 'Alert',
    name: 'Alert',
    component: () => import('../pages/Alert.vue')
  },

  {
    path: 'Avatar',
    name: 'Avatar',
    component: () => import('../pages/Avatar.vue')
  },
  {
    path: 'DatePicker',
    name: 'DatePicker',
    component: () => import('../pages/DatePicker.vue')
  },
  {
    path: 'TimePicker',
    name: 'TimePicker',
    component: () => import('../pages/TimePicker.vue')
  },
  {
    path: 'AutoComplete',
    name: 'AutoComplete',
    component: () => import('../pages/AutoComplete.vue')
  },
  {
    path: 'Form',
    name: 'Form',
    component: () => import('../pages/Form.vue')
  },
  {
    path: 'Slider',
    name: 'Slider',
    component: () => import('../pages/Slider.vue')
  },
  {
    path: 'Table',
    name: 'Table',
    component: () => import('../pages/Table.vue')
  },
  {
    path: 'Tree',
    name: 'Tree',
    component: () => import('../pages/Tree.vue')
  },
  {
    path: 'Poptip',
    name: 'Poptip',
    component: () => import('../pages/Poptip.vue')
  },
  {
    path: 'Tooltip',
    name: 'Tooltip',
    component: () => import('../pages/Tooltip.vue')
  },
  {
    path: 'Menu',
    name: 'Menu',
    component: () => import('../pages/Menu.vue')
  },
  {
    path: 'Dropdown',
    name: 'Dropdown',
    component: () => import('../pages/Dropdown.vue')
  },
  {
    path: 'Page',
    name: 'Page',
    component: () => import('../pages/Page.vue')
  },
  {
    path: 'LoadingBar',
    name: 'LoadingBar',
    component: () => import('../pages/LoadingBar.vue')
  },
  {
    path: 'Scroll',
    name: 'Scroll',
    component: () => import('../pages/Scroll.vue')
  },
  {
    path: 'ICircle',
    name: 'ICircle',
    component: () => import('../pages/ICircle.vue')
  },
  {
    path: 'Steps',
    name: 'Steps',
    component: () => import('../pages/Steps.vue')
  },
  {
    path: 'Select',
    name: 'Select',
    component: () => import('../pages/Select.vue')
  },
  {
    path: 'InputNumber',
    name: 'InputNumber',
    component: () => import('../pages/InputNumber.vue')
  },
  {
    path: 'Rate',
    name: 'Rate',
    component: () => import('../pages/Rate.vue')
  },
  {
    path: 'Transfer',
    name: 'Transfer',
    component: () => import('../pages/Transfer.vue')
  },
  {
    path: 'Spin',
    name: 'Spin',
    component: () => import('../pages/Spin.vue')
  },
  {
    path: 'Tabs',
    name: 'Tabs',
    component: () => import('../pages/Tabs.vue')
  },
  {
    path: 'ISwitch',
    name: 'ISwitch',
    component: () => import('../pages/Switch.vue')
  },
  {
    path: 'Radio',
    name: 'Radio',
    component: () => import('../pages/Radio.vue')
  },
  {
    path: 'Grid',
    name: 'Grid',
    component: () => import('../pages/Grid.vue')
  },
  {
    path: 'Layout',
    name: 'Layout',
    component: () => import('../pages/Layout.vue')
  },
  {
    path: 'BackTop',
    name: 'BackTop',
    component: () => import('../pages/BackTop.vue')
  },
  {
    path: 'Badge',
    name: 'Badge',
    component: () => import('../pages/Badge.vue')
  },
  {
    path: 'Button',
    name: 'Button',
    component: () => import('../pages/Button.vue')
  },
  {
    path: 'Card',
    name: 'Card',
    component: () => import('../pages/Card.vue')
  },
  {
    path: 'Checkbox',
    name: 'Checkbox',
    component: () => import('../pages/Checkbox.vue')
  },
  {
    path: 'Input',
    name: 'Input',
    component: () => import('../pages/Input.vue')
  },
  {
    path: 'Message',
    name: 'Message',
    component: () => import('../pages/Message.vue')
  },
  {
    path: 'Notice',
    name: 'Notice',
    component: () => import('../pages/Notice.vue')
  },
  {
    path: 'Progress',
    name: 'Progress',
    component: () => import('../pages/Progress.vue')
  },
  {
    path: 'Tag',
    name: 'Tag',
    component: () => import('../pages/Tag.vue')
  },
  {
    path: 'Timeline',
    name: 'Timeline',
    component: () => import('../pages/Timeline.vue')
  },
  {
    path: 'Collapse',
    name: 'Collapse',
    component: () => import('../pages/Collapse.vue')
  },
  {
    path: 'Modal',
    name: 'Modal',
    component: () => import('../pages/Modal.vue')
  },
  {
    path: 'Breadcrumb',
    name: 'Breadcrumb',
    component: () => import('../pages/Breadcrumb.vue')
  },
  {
    path: 'Divider',
    name: 'Divider',
    component: () => import('../pages/Divider.vue')
  },
  {
    path: 'Cell',
    name: 'Cell',
    component: () => import('../pages/Cell.vue')
  },
  {
    path: 'Drawer',
    name: 'Drawer',
    component: () => import('../pages/Drawer.vue')
  },
  {
    path: 'Time',
    name: 'Time',
    component: () => import('../pages/Time.vue')
  },
  {
    path: 'Split',
    name: 'Split',
    component: () => import('../pages/Split.vue')
  },
  {
    path: 'Carousel',
    name: 'Carousel',
    component: () => import('../pages/Carousel.vue')
  },
  {
    path: 'Anchor',
    name: 'Anchor',
    component: () => import('../pages/Anchor.vue')
  },
  {
    path: 'Upload',
    name: 'Upload',
    component: () => import('../pages/Upload.vue')
  }
]

export default new Router({
  routes: [
    {
      path: '/',
      component: HomeRouter,
      children: [
        {
          path: '',
          redirect: { name: routes[0].name }
        }
      ].concat(routes)
    }
  ]
})