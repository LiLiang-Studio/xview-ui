import './styles/ionicons.css'
import './styles/base.less'

/**
 * 2020-03-07 开始新一轮优化
 */
import * as tools from './tools'

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
import Row from './components/row' // 网格行
import Col from './components/col' // 网格列
import List from './components/list' // 列表
import ListItem from './components/list-item' // 列表项
import ListItemMeta from './components/list-item-meta' // 列表项元信息
import Input from './components/input' // 文本输入框
import InputNumber from './components/input-number' // 数值输入框
import Transfer from './components/transfer' // 穿梭框
import Anchor from './components/anchor' // 锚点
import AnchorLink from './components/anchor-link' // 锚点链接
import Carousel from './components/carousel' // 走马灯
import CarouselItem from './components/carousel-item' // 走马灯项
import Tree from './components/tree' // 树形控件
import Layout from './components/layout' // 布局
import Header from './components/header' // 布局头
import Content from './components/content' // 布局内容
import Footer from './components/footer' // 布局脚
import Sider from './components/sider' // 布局边栏
import Page from './components/page' // 分页器
import Tabs from './components/tabs' // 标签页
import TabPane from './components/tab-pane' // 标签页项
import Slider from './components/slider' // 滑块
import Tooltip from './components/tooltip' // 文字提示
import Poptip from './components/poptip' // 气泡提示
import Dropdown from './components/dropdown' // 下拉菜单容器
import DropdownItem from './components/dropdown-item' // 下拉菜单项
import DropdownMenu from './components/dropdown-menu' // 下拉菜单
import Menu from './components/menu' // 菜单
import Submenu from './components/submenu' // 子菜单
import MenuItem from './components/menu-item' // 菜单项
import MenuGroup from './components/menu-group' // 菜单组

import loadingBarService from './components/loading-bar' // 加载条
import Spin from './components/spin' // 加载中
import Message from './components/message' // 消息
import Notice from './components/notice' // 通知
import Modal from './components/modal' // 模态框

/**
 * 待优化组件
 */
// 上传
import Upload from './components/upload'
// 表单
import Form from './components/form'
import FormItem from './components/form-item'
// 颜色选择器
// import ColorPicker from './components/color-picker'
// // 级联选择
// import Cascader from './components/cascader'
// 下拉选择框
import Select from './components/select'
import Option from './components/option'
import OptionGroup from './components/option-group'
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
  List,
  ListItem,
  ListItemMeta,
  Input,
  InputNumber,
  Transfer,
  Anchor,
  AnchorLink,
  Modal,
  Carousel,
  CarouselItem,
  Tree,
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Page,
  Tabs,
  TabPane,
  Slider,
  Tooltip,
  Poptip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  MenuItem,
  Submenu,
  MenuGroup,

  Upload,
  Form,
  FormItem,
  // Cascader,
  // ColorPicker,
  Select,
  Option,
  OptionGroup,
  Table,
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
  Vue.prototype.$XVIEW_UI = tools
  Vue.prototype.$Notice = Notice
  Vue.prototype.$Message = Message
  Vue.prototype.$Spin = Spin.service
  Vue.prototype.$Modal = Modal.service
  Vue.LoadingBar = Vue.prototype.$Loading = loadingBarService
  let prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui'
  for (let name in comps) Vue.component(prefix + name, comps[name])
}