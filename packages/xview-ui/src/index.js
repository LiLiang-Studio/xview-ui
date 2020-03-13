import './styles/ionicons.css'
import './styles/base.less'

/**
 * 2020-03-07 开始新一轮优化
 */
import Icon from './components/icon' // 图标
import Button from './components/button' // 按钮
import ButtonGroup from './components/button-group' // 按钮组
import Badge from './components/badge' // 微标
import Affix from './components/affix' // 图钉
import BackTop from './components/back-top' // 回到顶部
import Avatar from './components/avatar' // 头像
import Alert from './components/alert' // 警告提示
import Tag from './components/tag' // 标签
import ICircle from './components/circle' // 进度环
import Time from './components/time' // 相对时间
import Card from './components/card' // 卡片
import Breadcrumb from './components/breadcrumb' // 面包屑
import BreadcrumbItem from './components/breadcrumb-item' // 面包屑项
import Divider from './components/divider' // 分割线
import Cell from './components/cell' // 单元格
import CellGroup from './components/cell-group' // 单元格组
import Split from './components/split' // 面板分割
import Timeline from './components/timeline' // 时间轴
import TimelineItem from './components/timeline-item' // 时间轴项
import ISwitch from './components/switch' // 开关
import Rate from './components/rate' // 评分
import Checkbox from './components/checkbox' // 复选框
import CheckboxGroup from './components/checkbox-group' // 复选框组
import Progress from './components/progress' // 进度条
import Collapse from './components/collapse' // 折叠面板
import Panel from './components/panel' // 折叠面板项
import Step from './components/step' // 步骤条
import Steps from './components/steps' // 步骤条项
import Radio from './components/radio' // 单选按钮
import RadioGroup from './components/radio-group' // 单选按钮组
import Scroll from './components/scroll' // 无限滚动
import Drawer from './components/drawer' // 抽屉

import loadingBarService from './components/loading-bar' // 加载条
import Spin, { spinService } from './components/spin' // 加载中
import Message from './components/message' // 消息
import Notice from './components/notice' // 通知

/**
 * 已再次优化的组件
 */
import Anchor from './components/anchor' // 锚点容器
import AnchorLink from './components/anchor-link' // 锚点

/**
 * 新版本组件导入
 */
import * as tools from './tools'
// 网格布局
import { Row, Col } from './components/grid'
// 布局
import Layout from './components/layout'
import Header from './components/header'
import Content from './components/content'
import Footer from './components/footer'
import Sider from './components/sider'
// 标签页
import Tabs from './components/tabs'
import TabPane from './components/tab-pane'
// 文本输入框
import Input from './components/input'
// 模态框
import Modal, { modalService } from './components/modal'
// 数值输入框
import InputNumber from './components/input-number'
// 穿梭框
import Transfer from './components/transfer'
// 树形控件
import Tree from './components/tree'
// 走马灯
import Carousel from './components/carousel'
import CarouselItem from './components/carousel-item'
// 上传
import Upload from './components/upload'
// 表单
import Form from './components/form'
import FormItem from './components/form-item'

// 颜色选择器
// import ColorPicker from './components/color-picker'
// // 级联选择
// import Cascader from './components/cascader'
// 下拉菜单
import Dropdown from './components/dropdown'
import DropdownItem from './components/dropdown-item'
import DropdownMenu from './components/dropdown-menu'
// 菜单
import Menu from './components/menu'
import Submenu from './components/submenu'
import MenuItem from './components/menu-item'
import MenuGroup from './components/menu-group'
// 下拉选择框
import Select from './components/select'
import Option from './components/option'
import OptionGroup from './components/option-group'
// 气泡提示
import Poptip from './components/poptip'
// 文字提示
import Tooltip from './components/tooltip'
// 滑块
import Slider from './components/slider'
// 分页器
import Page from './components/page'
// 自动完成
import AutoComplete from './components/auto-complete'

// 表格
import Table from './components/table/Table.vue'
// 日期选择器
// import DatePicker from './components/picker/DatePicker.vue'
// // 时间选择器
// import TimePicker from './components/picker/TimePicker.vue'

const comps = {
  Icon,
  Button,
  ButtonGroup,
  Badge,
  Affix,
  BackTop,
  Avatar,
  Alert,
  Tag,
  ICircle,
  Time,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Divider,
  Cell,
  CellGroup,
  Split,
  Timeline,
  TimelineItem,
  ISwitch,
  Rate,
  Checkbox,
  CheckboxGroup,
  Progress,
  Collapse,
  Panel,
  Step,
  Steps,
  Radio,
  RadioGroup,
  Spin,
  Scroll,
  Drawer,

  Row,
  Col,
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Tabs,
  TabPane,
  Input,
  Modal,
  InputNumber,
  Transfer,
  Tree,
  Carousel,
  CarouselItem,
  Anchor,
  AnchorLink,
  Upload,
  Form,
  FormItem,
  // Cascader,
  // ColorPicker,
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
  Table,
  Slider,
  AutoComplete
  // ,DatePicker,
  // TimePicker
}

/**
 * 安装插件
 * @param {import('vue').VueConstructor} Vue 
 * @param {Object} options 
 */
export default function (Vue, options = {}) {
  Vue.prototype.$uiTools = tools
  Vue.prototype.$Modal = modalService(Vue)

  Vue.prototype.$Notice = Notice
  Vue.prototype.$Message = Message
  Vue.prototype.$Spin = spinService
  Vue.LoadingBar = Vue.prototype.$Loading = loadingBarService
  let prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui'
  for (let name in comps) Vue.component(prefix + name, comps[name])
}