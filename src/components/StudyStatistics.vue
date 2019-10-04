<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="6">
        <SemesterPicker :semesters="semesters" :loading="loading" v-model="chosenSemesters"></SemesterPicker>
      </v-col>
    </v-row>
    <v-row v-if="chosenSemesters.length > 0">
      <v-col lg="6">
        <FailRate :grades="currentGrades"></FailRate>
      </v-col>
      <v-col lg="6">
        <GenderDistrubution :grades="currentGrades"></GenderDistrubution>
      </v-col>
      <v-col lg="6">
        <GradeDistrubution :grades="currentGrades"></GradeDistrubution>
      </v-col>
      <v-col lg="6">
        <HighestFailRate :grades="currentGrades"></HighestFailRate>
      </v-col>
    </v-row>
    <v-row v-if="chosenSemesters.length > 0">
      <v-col xs="12">
        <Table :grades="currentGrades"></Table>
      </v-col>
    </v-row>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import GradeDistrubution from "./modules/GradeDistrubution";
import GenderDistrubution from "./modules/GenderDistrubution";
import FailRate from "./modules/FailRate";
import HighestFailRate from "./modules/HighestFailRate";
import Table from "./modules/Table";
import Module from "./modules/Module";
import SemesterPicker from "@/components/SemesterPicker";
import ApiMixin from "@/mixins/ApiMixin";
import StatisticsMixin from "../mixins/StatisticsMixin";

export default {
  name: "index",
  mixins: [ApiMixin, StatisticsMixin],
  data: () => ({
    grades: [],
    semesters: [],
    chosenSemesters: [],
    loading: true,
    gradeDistrubution: GradeDistrubution
  }),
  components: {
    GradeDistrubution,
    FailRate,
    GenderDistrubution,
    SemesterPicker,
    HighestFailRate,
    Table
  },
  computed: {
    currentGrades() {
      return this.getGradesForSemesters(this.chosenSemesters);
    }
  },
  async mounted() {
    const inst = this.$route.params.iid;
    const studie = this.$route.params.sid;
    if (inst && studie) {
      this.grades = await this.getAllGradesForStudy(inst, studie);
      this.semesters = this.getSemesters(this.grades);
      this.loading = false;
    }
  }
};
</script>

<style lang="scss">
</style>