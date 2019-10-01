<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{this.obj && this.obj.navn}}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-row>
        <Link :href="'/institusjon/' + this.obj.kode">
          <v-btn small color="primary">Studieprogram</v-btn>
        </Link>

        <Link :href="'/institusjon/' + this.obj.kode + '/emner'">
          <v-btn small color="primary">Emner</v-btn>
        </Link>
      </v-row>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import Link from "./Link";

export default {
  name: "institusjon",
  props: {
    obj: Object
  },
  components: {
    Link
  }
};
</script>
<style lang="scss" scoped>
button {
  margin-right: 5px;
}
</style>