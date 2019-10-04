<template>
  <Module title="Karakterfordeling" label="Fordeling av karakterer">
    <GChart
      :settings="{packages: ['bar']}"
      :data="distrubutionChartData"
      :options="chartOptions"
      :createChart="(el, google) => new google.charts.Bar(el)"
      @ready="onChartReady"
    ></GChart>
  </Module>
</template>

<script>
import { GChart } from "vue-google-charts";
import BarCharMixin from "../../mixins/BarChartMixin";
import Module from './Module';

export default {
  mixins: [BarCharMixin],
  props: {
    grades: Array
  },
  components: {
    GChart, Module
  },
  methods: {
    getDistrubution(grades) {
      return grades.reduce(
        (total, grade) => {
          if (!total[grade["Karakter"]]) {
            total[grade["Karakter"]] = {
              male: 0,
              female: 0,
              total: 0
            };
          }
          total[grade["Karakter"]].total += Number(
            grade["Antall kandidater totalt"]
          );
          total[grade["Karakter"]].male += Number(
            grade["Antall kandidater menn"]
          );
          total[grade["Karakter"]].female += Number(
            grade["Antall kandidater kvinner"]
          );

          return total;
        },
        ["A", "B", "C", "D", "E", "F"].reduce((acc, k) => {
          acc[k] = {
            male: 0,
            female: 0,
            total: 0
          };
          return acc;
        }, {})
      );
    }
  },
  computed: {
    distrubutionChartData: function() {
      const dist = this.getDistrubution(this.grades || []);
      const data = [];
      if (this.hideByGender) {
        data.push(["Karakter", "Antall"]); // header
        for (let x in dist) {
          data.push([x, dist[x].total]);
        }
      } else {
        data.push([
          "Karakter",
          "Antall menn",
          "Antall kvinner",
          "Antall totalt"
        ]); // header
        for (let x in dist) {
          data.push([x, dist[x].male, dist[x].female, dist[x].total]);
        }
      }
      return data;
    }
  }
};
</script>

<style>
</style>
