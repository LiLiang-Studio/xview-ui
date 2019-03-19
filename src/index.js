import './styles/ionicons.css'
import './styles/base.less'
import { NoticeManager } from './utils/vueFunc'

const _require = name => require(`./components/${name}`).default


const Message = _require('Message') // 消息提示组件
const Notice = _require('Notice') // 通知组件

const coms = {
  Alert: _require('Alert'), // 警告提示
  // AutoComplete: _require('AutoComplete'),
  Avator: _require('Avator'), // 头像
  BackTop: _require('BackTop'), // 返回顶部
  Badge: _require('Badge'), // 微标
  // Breadcrumb: _require('Breadcrumb'),
  Button: _require('Button'), // 按钮
  ButtonGroup: _require('ButtonGroup'), // 按钮组
  Card: _require('Card'), // 卡片
  // Cascader: _require('Cascader'),
  Checkbox: _require('Checkbox'), // 复选框
  CheckboxGroup: _require('CheckboxGroup'), // 复选框组
  // Collapse: _require('Collapse'),
  // ColorPicker: _require('ColorPicker'),
  // DatePicker: _require('DatePicker'),
  // Modal: _require('Modal'),
  // Dropdown: _require('Dropdown'),
  // Form: _require('Form'),
  // FormItem: _require('FormItem'),
  Icon: _require('Icon'), // 图标
  Input: _require('Input'), // 文本框
  // InputNumber: _require('InputNumber'),
  // Loading: _require('Loading'),
  // Menu: _require('Menu'),
  // MenuItem: _require('MenuItem'),
  // Option: _require('Option'),
  // Pager: _require('Pager'),
  // Poptip: _require('Poptip'),
  // Progress: _require('Progress'),
  // Radio: _require('Radio'),
  // Rate: _require('Rate'),
  // ScrollView: _require('ScrollView'),
  // Select: _require('Select'),
  // Slider: _require('Slider'),
  // Spinner: _require('Spinner'),
  // Swiper: _require('Swiper'),
  // SwiperItem: _require('SwiperItem'),
  // Switch: _require('Switch'),
  // Table: _require('Table'),
  // TabPanel: _require('TabPanel'),
  // Tabs: _require('Tabs'),
  Tag: _require('Tag'), // 标签
  Timeline: _require('Timeline'), // 时光轴
  TimelineItem: _require('TimelineItem'), // 时光轴item
  // TimePicker: _require('TimePicker'),
  // Tooltip: _require('Tooltip'),
  // Transfer: _require('Transfer'),
  // Tree: _require('Tree'),
  // Upload: _require('Upload')
}

export default {
  install(Vue, options = {}) {
    let prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui'
    for (let name in coms) Vue.component(prefix + name, coms[name])

    // 消息提醒对象
    Vue.prototype.$Message = new NoticeManager(Vue, Message, 'ui-message-wrapper')
    // 通知提醒对象
    Vue.prototype.$Notice = new NoticeManager(Vue, Notice, 'ui-notice-wrapper', { duration: 4.5 })
  }
}