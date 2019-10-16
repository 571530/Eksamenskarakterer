<template>
  <div>
    <Search
      label="Skriv inn studienavn eller studiekode"
      :list="list || getInitialEmner()"
      :filterCallback="filter"
      :listComponent="listComponent"
    ></Search>
  </div>
</template>

<script>
import Search from "./Search";
import DataMixin from "../mixins/DataMixin";
import Emne from "./Emne";

export default {
  title: "Emner",
  mixins: [DataMixin],
  data: () => ({
    listComponent: Emne,
  }),
  components: {
    Search
  },
  props: {
    list: Array
  },
  methods: {
    filter: function(search, emne) {
      return emne.navn.toLowerCase().includes(search.toLowerCase()) || emne.kode.toLowerCase().includes(search.toLowerCase());
    },
    getInitialEmner: function() {
      return this.getEmner(this.$route.params.iid, this.$route.params.sid);
    }
  }
};
</script>
<style>
</style>
