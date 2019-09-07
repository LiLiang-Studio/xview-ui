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
import { Checkbox, CheckboxGroup } from './components/checkbox'
// 布局
import { Layout, Header, Content, Footer, Sider } from './components/layout'
// 标签
import Tag from './components/tag'
// 折叠面板
import { Collapse, Panel } from './components/collapse'
// 单元格
import { Cell, CellGroup } from './components/cell'
// 单选按钮
import { Radio, RadioGroup } from './components/radio'
// 标签页
import { Tabs, TabPane } from './components/tabs'
// 文本输入框
import Input from './components/input'
// 抽屉
import Drawer from './components/drawer'
// 模态框
import Modal, { modalService } from './components/modal'
// 数值输入框
import InputNumber from './components/input-number'
// 穿梭框
import Transfer from './components/transfer'
// 树形控件
import Tree from './components/tree'
// 相对时间
import Time from './components/time'
// 面板分割
import Split from './components/split'
// 走马灯
import { Carousel, CarouselItem } from './components/carousel'

// 上传
import Upload from './components/upload'
// 颜色选择器
import ColorPicker from './components/color-picker'
// 级联选择
import Cascader from './components/cascader'
// 下拉菜单
import { Dropdown, DropdownItem, DropdownMenu } from './components/dropdown'
// 表单
import { Form, FormItem } from './components/form'
// 菜单
import { Menu, Submenu, MenuItem, MenuGroup } from './components/menu'
// 下拉选择框
import { Option, OptionGroup, Select } from './components/select'
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
// 锚点
import { Anchor, AnchorLink } from './components/anchor'

// 表格
import Table from './components/table/Table.vue'
// 日期选择器
import DatePicker from './components/picker/DatePicker.vue'
// 时间选择器
import TimePicker from './components/picker/TimePicker.vue'

import { createDirectives } from './directives'

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
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Tag,
  Collapse,
  Panel,
  Cell,
  CellGroup,
  Radio,
  RadioGroup,
  Tabs,
  TabPane,
  Input,
  Drawer,
  Modal,
  InputNumber,
  Transfer,
  Tree,
  Time,
  Split,
  Carousel,
  CarouselItem,

  Anchor,
  AnchorLink,
  Cascader,
  ColorPicker,
  Upload,
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
    Vue.prototype.$Modal = modalService(Vue)
    Vue.LoadingBar = Vue.prototype.$Loading = loadingBarService(Vue)
    let prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui'
    for (let name in comps) Vue.component(prefix + name, comps[name])

    // 全局指令
    createDirectives(Vue)
  }
}