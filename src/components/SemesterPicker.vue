<template>
  <v-card>
    <v-card-actions>
      <v-select
        v-if="valid"
        v-model="newValue"
        :items="semesters"
        :item-text="itemText"
        :item-value="item => item"
        :menu-props="{ maxHeight: '400' }"
        label="Semestere"
        multiple
        hint="Velg semestere"
        @input="$emit('input', newValue)"
        persistent-hint
      ></v-select>
      <div v-else class="title text-center">Fant ingen statistikk</div>
    </v-card-actions>
  </v-card>
</template>
<script>

export default {
  props: {
    semesters: Array,
    value: Array
  },
  data: ()=> ({
    newValue: []
  }),
  computed: {
    valid() {
      return this.semesters.some(s => s.aarstall && s.semesternavn);
    }
  },
  methods: {
    itemText: item => item.semesternavn + " " + item.aarstall
  }
};
</script>
<style scoped>
</style>
