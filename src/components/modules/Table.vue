<template>
  <v-card>
    <v-card-title>
      Tabellstatistikk
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        label="Søk"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="tableData"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
import Module from "./Module";
import FailRateGraph from "./FailRateGraph";
import StatisticsMixin from "../../mixins/StatisticsMixin";

export default {
  mixins: [StatisticsMixin],
  props: {
    grades: Array
  },
  data: () => ({
    search: ''
  }),
  components: {
    Module
  },
  computed: {
      tableData() {
          return this.groupEmner(this.grades);
      },
      tableHeaders() {
          const headers = this.tableData.length > 0 && Object.keys(this.tableData[0]).map(val => ({
              text: val,
              value: val
          }));
          console.log(headers);
          return headers;
      }
  },
  methods: {}
};
</script>
<style>
</style>
