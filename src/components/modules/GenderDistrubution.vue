<template>
  <Module title="Kjønnsfordeling" label="Fordeling av kjønn">
    <GChart
      type="PieChart"
      :options="chartOptions"
      :data="distrubutionChartData"
      @ready="onChartReady"
    ></GChart>
  </Module>
</template>

<script>
import { GChart } from "vue-google-charts";
import PieChartMixin from "../../mixins/PieChartMixin";
import Module from "./Module";

export default {
  mixins: [PieChartMixin],
  props: {
    grades: Array
  },
  components: {
    GChart,
    Module
  },
  methods: {
    getDistrubution(grades) {
      return grades.reduce(
        (acc, grade) => {
          acc.male += Number(grade["Antall kandidater menn"]);
          acc.female += Number(grade["Antall kandidater kvinner"]);
          return acc;
        },
        {
          male: 0,
          female: 0
        }
      );
    }
  },
  computed: {
    distrubutionChartData: function() {
      const dist = this.getDistrubution(this.grades || []);
      const data = [
        ["Kjønn", "Antall"],
        ["Mann", dist.male],
        ["Kvinne", dist.female]
      ];

      return data;
    }
  }
};
</script>

<style>
</style>
