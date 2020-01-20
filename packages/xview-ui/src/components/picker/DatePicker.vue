<template>
  <div class="ui-datepicker" v-winclick="handleWinClick" @click="handleClick">
    <UiInput icon="ios-calendar-outline"/>
    <ui-drop ref="UiDrop" class="ui-datepicker-dropdown" :visible="dropVisible" :parentName="$options.name">
      <UiHeader/>
      <UiDateView/>
    </ui-drop>
  </div>
</template>
<script>
import { isSelfOrParent } from './../../utils'
import { propsMixin } from './mixins'
import UiInput from '../input'
import UiDrop from './../select/OptionList.vue'
import UiDateView from './DateView.vue'
import UiHeader from './Header.vue'
import { winclick } from '../../directives'
export default {
  name: 'ui-datepicker',
  mixins: [propsMixin],
  components: { UiInput, UiDrop, UiDateView, UiHeader },
  data() {
    return {
      dropVisible: false
    }
  },
  props: {
    type: {
      default: 'date',
      validator(value) {
        return ['date', 'daterange', 'datetime', 'datetimerange', 'year', 'month'].indexOf(value) !== -1
      }
    },
    format: String,
    options: Object,
    splitPanels: Boolean,
    multiple: Boolean,
    showWeekNumbers: Boolean,
    startDate: Date,
    timePickerOptions: {
      type: Object,
      default: () => {}
    }
  },
  directives: { winclick },
  methods: {
    handleClick() {
      this.dropVisible = true
    },
    handleWinClick(event) {
      if (
        isSelfOrParent(this.$el, event.target) || 
        isSelfOrParent(this.$refs.UiDrop.$el, event.target)
      ) return
      this.dropVisible = false
    }
  }
}
</script>
<style lang="less">
.ui-datepicker-dropdown.ui-select-dropdown {
  padding: 0;
  width: 216px;
  max-height: none;
}
</style>