<template>
  <div class="ui-datepicker" @click="handleClick">
    <UiInput icon="ios-calendar-outline"/>
    <!-- <ui-drop ref="UiDrop" class="ui-datepicker-dropdown" :visible="dropVisible" :parentName="$options.name">
      <UiHeader/>
      <UiDateView/>
    </ui-drop> -->
  </div>
</template>
<script>
import { propsMixin } from './mixins'
import UiInput from '../input'
import UiDateView from './DateView.vue'
import UiHeader from './Header.vue'
export default {
  name: 'ui-datepicker',
  mixins: [propsMixin],
  components: { UiInput, UiDateView, UiHeader },
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
  methods: {
    handleClick() {
      this.dropVisible = true
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