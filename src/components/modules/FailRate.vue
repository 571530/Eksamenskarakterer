<template>
<Module :title="`Strykprosent ${getFailRatePercentage(grades).toFixed(1)}%`" label="Fordeling av bestått og stryk">
  <FailRateGraph :grades="grades"></FailRateGraph>
</Module>
</template>

<script>
import Module from './Module';
import FailRateGraph from './FailRateGraph';
import StatisticsMixin from '../../mixins/StatisticsMixin';


export default {
  mixins: [StatisticsMixin],
  props: {
    grades: Array,
  },
  components: {
    Module, FailRateGraph
  },
  methods: {
  }
};
</script>
<style>
</style>
