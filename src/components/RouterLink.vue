<template>
    <div @click="navigate(href)">
        <span v-if="label">{{label}}</span>
        <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'index',
  props: {
      label: String,
      href: String
  },
  methods: {
      navigate: function(href) {
        if (href !== this.$router.history.current.path) {
            this.$router.push(href);
        }
      }
  }
}
</script>

<style lang="scss" scoped>
    div {
        display: inline-block;
        cursor: pointer;
    }
</style>