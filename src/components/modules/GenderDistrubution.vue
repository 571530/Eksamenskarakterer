<template>
  <v-card class="distrubution">
    <v-card-text>
      <p class="display-1 text--primary">Kjønnsfordeling</p>
      <p>Fordeling av kjønn</p>
      <div class="text--primary">
        <GChart
          type="PieChart"
          :options="chartOptions"
          :data="distrubutionChartData"
          @ready="onChartReady"
        ></GChart>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { GChart } from "vue-google-charts";
import PieChartMixin from "../../mixins/PieChartMixin";

export default {
  mixins: [PieChartMixin],
  props: {
    karakterer: Array
  },
  components: {
    GChart
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
      const dist = this.getDistrubution(this.karakterer);
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
