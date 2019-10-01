<template>
  <v-card class="fail-rate">
    <v-card-text>
      <p class="display-1 text--primary">Strykprosent: {{this.failRatePercentage.toFixed(1)}} %</p>
      <p>{{label || 'Fordeling av stryk og bestått'}}</p>
      <div class="text--primary">
        <GChart
          class="test"
          :settings="{packages: ['bar']}"
          :data="failRateChartData"
          :options="chartOptions"
          :createChart="(el, google) => new google.charts.Bar(el)"
          @ready="onChartReady"
        ></GChart>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";
import BarChartMixin from "../../mixins/BarChartMixin";

export default {
  mixins: [BarChartMixin],
  props: {
    karakterer: Array,
    label: String
  },
  components: {
    GChart
  },
  methods: {
    getFailRate: function(grades) {
      const total = grades.reduce(
        (total, grade) => {
          if (grade.Karakter == "F" || grade.Karakter == "H") {
            total.failed.total += Number(grade["Antall kandidater totalt"]);
            total.failed.male += Number(grade["Antall kandidater menn"]);
            total.failed.female += Number(grade["Antall kandidater kvinner"]);
          } else {
            total.passed.total += Number(grade["Antall kandidater totalt"]);
            total.passed.male += Number(grade["Antall kandidater menn"]);
            total.passed.female += Number(grade["Antall kandidater kvinner"]);
          }
          return total;
        },
        ["failed", "passed"].reduce((acc, k) => {
          acc[k] = {
            male: 0,
            female: 0,
            total: 0
          };
          return acc;
        }, {})
      );
      return total;
    }
  },
  computed: {
    failRateChartData: function() {
      const failRate = this.getFailRate(this.karakterer);
      if (this.hideByGender) {
        return [
          ["", ""],
          ["Stryk", failRate.failed.total],
          ["Bestått", failRate.passed.total]
        ];
      } else {
        return [
          ["", "Antall menn", "Antall kvinner", "Antall totalt"],
          [
            "Stryk",
            failRate.failed.male,
            failRate.failed.female,
            failRate.failed.total
          ],
          [
            "Bestått",
            failRate.passed.male,
            failRate.passed.female,
            failRate.passed.total
          ]
        ];
      }
    },
    failRatePercentage: function () {
      const failRate = this.getFailRate(this.karakterer);
      if (failRate.passed.total + failRate.failed.total == 0) {
        return 0;
      }
      return (failRate.failed.total / (failRate.failed.total + failRate.passed.total) * 100);
    }
  }
};
</script>
<style>
</style>
