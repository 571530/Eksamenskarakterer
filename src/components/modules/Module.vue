<template>
  <v-card>
    <v-card-text>
      <p class="display-1 text--primary">{{title}}</p>
      <p>{{label}}</p>
      <div class="text--primary">
          <slot></slot>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    label: String
  },
};
</script>

<style>
</style>
