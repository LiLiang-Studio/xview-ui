import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from '../pages/HomeRouter.vue'

Vue.use(Router)

const coms = {
  List: () => import('../pages/List.vue'),
  Grid: () => import('../pages/Grid.vue'),
  Drawer: () => import('../pages/Drawer.vue'),
  Notice: () => import('../pages/Notice.vue'),
  Message: () => import('../pages/Message.vue'),
  Scroll: () => import('../pages/Scroll.vue'),
  Spin: () => import('../pages/Spin.vue'),
  LoadingBar: () => import('../pages/LoadingBar.vue'),
  Radio: () => import('../pages/Radio.vue'),
  Steps: () => import('../pages/Steps.vue'),
  Collapse: () => import('../pages/Collapse.vue'),
  Progress: () => import('../pages/Progress.vue'),
  Checkbox: () => import('../pages/Checkbox.vue'),
  Rate: () => import('../pages/Rate.vue'),
  ISwitch: () => import('../pages/Switch.vue'),
  Timeline: () => import('../pages/Timeline.vue'),
  Split: () => import('../pages/Split.vue'),
  Cell: () => import('../pages/Cell.vue'),
  Divider: () => import('../pages/Divider.vue'),
  Breadcrumb: () => import('../pages/Breadcrumb.vue'),
  Card: () => import('../pages/Card.vue'),
  Time: () => import('../pages/Time.vue'),
  ICircle: () => import('../pages/ICircle.vue'),
  Tag: () => import('../pages/Tag.vue'),
  Alert: () => import('../pages/Alert.vue'),
  Avatar: () => import('../pages/Avatar.vue'),
  BackTop: () => import('../pages/BackTop.vue'),
  Affix: () => import('../pages/Affix.vue'),
  Badge: () => import('../pages/Badge.vue'),
  Button: () => import('../pages/Button.vue'),
  Icon: () => import('../pages/Icon.vue'),

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
  Select: () => import('../pages/Select.vue'),
  InputNumber: () => import('../pages/InputNumber.vue'),
  Transfer: () => import('../pages/Transfer.vue'),
  Tabs: () => import('../pages/Tabs.vue'),
  Input: () => import('../pages/Input.vue'),
  Modal: () => import('../pages/Modal.vue'),
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