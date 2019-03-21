import './styles/ionicons.css'
import './styles/base.less'
import { NoticeManager } from './utils/vueFunc'
import { createModal } from './components/modal'

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

// 消息提示
import Message from './components/Message'
// 通知提醒
import Notice from './components/Notice'
// 模态框
import Modal from './components/modal/Modal'

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
  Modal
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
  }
}