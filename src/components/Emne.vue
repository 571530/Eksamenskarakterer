<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{this.obj && this.obj.kode}}</v-list-item-title>
      <v-list-item-subtitle>{{this.obj && this.obj.navn}}</v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <v-row>
        <Link :href="'/institusjon/' + this.obj.institusjonskode + '/' + this.obj.studiekode + '/' + this.obj.kode">
          <v-btn small color="primary">Karakterer</v-btn>
        </Link>
      </v-row>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import Link from "./Link";

export default {
  name: "studieprogram",
  props: {
    obj: Object
  },
  components: {
    Link
  },
  created() {
    console.log(this.obj);
  }
};
</script>
<style lang="scss" scoped>
  button {
    margin-right: 5px;
  }
</style>