import './styles/ionicons.css'
import './styles/base.less'
import './utils/polyfill'
import { NoticeManager } from './utils/vueFunc'
import { createModal } from './components/modal'
import { createDirectives } from './directives'

// 警告提示
import Alert from './components/Alert'
// 头像
import Avator from './components/Avator'
// 回到顶部
import BackTop from './components/BackTop'
// 微标
import Badge from './components/Badge'
// 按钮
import Button from './components/button/Button'
import ButtonGroup from './components/button/ButtonGroup'
// 卡片
import Card from './components/Card'
// 复选框
import Checkbox from './components/checkbox/Checkbox'
import CheckboxGroup from './components/checkbox/CheckboxGroup'
// 图标
import Icon from './components/Icon'
// 文本输入框
import Input from './components/Input'
// 进度条
import Progress from './components/Progress'
// 标签
import Tag from './components/Tag'
// 时间线
import Timeline from './components/timeline/Timeline'
import TimelineItem from './components/timeline/TimelineItem'
// 折叠面板
import Collapse from './components/collapse/Collapse'
import Panel from './components/collapse/Panel'
// 面包屑导航
import Breadcrumb from './components/breadcrumb/Breadcrumb'
import BreadcrumbItem from './components/breadcrumb/BreadcrumbItem'
// 轮播切换
import Swiper from './components/swiper/Swiper'
import SwiperItem from './components/swiper/SwiperItem'
// 网格布局
import Row from './components/grid/Row'
import Col from './components/grid/Col'
// 布局
import Layout from './components/layout/Layout'
import Header from './components/layout/Header'
import Content from './components/layout/Content'
import Footer from './components/layout/Footer'
import Sider from './components/layout/Sider'
// 单选按钮
import Radio from './components/radio/Radio'
import RadioGroup from './components/radio/RadioGroup'
// 开关
import ISwitch from './components/ISwitch'
// 标签页
import Tabs from './components/tabs/Tabs'
import TabPane from './components/tabs/TabPane'
// 穿梭框
import Transfer from './components/Transfer'
// 评分
import Rate from './components/Rate'
// 数值输入框
import InputNumber from './components/InputNumber'

// 消息提示
import Message from './components/Message'
// 通知提醒
import Notice from './components/Notice'
// 模态框
import Modal from './components/modal/Modal'
// 加载中
import Spin, { createSpin } from './components/spin'

const comps = {
  Alert,
  Avator,
  BackTop,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  CheckboxGroup,
  Icon,
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
  InputNumber
}

export default {
  install(Vue, options = {}) {
    let prefix = typeof options.prefix === 'string' ? options.prefix : 'Ui'
    for (let name in comps) Vue.component(prefix + name, comps[name])

    // 消息提醒对象
    Vue.prototype.$Message = new NoticeManager(Vue, Message, 'ui-message-wrapper')
    // 通知提醒对象
    Vue.prototype.$Notice = new NoticeManager(Vue, Notice, 'ui-notice-wrapper', { duration: 4.5 })
    // 标准对话框
    Vue.prototype.$Modal = createModal(Vue)
    // 加载中对象
    Vue.prototype.$Spin = createSpin(Vue)
    // 全局指令
    createDirectives(Vue)
  }
}