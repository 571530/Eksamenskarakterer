<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-text-field :label="label" single-line solo autofocus @change="filter"></v-text-field>
        <div>
          <v-card class="mx-auto" max-width="600" tile>
            <component
              v-for="item in currentList"
              :key="item.navn + item.kode"
              :obj="item"
              :is="listComponent"
            ></component>
          </v-card>
          <v-pagination v-model="page" :length="numPages" :total-visible="10"></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ArrayMixin from "../mixins/ArrayMixin";
import Institusjon from "./Institusjon.vue";

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
  components: {
    Institusjon
  },
  computed: {
    currentList: function () {
      return this.take(this.skip(this.filteredList, (this.page - 1) * this.pageSize), this.pageSize);
    },
    numPages: function () {
      return Math.floor(this.filteredList.length / this.pageSize) + (this.filteredList.length % this.pageSize != 0 ? 1 : 0);
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

<style>
</style>
