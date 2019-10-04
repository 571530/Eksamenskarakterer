<template>
  <v-card>
    <v-card-text>
      <p class="display-1 text--primary">
        <RouterLink
          :href="`/institusjon/${this.$route.params.iid}/${this.$route.params.sid}/${highestFailRateSubject.key}`"
          class="link"
        >{{highestFailRateSubject.key}}</RouterLink>
        har høyest strykprosent {{highestFailRateSubject.failRate.toFixed(1)}} %
      </p>
      <p>Fordeling av stryk og bestått for faget <RouterLink
          :href="`/institusjon/${this.$route.params.iid}/${this.$route.params.sid}/${highestFailRateSubject.key}`"
          class="link"
        >{{highestFailRateSubject.key}}</RouterLink></p>
      <p></p>
      <div class="text--primary">
        <FailRateGraph :grades="highestFailRateSubject && highestFailRateSubject.values || []"></FailRateGraph>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import FailRateGraph from "./FailRateGraph";
import StatisticsMixin from "../../mixins/StatisticsMixin";
import RouterLink from "../RouterLink";

export default {
  mixins: [StatisticsMixin],
  props: {
    grades: Array
  },
  components: {
    FailRateGraph,
    RouterLink
  },
  methods: {
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
      return this.getHighestFailRateSubject(this.grades);
    }
  }
};
</script>

<style lang="scss" scoped>
  .link {
    text-decoration: underline;
  }
</style>
