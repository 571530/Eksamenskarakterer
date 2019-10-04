<template>
  <v-container>
      <v-row justify="center">
        <v-text-field class="search-bar" :label="label" single-line solo autofocus @change="filter"></v-text-field>
      </v-row>
      <v-row>
          <v-card class="mx-auto" max-width="600" tile>
            <v-list dense two-line class="list">
              <component
                v-for="item in currentList"
                :key="item.navn + item.kode"
                :obj="item"
                :is="listComponent"
              ></component>
            </v-list>
          </v-card>
      </v-row>
      <v-row>
        <v-pagination v-model="page" :length="numPages" :total-visible="5"></v-pagination>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import ArrayMixin from "../mixins/ArrayMixin";
export default {
  name: "search",
  props: {
    label: {
      type: String,
      default: ""
    },
    list: {
      type: Array,
      default: () => []
    },
    filterCallback: {
      type: Function,
      default: () => {}
    },
    listComponent: {
      type: Object,
      default: null
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data: () => {
    return {
      filteredList: [],
      page: 1
    };
  },
  mixins: [ArrayMixin],
  created: function() {
    this.filter("");
  },
  computed: {
    currentList: function() {
      return this.take(
        this.skip(this.filteredList, (this.page - 1) * this.pageSize),
        this.pageSize
      );
    },
    numPages: function() {
      return (
        Math.floor(this.filteredList.length / this.pageSize) +
        (this.filteredList.length % this.pageSize != 0 ? 1 : 0)
      );
    }
  },
  methods: {
    filter: function(search) {
      this.page = 1;
      this.filteredList = this.list.filter(el =>
        this.filterCallback(search, el)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.search-bar {
  max-width: 600px;
}
</style>