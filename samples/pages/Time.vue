<template>
  <div>
    <div class="page-title">Time 相对时间</div>
    <p>常用于表示几分钟前、几小时前等相对于此时此刻的时间描述。</p><br>

    <div class="page-sub-title">基础用法</div>
    <p>设置一个时间戳或 Date，可自动转为相对于当前的时间。<br></p>
    <div>
        <Time :time="time1" />
            <br>
        <Time :time="time2" />
    </div>

    <div class="page-sub-title">自动更新间隔</div>
    <p>设置自动更新间隔，默认为 60 秒。<br></p>
    <Time :time="time3" :interval="1" />

    <div class="page-sub-title">不同类型</div>
    <p>可以根据情况，设置不同的显示类型。<br></p>
        <Time :time="time2" />
        <br>
        <Time :time="time2" type="date" />
        <br>
        <Time :time="time2" type="datetime" />

    <div class="page-sub-title">锚点</div>
    <p>设置 hash 属性，相对时间可以点击并定位锚点。<br></p>
    <Time :time="time2" hash="#hash" />
  </div>
</template>
<script>
    export default {
        data () {
            return {
                time1: (new Date()).getTime() - 60 * 3 * 1000,
                time2: (new Date()).getTime() - 86400 * 3 * 1000,
                time3: new Date()
            }
        }
    }
</script>