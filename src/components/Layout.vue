<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-layout column flex fill-height justify="space-between">
        <v-col>
          <v-list dense>
            <v-list-item>
              <v-list-item-action>
                <RouterLink href="/institusjoner/search">
                  <v-icon>mdi-school</v-icon>
                </RouterLink>
              </v-list-item-action>
              <v-list-item-content>
                <RouterLink href="/institusjoner/search">
                  <v-list-item-title>Høyskoler og universiteter</v-list-item-title>
                </RouterLink>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <RouterLink href="/studieprogram/search">
                  <v-icon>mdi-book-open-page-variant</v-icon>
                </RouterLink>
              </v-list-item-action>
              <v-list-item-content>
                <RouterLink href="/studieprogram/search">
                  <v-list-item-title>Studieprogram</v-list-item-title>
                </RouterLink>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-action>
                <RouterLink href="/emner/search">
                  <v-icon>mdi-chart-bar</v-icon>
                </RouterLink>
              </v-list-item-action>
              <v-list-item-content>
                <RouterLink href="/emner/search">
                  <v-list-item-title>Emner</v-list-item-title>
                </RouterLink>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <v-switch v-model="$vuetify.theme.dark" @change="toggleDarkMode" label="Dark mode"></v-switch>
        </v-col>
      </v-layout>
    </v-navigation-drawer>

    <v-app-bar app dense clipped-left tile>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <RouterLink href="/">Eksamenskarakterer</RouterLink>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <slot></slot>
    </v-content>
  </v-app>
</template>

<script>
import RouterLink from "./RouterLink";

export default {
  data: () => ({
    drawer: null
  }),
  components: {
    RouterLink
  },
  created() {
    this.$vuetify.theme.dark = localStorage.getItem("darkMode") == 'true';
  },
  methods: {
    toggleDarkMode(val) {
      localStorage.setItem("darkMode", val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>