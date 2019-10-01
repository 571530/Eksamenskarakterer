<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-layout column fill-height>
        <v-list dense>
          <v-list-item>
            <v-list-item-action>
              <Link href="/institusjoner/search">
                <v-icon>mdi-school</v-icon>
              </Link>
            </v-list-item-action>
            <v-list-item-content>
              <Link href="/institusjoner/search">
                <v-list-item-title>Høyskoler og universiteter</v-list-item-title>
              </Link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <Link href="/studieprogram/search">
                <v-icon>mdi-book-open-page-variant</v-icon>
              </Link>
            </v-list-item-action>
            <v-list-item-content>
              <Link href="/studieprogram/search">
                <v-list-item-title>Studieprogram</v-list-item-title>
              </Link>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <Link href="/emner/search">
                <v-icon>mdi-chart-bar</v-icon>
              </Link>
            </v-list-item-action>
            <v-list-item-content>
              <Link href="/emner/search">
                <v-list-item-title>Emner</v-list-item-title>
              </Link>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-spacer></v-spacer>
        <div class="pa-2">
          <v-switch v-model="$vuetify.theme.dark" label="Dark mode"></v-switch>
        </div>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <Link href="/">Application</Link>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <slot></slot>
    </v-content>
  </v-app>
</template>

<script>
import Link from "./Link";

export default {
  data: () => ({
    drawer: null
  }),
  components: {
    Link
  },
  created() {
    this.$vuetify.theme.dark = false;
  }
};
</script>
<style lang="scss" scoped>
</style>