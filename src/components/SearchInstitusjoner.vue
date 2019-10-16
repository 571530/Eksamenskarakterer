<template>
  <Search
    label="Skriv inn skole eller universitet"
    :list="this.getInstitusjoner()"
    :filterCallback="this.filter"
    :listComponent="listComponent"
  ></Search>
</template>

<script>
import Search from "./Search";
import DataMixin from "../mixins/DataMixin";
import Institusjon from "./Institusjon";

export default {
  title: 'Høyskoler og universiteter',
  name: "searchInstitusjon",
  components: {
    Search
  },
  data: () => ({
      listComponent: Institusjon
  }),
  mixins: [DataMixin],
  methods: {
    filter: function(search, inst) {
      return inst.navn.toLowerCase().includes(search.toLowerCase());
    }
  }
};
</script>
<style>
</style>
