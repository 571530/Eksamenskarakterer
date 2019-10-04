<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>{{this.obj && this.obj.kode}}</v-list-item-title>
      <v-list-item-subtitle>{{this.obj && this.obj.navn}}</v-list-item-subtitle>
      <v-row class="hidden-lg-and-up">
        <v-col>
          <RouterLink
            :href="'/institusjon/' + this.obj.institusjonskode + '/' + this.obj.studiekode + '/' + this.obj.kode"
          >
            <v-btn small color="primary">Karakterer</v-btn>
          </RouterLink>
        </v-col>
      </v-row>
    </v-list-item-content>
    <v-list-item-action class="hidden-md-and-down">
      <v-row>
        <RouterLink
          :href="'/institusjon/' + this.obj.institusjonskode + '/' + this.obj.studiekode + '/' + this.obj.kode"
        >
          <v-btn small color="primary">Karakterer</v-btn>
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
  },
  created() {}
};
</script>
<style lang="scss" scoped>
button {
  margin-right: 5px;
}
</style>