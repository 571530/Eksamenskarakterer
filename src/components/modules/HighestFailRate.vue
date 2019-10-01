<template>
  <FailRate
    :karakterer="highestFailRateSubject && highestFailRateSubject.values || []"
    :label="`${highestFailRateSubject && highestFailRateSubject.key} har høyest strykprosent`"
  ></FailRate>
</template>

<script>
import FailRate from "./FailRate";
import ArrayMixin from "../../mixins/ArrayMixin";

export default {
  mixins: [ArrayMixin],
  props: {
    karakterer: Array
  },
  components: {
    FailRate
  },
  mounted() {},
  methods: {
    getFailRatePercentage: function(grades) {
      const failed = grades
        .filter(grade => grade["Karakter"] == "F" || grade["Karakter"] == "H")
        .reduce((acc, k) => {
          acc += Number(k["Antall kandidater totalt"]);
          return acc;
        }, 0);
      const passed = grades
        .filter(grade => grade["Karakter"] != "F" && grade["Karakter"] != "H")
        .reduce((acc, k) => {
          acc += Number(k["Antall kandidater totalt"]);
          return acc;
        }, 0);
      if (passed + failed == 0) {
        return 0;
      } else {
        return (failed / (passed + failed)) * 100;
      }
    },
    getHighestFailRateSubject(grades) {
      return this.groupBy(grades, "Emnekode")
        .map(emne => {
          emne["failRate"] = this.getFailRatePercentage(emne.values);
          return emne;
        })
        .sort((a, b) => b.failRate - a.failRate)[0];
    }
  },
  computed: {
    highestFailRateSubject() {
      return this.getHighestFailRateSubject(this.karakterer);
    }
  }
};
</script>

<style>
</style>
