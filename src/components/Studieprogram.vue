<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{this.obj && this.obj.navn}}</v-list-item-title>
      <v-list-item-subtitle>{{this.obj && this.obj.institusjon}}</v-list-item-subtitle>
      <v-row class="hidden-lg-and-up">
        <v-col>
          <RouterLink
            :href="'/institusjon/' + this.obj.institusjonskode + '/' + this.obj.kode + '/statistics'"
          >
            <v-btn small color="primary">Statistikk</v-btn>
          </RouterLink>
          <RouterLink :href="'/institusjon/' + this.obj.institusjonskode + '/' + this.obj.kode">
            <v-btn small color="primary">Emner</v-btn>
          </RouterLink>
        </v-col>
      </v-row>
    </v-list-item-content>
    <v-list-item-action>
      <v-row class="hidden-md-and-down">
        <RouterLink
          :href="'/institusjon/' + this.obj.institusjonskode + '/' + this.obj.kode + '/statistics'"
        >
          <v-btn small color="primary">Statistikk</v-btn>
        </RouterLink>
        <RouterLink :href="'/institusjon/' + this.obj.institusjonskode + '/' + this.obj.kode">
          <v-btn small color="primary">Emner</v-btn>
        </RouterLink>
      </v-row>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import RouterLink from "./RouterLink";

export default {
  name: "studieprogram",
  props: {
    obj: Object
  },
  components: {
    RouterLink
  }
};
</script>
<style lang="scss" scoped>
button {
  margin-right: 5px;
}
hr {
  margin-top: 10px;
}
</style>