import './styles/ionicons.css'
import './styles/base.less'
import './utils/polyfill'
import { NoticeManager } from './utils/vueFunc'
import { createModal } from './components/modal'
import { createDirectives } from './directives'

/**
 * 新版本组件导入
 */

import methods from './methods'

// 图标
import Icon from './components/icon'
// 头像
import Avatar from './components/avatar'
// 卡片
import Card from './components/card'
// 警告提示
import Alert from './components/alert'


// // 回到顶部
import BackTop from './components/BackTop.vue'
// // 微标
import Badge from './components/Badge.vue'
// // 按钮
import Button from './components/button/Button.vue'
import ButtonGroup from './components/button/ButtonGroup.vue'
// // 复选框
import Checkbox from './components/checkbox/Checkbox.vue'
import CheckboxGroup from './components/checkbox/CheckboxGroup.vue'

// // 文本输入框
import Input from './components/Input.vue'
// // 进度条
import Progress from './components/Progress.vue'
// // 标签
import Tag from './components/Tag.vue'
// // 时间线
import Timeline from './components/timeline/Timeline.vue'
import TimelineItem from './components/timeline/TimelineItem.vue'
// // 折叠面板
import Collapse from './components/collapse/Collapse.vue'
import Panel from './components/collapse/Panel.vue'
// // 面包屑导航
import Breadcrumb from './components/breadcrumb/Breadcrumb.vue'
import BreadcrumbItem from './components/breadcrumb/BreadcrumbItem.vue'
// // 轮播切换
import Swiper from './components/swiper/Swiper.vue'
import SwiperItem from './components/swiper/SwiperItem.vue'
// // 网格布局
import Row from './components/grid/Row.vue'
import Col from './components/grid/Col.vue'
// // 布局
import Layout from './components/layout/Layout.vue'
import Header from './components/layout/Header.vue'
import Content from './components/layout/Content.vue'
import Footer from './components/layout/Footer.vue'
import Sider from './components/layout/Sider.vue'
// // 单选按钮
import Radio from './components/radio/Radio.vue'
import RadioGroup from './components/radio/RadioGroup.vue'
// // 开关
import ISwitch from './components/ISwitch.vue'
// // 标签页
import Tabs from './components/tabs/Tabs.vue'
import TabPane from './components/tabs/TabPane.vue'
// // 穿梭框
import Transfer from './components/Transfer.vue'
// // 评分
import Rate from './components/Rate.vue'
// // 数值输入框
import InputNumber from './components/InputNumber.vue'
// // 下拉选择框
import Select from './components/select/Select.vue'
import Option from './components/select/Option.vue'
import OptionGroup from './components/select/OptionGroup.vue'
// // 步骤条
import Step from './components/step/Step.vue'
import Steps from './components/step/Steps.vue'
// // 进度环
import ICircle from './components/ICircle.vue'
// // 无限滚动
import Scroll from './components/scroll/Scroll.vue'
// // 图钉
import Affix from './components/Affix.vue'
// // 分页器
import Page from './components/Page.vue'
// // 下拉菜单
import Dropdown from './components/dropdown/Dropdown.vue'
import DropdownMenu from './components/dropdown/DropdownMenu.vue'
import DropdownItem from './components/dropdown/DropdownItem.vue'
// // 菜单
import Menu from './components/menu/Menu.vue'
import MenuItem from './components/menu/MenuItem.vue'
import Submenu from './components/menu/Submenu.vue'
import MenuGroup from './components/menu/MenuGroup.vue'
// // 文字提示
import Tooltip from './components/Tooltip.vue'
// // 气泡提示
import Poptip from './components/Poptip.vue'
// // 树形控件
import Tree from './components/tree/Tree.vue'
// // 表格
import Table from './components/table/Table.vue'
// // 滑块
import Slider from './components/Slider.vue'
// // 表单
import Form from './components/form/Form.vue'
// // 表单项
import FormItem from './components/form/FormItem.vue'
// // 自动补全
import AutoComplete from './components/AutoComplete.vue'
// // 日期选择器
import DatePicker from './components/picker/DatePicker.vue'
// // 时间选择器
import TimePicker from './components/picker/TimePicker.vue'

// // 消息提示
import Message from './components/Message.vue'
// 通知提醒
import Notice from './components/Notice.vue'
// // 模态框
import Modal from './components/modal/Modal.vue'
// // 加载中
import Spin, { createSpin } from './components/spin'
// // 加载条
import { createLoadingBar } from './components/loading-bar'

const comps = {
  Icon,
  Avatar,
  Card,
  Alert,

  BackTop,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Input,
  Progress,
  Tag,
  Timeline,
  TimelineItem,
  Collapse,
  Panel,
  Modal,
  Breadcrumb,
  BreadcrumbItem,
  Swiper,
  SwiperItem,
  Row,
  Col,
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Radio,
  RadioGroup,
  ISwitch,
  Tabs,
  TabPane,
  Spin,
  Transfer,
  Rate,
  InputNumber,
  Select,
  Option,
  OptionGroup,
  Step,
  Steps,
  ICircle,
  Scroll,
  Affix,
  Page,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Submenu,
  MenuGroup,
  Tooltip,
  Poptip,
  Tree,
  Table,
  Slider,
  Form,
  FormItem,
  AutoComplete,
  DatePicker,
  TimePicker
}

export default {
  /**
   * 安装插件
   * @param {import('vue').VueConstructor} Vue 
   * @param {Object} options 
   */
  install(Vue, options = {}) {
    Vue.prototype.$uiTools = methods
    let prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui'
    for (let name in comps) Vue.component(prefix + name, comps[name])

    // 消息提醒对象
    Vue.prototype.$Message = new NoticeManager(Vue, Message, 'ui-message-wrapper')
    // // 通知提醒对象
    Vue.prototype.$Notice = new NoticeManager(Vue, Notice, 'ui-notice-wrapper', { duration: 4.5 })
    // // 标准对话框
    Vue.prototype.$Modal = createModal(Vue)
    // // 加载中对象
    Vue.prototype.$Spin = createSpin(Vue)
    // // 加载条对象
    Vue.LoadingBar = Vue.prototype.$Loading = createLoadingBar(Vue)
    // // 全局指令
    createDirectives(Vue)
  }
}