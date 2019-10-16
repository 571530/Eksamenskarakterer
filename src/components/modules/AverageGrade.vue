<template>
  <Module title="Gjennomsnitt">
    <p class="display-1">
      Totalt:
      <span class="display-3">{{averageGrades.total}}</span>
    </p>
    <p class="display-1">
      Kvinner:
      <span class="display-3">{{averageGrades.female}}</span>
    </p>
    <p class="display-1">
      Menn:
      <span class="display-3">{{averageGrades.male}}</span>
    </p>
  </Module>
</template>

<script>
import Module from "./Module";
import StatisticsMixin from "../../mixins/StatisticsMixin";

export default {
  mixins: [StatisticsMixin],
  props: {
    grades: Array
  },
  components: {
    Module
  },
  methods: {},
  computed: {
    averageGrades() {
      const sums = this.getGradeSum(this.grades);
      const candidates = this.getCandidates(this.grades);

      return {
        total:
          this.grades_values[Math.round(sums.total / candidates.total)] || "-",
        female:
          this.grades_values[Math.round(sums.female / candidates.female)] ||
          "-",
        male: this.grades_values[Math.round(sums.male / candidates.male)] || "-"
      };
    }
  }
};
</script>
<style>
</style>
