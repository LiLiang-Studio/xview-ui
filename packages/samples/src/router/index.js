import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from '../pages/HomeRouter.vue'

Vue.use(Router)

const coms = {
  Icon: () => import('../pages/Icon.vue'),
  Button: () => import('../pages/Button.vue'),
  Badge: () => import('../pages/Badge.vue'),
  Affix: () => import('../pages/Affix.vue'),
  BackTop: () => import('../pages/BackTop.vue'),
  Avatar: () => import('../pages/Avatar.vue'),
  Alert: () => import('../pages/Alert.vue'),

  Anchor: () => import('../pages/Anchor.vue'),
  // DatePicker: () => import('../pages/DatePicker.vue'),
  // TimePicker: () => import('../pages/TimePicker.vue'),
  AutoComplete: () => import('../pages/AutoComplete.vue'),
  Form: () => import('../pages/Form.vue'),
  Slider: () => import('../pages/Slider.vue'),
  Table: () => import('../pages/Table.vue'),
  Tree: () => import('../pages/Tree.vue'),
  Poptip: () => import('../pages/Poptip.vue'),
  Tooltip: () => import('../pages/Tooltip.vue'),
  Menu: () => import('../pages/Menu.vue'),
  Dropdown: () => import('../pages/Dropdown.vue'),
  Page: () => import('../pages/Page.vue'),
  LoadingBar: () => import('../pages/LoadingBar.vue'),
  Scroll: () => import('../pages/Scroll.vue'),
  ICircle: () => import('../pages/ICircle.vue'),
  Steps: () => import('../pages/Steps.vue'),
  Select: () => import('../pages/Select.vue'),
  InputNumber: () => import('../pages/InputNumber.vue'),
  Rate: () => import('../pages/Rate.vue'),
  Transfer: () => import('../pages/Transfer.vue'),
  Spin: () => import('../pages/Spin.vue'),
  Tabs: () => import('../pages/Tabs.vue'),
  ISwitch: () => import('../pages/Switch.vue'),
  Radio: () => import('../pages/Radio.vue'),
  Grid: () => import('../pages/Grid.vue'),
  Card: () => import('../pages/Card.vue'),
  Checkbox: () => import('../pages/Checkbox.vue'),
  Input: () => import('../pages/Input.vue'),
  Message: () => import('../pages/Message.vue'),
  Notice: () => import('../pages/Notice.vue'),
  Progress: () => import('../pages/Progress.vue'),
  Tag: () => import('../pages/Tag.vue'),
  Timeline: () => import('../pages/Timeline.vue'),
  Collapse: () => import('../pages/Collapse.vue'),
  Modal: () => import('../pages/Modal.vue'),
  Breadcrumb: () => import('../pages/Breadcrumb.vue'),
  Divider: () => import('../pages/Divider.vue'),
  Cell: () => import('../pages/Cell.vue'),
  Drawer: () => import('../pages/Drawer.vue'),
  Time: () => import('../pages/Time.vue'),
  Split: () => import('../pages/Split.vue'),
  Carousel: () => import('../pages/Carousel.vue'),
  Upload: () => import('../pages/Upload.vue')
}

export const routes = Object.keys(coms).map(_ => ({ path: _, name: _, component: coms[_] }))

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