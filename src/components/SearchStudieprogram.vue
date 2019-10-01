<template>
  <Search
    label="Skriv inn studienavn eller studiekode"
    :list="list || getInitialStudieprogram()"
    :filterCallback="filter"
    :listComponent="listComponent"
  >
  </Search>
</template>

<script>
import Search from './Search'
import DataMixin from '../mixins/DataMixin'
import Studieprogram from './Studieprogram' 

export default {
  mixins: [
    DataMixin
  ],
  data: () => ({
    listComponent: Studieprogram
  }),
  components: {
      Search
  },
  props: {
      list: Array
  },
  methods: {
      filter: function (search, studie) {
          return studie.navn.toLowerCase().includes(search.toLowerCase());
      },
      getInitialStudieprogram: function () {
        return this.getStudieprogram(this.$route.params.iid);
      }
  }
}
</script>
<style>
</style>
