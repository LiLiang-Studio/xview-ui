<template>
  <div>
    <div class="page-title">TimePicker 时间选择器</div>
    <p>选择或输入标准时间，支持选择范围。</p>

    <div class="page-sub-title">基础用法</div>
    <p>
      设置属性 type 为 time 或 timerange 分别显示选择单个时间和选择范围时间类型。
      <br />设置属性 placement 可以更改选择器出现的方向，与 Poptip 和 Tooltip 配置一致，支持 12 个方向
    </p>
    <br />
    <Row>
      <Col span="12">
        <TimePicker type="time" placeholder="Select time" style="width: 168px"></TimePicker>
      </Col>
      <Col span="12">
        <TimePicker
          type="timerange"
          placement="bottom-end"
          placeholder="Select time"
          style="width: 168px"
        ></TimePicker>
      </Col>
    </Row>

    <div class="page-sub-title">时间格式</div>
    <p>设置属性 format 可以改变时间的显示格式，详见 Date。注意，format 只是改变显示的格式，并非改变 value 值</p>
    <br />
    <Row>
      <Col span="12">
        <TimePicker
          :value="value1"
          format="HH点mm分ss秒"
          placeholder="Select time"
          style="width: 168px"
        ></TimePicker>
      </Col>
      <Col span="12">
        <TimePicker
          :value="value2"
          format="HH’mm’ss"
          type="timerange"
          placement="bottom-end"
          placeholder="Select time"
          style="width: 168px"
        ></TimePicker>
      </Col>
    </Row>

    <div class="page-sub-title">选择时分</div>
    <p>组件浮层中的列会随着 format 变化，当略去 format 中的秒时，浮层中对应的列也会消失</p>
    <br />
    <Row>
      <Col span="12">
        <TimePicker format="HH:mm" placeholder="Select time" style="width: 112px"></TimePicker>
      </Col>
      <Col span="12">
        <TimePicker
          format="HH:mm"
          type="timerange"
          placement="bottom-end"
          placeholder="Select time"
          style="width: 168px"
        ></TimePicker>
      </Col>
    </Row>

    <div class="page-sub-title">时间间隔</div>
    <p>通过属性 steps 可以设置时间间隔。数组的三项分别对应小时、分钟、秒。</p>
    <br />
    <TimePicker :steps="[1, 15, 15]" placeholder="Select time" style="width: 112px"></TimePicker>

    <div class="page-sub-title">不可选时间</div>
    <p>
      可以使用 disabled-hours disabled-minutes disabled-seconds 组合禁止用户选择某个时间。
      <br />使用 hide-disabled-options 可以直接把不可选择的项隐藏。
    </p>
    <br />
    <Row>
      <Col span="12">
        <TimePicker
          :disabled-hours="[1,5,10]"
          :disabled-minutes="[0,10,20]"
          placeholder="Select time"
          style="width: 168px"
        ></TimePicker>
      </Col>
      <Col span="12">
        <TimePicker
          hide-disabled-options
          :disabled-hours="[1,5,10]"
          :disabled-minutes="[0,10,20]"
          placeholder="Select time"
          style="width: 168px"
        ></TimePicker>
      </Col>
    </Row>

    <div class="page-sub-title">带有确认操作</div>
    <p>设置属性 confirm，选择器会有清空和确定按钮。确认按钮并没有影响时间的正常选择。</p>
    <br />
    <Row>
      <Col span="12">
        <TimePicker confirm placeholder="Select time" style="width: 168px"></TimePicker>
      </Col>
      <Col span="12">
        <TimePicker
          confirm
          type="timerange"
          placement="bottom-end"
          placeholder="Select time"
          style="width: 168px"
        ></TimePicker>
      </Col>
    </Row>

    <div class="page-sub-title">手动控制组件</div>
    <p>对于一些定制化的场景，可以使用 slot 配合参数 open confirm 及事件来手动控制组件的显示状态，详见示例和 API。</p>
    <br />
    <TimePicker
      :open="open"
      :value="value3"
      confirm
      @on-change="handleChange"
      @on-clear="handleClear"
      @on-ok="handleOk"
    >
      <a href="javascript:void(0)" @click="handleClick">
        <Icon type="ios-clock-outline"></Icon>
        <template v-if="value3 === ''">Select time</template>
        <template v-else>{{ value3 }}</template>
      </a>
    </TimePicker>

    <div class="page-sub-title">尺寸</div>
    <p>通过设置属性 size 为 large 或 small 可以调整选择器尺寸为大或小，默认不填为中。</p>
    <br />
    <Row :gutter="16">
      <Col span="8">
        <TimePicker size="small" placeholder="Select time"></TimePicker>
      </Col>
      <Col span="8">
        <TimePicker placeholder="Select time"></TimePicker>
      </Col>
      <Col span="8">
        <TimePicker size="large" placeholder="Select time"></TimePicker>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "09:41:00",
      value2: ["09:41:00", "12:00:00"],
      open: false,
      value3: ""
    };
  },
  methods: {
    handleClick() {
      this.open = !this.open;
    },
    handleChange(time) {
      this.value3 = time;
    },
    handleClear() {
      this.open = false;
    },
    handleOk() {
      this.open = false;
    }
  }
};
</script>