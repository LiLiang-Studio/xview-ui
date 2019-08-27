import './styles/ionicons.css'
import './styles/base.less'
import './utils/polyfill'

/**
 * 新版本组件导入
 */
import * as tools from './tools'
// 图标
import Icon from './components/icon'
// 头像
import Avatar from './components/avatar'
// 卡片
import Card from './components/card'
// 警告提示
import Alert from './components/alert'
// 微标
import Badge from './components/badge'
// 评分
import Rate from './components/rate'
// 通知和消息提醒
import { createNotice, createMessage } from './components/notice'
// 进度环
import ICircle from './components/circle'
// 面包屑导航
import { Breadcrumb, BreadcrumbItem } from './components/breadcrumb'
// 时间线
import { Timeline, TimelineItem } from './components/timeline'
// 加载中
import Spin, { spinService } from './components/spin'
// 步骤条
import { Steps, Step } from './components/step'
// 图钉
import Affix from './components/affix'
// 网格布局
import { Row, Col } from './components/grid'
// 回到顶部
import BackTop from './components/back-top'
// 进度条
import Progress from './components/progress'
// 加载条
import loadingBarService from './components/loading-bar'
// 按钮
import { Button, ButtonGroup } from './components/button'
// 分割线
import Divider from './components/divider'
// 开关
import ISwitch from './components/switch'
// 无限滚动
import Scroll from './components/scroll'

// 复选框
import Checkbox from './components/checkbox/Checkbox.vue'
import CheckboxGroup from './components/checkbox/CheckboxGroup.vue'
// 文本输入框
import Input from './components/Input.vue'
// 标签
import Tag from './components/Tag.vue'
// 折叠面板
import Collapse from './components/collapse/Collapse.vue'
import Panel from './components/collapse/Panel.vue'
// 轮播切换
import Swiper from './components/swiper/Swiper.vue'
import SwiperItem from './components/swiper/SwiperItem.vue'
// 布局
import Layout from './components/layout/Layout.vue'
import Header from './components/layout/Header.vue'
import Content from './components/layout/Content.vue'
import Footer from './components/layout/Footer.vue'
import Sider from './components/layout/Sider.vue'
// 单选按钮
import Radio from './components/radio/Radio.vue'
import RadioGroup from './components/radio/RadioGroup.vue'
// 标签页
import Tabs from './components/tabs/Tabs.vue'
import TabPane from './components/tabs/TabPane.vue'
// 穿梭框
import Transfer from './components/Transfer.vue'
// 数值输入框
import InputNumber from './components/InputNumber.vue'
// 下拉选择框
import Select from './components/select/Select.vue'
import Option from './components/select/Option.vue'
import OptionGroup from './components/select/OptionGroup.vue'
// 分页器
import Page from './components/Page.vue'
// 下拉菜单
import Dropdown from './components/dropdown/Dropdown.vue'
import DropdownMenu from './components/dropdown/DropdownMenu.vue'
import DropdownItem from './components/dropdown/DropdownItem.vue'
// 菜单
import Menu from './components/menu/Menu.vue'
import MenuItem from './components/menu/MenuItem.vue'
import Submenu from './components/menu/Submenu.vue'
import MenuGroup from './components/menu/MenuGroup.vue'
// 文字提示
import Tooltip from './components/Tooltip.vue'
// 气泡提示
import Poptip from './components/Poptip.vue'
// 树形控件
import Tree from './components/tree/Tree.vue'
// 表格
import Table from './components/table/Table.vue'
// 滑块
import Slider from './components/Slider.vue'
// 表单
import Form from './components/form/Form.vue'
// 表单项
import FormItem from './components/form/FormItem.vue'
// 自动补全
import AutoComplete from './components/AutoComplete.vue'
// 日期选择器
import DatePicker from './components/picker/DatePicker.vue'
// 时间选择器
import TimePicker from './components/picker/TimePicker.vue'

import { createDirectives } from './directives'
// 模态框
import { createModal } from './components/modal'
import Modal from './components/modal/Modal.vue'

const comps = {
  Icon,
  Avatar,
  Card,
  Alert,
  Badge,
  Rate,
  ICircle,
  Breadcrumb,
  BreadcrumbItem,
  Timeline,
  TimelineItem,
  Spin,
  Step,
  Steps,
  Affix,
  Row,
  Col,
  BackTop,
  Progress,
  Button,
  ButtonGroup,
  Divider,
  ISwitch,
  Scroll,

  Checkbox,
  CheckboxGroup,
  Input,
  Tag,
  Collapse,
  Panel,
  Modal,
  Swiper,
  SwiperItem,
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Radio,
  RadioGroup,
  Tabs,
  TabPane,
  Transfer,
  InputNumber,
  Select,
  Option,
  OptionGroup,
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
    Vue.prototype.$uiTools = tools
    Vue.prototype.$Notice = createNotice(Vue)
    Vue.prototype.$Message = createMessage(Vue)
    Vue.prototype.$Spin = spinService(Vue)
    Vue.LoadingBar = Vue.prototype.$Loading = loadingBarService(Vue)
    let prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui'
    for (let name in comps) Vue.component(prefix + name, comps[name])

    // // 标准对话框
    Vue.prototype.$Modal = createModal(Vue)
    // // 全局指令
    createDirectives(Vue)
  }
}