<template>
  <div class="container">
    <v-row justify="center">
      <v-col lg="6">
        <SemesterPicker :semesters="semesters" :loading="loading" v-model="chosenSemesters"></SemesterPicker>
      </v-col>
    </v-row>
    <v-row v-if="chosenSemesters.length > 0">
      <v-col lg="6">
        <AverageGrade :grades="currentGrades"></AverageGrade>
      </v-col>
      <v-col lg="6">
        <FailRate :grades="currentGrades"></FailRate>
      </v-col>
      <v-col lg="6">
        <GenderDistrubution :grades="currentGrades"></GenderDistrubution>
      </v-col>
      <v-col lg="6">
        <GradeDistrubution :grades="currentGrades"></GradeDistrubution>
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import GradeDistrubution from "./modules/GradeDistrubution";
import GenderDistrubution from "./modules/GenderDistrubution";
import AverageGrade from "./modules/AverageGrade";
import FailRate from "./modules/FailRate";
import SemesterPicker from "./SemesterPicker";
import ApiMixin from "../mixins/ApiMixin";
import StatisticsMixin from "../mixins/StatisticsMixin";

export default {
  mixins: [ApiMixin, StatisticsMixin],
  data: () => ({
    grades: [],
    semesters: [],
    chosenSemesters: [],
    loading: true
  }),
  title() {
    return this.$route.params.eid 
  },
  components: {
    GradeDistrubution,
    FailRate,
    GenderDistrubution,
    SemesterPicker,
    AverageGrade
  },
  computed: {
    currentGrades() {
      return this.getGradesForSemesters(this.chosenSemesters);
    }
  },
  mounted: async function() {
    const inst = this.$route.params.iid;
    const studie = this.$route.params.sid;
    const emne = this.$route.params.eid;
    if (inst && studie && emne) {
      this.grades = await this.getGrades(inst, studie, emne);
      this.semesters = this.getSemesters(this.grades);
      this.loading = false;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
