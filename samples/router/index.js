import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from '../pages/HomeRouter.vue'
import DatePicker from '../pages/DatePicker.vue'
import TimePicker from '../pages/TimePicker.vue'
import AutoComplete from '../pages/AutoComplete.vue'
import Form from '../pages/Form.vue'
import Slider from '../pages/Slider.vue'
import Table from '../pages/Table.vue'
import Tree from '../pages/Tree.vue'
import Poptip from '../pages/Poptip.vue'
import Tooltip from '../pages/Tooltip.vue'
import Menu from '../pages/Menu.vue'
import Dropdown from '../pages/Dropdown.vue'
import Page from '../pages/Page.vue'
import LoadingBar from '../pages/LoadingBar.vue'
import Affix from '../pages/Affix.vue'
import Scroll from '../pages/Scroll.vue'
import ICircle from '../pages/ICircle.vue'
import Steps from '../pages/Steps.vue'
import Select from '../pages/Select.vue'
import InputNumber from '../pages/InputNumber.vue'
import Rate from '../pages/Rate.vue'
import Transfer from '../pages/Transfer.vue'
import Spin from '../pages/Spin.vue'
import Tabs from '../pages/Tabs.vue'
import Switch from '../pages/Switch.vue'
import Radio from '../pages/Radio.vue'
import Grid from '../pages/Grid.vue'
import Layout from '../pages/Layout.vue'
import Swiper from '../pages/Swiper.vue'
import Alert from '../pages/Alert.vue'
import Avator from '../pages/Avator.vue'
import BackTop from '../pages/BackTop.vue'
import Badge from '../pages/Badge.vue'
import Button from '../pages/Button.vue'
import Card from '../pages/Card.vue'
import Checkbox from '../pages/Checkbox.vue'
import Icon from '../pages/Icon.vue'
import Input from '../pages/Input.vue'
import Message from '../pages/Message.vue'
import Notice from '../pages/Notice.vue'
import Progress from '../pages/Progress.vue'
import Tag from '../pages/Tag.vue'
import Timeline from '../pages/Timeline.vue'
import Collapse from '../pages/Collapse.vue'
import Modal from '../pages/Modal.vue'
import Breadcrumb from '../pages/Breadcrumb.vue'

Vue.use(Router)

export const routeComponents = {
  DatePicker,
  TimePicker,
  AutoComplete,
  Form,
  Slider,
  Table,
  Tree,
  Poptip,
  Tooltip,
  Menu,
  Dropdown,
  Page,
  LoadingBar,
  Affix,
  Scroll,
  ICircle,
  Steps,
  Select,
  InputNumber,
  Rate,
  Transfer,
  Spin,
  Tabs,
  Switch,
  Radio,
  Grid,
  Layout,
  Swiper,
  Alert,
  Avator,
  BackTop,
  Badge,
  Button,
  Card,
  Checkbox,
  Icon,
  Input,
  Message,
  Notice,
  Progress,
  Tag,
  Timeline,
  Collapse,
  Modal,
  Breadcrumb
}

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/samples' },
    {
      path: '/samples',
      component: HomeRouter,
      children: [
        { path: '', redirect: routeComponents[Object.keys(routeComponents)[0]] },
        ...Object.keys(routeComponents).map(_ => {
          return {
            path: _, name: _, component: routeComponents[_]
          }
        })
      ]
    }
  ]
})

export default router