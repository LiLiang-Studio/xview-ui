<template>
  <div style="padding-bottom:200px;">
    <div class="page-title">Split 面板分割</div>
    <p>可将一片区域，分割为可以拖拽调整宽度或高度的两部分区域。<br></p>

    <div class="page-sub-title">左右分割</div>
    <div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane">
                Left Pane
            </div>
            <div slot="right" class="demo-split-pane">
                Right Pane
            </div>
        </Split>
    </div>

    <div class="page-sub-title">上下分割</div>
    <div class="demo-split">
        <Split v-model="split2" mode="vertical">
            <div slot="top" class="demo-split-pane">
                Top Pane
            </div>
            <div slot="bottom" class="demo-split-pane">
                Bottom Pane
            </div>
        </Split>
    </div>

    <div class="page-sub-title">嵌套使用</div>
    <div class="demo-split">
        <Split v-model="split3">
            <div slot="left" class="demo-split-pane no-padding">
                <Split v-model="split4" mode="vertical">
                    <div slot="top" class="demo-split-pane">
                        Top Pane
                    </div>
                    <div slot="bottom" class="demo-split-pane">
                        Bottom Pane
                    </div>
                </Split>
            </div>
            <div slot="right" class="demo-split-pane">
                Right Pane
            </div>
        </Split>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                split1: 0.5,
                split2: 0.5,
                split3: 0.5,
                split4: 0.5
            }
        },
    }
</script>
<style>
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
    .demo-split-pane.no-padding{
        height: 200px;
        padding: 0;
    }
</style>